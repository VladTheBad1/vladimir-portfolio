'use client'

import { useEffect, useState, useRef, DragEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { epicCelebration } from '@/lib/video-celebration'
import TaskReviewModal from '@/components/TaskReviewModal'

// Motivational quotes for each project
const projectMotivationQuotes: Record<string, string[]> = {
  astrology: [
    "Every expert was once a beginner. You're just 2-3 hours away from unlocking your first sale.",
    "Your 90,000-person audience is waiting. One video edit stands between you and reaching them.",
    "Success is the sum of small efforts. This task brings you 4% closer to $30K/month.",
    "Your partner spent 17 years mastering astrology. You can spend 3 hours mastering this funnel.",
    "Fortune favors the bold. Complete this task and fortune favors you.",
    "The difference between $0 and $30K? Starting with this one task.",
    "Your future students need your guidance. Don't let a simple task delay their transformation.",
    "Millionaires do what others won't. This task is your millionaire move.",
    "In 4 months, you'll thank yourself for completing this today.",
    "Your competition is sleeping. You're building. That's why you'll win."
  ],
  "atema-bio": [
    "Revolutionary science starts with a single experiment. Your breakthrough awaits.",
    "Every great biotech company began with one focused action. This is yours.",
    "The future of skincare is in your hands. Each task brings it closer to reality.",
    "Your innovative formulations will transform lives. Start with this one step.",
    "Science rewards persistence. This task is your next discovery.",
    "From lab to market leader - it all begins with completing this task.",
    "Your competitors doubt biotech innovation. Prove them wrong, one task at a time.",
    "The $10M valuation starts here. Each completed task adds value.",
    "Your scientific expertise + focused execution = unstoppable success.",
    "Today's small progress is tomorrow's major breakthrough."
  ],
  default: [
    "Every journey begins with a single step. Take yours now.",
    "Success is built one task at a time. Keep building.",
    "Your future self will thank you for completing this today.",
    "Progress, not perfection. Every task matters.",
    "The best time to start was yesterday. The next best time is now.",
    "Small actions lead to big results. Keep moving forward.",
    "You're closer than you think. Don't stop now.",
    "Champions are made one task at a time.",
    "Your goal is waiting. Bridge the gap with action.",
    "Today's effort is tomorrow's achievement."
  ]
}

// Complete project data from goals-roadmap (ALL 52 TASKS)
const projectsData: Record<string, {
  name: string;
  goal: string;
  currentTaskIndex: number;
  tasks: Array<{
    id: number;
    title: string;
    phase: string;
    timeEstimate: string;
    completed: boolean;
    reasoning: string;
    details: string;
    blockedBy: string;
    unlocks: string;
  }>;
}> = {
  astrology: {
    name: "Astrology School",
    goal: "$30,000/month in course sales",
    currentTaskIndex: 0,
    tasks: [
      // Phase 1: Funnel Completion (Days 1-7)
      {
        id: 1,
        title: "Edit Thank You Page Video",
        phase: "Funnel Completion",
        timeEstimate: "2-3 hours",
        completed: false,
        reasoning: "This video is the first thing customers see after purchasing. A compelling thank you page increases course completion rates by 40% and reduces refunds. It sets the tone for their entire learning journey.",
        details: "Use existing footage from consultations. Add personal welcome message. Include course overview and next steps. Export in 1080p for quality.",
        blockedBy: "Nothing - you can start right now!",
        unlocks: "Testimonial editing and funnel completion"
      },
      {
        id: 2,
        title: "Complete Testimonial Video Compilation",
        phase: "Funnel Completion",
        timeEstimate: "3-4 hours",
        completed: false,
        reasoning: "Social proof is the #1 conversion factor for high-ticket courses. Your 100+ student success stories will overcome price objections and build trust instantly.",
        details: "Select 5-7 best testimonials from existing students. Edit for emotional impact. Add captions for accessibility. Create 30-second and 2-minute versions.",
        blockedBy: "Thank you page video completion",
        unlocks: "Complete funnel assets ready for upload"
      },
      {
        id: 3,
        title: "Write 5 Ad Copy Variations",
        phase: "Funnel Completion",
        timeEstimate: "1-2 hours",
        completed: false,
        reasoning: "Different copy angles will help you find the message that resonates with your audience. Testing multiple variations can 3x your conversion rate.",
        details: "Write pain-point focused copy, transformation story, credibility angle, urgency-based, and aspirational versions. Each should be 100-150 words.",
        blockedBy: "None - can be done in parallel",
        unlocks: "Ready to launch ads"
      },
      {
        id: 4,
        title: "Send VSL to Jan for Upload",
        phase: "Funnel Completion",
        timeEstimate: "30 minutes",
        completed: false,
        reasoning: "Your VSL is the core sales mechanism. Getting it live means you can start generating revenue within 24 hours.",
        details: "Package VSL with thumbnail. Send hosting instructions. Include tracking code requirements. Confirm upload completion.",
        blockedBy: "Video assets completion",
        unlocks: "Live funnel ready for traffic"
      },
      {
        id: 5,
        title: "Send Email Sequences to Jan",
        phase: "Funnel Completion",
        timeEstimate: "1 hour",
        completed: false,
        reasoning: "60% of course sales come from email follow-up. Automated sequences work 24/7 to convert leads while you sleep.",
        details: "Review and polish 7-email sequence. Format for backend system. Set timing triggers. Include subject line variants.",
        blockedBy: "None - can be done anytime",
        unlocks: "Full automation system active"
      },
      {
        id: 6,
        title: "Create Ad Creatives",
        phase: "Funnel Completion",
        timeEstimate: "2-3 hours",
        completed: false,
        reasoning: "Visual ads stop the scroll. Good creatives can reduce your cost-per-click by 50% and double your CTR.",
        details: "Design 10 image variants. Create 3 video ads from testimonials. Size for FB/IG formats. Include strong CTAs.",
        blockedBy: "Copy completion",
        unlocks: "Ready for campaign launch"
      },
      {
        id: 7,
        title: "Test Complete Funnel End-to-End",
        phase: "Funnel Completion",
        timeEstimate: "1 hour",
        completed: false,
        reasoning: "One broken link can cost you thousands in lost sales. Testing ensures every dollar spent on ads converts properly.",
        details: "Test all links. Verify payment processing. Check email triggers. Confirm analytics tracking. Mobile responsiveness check.",
        blockedBy: "All assets uploaded",
        unlocks: "Green light for paid traffic"
      },
      // Phase 2: Campaign Launch (Week 2)
      {
        id: 8,
        title: "Launch Facebook/Instagram Test Campaign",
        phase: "Campaign Launch",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "Your 90,000 platform users are waiting. Starting with $100/day lets you find winning audiences before scaling.",
        details: "Set up 3 audiences. Upload creative variants. Set $100/day budget. Configure conversion tracking. Monitor hourly.",
        blockedBy: "Funnel testing complete",
        unlocks: "First leads and sales data"
      },
      {
        id: 9,
        title: "Analyze First 48-Hour Campaign Data",
        phase: "Campaign Launch",
        timeEstimate: "1 hour",
        completed: false,
        reasoning: "Early data reveals which messages resonate. Quick optimization can 10x your ROI before scaling.",
        details: "Review CTR, CPM, CPC metrics. Identify top performing ads. Calculate cost per lead. Check conversion paths.",
        blockedBy: "48 hours of campaign data",
        unlocks: "Optimization insights"
      },
      {
        id: 10,
        title: "Optimize and Scale Winning Ads",
        phase: "Campaign Launch",
        timeEstimate: "1 hour",
        completed: false,
        reasoning: "Doubling down on winners while cutting losers is how you achieve 3:1 ROI. This is where profit happens.",
        details: "Pause ads below 1% CTR. Increase budget on top performers. Test new audiences. Refine targeting.",
        blockedBy: "Performance data analysis",
        unlocks: "Profitable campaign structure"
      },
      {
        id: 11,
        title: "Get First Course Sale",
        phase: "Campaign Launch",
        timeEstimate: "Milestone",
        completed: false,
        reasoning: "First sale validates everything. It proves your $30K goal is not just possible, but inevitable with scale.",
        details: "Celebrate this milestone! Document what worked. Get testimonial. Use as case study for scaling.",
        blockedBy: "Optimized campaigns running",
        unlocks: "Proven business model"
      },
      {
        id: 12,
        title: "Set Up Retargeting Campaigns",
        phase: "Campaign Launch",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "96% of visitors don't buy on first visit. Retargeting brings them back when ready, doubling your conversion rate.",
        details: "Create audiences for video viewers, page visitors, cart abandoners. Design specific messages for each. Set frequency caps.",
        blockedBy: "Initial traffic data",
        unlocks: "Higher conversion rates"
      },
      // Phase 3: Scale to $10K (Weeks 3-6)
      {
        id: 13,
        title: "Scale Ad Spend to $200/day",
        phase: "Scale to $10K",
        timeEstimate: "1 hour",
        completed: false,
        reasoning: "Gradual scaling preserves ROI. At $200/day with 3:1 ROI, you're generating $600/day in revenue.",
        details: "Increase budgets gradually. Maintain CPA targets. Test new creative formats. Expand audiences.",
        blockedBy: "Profitable campaign structure",
        unlocks: "3-4 sales per month"
      },
      {
        id: 14,
        title: "Launch Google Ads Campaign",
        phase: "Scale to $10K",
        timeEstimate: "3 hours",
        completed: false,
        reasoning: "People searching for 'astrology courses' have buying intent. Google captures demand Facebook creates.",
        details: "Research keywords. Write search ads. Create landing pages. Set up conversion tracking.",
        blockedBy: "Facebook profitability proven",
        unlocks: "Additional traffic channel"
      },
      {
        id: 15,
        title: "Create Webinar Funnel",
        phase: "Scale to $10K",
        timeEstimate: "8 hours",
        completed: false,
        reasoning: "Webinars convert at 10-20% for high-ticket offers. One good webinar can generate $30K in a single session.",
        details: "Script 90-minute training. Set up registration funnel. Create slide deck. Plan live or evergreen format.",
        blockedBy: "Initial sales success",
        unlocks: "High-conversion sales mechanism"
      },
      {
        id: 16,
        title: "Leverage 90K Platform Audience",
        phase: "Scale to $10K",
        timeEstimate: "4 hours",
        completed: false,
        reasoning: "This warm audience already trusts your partner. Even 1% conversion means 900 potential students.",
        details: "Create exclusive offer for platform users. Email announcement. In-platform promotion. Track conversions.",
        blockedBy: "Proven funnel performance",
        unlocks: "Warm traffic surge"
      },
      {
        id: 17,
        title: "Achieve First $10K Month",
        phase: "Scale to $10K",
        timeEstimate: "Milestone",
        completed: false,
        reasoning: "$10K proves the model works. From here, it's just multiplication to reach $30K.",
        details: "Document what's working. Calculate unit economics. Plan scaling strategy. Celebrate progress!",
        blockedBy: "3-4 consistent sales",
        unlocks: "Proven scalable model"
      },
      // Phase 4: Scale to $30K (Months 2-4)
      {
        id: 18,
        title: "Scale Ad Spend to $500/day",
        phase: "Scale to $30K",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "At scale, small optimizations create huge returns. $500/day at 3:1 ROI generates $1500/day revenue.",
        details: "Expand to new audiences. Test video ads. Launch in new geos. Maintain quality scores.",
        blockedBy: "$10K month achieved",
        unlocks: "Path to 10 sales monthly"
      },
      {
        id: 19,
        title: "Launch YouTube Ads",
        phase: "Scale to $30K",
        timeEstimate: "4 hours",
        completed: false,
        reasoning: "YouTube viewers watch longer content. Your 17-year expertise story will resonate deeply here.",
        details: "Create video ad from VSL. Target astrology channels. Set up TrueView campaigns. Test different lengths.",
        blockedBy: "Multi-channel success",
        unlocks: "Third traffic pillar"
      },
      {
        id: 20,
        title: "Implement Affiliate Program",
        phase: "Scale to $30K",
        timeEstimate: "6 hours",
        completed: false,
        reasoning: "Your 100+ students become salespeople. At 30% commission, they're motivated to promote.",
        details: "Set up tracking system. Create promotional materials. Recruit top students. Provide training.",
        blockedBy: "Strong student results",
        unlocks: "Passive sales channel"
      },
      {
        id: 21,
        title: "Create Premium Upsell",
        phase: "Scale to $30K",
        timeEstimate: "8 hours",
        completed: false,
        reasoning: "20% of students want more. A $5K mastermind or 1-on-1 program boosts revenue per customer by 50%.",
        details: "Design premium offer. Create sales page. Set criteria. Price at $5-10K.",
        blockedBy: "Core course success",
        unlocks: "Higher customer value"
      },
      {
        id: 22,
        title: "Optimize for $30K Consistently",
        phase: "Scale to $30K",
        timeEstimate: "Ongoing",
        completed: false,
        reasoning: "Consistency comes from systems. With the right processes, $30K becomes your new baseline.",
        details: "Document SOPs. Hire VA support. Automate operations. Focus on retention.",
        blockedBy: "All channels profitable",
        unlocks: "Sustainable $30K/month"
      },
      {
        id: 23,
        title: "Achieve First $30K Month",
        phase: "Scale to $30K",
        timeEstimate: "Milestone",
        completed: false,
        reasoning: "You did it! From $0 to $30K in 4 months. This is just the beginning of your empire.",
        details: "Celebrate massively! Document journey. Plan next goal. Consider $100K target.",
        blockedBy: "10 sales in a month",
        unlocks: "Financial freedom"
      },
      {
        id: 24,
        title: "Plan Scale to $100K",
        phase: "Scale to $30K",
        timeEstimate: "4 hours",
        completed: false,
        reasoning: "Success loves speed. With momentum on your side, $100K is the natural next step.",
        details: "Analyze growth levers. Plan team expansion. Design new products. Set 12-month roadmap.",
        blockedBy: "$30K month achieved",
        unlocks: "Next level vision"
      }
    ]
  },
  "atema-bio": {
    name: "AtemaBio Wellness",
    goal: "$30,000/month",
    currentTaskIndex: 0,
    tasks: [
      // ALL 28 TASKS FROM ATEMA BIO
      {
        id: 1,
        title: "Personal Authority Audit",
        phase: "VSL Script Mastery",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "Your VSL needs credible positioning. Document ALL legitimate wellness credentials, client wins, and unique expertise to build unshakeable authority.",
        details: "List certifications, years of experience, client transformations with numbers, unique methodologies. Be specific and honest - authenticity converts.",
        blockedBy: "Nothing - start immediately!",
        unlocks: "Foundation for compelling VSL script"
      },
      {
        id: 2,
        title: "Competitor VSL Analysis",
        phase: "VSL Script Mastery",
        timeEstimate: "3 hours",
        completed: false,
        reasoning: "Success leaves clues. Top wellness VSLs reveal proven patterns for hooks, authority, and conversions you can ethically adapt.",
        details: "Analyze 10 top wellness/biohacking VSLs. Document hook patterns, authority markers, pain points, offer structures. Note what makes them compelling.",
        blockedBy: "Authority audit started",
        unlocks: "Market-tested VSL patterns"
      },
      {
        id: 3,
        title: "Hook Rewrite Sprint - 10 Variations",
        phase: "VSL Script Mastery",
        timeEstimate: "4 hours",
        completed: false,
        reasoning: "You have 15 seconds to stop the scroll. The right hook determines if they watch or leave - it's your most critical copy.",
        details: "Write 10 hooks: curiosity gap, shocking stat, relatable problem, bold promise, contrarian view, transformation story, question hook, news hook, fear-based, aspiration.",
        blockedBy: "Competitor analysis complete",
        unlocks: "High-converting VSL opening"
      },
      {
        id: 4,
        title: "Personal Story Polish",
        phase: "VSL Script Mastery",
        timeEstimate: "3 hours",
        completed: false,
        reasoning: "People buy from those they trust. Your origin story creates emotional connection and positions you as the guide they need.",
        details: "Craft compelling before/after narrative. Include specific struggle moments, breakthrough discovery, transformation results. Make it relatable yet aspirational.",
        blockedBy: "Authority audit complete",
        unlocks: "Emotional connection with audience"
      },
      {
        id: 5,
        title: "Problem Agitation Enhancement",
        phase: "VSL Script Mastery",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "Pain drives action. Intensifying their current frustrations creates urgency to find your solution.",
        details: "List 10 wellness pain points your audience faces. Describe consequences of inaction. Use emotional language. Make problem feel urgent and unsolvable alone.",
        blockedBy: "Hook variations complete",
        unlocks: "Urgency to take action"
      },
      {
        id: 6,
        title: "Authority Section Rewrite",
        phase: "VSL Script Mastery",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "Authority eliminates price objections. When positioned correctly, you become the obvious choice regardless of cost.",
        details: "Integrate credentials naturally. Share specific client results. Display expertise without arrogance. Use proof elements: certifications, years experience, unique methodology.",
        blockedBy: "Personal story complete",
        unlocks: "Premium pricing justification"
      },
      {
        id: 7,
        title: "Solution Framework Documentation",
        phase: "VSL Script Mastery",
        timeEstimate: "3 hours",
        completed: false,
        reasoning: "Confused minds don't buy. A clear, unique methodology makes your solution the logical choice.",
        details: "Create 3-5 step system with memorable name. Explain why it works. Differentiate from alternatives. Make it feel simple yet comprehensive.",
        blockedBy: "Problem agitation complete",
        unlocks: "Clear path to transformation"
      },
      {
        id: 8,
        title: "Social Proof Collection",
        phase: "VSL Script Mastery",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "Others' success proves yours is possible. Testimonials overcome skepticism better than any promise.",
        details: "Gather 5-10 client testimonials. Focus on transformation stories, specific results, emotional outcomes. Get permission to use names/photos if possible.",
        blockedBy: "Authority section complete",
        unlocks: "Trust and credibility"
      },
      {
        id: 9,
        title: "Objection Handling Integration",
        phase: "VSL Script Mastery",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "Every unaddressed objection is a lost sale. Anticipate and overcome doubts before they arise.",
        details: "List 10 common objections (price, time, skepticism, past failures). Address each naturally in script. Use FAQ format or story-based responses.",
        blockedBy: "Solution framework complete",
        unlocks: "Removed buying resistance"
      },
      {
        id: 10,
        title: "Call-to-Action Optimization",
        phase: "VSL Script Mastery",
        timeEstimate: "1 hour",
        completed: false,
        reasoning: "Clear CTAs convert browsers to buyers. Multiple strategic CTAs catch people at different readiness levels.",
        details: "Write 5 CTA variations. Place at emotional peaks. Add urgency/scarcity. Make next step crystal clear. Test different action verbs.",
        blockedBy: "Objections handled",
        unlocks: "Higher conversion rate"
      },
      {
        id: 11,
        title: "Complete Script Integration",
        phase: "VSL Script Mastery",
        timeEstimate: "4 hours",
        completed: false,
        reasoning: "Individual sections mean nothing without flow. Seamless integration creates the emotional journey that drives sales.",
        details: "Combine all elements. Ensure smooth transitions. Check pacing and emotional arc. Read aloud for natural flow. Aim for 20-30 minutes total.",
        blockedBy: "All script sections complete",
        unlocks: "Production-ready VSL script"
      },
      {
        id: 12,
        title: "VSL Recording Setup",
        phase: "Funnel Development",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "Professional presentation builds trust. Quality production values signal premium service worth premium prices.",
        details: "Set up recording space, test lighting/audio, prepare teleprompter or notes. Consider slides or b-roll footage needs.",
        blockedBy: "Script integration complete",
        unlocks: "VSL production phase"
      },
      {
        id: 13,
        title: "VSL Recording Session",
        phase: "Funnel Development",
        timeEstimate: "4 hours",
        completed: false,
        reasoning: "One great take beats 10 mediocre ones. Energy and authenticity in delivery determine viewer engagement.",
        details: "Record in segments for easier editing. Multiple takes for each section. Focus on energy, clarity, pacing. Natural delivery over perfection.",
        blockedBy: "Recording setup complete",
        unlocks: "Raw VSL footage"
      },
      {
        id: 14,
        title: "VSL Post-Production",
        phase: "Funnel Development",
        timeEstimate: "6 hours",
        completed: false,
        reasoning: "Editing transforms raw footage into persuasive content. Pacing, music, and graphics enhance conversion.",
        details: "Edit for pace, add captions, include b-roll, add music, create graphics for key points. Keep energy high throughout.",
        blockedBy: "Recording complete",
        unlocks: "Finished VSL asset"
      },
      {
        id: 15,
        title: "Landing Page Creation",
        phase: "Funnel Development",
        timeEstimate: "4 hours",
        completed: false,
        reasoning: "Your landing page is the gateway. Poor design kills conversions before VSL even plays.",
        details: "Create headline, subheadline, VSL embed, bullet benefits, CTA buttons, urgency elements. Mobile-optimize everything.",
        blockedBy: "VSL complete",
        unlocks: "Complete funnel front-end"
      },
      {
        id: 16,
        title: "Email Sequence Creation",
        phase: "Funnel Development",
        timeEstimate: "4 hours",
        completed: false,
        reasoning: "60% of sales come from follow-up. Automated sequences convert fence-sitters while you sleep.",
        details: "Write 7-email sequence: value, story, objection handling, testimonials, FAQ, urgency, final call. Set timing triggers.",
        blockedBy: "Landing page complete",
        unlocks: "Automated follow-up system"
      },
      {
        id: 17,
        title: "Payment Integration",
        phase: "Funnel Development",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "Broken checkout = lost sales. Smooth payment process maintains buying momentum.",
        details: "Set up Stripe/PayPal, create checkout page, test payment flow, set up order confirmations, configure receipt emails.",
        blockedBy: "Landing page complete",
        unlocks: "Revenue collection ability"
      },
      {
        id: 18,
        title: "Funnel Testing End-to-End",
        phase: "Funnel Development",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "One broken link costs thousands. Testing prevents losing money to technical issues.",
        details: "Test all links, payment processing, email triggers, mobile experience, page load speeds. Fix any issues found.",
        blockedBy: "All funnel elements complete",
        unlocks: "Launch-ready funnel"
      },
      {
        id: 19,
        title: "First Campaign Launch - $50/day",
        phase: "Launch & Optimization",
        timeEstimate: "3 hours",
        completed: false,
        reasoning: "Small tests reveal big insights. Starting small protects budget while finding winning combinations.",
        details: "Create 3 audiences, 3 ad creatives, set $50 daily budget. Monitor hourly for first 48 hours. Track all metrics.",
        blockedBy: "Funnel tested",
        unlocks: "Real market feedback"
      },
      {
        id: 20,
        title: "First 48-Hour Data Analysis",
        phase: "Launch & Optimization",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "Early data guides everything. Quick optimization prevents wasting money on losing campaigns.",
        details: "Analyze CTR, CPC, CPL, video retention, conversion points. Identify winners and losers. Document insights.",
        blockedBy: "48 hours of campaign data",
        unlocks: "Optimization insights"
      },
      {
        id: 21,
        title: "Campaign Optimization Round 1",
        phase: "Launch & Optimization",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "Winners deserve more budget. Cutting losers and scaling winners is the path to profit.",
        details: "Pause ads below 1% CTR, increase budget on winners, test new audiences based on data, refine targeting.",
        blockedBy: "Data analysis complete",
        unlocks: "Improved campaign performance"
      },
      {
        id: 22,
        title: "First Sale Celebration! 🎉",
        phase: "Launch & Optimization",
        timeEstimate: "Milestone",
        completed: false,
        reasoning: "First sale validates everything. It proves your $30K goal is not just possible but inevitable.",
        details: "Document what worked, get testimonial, use as case study. Celebrate this massive milestone!",
        blockedBy: "Optimized campaigns running",
        unlocks: "Proof of concept"
      },
      {
        id: 23,
        title: "Scale to $100/day Ad Spend",
        phase: "Scale to $30K",
        timeEstimate: "1 hour",
        completed: false,
        reasoning: "Gradual scaling preserves ROI. Doubling spend while maintaining profit sets foundation for growth.",
        details: "Increase daily budget gradually, maintain ROI above 3:1, expand winning audiences, test new creatives.",
        blockedBy: "First sale achieved",
        unlocks: "Increased lead flow"
      },
      {
        id: 24,
        title: "Implement Retargeting Campaigns",
        phase: "Scale to $30K",
        timeEstimate: "3 hours",
        completed: false,
        reasoning: "96% don't buy first visit. Retargeting brings them back when ready, doubling conversion rates.",
        details: "Create audiences: video viewers 25%, 50%, 75%, page visitors, add to carts. Different message for each.",
        blockedBy: "Consistent sales flowing",
        unlocks: "Higher conversion rate"
      },
      {
        id: 25,
        title: "Launch Second Traffic Channel",
        phase: "Scale to $30K",
        timeEstimate: "4 hours",
        completed: false,
        reasoning: "Multiple channels reduce risk. Different platforms reach different buyers at different times.",
        details: "Add Google Ads or YouTube based on audience research. Start with $50/day test budget.",
        blockedBy: "Facebook profitable",
        unlocks: "Diversified traffic"
      },
      {
        id: 26,
        title: "Create Premium Upsell Offer",
        phase: "Scale to $30K",
        timeEstimate: "6 hours",
        completed: false,
        reasoning: "20% want more. Premium tier increases average order value by 50-100%.",
        details: "Design $5K-10K premium package: 1-on-1 coaching, done-for-you service, or mastermind access.",
        blockedBy: "Core offer selling consistently",
        unlocks: "Higher customer value"
      },
      {
        id: 27,
        title: "Scale to $500/day Ad Spend",
        phase: "Scale to $30K",
        timeEstimate: "2 hours",
        completed: false,
        reasoning: "Big scale brings big results. $500/day at 4:1 ROI generates $2000/day revenue = $60K/month.",
        details: "Systematic scaling, new creative testing, audience expansion, maintain quality scores.",
        blockedBy: "$100/day profitable",
        unlocks: "Path to $30K/month"
      },
      {
        id: 28,
        title: "Achieve $30,000/Month! 🏆",
        phase: "Scale to $30K",
        timeEstimate: "Milestone",
        completed: false,
        reasoning: "You did it! From VSL script to $30K/month. This is just the beginning of your empire.",
        details: "Document entire journey, celebrate massively, plan next goal ($100K?), systemize for consistency.",
        blockedBy: "All scaling complete",
        unlocks: "Financial freedom achieved"
      }
    ]
  }
}

interface Task {
  id: number;
  title: string;
  phase: string;
  timeEstimate: string;
  completed: boolean;
  reasoning: string;
  details: string;
  blockedBy: string;
  unlocks: string;
}

interface Project {
  name: string;
  goal: string;
  currentTaskIndex: number;
  tasks: Task[];
}

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [projects, setProjects] = useState<Record<string, Project>>(projectsData)
  const [currentProject, setCurrentProject] = useState('astrology')
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set())
  const [draggedTask, setDraggedTask] = useState<number | null>(null)
  const [randomQuote, setRandomQuote] = useState('')
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  
  // Auto-save to localStorage every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (projects) {
        localStorage.setItem('goalsProjects', JSON.stringify(projects))
        localStorage.setItem('currentProject', currentProject)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [projects, currentProject])

  // Load from localStorage on mount
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')
    if (auth !== 'true') {
      router.push('/login')
      return
    }
    setIsAuthenticated(true)

    // Load saved projects
    const savedProjects = localStorage.getItem('goalsProjects')
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects))
      } catch (e) {
        console.error('Failed to load saved projects:', e)
      }
    }

    // Load current project
    const savedCurrentProject = localStorage.getItem('currentProject')
    if (savedCurrentProject && projects[savedCurrentProject]) {
      setCurrentProject(savedCurrentProject)
    }

    // Set initial random quote
    updateRandomQuote(currentProject)
  }, [router])

  // Update random quote when project changes
  useEffect(() => {
    updateRandomQuote(currentProject)
  }, [currentProject])

  const updateRandomQuote = (projectKey: string) => {
    const quotes = projectMotivationQuotes[projectKey] || projectMotivationQuotes.default
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setRandomQuote(quotes[randomIndex])
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    router.push('/login')
  }

  const toggleTaskCompletion = (taskId: number) => {
    const updatedProjects = { ...projects }
    const project = updatedProjects[currentProject]
    const task = project.tasks.find(t => t.id === taskId)
    
    if (!task) return
    
    const wasCompleted = task.completed
    task.completed = !task.completed
    
    // Save to state
    setProjects(updatedProjects)
    
    // Save to localStorage immediately
    localStorage.setItem('goalsProjects', JSON.stringify(updatedProjects))
    
    // Trigger celebration if task was just completed
    if (!wasCompleted && task.completed) {
      // Check if it's a milestone task
      const isMilestone = task.timeEstimate === 'Milestone'
      
      // Trigger video celebration with dual audio
      if (isMilestone) {
        epicCelebration('🏆 MILESTONE ACHIEVED! 🏆')
      } else {
        const messages = [
          'AMAZING! 🎉',
          'YOU DID IT! 🚀',
          'AWESOME! ⭐',
          'BRILLIANT! 💫',
          'FANTASTIC! 🎆'
        ]
        const message = messages[Math.floor(Math.random() * messages.length)]
        epicCelebration(message)
      }
      
      // Update quote after completion
      setTimeout(() => {
        updateRandomQuote(currentProject)
      }, 1000)
    }
  }

  const toggleTaskExpanded = (taskId: number) => {
    const newExpanded = new Set(expandedTasks)
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId)
    } else {
      newExpanded.add(taskId)
    }
    setExpandedTasks(newExpanded)
  }

  // Drag and drop handlers
  const handleDragStart = (e: DragEvent<HTMLDivElement>, taskId: number) => {
    setDraggedTask(taskId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetTaskId: number) => {
    e.preventDefault()
    
    if (draggedTask === null || draggedTask === targetTaskId) {
      setDraggedTask(null)
      return
    }
    
    const updatedProjects = { ...projects }
    const project = updatedProjects[currentProject]
    const tasks = [...project.tasks]
    
    const draggedIndex = tasks.findIndex(t => t.id === draggedTask)
    const targetIndex = tasks.findIndex(t => t.id === targetTaskId)
    
    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedTask(null)
      return
    }
    
    // Remove dragged task
    const [draggedTaskObj] = tasks.splice(draggedIndex, 1)
    
    // Insert at new position
    tasks.splice(targetIndex, 0, draggedTaskObj)
    
    // Update task IDs to maintain order
    tasks.forEach((task, index) => {
      task.id = index + 1
    })
    
    project.tasks = tasks
    setProjects(updatedProjects)
    localStorage.setItem('goalsProjects', JSON.stringify(updatedProjects))
    setDraggedTask(null)
  }

  const handleDragEnd = () => {
    setDraggedTask(null)
  }

  const handleSaveReview = (updatedProject: Project) => {
    const updatedProjects = { ...projects, [currentProject]: updatedProject }
    setProjects(updatedProjects)
    localStorage.setItem('goalsProjects', JSON.stringify(updatedProjects))
  }

  const currentProjectData = projects[currentProject]
  const completedTasks = currentProjectData?.tasks.filter(t => t.completed).length || 0
  const totalTasks = currentProjectData?.tasks.length || 0
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  
  // Find current incomplete task
  const currentTask = currentProjectData?.tasks.find(t => !t.completed)

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Back to Portfolio
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Goals & Roadmap
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Review & Edit Tasks
              </button>
              <select
                value={currentProject}
                onChange={(e) => setCurrentProject(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="astrology">Astrology School</option>
                <option value="atema-bio">AtemaBio Wellness</option>
              </select>
            </div>
          </div>
          
          {currentProjectData && (
            <>
              <p className="text-gray-400 mb-2">Goal: {currentProjectData.goal}</p>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>{completedTasks} of {totalTasks} tasks completed</span>
                  <span>{progressPercentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div 
                    className="progress-bar h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              
              {/* Motivational Quote */}
              {currentTask && (
                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-300 mb-2">Current Focus:</p>
                  <p className="text-lg font-semibold text-white mb-2">{currentTask.title}</p>
                  <p className="text-sm italic text-purple-300">"{randomQuote}"</p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="space-y-4">
          {currentProjectData?.tasks.map((task) => (
            <div
              key={task.id}
              className={`task-card bg-gray-900 rounded-lg border transition-all cursor-pointer ${
                task.completed ? 'border-green-500/30 opacity-60' : 'border-gray-700 hover:border-gray-600'
              } ${draggedTask === task.id ? 'task-dragging' : ''} ${
                expandedTasks.has(task.id) ? 'bg-gray-900/50' : ''
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, task.id)}
              onDragEnd={handleDragEnd}
              onClick={() => toggleTaskExpanded(task.id)}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Drag Handle */}
                  <div className="drag-handle mt-1 text-gray-500" onClick={(e) => e.stopPropagation()}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 2a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0zM7 18a2 2 0 11-4 0 2 2 0 014 0zM17 2a2 2 0 11-4 0 2 2 0 014 0zM17 10a2 2 0 11-4 0 2 2 0 014 0zM17 18a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => {
                      e.stopPropagation()
                      toggleTaskCompletion(task.id)
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1 w-5 h-5 rounded border-gray-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 bg-gray-800"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          task.completed ? 'line-through text-gray-500' : 'text-white'
                        }`}>
                          {task.title}
                        </h3>
                        <div className="flex gap-4 mt-1 text-sm text-gray-400">
                          <span>{task.phase}</span>
                          <span>{task.timeEstimate}</span>
                        </div>
                      </div>
                      
                      <div className="ml-4 text-gray-400 transition-transform duration-200" style={{
                        transform: expandedTasks.has(task.id) ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {expandedTasks.has(task.id) && (
                <div className="px-4 pb-4 border-t border-gray-800 mt-3 pt-4">
                  <div className="pl-12 space-y-3 text-sm">
                    <div>
                      <p className="text-purple-400 mb-1 font-medium">Why this matters:</p>
                      <p className="text-gray-300 leading-relaxed">{task.reasoning}</p>
                    </div>
                    <div>
                      <p className="text-purple-400 mb-1 font-medium">Details:</p>
                      <p className="text-gray-300 leading-relaxed">{task.details}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500">
          <p>Keep pushing forward. Your success is inevitable.</p>
        </div>
      </div>
      
      {/* Task Review Modal */}
      {currentProjectData && (
        <TaskReviewModal
          project={currentProjectData}
          projectKey={currentProject}
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onSave={handleSaveReview}
        />
      )}
    </div>
  )
}