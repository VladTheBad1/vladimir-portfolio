#!/usr/bin/env node

/**
 * Automated Design Review Workflow
 * Based on claude-code-workflows patterns
 * 
 * This script performs comprehensive design quality checks:
 * 1. Design token usage validation
 * 2. Component state coverage
 * 3. Accessibility compliance
 * 4. Performance metrics
 * 5. Visual consistency
 * 6. Responsive design validation
 * 7. Cross-browser compatibility
 */

const fs = require('fs');
const path = require('path');

class DesignReviewSystem {
  constructor() {
    this.results = {
      passed: [],
      warnings: [],
      errors: [],
      metrics: {}
    };
  }

  // Phase 1: Design Token Validation
  async validateDesignTokens() {
    console.log('📐 Phase 1: Validating Design Token Usage...');
    
    const tokenFile = path.join(process.cwd(), 'styles/design-tokens.css');
    const components = this.findFiles('components', ['.tsx', '.jsx']);
    const pages = this.findFiles('app', ['.tsx', '.jsx']);
    
    let tokensUsed = 0;
    let hardcodedValues = 0;
    
    [...components, ...pages].forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      
      // Check for hardcoded colors
      const hardcodedColors = content.match(/#[0-9a-fA-F]{3,6}|rgb\(|rgba\(/g) || [];
      if (hardcodedColors.length > 0) {
        this.results.warnings.push({
          file,
          issue: `Found ${hardcodedColors.length} hardcoded color values`,
          recommendation: 'Use design tokens from var(--color-*)'
        });
        hardcodedValues += hardcodedColors.length;
      }
      
      // Check for design token usage
      const tokenUsage = content.match(/var\(--[\w-]+\)/g) || [];
      tokensUsed += tokenUsage.length;
      
      // Check for hardcoded spacing
      const hardcodedSpacing = content.match(/\d+px|[\d.]+rem/g) || [];
      if (hardcodedSpacing.length > 5) {
        this.results.warnings.push({
          file,
          issue: `Found ${hardcodedSpacing.length} hardcoded spacing values`,
          recommendation: 'Use design tokens from var(--spacing-*)'
        });
      }
    });
    
    this.results.metrics.tokenUsage = {
      tokensUsed,
      hardcodedValues,
      ratio: tokensUsed / (tokensUsed + hardcodedValues) || 0
    };
    
    if (this.results.metrics.tokenUsage.ratio > 0.8) {
      this.results.passed.push('Design token usage is good (>80%)');
    } else {
      this.results.errors.push(`Design token usage is low (${(this.results.metrics.tokenUsage.ratio * 100).toFixed(1)}%)`);
    }
  }

  // Phase 2: Component State Coverage
  async validateComponentStates() {
    console.log('🎨 Phase 2: Checking Component State Coverage...');
    
    const components = this.findFiles('components', ['.tsx', '.jsx']);
    const requiredStates = ['hover', 'focus', 'active', 'disabled', 'loading', 'error'];
    
    components.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      const componentName = path.basename(file, path.extname(file));
      
      const missingStates = requiredStates.filter(state => {
        const hasState = content.includes(`:${state}`) || 
                        content.includes(`${state}:`) ||
                        content.includes(`is${state.charAt(0).toUpperCase() + state.slice(1)}`);
        return !hasState;
      });
      
      if (missingStates.length > 0 && this.isInteractiveComponent(content)) {
        this.results.warnings.push({
          file,
          issue: `Missing states: ${missingStates.join(', ')}`,
          recommendation: 'Add visual states for better UX'
        });
      }
    });
  }

  // Phase 3: Accessibility Validation
  async validateAccessibility() {
    console.log('♿ Phase 3: Checking Accessibility Compliance...');
    
    const components = this.findFiles('components', ['.tsx', '.jsx']);
    const pages = this.findFiles('app', ['.tsx', '.jsx']);
    
    [...components, ...pages].forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      
      // Check for alt text on images
      const images = content.match(/<img[^>]*>/g) || [];
      const imagesWithoutAlt = images.filter(img => !img.includes('alt='));
      if (imagesWithoutAlt.length > 0) {
        this.results.errors.push({
          file,
          issue: `${imagesWithoutAlt.length} images missing alt text`,
          recommendation: 'Add descriptive alt text for screen readers'
        });
      }
      
      // Check for ARIA labels on interactive elements
      const buttons = content.match(/<button[^>]*>/g) || [];
      const buttonsWithoutLabel = buttons.filter(btn => 
        !btn.includes('aria-label') && !btn.includes('aria-labelledby')
      );
      if (buttonsWithoutLabel.length > 0) {
        this.results.warnings.push({
          file,
          issue: `${buttonsWithoutLabel.length} buttons may need ARIA labels`,
          recommendation: 'Add aria-label for icon-only buttons'
        });
      }
      
      // Check for heading hierarchy
      const headings = content.match(/<h[1-6][^>]*>/g) || [];
      if (headings.length > 0) {
        this.validateHeadingHierarchy(headings, file);
      }
      
      // Check for keyboard navigation
      if (content.includes('onClick') && !content.includes('onKeyDown')) {
        this.results.warnings.push({
          file,
          issue: 'Click handlers without keyboard support',
          recommendation: 'Add onKeyDown handlers for keyboard accessibility'
        });
      }
      
      // Check for focus indicators
      if (!content.includes('focus:') && !content.includes(':focus')) {
        this.results.warnings.push({
          file,
          issue: 'No focus indicators defined',
          recommendation: 'Add visible focus states for keyboard navigation'
        });
      }
    });
  }

  // Phase 4: Performance Checks
  async validatePerformance() {
    console.log('⚡ Phase 4: Checking Performance Metrics...');
    
    // Check for lazy loading
    const pages = this.findFiles('app', ['.tsx', '.jsx']);
    pages.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      
      // Check for dynamic imports
      if (!content.includes('dynamic(') && !content.includes('lazy(')) {
        this.results.warnings.push({
          file,
          issue: 'No code splitting detected',
          recommendation: 'Use dynamic imports for better performance'
        });
      }
      
      // Check for image optimization
      if (content.includes('<img') && !content.includes('next/image')) {
        this.results.warnings.push({
          file,
          issue: 'Using native img instead of Next.js Image',
          recommendation: 'Use next/image for automatic optimization'
        });
      }
    });
    
    // Check bundle size
    this.checkBundleSize();
  }

  // Phase 5: Visual Consistency
  async validateVisualConsistency() {
    console.log('🎯 Phase 5: Checking Visual Consistency...');
    
    const styles = this.findFiles('.', ['.css', '.scss']);
    let inconsistencies = 0;
    
    styles.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      
      // Check for consistent border radius
      const borderRadii = content.match(/border-radius:\s*([^;]+)/g) || [];
      const uniqueRadii = [...new Set(borderRadii)];
      if (uniqueRadii.length > 5) {
        this.results.warnings.push({
          file,
          issue: `${uniqueRadii.length} different border-radius values`,
          recommendation: 'Use consistent radius tokens'
        });
        inconsistencies++;
      }
      
      // Check for consistent shadows
      const shadows = content.match(/box-shadow:\s*([^;]+)/g) || [];
      const uniqueShadows = [...new Set(shadows)];
      if (uniqueShadows.length > 5) {
        this.results.warnings.push({
          file,
          issue: `${uniqueShadows.length} different shadow values`,
          recommendation: 'Use consistent shadow tokens'
        });
        inconsistencies++;
      }
    });
    
    if (inconsistencies === 0) {
      this.results.passed.push('Visual consistency maintained');
    }
  }

  // Phase 6: Responsive Design
  async validateResponsiveDesign() {
    console.log('📱 Phase 6: Checking Responsive Design...');
    
    const components = this.findFiles('components', ['.tsx', '.jsx']);
    const requiredBreakpoints = ['sm:', 'md:', 'lg:', 'xl:'];
    
    components.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      const hasResponsive = requiredBreakpoints.some(bp => content.includes(bp));
      
      if (!hasResponsive && this.needsResponsive(content)) {
        this.results.warnings.push({
          file,
          issue: 'No responsive breakpoints found',
          recommendation: 'Add responsive classes for different screen sizes'
        });
      }
    });
  }

  // Phase 7: Cross-browser Compatibility
  async validateCrossBrowser() {
    console.log('🌐 Phase 7: Checking Cross-browser Compatibility...');
    
    const styles = this.findFiles('.', ['.css', '.scss']);
    
    styles.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      
      // Check for vendor prefixes
      const needsPrefixing = [
        'backdrop-filter',
        'user-select',
        'appearance',
        'clip-path'
      ];
      
      needsPrefixing.forEach(property => {
        if (content.includes(property) && !content.includes(`-webkit-${property}`)) {
          this.results.warnings.push({
            file,
            issue: `${property} may need vendor prefixes`,
            recommendation: 'Add -webkit- and -moz- prefixes for compatibility'
          });
        }
      });
    });
  }

  // Helper Methods
  findFiles(dir, extensions) {
    const files = [];
    
    try {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          files.push(...this.findFiles(fullPath, extensions));
        } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      });
    } catch (error) {
      // Directory doesn't exist
    }
    
    return files;
  }

  isInteractiveComponent(content) {
    return content.includes('onClick') || 
           content.includes('button') || 
           content.includes('input') ||
           content.includes('select') ||
           content.includes('textarea');
  }

  validateHeadingHierarchy(headings, file) {
    let lastLevel = 0;
    let skipped = false;
    
    headings.forEach(heading => {
      const level = parseInt(heading.match(/h([1-6])/)[1]);
      if (lastLevel > 0 && level > lastLevel + 1) {
        skipped = true;
      }
      lastLevel = level;
    });
    
    if (skipped) {
      this.results.warnings.push({
        file,
        issue: 'Heading hierarchy skips levels',
        recommendation: 'Maintain sequential heading levels (h1 → h2 → h3)'
      });
    }
  }

  needsResponsive(content) {
    return content.includes('grid') || 
           content.includes('flex') || 
           content.includes('container');
  }

  checkBundleSize() {
    // This would normally check actual bundle sizes
    // For now, we'll check if optimization is configured
    const nextConfig = path.join(process.cwd(), 'next.config.ts');
    if (fs.existsSync(nextConfig)) {
      const content = fs.readFileSync(nextConfig, 'utf-8');
      if (!content.includes('optimizeFonts')) {
        this.results.warnings.push({
          file: nextConfig,
          issue: 'Font optimization not configured',
          recommendation: 'Enable optimizeFonts in next.config'
        });
      }
    }
  }

  // Generate Report
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 DESIGN REVIEW REPORT');
    console.log('='.repeat(60));
    
    // Summary
    const total = this.results.passed.length + 
                 this.results.warnings.length + 
                 this.results.errors.length;
    
    const score = Math.round(
      (this.results.passed.length / total) * 100
    );
    
    console.log(`\n🎯 Overall Score: ${score}%`);
    console.log(`✅ Passed: ${this.results.passed.length}`);
    console.log(`⚠️  Warnings: ${this.results.warnings.length}`);
    console.log(`❌ Errors: ${this.results.errors.length}`);
    
    // Passed checks
    if (this.results.passed.length > 0) {
      console.log('\n✅ PASSED CHECKS:');
      this.results.passed.forEach(item => {
        console.log(`   • ${item}`);
      });
    }
    
    // Errors (must fix)
    if (this.results.errors.length > 0) {
      console.log('\n❌ ERRORS (Must Fix):');
      this.results.errors.forEach(error => {
        if (typeof error === 'string') {
          console.log(`   • ${error}`);
        } else {
          console.log(`   • ${error.file}:`);
          console.log(`     Issue: ${error.issue}`);
          console.log(`     Fix: ${error.recommendation}`);
        }
      });
    }
    
    // Warnings (should fix)
    if (this.results.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS (Should Fix):');
      const warningsByFile = {};
      
      this.results.warnings.forEach(warning => {
        if (typeof warning === 'string') {
          console.log(`   • ${warning}`);
        } else {
          if (!warningsByFile[warning.file]) {
            warningsByFile[warning.file] = [];
          }
          warningsByFile[warning.file].push(warning);
        }
      });
      
      Object.entries(warningsByFile).forEach(([file, warnings]) => {
        console.log(`   📁 ${file}:`);
        warnings.forEach(w => {
          console.log(`      • ${w.issue}`);
          console.log(`        → ${w.recommendation}`);
        });
      });
    }
    
    // Metrics
    console.log('\n📈 METRICS:');
    if (this.results.metrics.tokenUsage) {
      console.log(`   • Design Token Usage: ${(this.results.metrics.tokenUsage.ratio * 100).toFixed(1)}%`);
      console.log(`     - Tokens used: ${this.results.metrics.tokenUsage.tokensUsed}`);
      console.log(`     - Hardcoded values: ${this.results.metrics.tokenUsage.hardcodedValues}`);
    }
    
    // Recommendations
    console.log('\n💡 TOP RECOMMENDATIONS:');
    const recommendations = this.generateRecommendations();
    recommendations.forEach((rec, i) => {
      console.log(`   ${i + 1}. ${rec}`);
    });
    
    // Quality Gate
    console.log('\n' + '='.repeat(60));
    if (score >= 80 && this.results.errors.length === 0) {
      console.log('✅ QUALITY GATE: PASSED');
      console.log('Design review passed! Ready for production.');
    } else {
      console.log('❌ QUALITY GATE: FAILED');
      console.log('Please address the errors and warnings before deployment.');
    }
    console.log('='.repeat(60) + '\n');
    
    // Save report to file
    this.saveReport(score);
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.results.metrics.tokenUsage && this.results.metrics.tokenUsage.ratio < 0.8) {
      recommendations.push('Migrate hardcoded values to design tokens');
    }
    
    const accessibilityIssues = this.results.errors.filter(e => 
      e.issue && (e.issue.includes('alt text') || e.issue.includes('ARIA'))
    );
    if (accessibilityIssues.length > 0) {
      recommendations.push('Improve accessibility with ARIA labels and alt text');
    }
    
    const performanceWarnings = this.results.warnings.filter(w =>
      w.issue && (w.issue.includes('lazy') || w.issue.includes('optimization'))
    );
    if (performanceWarnings.length > 0) {
      recommendations.push('Implement code splitting and image optimization');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Continue monitoring design consistency');
      recommendations.push('Consider adding visual regression tests');
    }
    
    return recommendations.slice(0, 3);
  }

  saveReport(score) {
    const report = {
      timestamp: new Date().toISOString(),
      score,
      results: this.results,
      recommendations: this.generateRecommendations()
    };
    
    const reportsDir = path.join(process.cwd(), 'design-reviews');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    const reportFile = path.join(
      reportsDir,
      `review-${new Date().toISOString().split('T')[0]}.json`
    );
    
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
    console.log(`📁 Report saved to: ${reportFile}`);
  }

  // Main execution
  async run() {
    console.log('🚀 Starting Automated Design Review...\n');
    
    await this.validateDesignTokens();
    await this.validateComponentStates();
    await this.validateAccessibility();
    await this.validatePerformance();
    await this.validateVisualConsistency();
    await this.validateResponsiveDesign();
    await this.validateCrossBrowser();
    
    this.generateReport();
    
    // Exit with appropriate code
    const hasErrors = this.results.errors.length > 0;
    process.exit(hasErrors ? 1 : 0);
  }
}

// Run the design review
const reviewer = new DesignReviewSystem();
reviewer.run().catch(error => {
  console.error('❌ Design review failed:', error);
  process.exit(1);
});