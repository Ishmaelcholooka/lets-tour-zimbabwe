# Next.js Implementation Guide
**Let's Tour Zimbabwe Platform - Technical Implementation Strategy**

## Executive Summary
This document provides a comprehensive implementation strategy for building the Let's Tour Zimbabwe platform using Next.js 14+ and Vercel hosting, optimized for MVP development with budget constraints while maintaining scalability for future growth.

## Why Next.js for Educational Tourism Platform

### Strategic Advantages
1. **Rapid MVP Development**: Full-stack framework reduces development time by 40-60%
2. **Cost Efficiency**: Serverless architecture minimizes infrastructure costs during MVP phase
3. **SEO Optimization**: Server-side rendering crucial for school discovery and provider visibility
4. **Performance**: Built-in optimizations essential for Zimbabwe's internet infrastructure
5. **Developer Experience**: TypeScript support and modern tooling accelerate development

### Perfect Fit for Platform Requirements
- **Dynamic Content**: Tour packages, pricing, and availability change frequently
- **User-Generated Content**: Reviews, photos, and provider profiles need SEO visibility
- **Mobile-First**: Responsive design essential for Zimbabwe's mobile-heavy internet usage
- **Real-time Features**: Booking updates, messaging, and notifications
- **Payment Integration**: Seamless integration with Stripe and local payment gateways

## Technical Architecture Overview

### Full-Stack Next.js Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 14 Application                   │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React Components)  │  Backend (API Routes)       │
│  - School Dashboard           │  - Authentication APIs      │
│  - Provider Marketplace       │  - Tour Planning APIs       │
│  - Booking Interface          │  - Payment Processing       │
│  - Admin Panel               │  - Communication APIs       │
├─────────────────────────────────────────────────────────────┤
│                    Database Layer                           │
│  Prisma ORM + PostgreSQL (Supabase/Neon/Railway)          │
├─────────────────────────────────────────────────────────────┤
│                   External Services                         │
│  Stripe • Pusher • Resend • Twilio • Google Maps          │
└─────────────────────────────────────────────────────────────┘
```

## Core Technology Stack

### Frontend Technologies
```typescript
// Core Framework
Next.js 14.x (latest stable) with App Router
React (current stable) with TypeScript
Tailwind CSS + shadcn/ui components

// State Management
Zustand (client state)
React Query/TanStack Query (server state)
React Hook Form (form management)

// UI Components
shadcn/ui (component library)
Radix UI (headless components)
Lucide React (icons)
Recharts (analytics charts)

// Performance
Next.js Image Optimization
Vercel Edge Functions
Service Workers (PWA features) // Note: A detailed PWA/Offline Strategy is outlined in the '04_System_Architecture_Document.md' covering feature prioritization, Service Worker implementation, background sync, data synchronization, and user experience for robust offline capabilities.
```

### Backend Technologies
```typescript
// API Layer
Next.js API Routes
TypeScript for type safety
Zod for runtime validation
NextAuth.js for authentication

// Database
Prisma ORM
PostgreSQL (Supabase/Neon/Railway)
Upstash Redis (caching)

// External Integrations
Stripe (payments)
Pusher/Ably (real-time)
Resend (email)
Twilio (SMS)
Google Maps API
```

## Database Design with Prisma

### Core Schema Structure
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String?
  name      String?
  role      UserRole @default(SCHOOL)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model School {
  id        String   @id @default(cuid())
  name      String
  contactId String   @unique
  contact   User     @relation(fields: [contactId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tours     Tour[]
}

model ServiceProvider {
  id          String          @id @default(cuid())
  name        String
  ownerId     String
  owner       User            @relation(fields: [ownerId], references: [id])
  category    ServiceCategory
  description String?
  verified    Boolean         @default(false)
  rating      Float           @default(0)
  reviewCount Int             @default(0)
  services    Service[]
  reviews     Review[]
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
}

model Service {
  id          String           @id @default(cuid())
  providerId  String
  provider    ServiceProvider  @relation(fields: [providerId], references: [id])
  category    ServiceCategory
  name        String
  unitPriceCents Int
}

model Tour {
  id           String     @id @default(cuid())
  schoolId     String
  school       School     @relation(fields: [schoolId], references: [id])
  destination  String
  startDate    DateTime
  endDate      DateTime
  studentCount Int
  budgetCents  Int
  status       TourStatus @default(PLANNING)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  itinerary    Json?
  quotes       Quote[]
}

model Quote {
  id         String    @id @default(cuid())
  tourId     String
  tour       Tour      @relation(fields: [tourId], references: [id])
  totalCents Int
  status     QuoteStatus @default(DRAFT)
  items      QuoteItem[]
}

model QuoteItem {
  id        String  @id @default(cuid())
  quoteId   String
  quote     Quote   @relation(fields: [quoteId], references: [id])
  serviceId String
  service   Service @relation(fields: [serviceId], references: [id])
  quantity  Int     @default(1)
  priceCents Int
}

model Booking {
  id       String   @id @default(cuid())
  quoteId  String   @unique
  quote    Quote    @relation(fields: [quoteId], references: [id])
  status   BookingStatus @default(PENDING)
  payments Payment[]
}

model Payment {
  id          String   @id @default(cuid())
  bookingId   String
  booking     Booking  @relation(fields: [bookingId], references: [id])
  provider    String
  externalId  String
  amountCents Int
  currency    String   @default("USD")
  status      PaymentStatus @default(PENDING)
  createdAt   DateTime  @default(now())
}

model Review {
  id             String  @id @default(cuid())
  providerId     String
  provider       ServiceProvider @relation(fields: [providerId], references: [id])
  authorSchoolId String
  school         School  @relation(fields: [authorSchoolId], references: [id])
  rating         Int
  comment        String?
  createdAt      DateTime @default(now())
}

enum UserRole {
  ADMIN
  SCHOOL
  PROVIDER
}

enum ServiceCategory {
  ACCOMMODATION
  TRANSPORT
  FOOD_CATERING
  TOUR_GUIDE
  ACTIVITIES
  FIRST_AID
}

enum TourStatus {
  PLANNING
  QUOTED
  BOOKED
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum QuoteStatus {
  DRAFT
  SENT
  ACCEPTED
  REJECTED
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  SUCCEEDED
  FAILED
}
```

## API Routes Implementation

### Authentication System
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user || !user.password) return null
        const ok = await bcrypt.compare(credentials.password, user.password)
        if (!ok) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/signin', signUp: '/auth/signup' }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

### Tour Planning API
```typescript
// app/api/tours/generate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { generateItinerary } from '@/lib/ai/itinerary-generator'

const tourRequestSchema = z.object({
  destination: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  studentCount: z.number().min(1).max(500),
  budget: z.number().min(100),
  educationalObjectives: z.array(z.string()),
  requirements: z.object({
    accommodation: z.boolean(),
    transport: z.boolean(),
    meals: z.boolean(),
    activities: z.array(z.string())
  })
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = tourRequestSchema.parse(body)
    
    // Generate AI-powered itinerary (abstracted logic, see 'AI Integration Details' section)
    const itinerary = await generateItinerary(validatedData)
    
    // Calculate pricing from available service providers (abstracted logic, see 'AI Integration Details' section)
    const pricing = await calculateTourPricing(validatedData, itinerary)
    
    // Save tour request
    const tour = await prisma.tour.create({
      data: {
        schoolId: session.user.id,
        destination: validatedData.destination,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        studentCount: validatedData.studentCount,
        budget: validatedData.budget,
        status: 'PLANNING'
      }
    })
    
    return NextResponse.json({
      tourId: tour.id,
      itinerary,
      pricing,
      recommendations: await getProviderRecommendations(validatedData)
    })
    
  } catch (error) {
    console.error('Tour generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate tour' },
      { status: 500 }
    )
  }
}
```

### Payment Processing API
```typescript
// app/api/payments/create-intent/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

const paymentSchema = z.object({
  tourId: z.string(),
  amount: z.number().min(1), // Minimum $1.00
  currency: z.string().default('USD'),
  paymentMethod: z.enum(['card', 'bank_transfer'])
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { tourId, amount, currency, paymentMethod } = paymentSchema.parse(body)
    
    // Verify tour ownership
    const tour = await prisma.tour.findFirst({
      where: {
        id: tourId,
        schoolId: session.user.id
      }
    })
    
    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }
    
    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata: {
        tourId,
        schoolId: session.user.id,
        studentCount: tour.studentCount.toString()
      },
      automatic_payment_methods: {
        enabled: true
      }
    })
    
    // Update tour status later via Stripe webhook on payment success
    
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
    
  } catch (error) {
    console.error('Payment intent creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
```

### AI Integration Details
The platform's core innovative features, including dynamic itinerary generation and budget optimization, rely on AI. This section outlines realistic implementation approaches for MVP and future phases.

#### MVP Phase AI Implementation (Months 1-6)
- **Model Selection**:
  - **Itinerary Generation**: Rule-based system with OpenAI GPT-4 API integration for content enhancement
    - Base templates for common educational tour types (history, science, geography)
    - GPT-4 API calls for destination descriptions and activity suggestions
    - Simple optimization algorithms for budget and time constraints
  - **Pricing Optimization**: Statistical models using linear regression and decision trees
    - Historical pricing data analysis (when available)
    - Simple cost optimization based on service provider rates
    - Manual override capabilities for all AI suggestions

#### Advanced AI Implementation (Months 7-18)
- **Enhanced Models**:
  - **Custom LLM Fine-tuning**: Fine-tune smaller models (e.g., Llama 2 7B) on educational tourism data
  - **Machine Learning Pipeline**: Implement scikit-learn based models for pricing prediction
  - **Recommendation Engine**: Collaborative filtering for service provider recommendations
#### Cost Analysis & Budget Planning
- **MVP Phase Costs (Annual)**:
  - OpenAI GPT-4 API: $8,000 - $12,000 (estimated 500K tokens/month)
  - Basic ML model hosting: $2,000 - $4,000 (simple cloud instances)
  - Development time: 200-300 hours at $100-150/hour
- **Advanced Phase Costs (Annual)**:
  - Custom model training: $15,000 - $25,000 (GPU compute, data preparation)
  - Model hosting infrastructure: $8,000 - $15,000 (dedicated inference servers)
  - Ongoing model maintenance: $5,000 - $10,000 (retraining, optimization)

#### Performance & Reliability
- **Asynchronous Processing**: Implement asynchronous processing for AI-intensive tasks (e.g., initial itinerary generation) to prevent blocking the user interface. Provide loading states and progress indicators.
- **Caching Strategy**: Cache frequently requested AI outputs (e.g., popular destination itineraries) using Redis to reduce re-computation and latency.
- **Fallback Mechanisms**: Always provide rule-based fallbacks when AI services are unavailable or slow.
- **Rate Limiting**: Implement proper rate limiting for AI API calls to manage costs and prevent abuse.

#### Input/Output Schemas & Validation
  - **Strict Validation**: Define and enforce strict input (e.g., `tourRequestSchema` in Tour Planning API) and output schemas for all AI functions using libraries like Zod to ensure data integrity and predictable behavior.
  - **Version Control**: Manage schema versions to ensure compatibility as AI models evolve.
- **Transparent Commission Distribution Algorithm**:
  - **Mechanism**: This algorithm will consider factors such as service provider rating, service category, seasonal demand, tour budget, and platform value-add to calculate a fair commission split. It will be auditable by administrators.
  - **Transparency to Users**: Schools will receive an itemized breakdown of costs, clearly showing service provider fees and platform commissions. Service providers will see their commission rates per booking.
  - **Fairness & Auditability**: Regular audits of the algorithm's output to ensure fair distribution and prevent perceived manipulation. Documentation of the algorithm's logic will be made available to regulatory partners.
- **Human-in-the-Loop (HIL)**:
  - **Review & Override**: For critical outputs (e.g., final itinerary proposals, pricing quotes), provide administrators and tour coordinators the ability to review, modify, and override AI suggestions.
  - **Feedback Loop**: Incorporate user feedback on AI-generated suggestions to continuously improve model performance and accuracy. This feedback loop is crucial for mitigating cold-start problems and biases.

## Frontend Implementation

### School Dashboard Component
```typescript
// app/dashboard/school/page.tsx
import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { TourPlanningWidget } from '@/components/dashboard/tour-planning-widget'
import { ActiveToursGrid } from '@/components/dashboard/active-tours-grid'
import { QuickStats } from '@/components/dashboard/quick-stats'

export default async function SchoolDashboard() {
  const session = await getServerSession()
  
  if (!session || session.user.role !== 'SCHOOL') {
    redirect('/auth/signin')
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session.user.name}
        </h1>
        <p className="text-gray-600 mt-2">
          Plan and manage your school tours with ease
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TourPlanningWidget />
          <Suspense fallback={<div>Loading tours...</div>}>
            <ActiveToursGrid schoolId={session.user.id} />
          </Suspense>
        </div>
        
        <div className="space-y-6">
          <QuickStats schoolId={session.user.id} />
        </div>
      </div>
    </div>
  )
}
```

### Tour Planning Widget
```typescript
// components/dashboard/tour-planning-widget.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { useMutation } from '@tanstack/react-query'

const tourPlanningSchema = z.object({
  destination: z.string().min(1, 'Destination is required'),
  startDate: z.date(),
  endDate: z.date(),
  studentCount: z.number().min(1).max(500),
  budget: z.number().min(100),
  objectives: z.array(z.string())
})

type TourPlanningForm = z.infer<typeof tourPlanningSchema>

export function TourPlanningWidget() {
  const [step, setStep] = useState(1)
  
  const form = useForm<TourPlanningForm>({
    resolver: zodResolver(tourPlanningSchema),
    defaultValues: {
      destination: '',
      studentCount: 30,
      budget: 1000,
      objectives: []
    }
  })
  
  const generateTourMutation = useMutation({
    mutationFn: async (data: TourPlanningForm) => {
      const response = await fetch('/api/tours/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (!response.ok) throw new Error('Failed to generate tour')
      return response.json()
    },
    onSuccess: (data) => {
      // Navigate to tour details page
      window.location.href = `/tours/${data.tourId}`
    }
  })
  
  const onSubmit = (data: TourPlanningForm) => {
    generateTourMutation.mutate(data)
  }
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Plan a New Tour</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Victoria Falls" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="studentCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Students</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            <div className="flex justify-between">
              {step > 1 && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Previous
                </Button>
              )}
              
              {step < 3 ? (
                <Button 
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit"
                  disabled={generateTourMutation.isPending}
                  className="ml-auto"
                >
                  {generateTourMutation.isPending ? 'Generating...' : 'Generate Tour Plan'}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
```

## Deployment and DevOps

### Vercel Configuration
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret",
    "STRIPE_SECRET_KEY": "@stripe-secret",
    "PUSHER_APP_ID": "@pusher-app-id"
  },
  "regions": ["cpt1", "fra1"]
}
```

### Environment Variables
```bash
# .env.local
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# External Services
PUSHER_APP_ID="your-app-id"
PUSHER_KEY="your-key"
PUSHER_SECRET="your-secret"
PUSHER_CLUSTER="your-cluster"

# Email
RESEND_API_KEY="re_..."

# SMS
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="your-token"
```

## Performance Optimization

### Next.js Optimizations
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif']
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig
```

### Caching Strategy
```typescript
// lib/cache.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  const cached = await redis.get<string>(key)
  if (cached) return JSON.parse(cached) as T
  const data = await fetcher()
  await redis.set(key, JSON.stringify(data), { ex: ttl })
  return data
}

// Usage in API routes
export async function GET() {
  const providers = await getCachedData(
    'service-providers',
    () => prisma.serviceProvider.findMany({
      where: { verified: true },
      include: { reviews: true }
    }),
    1800 // 30 minutes
  )
  
  return Response.json(providers)
}
```

## Security Implementation

### API Route Protection
```typescript
// lib/auth.ts
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function withAuth(
  handler: (req: NextRequest, session: any) => Promise<NextResponse>,
  requiredRole?: string
) {
  return async (req: NextRequest) => {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    if (requiredRole && session.user.role !== requiredRole) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    return handler(req, session)
  }
}

// Usage
export const POST = withAuth(async (req, session) => {
  // Protected route logic
}, 'SCHOOL')
```

### Input Validation
```typescript
// lib/validation.ts
import { z } from 'zod'
import { NextRequest, NextResponse } from 'next/server'

export function withValidation<T>(
  schema: z.ZodSchema<T>,
  handler: (req: NextRequest, data: T) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const body = await req.json()
      const validatedData = schema.parse(body)
      return handler(req, validatedData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Validation failed', details: error.errors },
          { status: 400 }
        )
      }
      throw error
    }
  }
}
```

## Testing Strategy

### Unit Testing Setup
```typescript
// __tests__/api/tours.test.ts
import { createMocks } from 'node-mocks-http'
import handler from '@/app/api/tours/generate/route'

describe('/api/tours/generate', () => {
  it('generates tour successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        destination: 'Victoria Falls',
        startDate: '2024-06-01',
        endDate: '2024-06-03',
        studentCount: 30,
        budget: 2000
      }
    })
    
    await handler(req, res)
    
    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.itinerary).toBeDefined()
    expect(data.pricing).toBeDefined()
  })
})
```

### E2E Testing with Playwright
```typescript
// tests/e2e/tour-planning.spec.ts
import { test, expect } from '@playwright/test'

test('school can plan a tour', async ({ page }) => {
  await page.goto('/auth/signin')
  
  // Login as school
  await page.fill('[name="email"]', 'school@example.com')
  await page.fill('[name="password"]', 'password')
  await page.click('button[type="submit"]')
  
  // Navigate to tour planning
  await page.goto('/dashboard/school')
  await page.click('text=Plan a New Tour')
  
  // Fill tour details
  await page.fill('[name="destination"]', 'Victoria Falls')
  await page.fill('[name="studentCount"]', '30')
  await page.fill('[name="budget"]', '2000')
  
  // Submit form
  await page.click('text=Generate Tour Plan')
  
  // Verify tour creation
  await expect(page.locator('text=Tour Generated Successfully')).toBeVisible()
})
```

## Monitoring and Analytics

### Error Tracking
```typescript
// lib/monitoring.ts
import * as Sentry from '@sentry/nextjs'
import { NextRequest, NextResponse } from 'next/server'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0, // Adjust as needed for production
  environment: process.env.NODE_ENV,
  // Add integrations for Prisma, Next.js API routes, etc.
  integrations: [
    Sentry.captureConsoleIntegration(), // Captures console.log, console.error, etc.
    // Sentry.prismaIntegration(), // Auto-instruments Prisma queries (Requires @sentry/integrations/prisma)
    // Sentry.httpIntegration(), // Auto-instruments HTTP requests (Requires @sentry/integrations/http)
  ],
})

export function captureException(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, { extra: context })
  // For server-side, also log to console for Vercel logs / managed log service
  console.error('Captured Exception:', error, context)
}

export function withErrorHandling<T extends (req: NextRequest, ...args: any[]) => Promise<NextResponse>>(
  handler: T
) {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      return await handler(req, ...args)
    } catch (error) {
      captureException(error, { requestUrl: req.url, method: req.method, headers: req.headers.raw() })
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }
}

// Usage in API routes:
// export const POST = withErrorHandling(async (request: NextRequest) => {
//   // API logic
// })
```

### Performance Monitoring & Tracing
```typescript
// lib/analytics.ts (Expanded)
import { Analytics } from '@vercel/analytics/react'
import { type NextRequest } from 'next/server'
// import { trace } from '@opentelemetry/api'; // Example for OpenTelemetry

export function trackEvent(name: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    window.gtag?.('event', name, properties)
  }
  // For server-side, consider logging custom events to a structured log service
}

// Example of Server-side Performance Monitoring / Tracing (conceptual)
export async function recordApiPerformance(endpoint: string, durationMs: number, context?: Record<string, any>) {
  // Send to a metrics system (e.g., Prometheus, Datadog) or structured logs
  console.log(`API Performance: ${endpoint} took ${durationMs}ms`, context)
  // Example with OpenTelemetry (conceptual)
  // const tracer = trace.getTracer('next-app');
  // const span = tracer.startSpan(`API ${endpoint}`, { startTime: performance.now() - durationMs });
  // span.end();
}

// Usage in components
const handleTourGeneration = () => {
  trackEvent('tour_generated', {
    destination,
    studentCount,
    budget
  })
}
```

## Migration and Scaling Strategy

### Database Migrations
```typescript
// prisma/migrations/add-tour-features.sql
-- Add new columns for enhanced tour features
ALTER TABLE "tours" ADD COLUMN "educational_objectives" TEXT[];
ALTER TABLE "tours" ADD COLUMN "special_requirements" TEXT;
ALTER TABLE "service_providers" ADD COLUMN "certifications" JSONB;

-- Create indexes for performance
CREATE INDEX "tours_destination_idx" ON "tours"("destination");
CREATE INDEX "service_providers_category_verified_idx" ON "service_providers"("category", "verified");
```

### Scaling Considerations
```typescript
// lib/scaling.ts
// Connection pooling for database
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
}) // Note: Ensure proper connection pooling and management for Prisma in serverless environments to prevent connection exhaustion. Leverage features from managed PostgreSQL services (Supabase/Neon) and monitor database connections actively.

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Rate limiting
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true
})

export async function rateLimitCheck(identifier: string) {
  const { success } = await ratelimit.limit(identifier)
  return success
}
```

## Conclusion

Next.js provides an ideal foundation for the Let's Tour Zimbabwe platform, offering:

- **70% cost reduction** compared to traditional hosting
- **40-60% faster development** with full-stack framework
- **Built-in optimizations** for SEO and performance
- **Seamless scaling** from MVP to enterprise
- **Modern developer experience** with TypeScript and tooling

The architecture is designed to start simple and scale efficiently, making it perfect for your MVP approach while maintaining the flexibility to grow into a comprehensive platform serving thousands of schools across Zimbabwe.

---
**Document Version**: 2.0  
**Date**: September 10, 2025  
**Status**: Technical Implementation Ready - AI Strategy Enhanced
**Next Review**: November 10, 2025
**Change Summary**: Standardized Next.js 14.x, added realistic AI implementation phases, enhanced cost analysis and performance optimization
