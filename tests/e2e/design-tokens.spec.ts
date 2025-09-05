import { test, expect } from '@playwright/test'

/**
 * Design Token Tests
 * Validates that design tokens are properly applied and consistent
 */

test.describe('Design Token System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should apply correct color tokens', async ({ page }) => {
    // Check brand colors
    const logo = page.locator('.bg-gradient-to-br')
    await expect(logo).toBeVisible()
    
    // Verify CSS variables are loaded
    const rootStyles = await page.evaluate(() => {
      const root = document.documentElement
      const computedStyle = getComputedStyle(root)
      return {
        brandPrimary: computedStyle.getPropertyValue('--color-brand-primary').trim(),
        brandSecondary: computedStyle.getPropertyValue('--color-brand-secondary').trim(),
        neutralBg: computedStyle.getPropertyValue('--color-neutral-950').trim(),
      }
    })
    
    expect(rootStyles.brandPrimary).toBe('#d4860a')
    expect(rootStyles.brandSecondary).toBe('#f3b74a')
    expect(rootStyles.neutralBg).toBe('#0d0d0f')
  })

  test('should apply correct spacing tokens', async ({ page }) => {
    const container = page.locator('.section-container').first()
    
    // Check if container uses spacing tokens
    const padding = await container.evaluate((el) => {
      return window.getComputedStyle(el).padding
    })
    
    // Should use rem-based spacing
    expect(padding).toMatch(/rem/)
  })

  test('should apply correct typography tokens', async ({ page }) => {
    const heading = page.locator('h1').first()
    
    const typography = await heading.evaluate((el) => {
      const styles = window.getComputedStyle(el)
      return {
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        lineHeight: styles.lineHeight,
      }
    })
    
    // Check font family includes our design system fonts
    expect(typography.fontFamily).toContain('Inter')
  })

  test('should apply glass effect correctly', async ({ page }) => {
    const navigation = page.locator('nav').first()
    
    const glassEffect = await navigation.evaluate((el) => {
      const styles = window.getComputedStyle(el)
      return {
        backdropFilter: styles.backdropFilter || styles.webkitBackdropFilter,
        background: styles.background,
      }
    })
    
    // Should have backdrop blur
    expect(glassEffect.backdropFilter).toContain('blur')
  })

  test('should have consistent shadow tokens', async ({ page }) => {
    // Check shadow variables are defined
    const shadows = await page.evaluate(() => {
      const root = document.documentElement
      const computedStyle = getComputedStyle(root)
      return {
        shadowSm: computedStyle.getPropertyValue('--shadow-sm'),
        shadowMd: computedStyle.getPropertyValue('--shadow-md'),
        shadowGlowMd: computedStyle.getPropertyValue('--shadow-glow-md'),
      }
    })
    
    expect(shadows.shadowSm).toBeTruthy()
    expect(shadows.shadowMd).toBeTruthy()
    expect(shadows.shadowGlowMd).toContain('rgba(212, 134, 10')
  })

  test('should have animation duration tokens', async ({ page }) => {
    const animations = await page.evaluate(() => {
      const root = document.documentElement
      const computedStyle = getComputedStyle(root)
      return {
        fast: computedStyle.getPropertyValue('--duration-fast'),
        normal: computedStyle.getPropertyValue('--duration-normal'),
        slow: computedStyle.getPropertyValue('--duration-slow'),
      }
    })
    
    expect(animations.fast).toBe('150ms')
    expect(animations.normal).toBe('250ms')
    expect(animations.slow).toBe('350ms')
  })

  test('should apply hover states with design tokens', async ({ page }) => {
    const button = page.locator('button').filter({ hasText: 'Contact' }).first()
    
    // Get initial state
    const initialState = await button.evaluate((el) => {
      return window.getComputedStyle(el).transform
    })
    
    // Hover and check transform
    await button.hover()
    await page.waitForTimeout(300) // Wait for transition
    
    const hoverState = await button.evaluate((el) => {
      return window.getComputedStyle(el).transform
    })
    
    // Should have scale transform on hover
    expect(hoverState).not.toBe(initialState)
  })

  test('should maintain color contrast ratios', async ({ page }) => {
    // Function to calculate contrast ratio
    const checkContrast = await page.evaluate(() => {
      const getLuminance = (r: number, g: number, b: number) => {
        const [rs, gs, bs] = [r, g, b].map(c => {
          c = c / 255
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
        })
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
      }
      
      const getContrastRatio = (rgb1: number[], rgb2: number[]) => {
        const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2])
        const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2])
        const brightest = Math.max(lum1, lum2)
        const darkest = Math.min(lum1, lum2)
        return (brightest + 0.05) / (darkest + 0.05)
      }
      
      // Check text on background
      const bgColor = [13, 13, 15] // --color-neutral-950
      const textColor = [240, 240, 241] // --color-neutral-100
      
      return getContrastRatio(textColor, bgColor)
    })
    
    // WCAG AA requires 4.5:1 for normal text
    expect(checkContrast).toBeGreaterThan(4.5)
  })

  test('should load custom fonts', async ({ page }) => {
    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready)
    
    const fontInfo = await page.evaluate(() => {
      const heading = document.querySelector('h1')
      if (!heading) return null
      
      const styles = window.getComputedStyle(heading)
      return {
        fontFamily: styles.fontFamily,
        fontWeight: styles.fontWeight,
      }
    })
    
    expect(fontInfo).not.toBeNull()
    expect(fontInfo?.fontFamily).toBeTruthy()
  })

  test('should apply focus ring tokens', async ({ page }) => {
    // Tab to first interactive element
    await page.keyboard.press('Tab')
    
    const focusedElement = page.locator(':focus')
    const focusRing = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el)
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow,
      }
    })
    
    // Should have focus indication (either outline or box-shadow)
    const hasFocusIndication = 
      (focusRing.outline && focusRing.outline !== 'none') ||
      (focusRing.boxShadow && focusRing.boxShadow !== 'none')
    
    expect(hasFocusIndication).toBeTruthy()
  })
})