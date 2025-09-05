import { test, expect } from '@playwright/test'

/**
 * Responsive Design Tests
 * Validates layout and functionality across different screen sizes
 */

const viewports = {
  mobile: { width: 375, height: 667, name: 'iPhone SE' },
  tablet: { width: 768, height: 1024, name: 'iPad' },
  desktop: { width: 1920, height: 1080, name: 'Desktop' },
  ultrawide: { width: 2560, height: 1440, name: 'Ultrawide' },
}

test.describe('Responsive Design', () => {
  Object.entries(viewports).forEach(([size, viewport]) => {
    test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height })
        await page.goto('/')
      })

      test('should display navigation appropriately', async ({ page }) => {
        if (viewport.width < 768) {
          // Mobile: hamburger menu should be visible
          const mobileMenuButton = page.locator('button[aria-label*="menu" i]')
          await expect(mobileMenuButton).toBeVisible()
          
          // Desktop nav should be hidden
          const desktopNav = page.locator('[role="menubar"]')
          await expect(desktopNav).toBeHidden()
        } else {
          // Desktop: regular navigation should be visible
          const desktopNav = page.locator('[role="menubar"]')
          await expect(desktopNav).toBeVisible()
          
          // Mobile menu button should be hidden
          const mobileMenuButton = page.locator('button[aria-label*="menu" i]')
          await expect(mobileMenuButton).toBeHidden()
        }
      })

      test('should scale typography appropriately', async ({ page }) => {
        const heading = page.locator('h1').first()
        const fontSize = await heading.evaluate((el) => {
          return window.getComputedStyle(el).fontSize
        })
        
        const fontSizePx = parseFloat(fontSize)
        
        if (viewport.width < 768) {
          // Mobile: smaller font sizes
          expect(fontSizePx).toBeLessThanOrEqual(48)
        } else {
          // Desktop: larger font sizes
          expect(fontSizePx).toBeGreaterThanOrEqual(48)
        }
      })

      test('should adjust container padding', async ({ page }) => {
        const container = page.locator('.section-container').first()
        const padding = await container.evaluate((el) => {
          const styles = window.getComputedStyle(el)
          return {
            left: parseFloat(styles.paddingLeft),
            right: parseFloat(styles.paddingRight),
          }
        })
        
        if (viewport.width < 640) {
          // Mobile: less padding
          expect(padding.left).toBeLessThanOrEqual(24)
        } else {
          // Larger screens: more padding
          expect(padding.left).toBeGreaterThanOrEqual(24)
        }
      })

      test('should handle content overflow', async ({ page }) => {
        // Check for horizontal scrolling
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth
        })
        
        // Should not have horizontal scroll on any viewport
        expect(hasHorizontalScroll).toBeFalsy()
      })

      test('should maintain aspect ratios for media', async ({ page }) => {
        const images = page.locator('img')
        const imageCount = await images.count()
        
        for (let i = 0; i < imageCount; i++) {
          const img = images.nth(i)
          const isVisible = await img.isVisible()
          
          if (isVisible) {
            const dimensions = await img.evaluate((el) => {
              const rect = el.getBoundingClientRect()
              return {
                width: rect.width,
                height: rect.height,
                naturalWidth: el.naturalWidth,
                naturalHeight: el.naturalHeight,
              }
            })
            
            // Check if aspect ratio is maintained
            if (dimensions.naturalWidth && dimensions.naturalHeight) {
              const naturalRatio = dimensions.naturalWidth / dimensions.naturalHeight
              const displayRatio = dimensions.width / dimensions.height
              const ratioDiff = Math.abs(naturalRatio - displayRatio)
              
              // Allow small difference due to rounding
              expect(ratioDiff).toBeLessThan(0.1)
            }
          }
        }
      })
    })
  })

  test('should adapt grid layouts', async ({ page }) => {
    // Test at different breakpoints
    const breakpoints = [
      { width: 375, expectedColumns: 1 },
      { width: 768, expectedColumns: 2 },
      { width: 1024, expectedColumns: 3 },
      { width: 1920, expectedColumns: 4 },
    ]
    
    for (const bp of breakpoints) {
      await page.setViewportSize({ width: bp.width, height: 800 })
      await page.goto('/portfolio')
      
      // Check grid columns
      const gridContainer = page.locator('.grid').first()
      const gridColumns = await gridContainer.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns
      })
      
      // Count number of columns
      const columnCount = gridColumns.split(' ').length
      expect(columnCount).toBeLessThanOrEqual(bp.expectedColumns + 1)
      expect(columnCount).toBeGreaterThanOrEqual(bp.expectedColumns - 1)
    }
  })

  test('should handle touch interactions on mobile', async ({ page, browserName }) => {
    // Skip for firefox as it doesn't support touch events well
    test.skip(browserName === 'firefox')
    
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Test swipe/touch on cards
    const card = page.locator('.venture-card').first()
    
    if (await card.isVisible()) {
      const box = await card.boundingBox()
      if (box) {
        // Simulate touch interaction
        await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2)
        
        // Card should respond to touch (hover state or click)
        const hasInteraction = await card.evaluate((el) => {
          const styles = window.getComputedStyle(el)
          return styles.transform !== 'none' || styles.boxShadow !== 'none'
        })
        
        expect(hasInteraction).toBeTruthy()
      }
    }
  })

  test('should maintain readability on all screen sizes', async ({ page }) => {
    const sizes = [375, 768, 1024, 1920]
    
    for (const width of sizes) {
      await page.setViewportSize({ width, height: 800 })
      await page.goto('/')
      
      // Check line length for readability
      const paragraphs = page.locator('p')
      const firstParagraph = paragraphs.first()
      
      if (await firstParagraph.isVisible()) {
        const lineLength = await firstParagraph.evaluate((el) => {
          return el.offsetWidth
        })
        
        // Optimal line length is 45-75 characters (roughly 400-700px)
        if (width > 768) {
          expect(lineLength).toBeLessThanOrEqual(800)
        }
      }
    }
  })

  test('should hide/show elements based on screen size', async ({ page }) => {
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check for mobile-only elements
    const mobileOnly = await page.evaluate(() => {
      const elements = document.querySelectorAll('.sm\\:hidden, .md\\:hidden, .lg\\:hidden')
      return Array.from(elements).filter(el => {
        const styles = window.getComputedStyle(el)
        return styles.display !== 'none'
      }).length
    })
    
    // Desktop view
    await page.setViewportSize({ width: 1920, height: 1080 })
    
    const desktopOnly = await page.evaluate(() => {
      const elements = document.querySelectorAll('.hidden.sm\\:block, .hidden.md\\:block, .hidden.lg\\:block')
      return Array.from(elements).filter(el => {
        const styles = window.getComputedStyle(el)
        return styles.display !== 'none'
      }).length
    })
    
    // Should have responsive visibility classes
    expect(mobileOnly + desktopOnly).toBeGreaterThan(0)
  })

  test('should handle viewport meta tag correctly', async ({ page }) => {
    await page.goto('/')
    
    const viewportMeta = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="viewport"]')
      return meta?.getAttribute('content')
    })
    
    expect(viewportMeta).toContain('width=device-width')
    expect(viewportMeta).toContain('initial-scale=1')
  })

  test('should maintain interactive element sizes on touch devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check button/link sizes for touch targets
    const buttons = page.locator('button, a')
    const buttonCount = await buttons.count()
    
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i)
      const isVisible = await button.isVisible()
      
      if (isVisible) {
        const size = await button.evaluate((el) => {
          const rect = el.getBoundingClientRect()
          return {
            width: rect.width,
            height: rect.height,
          }
        })
        
        // Touch targets should be at least 44x44 pixels (iOS guideline)
        expect(size.width).toBeGreaterThanOrEqual(44)
        expect(size.height).toBeGreaterThanOrEqual(44)
      }
    }
  })

  test('should handle orientation changes', async ({ page, browserName }) => {
    // Skip for desktop browsers
    test.skip(browserName === 'firefox' || browserName === 'webkit')
    
    // Portrait
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    const portraitLayout = await page.evaluate(() => {
      return window.innerHeight > window.innerWidth
    })
    expect(portraitLayout).toBeTruthy()
    
    // Landscape
    await page.setViewportSize({ width: 667, height: 375 })
    
    const landscapeLayout = await page.evaluate(() => {
      return window.innerWidth > window.innerHeight
    })
    expect(landscapeLayout).toBeTruthy()
    
    // Check that content adapts
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    
    expect(hasHorizontalScroll).toBeFalsy()
  })
})