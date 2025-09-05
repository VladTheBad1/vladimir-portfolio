import { test, expect } from '@playwright/test'

const pages = [
  { name: 'Homepage', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'AI Lab', path: '/ai-lab' },
  { name: 'Global Intelligence', path: '/global-intelligence' },
  { name: 'Leadership', path: '/leadership' },
  { name: 'Vision', path: '/vision' },
  { name: 'Investor', path: '/investor' }
]

test.describe('UI Consistency Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1920, height: 1080 })
  })

  test('capture all pages and test consistency', async ({ page }) => {
    for (const pageInfo of pages) {
      await test.step(`Testing ${pageInfo.name}`, async () => {
        await page.goto(`http://localhost:3001${pageInfo.path}`)
        await page.waitForLoadState('networkidle')
        
        // Take full page screenshot
        await page.screenshot({ 
          path: `screenshots/${pageInfo.name.toLowerCase().replace(' ', '-')}-full.png`,
          fullPage: true 
        })
        
        // Test card elements
        const cards = await page.locator('[class*="card"], [class*="Card"]').all()
        
        if (cards.length > 0) {
          // Check initial card state
          for (let i = 0; i < Math.min(3, cards.length); i++) {
            const card = cards[i]
            
            // Check initial border
            const initialBorder = await card.evaluate(el => 
              window.getComputedStyle(el).border
            )
            expect(initialBorder).toContain('rgb(229, 231, 235)') // gray-200
            
            // Hover over card
            await card.hover()
            await page.waitForTimeout(300) // Wait for transition
            
            // Take screenshot of hovered card
            await card.screenshot({ 
              path: `screenshots/${pageInfo.name.toLowerCase().replace(' ', '-')}-card-${i}-hover.png`
            })
            
            // Check hover border
            const hoverBorder = await card.evaluate(el => 
              window.getComputedStyle(el).border
            )
            
            // Move away from card
            await page.mouse.move(0, 0)
            await page.waitForTimeout(200)
          }
        }
        
        // Test navigation consistency
        const nav = await page.locator('nav').first()
        expect(nav).toBeVisible()
        
        // Test text contrast
        const headings = await page.locator('h1, h2, h3').all()
        for (const heading of headings.slice(0, 3)) {
          const color = await heading.evaluate(el => 
            window.getComputedStyle(el).color
          )
          // Should be dark gray or black (handles both rgb and lab color formats)
          expect(color).toMatch(/(rgb\((1[0-9]|2[0-9]|3[0-9]|[0-9]),|lab\((2[0-9]|3[0-9]|[0-9]))/)
        }
        
        // Test spacing
        const mainContent = await page.locator('main').first()
        if (mainContent) {
          const padding = await mainContent.evaluate(el => {
            const styles = window.getComputedStyle(el.firstElementChild || el)
            return {
              left: styles.paddingLeft,
              right: styles.paddingRight
            }
          })
          
          // Should have proper horizontal padding
          expect(parseInt(padding.left)).toBeGreaterThanOrEqual(24)
          expect(parseInt(padding.right)).toBeGreaterThanOrEqual(24)
        }
      })
    }
  })

  test('card hover effects', async ({ page }) => {
    await page.goto('http://localhost:3001/portfolio')
    await page.waitForLoadState('networkidle')
    
    // Find venture cards
    const cards = await page.locator('[class*="venture-card"], [class*="Card"]').all()
    
    for (let i = 0; i < Math.min(3, cards.length); i++) {
      const card = cards[i]
      
      // Screenshot before hover
      await card.screenshot({ 
        path: `screenshots/card-${i}-before-hover.png` 
      })
      
      // Hover and wait for transition
      await card.hover()
      await page.waitForTimeout(500)
      
      // Screenshot during hover
      await card.screenshot({ 
        path: `screenshots/card-${i}-during-hover.png` 
      })
      
      // Check computed styles during hover
      const styles = await card.evaluate(el => {
        const computed = window.getComputedStyle(el)
        return {
          border: computed.border,
          boxShadow: computed.boxShadow,
          transform: computed.transform,
          borderColor: computed.borderColor
        }
      })
      
      console.log(`Card ${i} hover styles:`, JSON.stringify(styles, null, 2))
    }
  })

  test('responsive design check', async ({ page }) => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 }
    ]
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      
      for (const pageInfo of pages.slice(0, 3)) { // Test first 3 pages
        await page.goto(`http://localhost:3001${pageInfo.path}`)
        await page.waitForLoadState('networkidle')
        
        await page.screenshot({
          path: `screenshots/${viewport.name}-${pageInfo.name.toLowerCase().replace(' ', '-')}.png`,
          fullPage: false
        })
      }
    }
  })
})