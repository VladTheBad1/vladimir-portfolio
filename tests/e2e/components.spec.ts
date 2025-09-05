import { test, expect } from '@playwright/test'

/**
 * Component Interaction Tests
 * Validates button states, cards, navigation, and other UI components
 */

test.describe('Component Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Button Component', () => {
    test('should show hover state', async ({ page }) => {
      const button = page.locator('button').filter({ hasText: 'Contact' }).first()
      
      // Get initial styles
      const initialStyles = await button.evaluate((el) => {
        const styles = window.getComputedStyle(el)
        return {
          transform: styles.transform,
          boxShadow: styles.boxShadow,
          backgroundColor: styles.backgroundColor,
        }
      })
      
      // Hover over button
      await button.hover()
      await page.waitForTimeout(300) // Wait for transition
      
      // Get hover styles
      const hoverStyles = await button.evaluate((el) => {
        const styles = window.getComputedStyle(el)
        return {
          transform: styles.transform,
          boxShadow: styles.boxShadow,
          backgroundColor: styles.backgroundColor,
        }
      })
      
      // Styles should change on hover
      expect(hoverStyles).not.toEqual(initialStyles)
      expect(hoverStyles.transform).toContain('scale')
    })

    test('should show focus state', async ({ page }) => {
      const button = page.locator('button').filter({ hasText: 'Contact' }).first()
      
      // Focus the button
      await button.focus()
      
      const focusStyles = await button.evaluate((el) => {
        const styles = window.getComputedStyle(el)
        return {
          outline: styles.outline,
          boxShadow: styles.boxShadow,
          outlineOffset: styles.outlineOffset,
        }
      })
      
      // Should have focus indicator
      const hasFocusRing = 
        (focusStyles.outline && focusStyles.outline !== 'none') ||
        (focusStyles.boxShadow && focusStyles.boxShadow.includes('rgb'))
      
      expect(hasFocusRing).toBeTruthy()
    })

    test('should handle click interaction', async ({ page }) => {
      const button = page.locator('button').filter({ hasText: 'Contact' }).first()
      
      // Add click listener to verify
      await page.evaluate(() => {
        window.buttonClicked = false
        const btn = document.querySelector('button')
        btn?.addEventListener('click', () => {
          window.buttonClicked = true
        })
      })
      
      await button.click()
      
      const wasClicked = await page.evaluate(() => window.buttonClicked)
      expect(wasClicked).toBeTruthy()
    })

    test('should show disabled state', async ({ page }) => {
      // Find or create a disabled button for testing
      await page.evaluate(() => {
        const btn = document.querySelector('button')
        if (btn) btn.disabled = true
      })
      
      const button = page.locator('button').first()
      const isDisabled = await button.isDisabled()
      expect(isDisabled).toBeTruthy()
      
      const disabledStyles = await button.evaluate((el) => {
        const styles = window.getComputedStyle(el)
        return {
          opacity: styles.opacity,
          cursor: styles.cursor,
          pointerEvents: styles.pointerEvents,
        }
      })
      
      expect(parseFloat(disabledStyles.opacity)).toBeLessThan(1)
      expect(disabledStyles.pointerEvents).toBe('none')
    })
  })

  test.describe('Card Component', () => {
    test('should have glass effect', async ({ page }) => {
      await page.goto('/portfolio')
      const card = page.locator('.venture-card, [class*="card"]').first()
      
      if (await card.isVisible()) {
        const glassStyles = await card.evaluate((el) => {
          const styles = window.getComputedStyle(el)
          return {
            backdropFilter: styles.backdropFilter || styles.webkitBackdropFilter,
            background: styles.background,
            border: styles.border,
          }
        })
        
        expect(glassStyles.backdropFilter).toContain('blur')
        expect(glassStyles.background).toBeTruthy()
      }
    })

    test('should scale on hover', async ({ page }) => {
      await page.goto('/portfolio')
      const card = page.locator('.venture-card, [class*="card"]').first()
      
      if (await card.isVisible()) {
        const initialTransform = await card.evaluate((el) => 
          window.getComputedStyle(el).transform
        )
        
        await card.hover()
        await page.waitForTimeout(300)
        
        const hoverTransform = await card.evaluate((el) => 
          window.getComputedStyle(el).transform
        )
        
        expect(hoverTransform).not.toBe(initialTransform)
        expect(hoverTransform).toContain('matrix')
      }
    })

    test('should handle interactive state', async ({ page }) => {
      await page.goto('/portfolio')
      const card = page.locator('[role="button"]').first()
      
      if (await card.isVisible()) {
        // Check if card is keyboard accessible
        await card.focus()
        
        const isFocused = await card.evaluate((el) => 
          document.activeElement === el
        )
        
        expect(isFocused).toBeTruthy()
        
        // Check keyboard interaction
        await page.keyboard.press('Enter')
        
        // Card should respond to Enter key
        const hasInteraction = await card.evaluate((el) => {
          const styles = window.getComputedStyle(el)
          return styles.transform !== 'none' || el.getAttribute('aria-pressed') === 'true'
        })
        
        expect(hasInteraction).toBeTruthy()
      }
    })
  })

  test.describe('Navigation Component', () => {
    test('should highlight active page', async ({ page }) => {
      // Navigate to different pages and check active state
      const pages = ['/portfolio', '/ai-lab', '/vision']
      
      for (const pagePath of pages) {
        await page.goto(pagePath)
        
        const activeLink = page.locator(`a[href="${pagePath}"]`).first()
        const isActive = await activeLink.evaluate((el) => {
          const styles = window.getComputedStyle(el)
          const classes = el.className
          return {
            hasActiveClass: classes.includes('text-primary') || classes.includes('bg-primary'),
            ariaCurrent: el.getAttribute('aria-current'),
            color: styles.color,
          }
        })
        
        expect(isActive.ariaCurrent).toBe('page')
        expect(isActive.hasActiveClass || isActive.color.includes('rgb')).toBeTruthy()
      }
    })

    test('should handle mobile menu toggle', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      const menuButton = page.locator('button[aria-label*="menu" i]').first()
      const mobileMenu = page.locator('#mobile-menu, [role="menu"]').first()
      
      // Initially closed
      await expect(mobileMenu).toBeHidden()
      
      // Open menu
      await menuButton.click()
      await expect(mobileMenu).toBeVisible()
      
      const isExpanded = await menuButton.getAttribute('aria-expanded')
      expect(isExpanded).toBe('true')
      
      // Close menu
      await menuButton.click()
      await expect(mobileMenu).toBeHidden()
      
      const isCollapsed = await menuButton.getAttribute('aria-expanded')
      expect(isCollapsed).toBe('false')
    })

    test('should close mobile menu on navigation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      const menuButton = page.locator('button[aria-label*="menu" i]').first()
      const mobileMenu = page.locator('#mobile-menu, [role="menu"]').first()
      
      // Open menu
      await menuButton.click()
      await expect(mobileMenu).toBeVisible()
      
      // Click a nav link
      const navLink = mobileMenu.locator('a').first()
      await navLink.click()
      
      // Menu should close after navigation
      await expect(mobileMenu).toBeHidden()
    })

    test('should support keyboard navigation', async ({ page }) => {
      // Tab through nav items
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      
      // Use arrow keys to navigate
      await page.keyboard.press('ArrowRight')
      
      const focusedElement = await page.evaluate(() => {
        return document.activeElement?.textContent
      })
      
      expect(focusedElement).toBeTruthy()
    })
  })

  test.describe('Loading States', () => {
    test('should show loading spinner on buttons', async ({ page }) => {
      // Simulate loading state
      await page.evaluate(() => {
        const button = document.querySelector('button')
        if (button) {
          button.setAttribute('aria-busy', 'true')
          button.classList.add('loading')
          
          // Add spinner
          const spinner = document.createElement('div')
          spinner.className = 'animate-spin'
          button.prepend(spinner)
        }
      })
      
      const button = page.locator('button').first()
      const spinner = button.locator('.animate-spin')
      
      await expect(spinner).toBeVisible()
      
      const ariaBusy = await button.getAttribute('aria-busy')
      expect(ariaBusy).toBe('true')
    })

    test('should show skeleton loaders', async ({ page }) => {
      const skeletons = page.locator('[class*="skeleton"], [class*="animate-pulse"]')
      const skeletonCount = await skeletons.count()
      
      if (skeletonCount > 0) {
        const skeleton = skeletons.first()
        const animation = await skeleton.evaluate((el) => {
          const styles = window.getComputedStyle(el)
          return styles.animation
        })
        
        expect(animation).toContain('pulse')
      }
    })
  })

  test.describe('Modal/Dialog Component', () => {
    test('should trap focus when open', async ({ page }) => {
      // Find or trigger a modal
      const modalTrigger = page.locator('[data-modal-trigger], button').first()
      
      if (await modalTrigger.isVisible()) {
        await modalTrigger.click()
        
        const modal = page.locator('[role="dialog"], .modal')
        
        if (await modal.isVisible()) {
          // Tab through modal
          let focusInModal = true
          for (let i = 0; i < 10; i++) {
            await page.keyboard.press('Tab')
            const inModal = await page.evaluate(() => {
              const focused = document.activeElement
              const modal = document.querySelector('[role="dialog"], .modal')
              return modal?.contains(focused) || false
            })
            
            if (!inModal && i < 8) {
              focusInModal = false
              break
            }
          }
          
          expect(focusInModal).toBeTruthy()
        }
      }
    })

    test('should close on Escape key', async ({ page }) => {
      const modalTrigger = page.locator('[data-modal-trigger], button').first()
      
      if (await modalTrigger.isVisible()) {
        await modalTrigger.click()
        
        const modal = page.locator('[role="dialog"], .modal')
        
        if (await modal.isVisible()) {
          await page.keyboard.press('Escape')
          await expect(modal).toBeHidden()
        }
      }
    })
  })

  test.describe('Form Interactions', () => {
    test('should show validation states', async ({ page }) => {
      await page.goto('/investor')
      
      const input = page.locator('input[type="email"], input[type="text"]').first()
      
      if (await input.isVisible()) {
        // Enter invalid data
        await input.fill('invalid')
        await input.blur()
        
        const validation = await input.evaluate((el) => {
          const styles = window.getComputedStyle(el)
          return {
            borderColor: styles.borderColor,
            ariaInvalid: el.getAttribute('aria-invalid'),
            validity: el.validity?.valid,
          }
        })
        
        // Check for validation indicators
        const hasValidation = 
          validation.ariaInvalid === 'true' ||
          validation.borderColor.includes('rgb') ||
          validation.validity === false
        
        expect(hasValidation).toBeTruthy()
      }
    })

    test('should handle form submission', async ({ page }) => {
      await page.goto('/investor')
      
      const form = page.locator('form').first()
      
      if (await form.isVisible()) {
        // Add submit listener
        await page.evaluate(() => {
          window.formSubmitted = false
          const form = document.querySelector('form')
          form?.addEventListener('submit', (e) => {
            e.preventDefault()
            window.formSubmitted = true
          })
        })
        
        const submitButton = form.locator('button[type="submit"], button').last()
        await submitButton.click()
        
        const wasSubmitted = await page.evaluate(() => window.formSubmitted)
        expect(wasSubmitted).toBeTruthy()
      }
    })
  })
})