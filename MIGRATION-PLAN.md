# Migration Plan: From Bloated Platform to Lean Portfolio

## Phase 1: Backup Current State
```bash
# Create backup branch
git checkout -b genesis-archive
git add .
git commit -m "Archive: Full Genesis platform before simplification"
git push origin genesis-archive

# Return to main
git checkout main
```

## Phase 2: Delete Unnecessary Features (90% reduction)

### Folders to DELETE:
```
rm -rf app/club/
rm -rf app/ai-lab/
rm -rf app/meetings/
rm -rf app/reports/
rm -rf app/team/
rm -rf app/live-dashboard/
rm -rf app/analytics/  # Unless you have real data
rm -rf app/financials/ # Unless real numbers
```

### Files to KEEP & Update:
```
app/
├── page.tsx → Replace with page-simple.tsx
├── portfolio/ → Keep but simplify
├── strategy/ → Rename to roadmap/
├── timeline/ → Merge into roadmap
└── dashboard-simple/ → New dashboard
```

## Phase 3: Clean Up Types & Components

### Delete unused types:
- types/ai-lab.ts
- types/ai-venture.ts
- types/club.ts
- Most of types/dashboard.ts

### Simplify components:
- Remove all "club" related components
- Remove AI generation components
- Keep only essential UI components

## Phase 4: Set Up Real Auth (Supabase)

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Simple auth functions
export async function signUp(email: string, password: string) {
  return await supabase.auth.signUp({ email, password })
}

export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return await supabase.auth.signOut()
}
```

## Phase 5: Database Schema (Minimal)

```sql
-- Users table (handled by Supabase Auth)

-- Your ventures (public)
CREATE TABLE ventures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  status TEXT CHECK (status IN ('active', 'acquired', 'closed')),
  founded_year INTEGER,
  metrics JSONB, -- {revenue, users, growth}
  created_at TIMESTAMP DEFAULT NOW()
);

-- Goals (private to you)
CREATE TABLE goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  progress INTEGER DEFAULT 0,
  target_date DATE,
  status TEXT,
  key_results JSONB, -- Array of {title, done}
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Roadmap items
CREATE TABLE roadmap (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quarter TEXT NOT NULL, -- 'Q1 2025'
  items TEXT[], -- Array of items
  created_at TIMESTAMP DEFAULT NOW()
);

-- User registrations (for tracking)
CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  company TEXT,
  interest TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);
```

## Phase 6: Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Remove all unused API keys:
# - OpenAI
# - Stripe (unless you monetize later)
# - Any other AI services
```

## Phase 7: Update package.json

Remove unnecessary dependencies:
```json
{
  "dependencies": {
    // KEEP:
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "@supabase/ssr": "^0.0.0",
    "tailwindcss": "^3.0.0",
    "@heroicons/react": "^2.0.0",
    
    // DELETE:
    // - All AI/ML packages
    // - Stripe (for now)
    // - Complex animation libraries
    // - Unused UI libraries
  }
}
```

## Phase 8: File Structure After Migration

```
project/
├── app/
│   ├── page.tsx              # Simple landing
│   ├── register/
│   │   └── page.tsx          # Registration
│   ├── login/
│   │   └── page.tsx          # Login
│   ├── dashboard/
│   │   ├── page.tsx          # Main dashboard
│   │   ├── goals/
│   │   │   └── page.tsx      # Your OKRs
│   │   ├── roadmap/
│   │   │   └── page.tsx      # Strategic roadmap
│   │   └── resources/
│   │       └── page.tsx      # Useful resources
│   └── api/
│       └── auth/             # Auth endpoints
├── components/
│   ├── ui/                   # Keep basic UI
│   └── auth/                 # Auth components
├── lib/
│   ├── supabase.ts          # Supabase client
│   └── utils.ts             # Basic utilities
├── public/                   # Static assets
└── docs/                     # Your documentation
```

## Phase 9: Deployment Checklist

- [ ] Test registration flow
- [ ] Test auth gates
- [ ] Add real venture data
- [ ] Add real goals/OKRs
- [ ] Set up email notifications (optional)
- [ ] Deploy to Vercel
- [ ] Test in production
- [ ] Share with select group first

## Phase 10: Future Additions (Only if Needed)

**Month 1:**
- Basic analytics (page views, registrations)
- Email newsletter integration

**Month 2:**
- Comments on roadmap items
- Progress updates

**Month 3:**
- Resource downloads tracking
- User feedback system

**Never Add:**
- AI features without clear use case
- Token/point systems
- Complex gamification
- Features you won't maintain

## The Result

**Before:** 50+ pages of fantasy features
**After:** 5 pages of real value

**Before:** Complex AI platform nobody needs
**After:** Simple portfolio with strategic insight

**Before:** Trying to impress with complexity
**After:** Delivering value with simplicity

This is how you build something people actually want to use.