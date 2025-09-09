# 🔧 How Genesis ACTUALLY Creates a Business
## The Technical Reality - Step by Step

---

## 🎯 THE CORE CONCEPT: One Platform, Many Businesses

**What we're NOT doing:**
- ❌ Creating separate websites for each business
- ❌ Setting up individual hosting accounts
- ❌ Deploying unique codebases
- ❌ Managing separate databases

**What we're ACTUALLY doing:**
- ✅ ONE Next.js app that serves ALL businesses
- ✅ Dynamic routing based on subdomain
- ✅ Database filtering by business_id
- ✅ Template switching based on user selection

---

## 🏗️ THE TECHNICAL ARCHITECTURE

### The Single Codebase Structure
```
genesis-platform/
├── app/
│   ├── (marketing)/          # genesis-franchise.com
│   │   ├── page.tsx          # Landing page
│   │   └── apply/page.tsx    # Application form
│   │
│   ├── (dashboard)/          # dashboard.genesis.com
│   │   ├── layout.tsx        # Dashboard layout
│   │   ├── overview/page.tsx # Franchisee dashboard
│   │   └── admin/page.tsx    # Admin dashboard
│   │
│   └── (business)/           # *.genesis-businesses.com
│       ├── layout.tsx        # Dynamic business layout
│       ├── page.tsx          # Dynamic home page
│       ├── api/              # Shared API routes
│       └── [template]/       # Template-specific pages
│           ├── resume/       # Resume builder template
│           ├── social/       # Social media template
│           └── email/        # Email assistant template
```

### How Subdomains Work
```javascript
// middleware.ts - This runs on EVERY request
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Get the hostname (e.g., resume-pro.genesis-businesses.com)
  const hostname = request.headers.get('host')
  
  // Check if it's a business subdomain
  if (hostname?.includes('genesis-businesses.com')) {
    // Extract subdomain (e.g., 'resume-pro')
    const subdomain = hostname.split('.')[0]
    
    // Rewrite to business template with subdomain as parameter
    return NextResponse.rewrite(
      new URL(`/business?subdomain=${subdomain}`, request.url)
    )
  }
  
  // Check if it's dashboard
  if (hostname?.includes('dashboard.genesis.com')) {
    return NextResponse.rewrite(
      new URL('/dashboard', request.url)
    )
  }
  
  // Default to marketing site
  return NextResponse.next()
}
```

---

## 📝 STEP-BY-STEP: Creating a Business

### Step 1: User Fills Application
```javascript
// What the user sees: Simple form
// What actually happens:

async function handleApplication(formData) {
  // Create user account in Supabase Auth
  const { user } = await supabase.auth.signUp({
    email: formData.email,
    password: crypto.randomUUID() // Temp password
  })
  
  // Insert into franchisees table
  await supabase.from('franchisees').insert({
    id: user.id,
    email: formData.email,
    name: formData.name,
    selected_template: 'resume-builder', // Their choice
    status: 'pending_payment'
  })
  
  // Send approval email
  await resend.emails.send({
    to: formData.email,
    subject: 'Welcome to Genesis!',
    html: `Click here to complete setup: ${SETUP_URL}?token=${user.id}`
  })
}
```

### Step 2: User Pays $99
```javascript
// Stripe Checkout Session
async function createCheckout(userId) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Genesis Franchise Setup',
          description: 'Launch your AI business'
        },
        unit_amount: 9900 // $99 in cents
      },
      quantity: 1
    }],
    mode: 'payment',
    success_url: `${BASE_URL}/setup/complete?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      user_id: userId
    }
  })
  
  return session.url // Redirect user here
}
```

### Step 3: Choose Business Details
```javascript
// After payment confirmed
async function setupBusiness(userId, details) {
  // User provides:
  const businessData = {
    name: "Resume Pro",           // Their business name
    subdomain: "resume-pro",      // Generated from name
    template: "resume-builder",   // Selected template
    color: "#667eea",             // Brand color
    tagline: "AI-Powered Resumes" // Their tagline
  }
  
  // Check subdomain availability
  const existing = await supabase
    .from('businesses')
    .select('id')
    .eq('subdomain', businessData.subdomain)
    .single()
  
  if (existing) {
    // Suggest alternatives
    return {
      error: 'Subdomain taken',
      suggestions: [
        `${businessData.subdomain}-ai`,
        `${businessData.subdomain}-pro`,
        `${businessData.subdomain}-2024`
      ]
    }
  }
  
  // Create business record
  const business = await supabase.from('businesses').insert({
    franchisee_id: userId,
    ...businessData,
    created_at: new Date()
  })
  
  return business
}
```

### Step 4: The "Magic" - Business Goes Live
```javascript
// HERE'S THE KEY PART - No actual deployment needed!
// The business is immediately accessible via subdomain

async function activateBusiness(businessId) {
  // 1. Update business status
  await supabase
    .from('businesses')
    .update({ status: 'active' })
    .eq('id', businessId)
  
  // 2. Configure DNS (Cloudflare API)
  await cloudflare.dns.records.create({
    zone_id: GENESIS_ZONE_ID,
    type: 'CNAME',
    name: '*.genesis-businesses.com',
    content: 'cname.vercel-dns.com', // Points to our Vercel app
    proxied: true
  })
  
  // 3. Generate initial content with AI
  await generateInitialContent(businessId)
  
  // 4. Create Stripe Connect account for revenue
  const account = await stripe.accounts.create({
    type: 'express',
    country: 'US',
    email: franchisee.email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true }
    },
    metadata: {
      business_id: businessId
    }
  })
  
  // 5. Business is now live!
  // resume-pro.genesis-businesses.com works immediately
}
```

### Step 5: How the Business Actually Works
```javascript
// When someone visits resume-pro.genesis-businesses.com

// app/(business)/page.tsx
export default async function BusinessPage() {
  // 1. Get subdomain from request
  const subdomain = getSubdomain() // 'resume-pro'
  
  // 2. Fetch business data
  const business = await supabase
    .from('businesses')
    .select('*')
    .eq('subdomain', subdomain)
    .single()
  
  if (!business) {
    return <NotFoundPage />
  }
  
  // 3. Load the appropriate template
  const Template = templates[business.template] // 'resume-builder'
  
  // 4. Render with business customization
  return (
    <Template
      businessName={business.name}
      tagline={business.tagline}
      primaryColor={business.color}
      pricing={business.pricing}
    />
  )
}
```

---

## 🎨 THE THREE TEMPLATES (How They Actually Work)

### Template 1: Resume Builder
```typescript
// templates/resume-builder.tsx
export function ResumeBuilderTemplate({ business }) {
  return (
    <div>
      {/* Header with business branding */}
      <Header 
        name={business.name}
        logo={business.logo}
        color={business.color}
      />
      
      {/* The actual resume builder */}
      <ResumeBuilder 
        onSubmit={async (resumeData) => {
          // Generate optimized resume with GPT-4
          const improved = await generateResume(resumeData)
          
          // Save to database
          await supabase.from('resume_orders').insert({
            business_id: business.id,
            customer_email: resumeData.email,
            original: resumeData,
            improved: improved,
            status: 'pending_payment'
          })
          
          // Create Stripe checkout
          const session = await createCheckout({
            amount: business.pricing.monthly, // $29
            business_id: business.id
          })
          
          // Redirect to payment
          window.location.href = session.url
        }}
      />
      
      {/* Footer */}
      <Footer business={business} />
    </div>
  )
}
```

### Template 2: Social Media Generator
```typescript
// templates/social-media.tsx
export function SocialMediaTemplate({ business }) {
  // Similar structure but different functionality
  return (
    <div>
      <Header {...business} />
      <SocialMediaGenerator 
        generatePosts={async (topic) => {
          // Use GPT-4 to generate social posts
          const posts = await generateSocialPosts(topic)
          return posts
        }}
        pricing={business.pricing}
      />
      <Footer {...business} />
    </div>
  )
}
```

---

## 💾 DATABASE STRUCTURE (Multi-Tenant)

```sql
-- ALL businesses share these tables
-- Data is filtered by business_id

-- Main business table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  franchisee_id UUID REFERENCES auth.users(id),
  subdomain TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  template TEXT NOT NULL, -- 'resume-builder', 'social-media', 'email'
  customization JSONB, -- {color, logo, tagline, etc}
  pricing JSONB, -- {monthly: 29, annual: 290}
  stripe_account_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Customer data (filtered by business_id)
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id),
  email TEXT NOT NULL,
  subscription_status TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders/Transactions (filtered by business_id)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id),
  customer_id UUID REFERENCES customers(id),
  amount DECIMAL(10,2),
  genesis_fee DECIMAL(10,2), -- 40% 
  franchisee_revenue DECIMAL(10,2), -- 60%
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI Generated Content (filtered by business_id)
CREATE TABLE ai_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id),
  type TEXT, -- 'resume', 'social_post', 'email'
  input JSONB, -- What user provided
  output TEXT, -- What AI generated
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_content ENABLE ROW LEVEL SECURITY;

-- Franchisees can only see their own data
CREATE POLICY "Franchisees see own data" ON customers
  FOR ALL USING (business_id IN (
    SELECT id FROM businesses WHERE franchisee_id = auth.uid()
  ));
```

---

## 🌐 DNS & DOMAIN SETUP

```javascript
// How subdomains actually work

// 1. DNS Configuration (one-time setup)
// In Cloudflare:
// *.genesis-businesses.com → CNAME → cname.vercel-dns.com

// 2. Vercel Configuration
// vercel.json
{
  "rewrites": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "(?<subdomain>.*).genesis-businesses.com"
        }
      ],
      "destination": "/business/:path*?subdomain=$subdomain"
    }
  ]
}

// 3. In the Next.js app
// We read the subdomain and show the right business
export async function getBusinessFromSubdomain(subdomain: string) {
  const business = await supabase
    .from('businesses')
    .select('*')
    .eq('subdomain', subdomain)
    .single()
    
  return business
}
```

---

## 🔑 THE KEY INSIGHT

**There is NO separate deployment per business!**

Instead:
1. **ONE Next.js app** handles everything
2. **Subdomains** determine which business to show
3. **Database filtering** isolates data
4. **Templates** provide different functionality
5. **Customization** makes each business look unique

When user "creates a business":
- We just add a database record
- The subdomain immediately works
- No deployment needed
- No separate hosting
- No individual setup

**It's instant because nothing is actually being "created" - we're just adding a row to a database and the platform immediately serves that "business" when someone visits the subdomain.**

---

## 🎬 VISUAL FLOW

```
User: "I want to create a resume business"
         ↓
[Pays $99, chooses name "Resume Pro"]
         ↓
Genesis: INSERT INTO businesses (subdomain: 'resume-pro', template: 'resume')
         ↓
[resume-pro.genesis-businesses.com immediately works]
         ↓
Customer visits → Our app checks subdomain → Shows resume template → Customer pays → Money splits 60/40
```

---

## 💡 WHY THIS IS GENIUS

1. **Instant "deployment"** - Just a database insert
2. **Zero marginal cost** - Same infrastructure for 1 or 1000 businesses
3. **Easy updates** - Change template once, all businesses updated
4. **Simple scaling** - Just add more Vercel instances
5. **One codebase** - Easy to maintain

**The user thinks they have their own business website.**
**In reality, they have a filtered view of our single platform.**

This is how Shopify, Substack, and every successful SaaS works!