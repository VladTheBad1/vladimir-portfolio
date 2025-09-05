import { test, expect } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';

test.describe('Comprehensive UI Interaction Testing', () => {
  test('test all mouseover interactions and capture issues', async ({ page }) => {
    const issues: string[] = [];
    const screenshotsDir = 'screenshots/interaction-testing';
    
    // Ensure screenshots directory exists
    await fs.mkdir(screenshotsDir, { recursive: true });

    const routes = [
      { path: '/', name: 'homepage' },
      { path: '/portfolio', name: 'portfolio' },
      { path: '/ai-lab', name: 'ai-lab' },
      { path: '/global-intelligence', name: 'global-intelligence' },
      { path: '/leadership', name: 'leadership' },
      { path: '/vision', name: 'vision' },
      { path: '/investor', name: 'investor' }
    ];

    for (const route of routes) {
      console.log(`\n🔍 Testing ${route.name}...`);
      
      try {
        await page.goto(route.path, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        
        // Take full page screenshot before interactions
        await page.screenshot({ 
          path: `${screenshotsDir}/${route.name}-before.png`, 
          fullPage: true 
        });

        // Test all cards
        const cards = await page.locator('[class*="card"], [class*="Card"]').all();
        console.log(`  Found ${cards.length} cards`);
        
        for (let i = 0; i < cards.length; i++) {
          try {
            const card = cards[i];
            const bbox = await card.boundingBox();
            if (!bbox) continue;

            // Get initial border style
            const initialBorder = await card.evaluate((el) => {
              const computed = window.getComputedStyle(el);
              return {
                borderWidth: computed.borderWidth,
                borderColor: computed.borderColor,
                borderStyle: computed.borderStyle
              };
            });

            // Hover over card
            await card.hover();
            await page.waitForTimeout(500);

            // Get border after hover
            const hoverBorder = await card.evaluate((el) => {
              const computed = window.getComputedStyle(el);
              return {
                borderWidth: computed.borderWidth,
                borderColor: computed.borderColor,
                borderStyle: computed.borderStyle
              };
            });

            // Check if border appears correctly on hover
            const hasVisibleInitialBorder = initialBorder.borderWidth !== '0px' && 
                                           initialBorder.borderColor !== 'rgba(0, 0, 0, 0)' &&
                                           initialBorder.borderColor !== 'transparent';
            
            const hasHoverBorder = hoverBorder.borderWidth !== '0px' && 
                                  hoverBorder.borderColor !== 'rgba(0, 0, 0, 0)' &&
                                  hoverBorder.borderColor !== 'transparent';

            // Check for stat cards (shouldn't have hover)
            const cardText = await card.textContent() || '';
            const isStatCard = /^\d+%?$|companies|days|potential|success|retention|culture/i.test(cardText);

            if (hasVisibleInitialBorder && !isStatCard) {
              issues.push(`❌ ${route.name}: Card #${i} has visible border before hover (${initialBorder.borderColor})`);
              await page.screenshot({ 
                path: `${screenshotsDir}/${route.name}-card-${i}-border-issue.png`,
                clip: bbox
              });
            }

            if (isStatCard && hasHoverBorder) {
              issues.push(`⚠️ ${route.name}: Stat card #${i} shouldn't have hover effect`);
            }

            if (!isStatCard && !hasHoverBorder) {
              const cardClass = await card.getAttribute('class') || '';
              if (!cardClass.includes('no-hover')) {
                issues.push(`⚠️ ${route.name}: Card #${i} missing hover border effect`);
              }
            }

            // Move away to reset hover
            await page.mouse.move(0, 0);
            await page.waitForTimeout(200);
            
          } catch (error) {
            console.log(`  Error testing card ${i}: ${error}`);
          }
        }

        // Test all buttons
        const buttons = await page.locator('button, [role="button"], a[href]').all();
        console.log(`  Found ${buttons.length} buttons/links`);
        
        for (let i = 0; i < Math.min(buttons.length, 10); i++) {
          try {
            const button = buttons[i];
            const bbox = await button.boundingBox();
            if (!bbox) continue;

            // Get initial state
            const initialState = await button.evaluate((el) => {
              const computed = window.getComputedStyle(el);
              return {
                backgroundColor: computed.backgroundColor,
                color: computed.color,
                borderColor: computed.borderColor,
                transform: computed.transform,
                opacity: computed.opacity
              };
            });

            // Hover
            await button.hover();
            await page.waitForTimeout(300);

            // Get hover state
            const hoverState = await button.evaluate((el) => {
              const computed = window.getComputedStyle(el);
              return {
                backgroundColor: computed.backgroundColor,
                color: computed.color,
                borderColor: computed.borderColor,
                transform: computed.transform,
                opacity: computed.opacity
              };
            });

            // Check if hover effect exists
            const hasHoverEffect = JSON.stringify(initialState) !== JSON.stringify(hoverState);
            
            if (!hasHoverEffect) {
              const buttonText = await button.textContent() || '';
              if (buttonText && !buttonText.includes('logo')) {
                issues.push(`⚠️ ${route.name}: Button "${buttonText.substring(0, 20)}" lacks hover effect`);
              }
            }

            await page.mouse.move(0, 0);
            await page.waitForTimeout(200);
            
          } catch (error) {
            console.log(`  Error testing button ${i}: ${error}`);
          }
        }

        // Test navigation items
        const navItems = await page.locator('nav a, header a').all();
        console.log(`  Found ${navItems.length} navigation items`);
        
        for (let i = 0; i < navItems.length; i++) {
          try {
            const nav = navItems[i];
            const initialColor = await nav.evaluate(el => window.getComputedStyle(el).color);
            
            await nav.hover();
            await page.waitForTimeout(300);
            
            const hoverColor = await nav.evaluate(el => window.getComputedStyle(el).color);
            
            if (initialColor === hoverColor) {
              const text = await nav.textContent() || '';
              if (text && text !== 'VP') {
                issues.push(`⚠️ ${route.name}: Nav item "${text}" lacks hover effect`);
              }
            }
            
            await page.mouse.move(0, 0);
            await page.waitForTimeout(200);
            
          } catch (error) {
            console.log(`  Error testing nav ${i}: ${error}`);
          }
        }

        // Take screenshot after all interactions
        await page.screenshot({ 
          path: `${screenshotsDir}/${route.name}-after.png`, 
          fullPage: true 
        });

      } catch (error) {
        issues.push(`🔴 ${route.name}: Page failed to load - ${error}`);
        console.error(`Error on ${route.name}:`, error);
      }
    }

    // Generate comprehensive report
    const report = `
# UI Interaction Test Report
Generated: ${new Date().toISOString()}

## Summary
- Total issues found: ${issues.length}
- Pages tested: ${routes.length}

## Issues by Category

### 🔴 Critical Issues (Visible borders)
${issues.filter(i => i.includes('❌')).join('\n') || 'None found ✅'}

### ⚠️ Missing Hover Effects
${issues.filter(i => i.includes('⚠️')).join('\n') || 'None found ✅'}

### 🔴 Page Errors
${issues.filter(i => i.includes('🔴')).join('\n') || 'None found ✅'}

## Detailed Issues
${issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}
`;

    await fs.writeFile('ui-interaction-report.md', report);
    console.log('\n' + report);

    // Fail test if critical issues exist
    const criticalIssues = issues.filter(i => i.includes('❌') || i.includes('🔴'));
    if (criticalIssues.length > 0) {
      throw new Error(`Found ${criticalIssues.length} critical UI issues. See ui-interaction-report.md for details.`);
    }
  });
});