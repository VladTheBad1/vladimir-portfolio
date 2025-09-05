import { test } from '@playwright/test'

const pages = [
  { name: 'homepage', path: '/' },
  { name: 'portfolio', path: '/portfolio' },
  { name: 'ai-lab', path: '/ai-lab' },
  { name: 'global-intelligence', path: '/global-intelligence' },
  { name: 'leadership', path: '/leadership' },
  { name: 'vision', path: '/vision' },
  { name: 'investor', path: '/investor' }
]

test.describe('Screenshot all pages', () => {
  test('capture all pages and test hover effects', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    
    for (const pageInfo of pages) {
      await test.step(`Screenshot ${pageInfo.name}`, async () => {
        await page.goto(`http://localhost:3001${pageInfo.path}`)
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(500) // Wait for animations
        
        // Take full page screenshot
        await page.screenshot({ 
          path: `screenshots/${pageInfo.name}-full.png`,
          fullPage: true 
        })
        
        // Find and test card hover effects
        const cards = await page.locator('[class*="border"][class*="bg-white"]').all()
        
        if (cards.length > 0) {
          const firstCard = cards[0]
          
          // Screenshot before hover
          await firstCard.screenshot({ 
            path: `screenshots/${pageInfo.name}-card-before.png` 
          })
          
          // Hover and capture
          await firstCard.hover()
          await page.waitForTimeout(300) // Wait for transition
          
          await firstCard.screenshot({ 
            path: `screenshots/${pageInfo.name}-card-hover.png` 
          })
          
          console.log(`✅ ${pageInfo.name}: Captured ${cards.length} cards with hover effects`)
        } else {
          console.log(`ℹ️ ${pageInfo.name}: No cards found`)
        }
      })
    }
  })
})