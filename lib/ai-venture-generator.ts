import { VentureIdea, VenturePrompt, BusinessModelCanvas, ValidationCriteria } from '@/types/ai-lab'

// Simulated AI venture generation - in production this would call OpenAI/Claude API
export async function generateVentureIdea(prompt: VenturePrompt): Promise<VentureIdea> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  const ventures: Record<string, Partial<VentureIdea>> = {
    'healthcare_ai': {
      name: 'MediScan Pro',
      tagline: 'AI-powered diagnostic imaging that catches what doctors miss',
      problem: 'Medical imaging misdiagnosis affects 12% of patients, leading to delayed treatment and increased healthcare costs',
      solution: 'Deep learning algorithms that analyze medical images with 99.2% accuracy, providing second opinions in real-time',
      targetMarket: 'Hospitals, diagnostic centers, and radiologists in developed markets',
      marketSize: '$8.2B globally, growing at 35% CAGR',
      competitiveAdvantage: 'Proprietary dataset of 10M+ annotated images, FDA breakthrough designation, 50ms processing time',
      revenueModel: 'SaaS subscription ($5K-50K/month) + per-scan pricing ($10-50/scan)',
      mvpFeatures: [
        'X-ray and CT scan analysis',
        'Real-time anomaly detection',
        'Integrated PACS/EMR system',
        'Radiologist collaboration tools',
        'Automated reporting'
      ],
      techStack: ['PyTorch', 'TensorFlow', 'DICOM', 'FastAPI', 'React', 'AWS HealthLake'],
      investmentNeeded: '$2.5M seed round',
      potentialROI: '15x in 5 years',
      riskFactors: [
        'Regulatory approval delays',
        'Integration complexity with legacy systems',
        'Radiologist adoption resistance'
      ]
    },
    'fintech_blockchain': {
      name: 'ChainPay Global',
      tagline: 'Instant cross-border payments at 1/10th the cost',
      problem: 'International wire transfers take 3-5 days and cost $45 on average, limiting global commerce',
      solution: 'Blockchain-based payment rails enabling instant settlement across 150+ countries with $0.50 flat fee',
      targetMarket: 'SMEs doing international business, freelancers, remittance senders',
      marketSize: '$150B remittance market, $27T B2B cross-border payments',
      competitiveAdvantage: 'Direct central bank partnerships, proprietary stablecoin, 3-second settlement',
      revenueModel: 'Transaction fees (0.5%) + FX spread (0.2%) + enterprise API subscriptions',
      mvpFeatures: [
        'Multi-currency wallets',
        'Instant P2P transfers',
        'Business invoicing',
        'Compliance automation',
        'Mobile apps'
      ],
      techStack: ['Solana', 'Rust', 'Node.js', 'React Native', 'PostgreSQL', 'KYC/AML APIs'],
      investmentNeeded: '$5M seed round',
      potentialROI: '25x in 5 years',
      riskFactors: [
        'Regulatory uncertainty',
        'Cryptocurrency volatility',
        'Competition from CBDCs'
      ]
    },
    'edtech_vr': {
      name: 'ImmersiveLearn',
      tagline: 'Learn by doing in photorealistic virtual environments',
      problem: 'Traditional education lacks hands-on experience, with 65% of students struggling to apply theoretical knowledge',
      solution: 'VR simulation platform for medical, engineering, and vocational training with haptic feedback',
      targetMarket: 'Universities, medical schools, corporate training departments',
      marketSize: '$2.8B VR education market, 43% CAGR',
      competitiveAdvantage: 'Photorealistic graphics, haptic gloves integration, curriculum from top universities',
      revenueModel: 'Per-seat licensing ($200-500/month) + content marketplace (30% commission)',
      mvpFeatures: [
        'Medical procedure simulations',
        'Engineering labs',
        'Multi-user collaboration',
        'Progress tracking',
        'Content authoring tools'
      ],
      techStack: ['Unity', 'Unreal Engine', 'WebRTC', 'Node.js', 'MongoDB', 'AWS'],
      investmentNeeded: '$3M seed round',
      potentialROI: '20x in 5 years',
      riskFactors: [
        'VR hardware adoption rate',
        'Content creation costs',
        'Motion sickness concerns'
      ]
    },
    'sustainability_iot': {
      name: 'CarbonWatch AI',
      tagline: 'Real-time carbon footprint tracking for net-zero enterprises',
      problem: 'Companies struggle to measure and reduce emissions across complex supply chains, risking $10T in stranded assets',
      solution: 'IoT sensors + AI analytics providing real-time emissions data and automated reduction recommendations',
      targetMarket: 'Fortune 500 companies, manufacturing plants, logistics companies',
      marketSize: '$12B carbon management software market',
      competitiveAdvantage: 'Proprietary IoT hardware, 10,000+ emission factors database, blockchain verification',
      revenueModel: 'Hardware + SaaS bundle ($10K-100K/year) + carbon credit marketplace fees',
      mvpFeatures: [
        'IoT sensor network',
        'Real-time dashboards',
        'Supply chain tracking',
        'Automated reporting',
        'Reduction recommendations'
      ],
      techStack: ['Python', 'TensorFlow', 'InfluxDB', 'Grafana', 'React', 'AWS IoT Core'],
      investmentNeeded: '$4M seed round',
      potentialROI: '18x in 5 years',
      riskFactors: [
        'Hardware manufacturing delays',
        'Carbon pricing volatility',
        'Greenwashing concerns'
      ]
    }
  }

  // Select venture based on industry/technology combination
  let selectedVenture = ventures.healthcare_ai
  
  if (prompt.industry.toLowerCase().includes('finance')) {
    selectedVenture = ventures.fintech_blockchain
  } else if (prompt.industry.toLowerCase().includes('education')) {
    selectedVenture = ventures.edtech_vr
  } else if (prompt.industry.toLowerCase().includes('sustainability')) {
    selectedVenture = ventures.sustainability_iot
  }

  // Generate timeline based on prompt
  const timeline = [
    {
      phase: 'Research & Validation',
      duration: '2 months',
      deliverables: ['Market research report', 'Customer interviews', 'Technical feasibility study']
    },
    {
      phase: 'MVP Development',
      duration: '3-4 months',
      deliverables: ['Core features', 'Basic UI/UX', 'Alpha testing with 10 users']
    },
    {
      phase: 'Beta Launch',
      duration: '2 months',
      deliverables: ['Beta product', '100 beta users', 'Feedback integration']
    },
    {
      phase: 'Market Launch',
      duration: '1 month',
      deliverables: ['Production release', 'Marketing campaign', 'Sales enablement']
    },
    {
      phase: 'Growth & Scale',
      duration: 'Ongoing',
      deliverables: ['Feature expansion', 'Market expansion', 'Team scaling']
    }
  ]

  // Calculate validation score
  const validationScore = Math.floor(Math.random() * 20) + 75 // 75-95 range

  return {
    id: Math.random().toString(36).substr(2, 9),
    ...selectedVenture,
    timeline,
    validationScore,
    createdAt: new Date().toISOString()
  } as VentureIdea
}

export function generateBusinessModelCanvas(idea: VentureIdea): BusinessModelCanvas {
  // Generate BMC based on venture idea
  return {
    keyPartners: [
      'Technology providers',
      'Industry associations',
      'Distribution partners',
      'Regulatory bodies'
    ],
    keyActivities: [
      'Product development',
      'Customer acquisition',
      'Partnership management',
      'Continuous innovation'
    ],
    keyResources: [
      'Technical team',
      'Proprietary technology',
      'Customer data',
      'Brand reputation'
    ],
    valuePropositions: [
      idea.tagline,
      '10x better than alternatives',
      'ROI within 6 months',
      '24/7 support'
    ],
    customerRelationships: [
      'Dedicated account management',
      'Self-service portal',
      'Community forums',
      'Regular check-ins'
    ],
    channels: [
      'Direct sales',
      'Partner channels',
      'Digital marketing',
      'Industry events'
    ],
    customerSegments: [
      idea.targetMarket,
      'Early adopters',
      'Enterprise clients',
      'SMB market'
    ],
    costStructure: [
      'Development costs',
      'Customer acquisition',
      'Infrastructure',
      'Operations & support'
    ],
    revenueStreams: [
      idea.revenueModel,
      'Professional services',
      'Training & certification',
      'Data insights'
    ]
  }
}

export function calculateValidationScore(criteria: ValidationCriteria): number {
  const weights = {
    marketDemand: 0.25,
    technicalFeasibility: 0.20,
    competitiveAdvantage: 0.20,
    scalability: 0.15,
    profitability: 0.15,
    teamCapability: 0.05
  }

  const score = 
    criteria.marketDemand * weights.marketDemand +
    criteria.technicalFeasibility * weights.technicalFeasibility +
    criteria.competitiveAdvantage * weights.competitiveAdvantage +
    criteria.scalability * weights.scalability +
    criteria.profitability * weights.profitability +
    criteria.teamCapability * weights.teamCapability

  return Math.round(score)
}

export function generateVentureReport(idea: VentureIdea, canvas: BusinessModelCanvas): string {
  return `
# ${idea.name} - Venture Report

## Executive Summary
${idea.tagline}

## Problem Statement
${idea.problem}

## Solution
${idea.solution}

## Market Opportunity
- Target Market: ${idea.targetMarket}
- Market Size: ${idea.marketSize}

## Competitive Advantage
${idea.competitiveAdvantage}

## Revenue Model
${idea.revenueModel}

## MVP Features
${idea.mvpFeatures.map(f => `- ${f}`).join('\n')}

## Technology Stack
${idea.techStack.join(', ')}

## Investment Requirements
${idea.investmentNeeded}

## Potential ROI
${idea.potentialROI}

## Risk Factors
${idea.riskFactors.map(r => `- ${r}`).join('\n')}

## Validation Score
${idea.validationScore}/100

## Business Model Canvas

### Value Propositions
${canvas.valuePropositions.map(v => `- ${v}`).join('\n')}

### Customer Segments
${canvas.customerSegments.map(c => `- ${c}`).join('\n')}

### Revenue Streams
${canvas.revenueStreams.map(r => `- ${r}`).join('\n')}

---
Generated on ${new Date().toLocaleDateString()}
  `.trim()
}