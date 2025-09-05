const { chromium } = require('playwright');

(async () => {
  console.log('🔍 Analyzing Co-Star website design...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📱 Navigating to Co-Star website...');
    await page.goto('https://www.costarastrology.com/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Take screenshots
    await page.screenshot({ path: 'costar-homepage.png' });
    console.log('📸 Screenshot saved: costar-homepage.png');
    
    await page.screenshot({ path: 'costar-full.png', fullPage: true });
    console.log('📸 Full page screenshot saved: costar-full.png');
    
    // Analyze design
    const designAnalysis = await page.evaluate(() => {
      const body = document.body;
      const styles = window.getComputedStyle(body);
      
      // Get all unique colors from the page
      const colors = new Set();
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          colors.add(style.backgroundColor);
        }
        if (style.color) {
          colors.add(style.color);
        }
      });
      
      // Get typography
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const typography = [];
      headings.forEach(h => {
        const hStyle = window.getComputedStyle(h);
        typography.push({
          tag: h.tagName,
          fontSize: hStyle.fontSize,
          fontWeight: hStyle.fontWeight,
          fontFamily: hStyle.fontFamily,
          color: hStyle.color
        });
      });
      
      // Get buttons
      const buttons = document.querySelectorAll('button, a[role="button"], .button, .btn, [class*="button"], [class*="Button"]');
      const buttonStyles = [];
      buttons.forEach(btn => {
        const btnStyle = window.getComputedStyle(btn);
        buttonStyles.push({
          backgroundColor: btnStyle.backgroundColor,
          color: btnStyle.color,
          borderRadius: btnStyle.borderRadius,
          padding: btnStyle.padding,
          border: btnStyle.border
        });
      });
      
      return {
        backgroundColor: styles.backgroundColor,
        textColor: styles.color,
        fontFamily: styles.fontFamily,
        lineHeight: styles.lineHeight,
        colors: Array.from(colors).slice(0, 15),
        typography: typography.slice(0, 5),
        buttons: buttonStyles.slice(0, 3),
        layoutWidth: body.scrollWidth,
        hasGradients: document.body.innerHTML.includes('gradient'),
        mainContent: document.querySelector('main, .main, #main, [role="main"]')?.className || 'not found'
      };
    });
    
    console.log('\n🎨 DESIGN ANALYSIS RESULTS:\n');
    console.log('='.repeat(50));
    console.log(`Background: ${designAnalysis.backgroundColor}`);
    console.log(`Text Color: ${designAnalysis.textColor}`);
    console.log(`Font Family: ${designAnalysis.fontFamily}`);
    console.log(`Line Height: ${designAnalysis.lineHeight}`);
    console.log(`Layout Width: ${designAnalysis.layoutWidth}px`);
    
    console.log('\n📝 Typography:');
    designAnalysis.typography.forEach(t => {
      console.log(`  ${t.tag}: ${t.fontSize} | ${t.fontWeight} | ${t.color}`);
    });
    
    console.log('\n🎨 Color Palette:');
    designAnalysis.colors.slice(0, 8).forEach(c => {
      console.log(`  - ${c}`);
    });
    
    console.log('\n🔘 Button Styles:');
    designAnalysis.buttons.forEach((b, i) => {
      console.log(`  Button ${i+1}:`);
      console.log(`    Background: ${b.backgroundColor}`);
      console.log(`    Color: ${b.color}`);
      console.log(`    Border: ${b.border}`);
      console.log(`    Border Radius: ${b.borderRadius}`);
    });
    
    // Scroll and capture more sections
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'costar-section2.png' });
    console.log('\n📸 Section 2 screenshot saved: costar-section2.png');
    
    // Check for specific design patterns
    const patterns = await page.evaluate(() => {
      return {
        hasDarkTheme: document.body.classList.contains('dark') || 
                      window.getComputedStyle(document.body).backgroundColor.includes('0, 0, 0'),
        hasCards: document.querySelectorAll('[class*="card"], .card').length > 0,
        hasGrid: document.querySelectorAll('[class*="grid"], .grid').length > 0,
        hasHero: document.querySelectorAll('[class*="hero"], .hero, header').length > 0,
        hasMinimalDesign: document.querySelectorAll('*').length < 500
      };
    });
    
    console.log('\n✨ Design Patterns:');
    console.log(`  Dark Theme: ${patterns.hasDarkTheme ? 'Yes' : 'No'}`);
    console.log(`  Card Components: ${patterns.hasCards ? 'Yes' : 'No'}`);
    console.log(`  Grid Layout: ${patterns.hasGrid ? 'Yes' : 'No'}`);
    console.log(`  Hero Section: ${patterns.hasHero ? 'Yes' : 'No'}`);
    console.log(`  Minimal Design: ${patterns.hasMinimalDesign ? 'Yes' : 'No'}`);
    
    console.log('\n✅ Analysis complete!');
    console.log('📁 Screenshots saved in project directory');
    
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
    console.log('\n👋 Browser closed');
  }
})();