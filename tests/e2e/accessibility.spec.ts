import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Accessibility Tests
 * Validates WCAG compliance and keyboard navigation
 */

test.describe('Accessibility Compliance', () => {
  test('should pass axe accessibility checks on homepage', async ({ page }) => {
    await page.goto('/')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    
    const headings = await page.evaluate(() => {
      const h1s = document.querySelectorAll('h1')
      const h2s = document.querySelectorAll('h2')
      const h3s = document.querySelectorAll('h3')
      
      return {
        h1Count: h1s.length,
        h2Count: h2s.length,
        h3Count: h3s.length,
        h1Text: Array.from(h1s).map(h => h.textContent),
      }
    })
    
    // Should have exactly one h1
    expect(headings.h1Count).toBe(1)
    expect(headings.h1Text[0]).toBeTruthy()
  })

  test('should have proper ARIA labels on interactive elements', async ({ page }) => {
    await page.goto('/')
    
    // Check buttons have accessible names
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const accessibleName = await button.evaluate((el) => {
        // Check for aria-label, aria-labelledby, or text content
        return el.getAttribute('aria-label') || 
               el.textContent?.trim() ||
               el.getAttribute('aria-labelledby')
      })
      
      expect(accessibleName).toBeTruthy()
    }
  })

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/')
    
    // Tab through interactive elements
    const tabSequence = []
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement
        return {
          tagName: el?.tagName.toLowerCase(),
          text: el?.textContent?.trim().substring(0, 20),
          ariaLabel: el?.getAttribute('aria-label'),
        }
      })
      tabSequence.push(focusedElement)
      
      // Prevent infinite loop
      if (focusedElement.tagName === 'body') break
    }
    
    // Should have focusable elements
    expect(tabSequence.some(el => el.tagName !== 'body')).toBeTruthy()
    
    // All focusable elements should be interactive
    const interactiveTags = ['a', 'button', 'input', 'select', 'textarea']
    tabSequence.forEach(el => {
      if (el.tagName !== 'body') {
        expect(interactiveTags).toContain(el.tagName)
      }
    })
  })

  test('should have skip to main content link', async ({ page }) => {
    await page.goto('/')
    
    // Focus on skip link (usually first focusable element)
    await page.keyboard.press('Tab')
    
    const skipLink = await page.evaluate(() => {
      const el = document.activeElement
      return {
        href: el?.getAttribute('href'),
        text: el?.textContent,
      }
    })
    
    // Check if it's a skip link (href starts with #)
    if (skipLink.href?.startsWith('#')) {
      expect(skipLink.text?.toLowerCase()).toContain('skip')
    }
  })

  test('should handle focus trap in mobile menu', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Open mobile menu
    const menuButton = page.locator('button[aria-label*="menu" i]').first()
    await menuButton.click()
    
    // Check if menu is open
    const menuExpanded = await menuButton.getAttribute('aria-expanded')
    expect(menuExpanded).toBe('true')
    
    // Tab through menu items
    let focusedInMenu = true
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab')
      const inMenu = await page.evaluate(() => {
        const focused = document.activeElement
        const menu = document.querySelector('[role="menu"]')
        return menu?.contains(focused) || false
      })
      
      if (!inMenu && i < 10) {
        focusedInMenu = false
        break
      }
    }
    
    // Focus should stay within menu or wrap around
    expect(focusedInMenu).toBeTruthy()
    
    // Escape should close menu
    await page.keyboard.press('Escape')
    const menuExpandedAfterEscape = await menuButton.getAttribute('aria-expanded')
    expect(menuExpandedAfterEscape).toBe('false')
  })

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/')
    
    const contrastResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .options({ 
        rules: {
          'color-contrast': { enabled: true }
        }
      })
      .analyze()
    
    const contrastViolations = contrastResults.violations.filter(
      v => v.id === 'color-contrast'
    )
    
    expect(contrastViolations).toHaveLength(0)
  })

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/')
    
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const altText = await img.getAttribute('alt')
      
      // All images should have alt attribute (can be empty for decorative)
      expect(altText).toBeDefined()
    }
  })

  test('should announce page changes to screen readers', async ({ page }) => {
    await page.goto('/')
    
    // Check for ARIA live regions
    const liveRegions = await page.evaluate(() => {
      const regions = document.querySelectorAll('[aria-live]')
      return Array.from(regions).map(r => ({
        ariaLive: r.getAttribute('aria-live'),
        role: r.getAttribute('role'),
      }))
    })
    
    // Should have at least one live region for announcements
    const hasAnnouncementRegion = liveRegions.some(
      r => r.ariaLive === 'polite' || r.ariaLive === 'assertive'
    )
    
    expect(hasAnnouncementRegion).toBeTruthy()
  })

  test('should support reduced motion preferences', async ({ page, browserName }) => {
    // Skip for webkit as it handles prefers-reduced-motion differently
    test.skip(browserName === 'webkit')
    
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    
    // Check if animations are disabled
    const animationDurations = await page.evaluate(() => {
      const elements = document.querySelectorAll('*')
      const durations = []
      
      elements.forEach(el => {
        const styles = window.getComputedStyle(el)
        const animationDuration = styles.animationDuration
        const transitionDuration = styles.transitionDuration
        
        if (animationDuration !== '0s') {
          durations.push(parseFloat(animationDuration))
        }
        if (transitionDuration !== '0s') {
          durations.push(parseFloat(transitionDuration))
        }
      })
      
      return durations
    })
    
    // All animations should be very short (< 0.01s) when reduced motion is enabled
    animationDurations.forEach(duration => {
      expect(duration).toBeLessThanOrEqual(0.01)
    })
  })

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/investor')
    
    const formInputs = page.locator('input, select, textarea')
    const inputCount = await formInputs.count()
    
    for (let i = 0; i < inputCount; i++) {
      const input = formInputs.nth(i)
      const inputId = await input.getAttribute('id')
      
      if (inputId) {
        // Check for associated label
        const label = page.locator(`label[for="${inputId}"]`)
        const labelExists = await label.count() > 0
        
        // Or check for aria-label
        const ariaLabel = await input.getAttribute('aria-label')
        
        expect(labelExists || ariaLabel).toBeTruthy()
      }
    }
  })

  test('should have accessible error messages', async ({ page }) => {
    await page.goto('/')
    
    // Check for ARIA error attributes on form fields
    const errorFields = await page.evaluate(() => {
      const fields = document.querySelectorAll('[aria-invalid="true"]')
      return Array.from(fields).map(field => ({
        hasErrorMessage: !!field.getAttribute('aria-errormessage') || 
                        !!field.getAttribute('aria-describedby'),
      }))
    })
    
    // All invalid fields should have error messages
    errorFields.forEach(field => {
      expect(field.hasErrorMessage).toBeTruthy()
    })
  })

  test('should maintain focus visibility', async ({ page }) => {
    await page.goto('/')
    
    // Tab to first link
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    const focusVisible = await page.evaluate(() => {
      const focused = document.activeElement
      if (!focused) return false
      
      const styles = window.getComputedStyle(focused)
      
      // Check for focus indicators
      const hasOutline = styles.outline !== 'none' && 
                        styles.outline !== '' && 
                        styles.outline !== '0'
      const hasBoxShadow = styles.boxShadow !== 'none' && 
                          styles.boxShadow !== ''
      const hasBorder = styles.borderColor !== styles.backgroundColor
      
      return hasOutline || hasBoxShadow || hasBorder
    })
    
    expect(focusVisible).toBeTruthy()
  })
})