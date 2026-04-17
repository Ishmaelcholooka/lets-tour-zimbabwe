# CLAUDE.md — Let's Tour Zimbabwe

Tourism discovery and booking platform for anyone planning to tour Zimbabwe — individual travellers,
families, corporate teams, school groups, and international visitors. Connects tourists with vetted
local service providers (guides, transport, accommodation, activities).

Stack: **Next.js 16 App Router · TypeScript 6 strict · Prisma 7 + PostgreSQL · Auth.js v5 ·
Tailwind 4 + shadcn/ui · Vercel deployment**

> Every section below contains enforceable rules, not suggestions.
> Generated code that violates any rule is incorrect and must be regenerated.

---

## §1 Architecture Principles

**Monolith-first with bounded contexts.** Do not extract services until decomposition triggers are
hit. Maintain clean domain boundaries so extraction is cheap when needed.

**Domains**: Auth · Users · Tours · Marketplace · Bookings · Payments · Messaging · Compliance · Reviews

Each domain lives in `src/domains/<domain>/`. Cross-domain calls go through exported service
functions only — never import domain internals across boundaries.

**Runtime rule**: All routes that use Prisma run on the Node runtime. Edge runtime is reserved for
stateless middleware (geo, feature flags, rate-limit pre-checks with Upstash).

---

## §2 Directory Structure

```
src/
├── app/
│   ├── (marketing)/              # Public landing — destinations, experiences, about, pricing
│   │   ├── page.tsx              # Home /
│   │   ├── destinations/
│   │   ├── experiences/
│   │   ├── about/
│   │   └── layout.tsx
│   ├── (auth)/                   # Sign-in, sign-up, forgot-password, verify-email
│   │   └── layout.tsx
│   ├── (app)/                    # Authenticated shell — role-aware nav
│   │   ├── layout.tsx
│   │   ├── traveller/            # Individual/small group tours
│   │   ├── organiser/            # School/corporate group planning dashboard
│   │   ├── provider/             # Provider profile, availability, bookings
│   │   ├── admin/                # Platform management
│   │   ├── tours/                # Shared tour browsing
│   │   ├── marketplace/          # Provider discovery
│   │   ├── bookings/
│   │   └── messages/
│   └── api/
│       ├── auth/[...nextauth]/   # Auth.js v5 handler
│       ├── tours/
│       ├── providers/
│       ├── bookings/
│       ├── payments/
│       │   └── webhooks/stripe/
│       ├── messages/
│       ├── reviews/
│       └── pusher/auth/
│
├── domains/                      # Business logic — one folder per domain
│   └── <domain>/
│       ├── <domain>.service.ts   # Business logic only, no HTTP
│       ├── <domain>.repository.ts # All Prisma queries for this domain
│       ├── <domain>.schema.ts    # Zod schemas + inferred types
│       └── <domain>.types.ts     # Re-exports from schema
│
├── components/
│   ├── ui/                       # shadcn/ui primitives — do not hand-edit
│   ├── shared/
│   │   ├── data-table/
│   │   ├── file-upload/
│   │   ├── map-picker/
│   │   └── role-gate.tsx         # Renders children only for specified roles
│   └── [domain]/                 # Domain-scoped components
│
├── hooks/
│   ├── use-session.ts            # Typed wrapper — returns typed session or null
│   ├── use-toast.ts
│   └── use-debounce.ts
│
├── lib/
│   ├── auth.ts                   # Auth.js v5 config + requireSession/requireRole
│   ├── prisma.ts                 # PrismaClient singleton
│   ├── redis.ts                  # Upstash Redis client
│   ├── stripe.ts                 # Stripe client singleton
│   ├── pusher.ts                 # Pusher server client
│   ├── env.ts                    # Zod-validated env — throws at load if var missing
│   ├── middleware/
│   │   ├── with-auth.ts          # HOF: auth + optional role check
│   │   ├── with-validation.ts    # HOF: Zod parse + validate request body
│   │   └── with-error.ts         # HOF: Sentry capture + ServiceError → 4xx
│   └── utils/
│       ├── currency.ts           # ZWL/USD/cents formatting
│       ├── date.ts
│       └── cn.ts                 # clsx + tailwind-merge
│
├── stores/                       # Zustand — client state only
└── types/
    └── next-auth.d.ts            # Session type augmentation
```

---

## §3 Code Standards by Layer

### API Routes (`app/api/`)

Every route file follows this exact pattern:

```typescript
// src/app/api/tours/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/middleware/with-auth'
import { withValidation } from '@/lib/middleware/with-validation'
import { withError } from '@/lib/middleware/with-error'
import { createTourSchema } from '@/domains/tours/tour.schema'
import { TourService } from '@/domains/tours/tour.service'

export const runtime = 'nodejs'   // REQUIRED on every route using Prisma

async function handler(req: NextRequest, ctx: RouteContext) {
  const { session, body } = ctx
  const tour = await TourService.create(session.user.id, body)
  return NextResponse.json({ data: tour }, { status: 201 })
}

export const POST = withError(withAuth(withValidation(createTourSchema, handler), { role: 'ORGANISER' }))
```

Rules:
- HOF order: `withError > withAuth > withValidation > handler` — no exceptions
- Response shape: `{ data: T }` success · `{ error: string, details?: unknown }` failure
- No business logic or Prisma in route files — delegate to domain service → repository
- Stripe webhook routes: read raw body with `req.text()`, verify signature, then process

### Service Layer (`domains/*/[domain].service.ts`)

```typescript
import { TourRepository } from './tour.repository'
import type { CreateTourInput } from './tour.types'

export class TourService {
  static async create(userId: string, input: CreateTourInput) {
    if (input.endDate <= input.startDate) {
      throw new ServiceError('END_BEFORE_START', 'End date must be after start date')
    }
    return TourRepository.create({ ...input, userId })
  }
}

export class ServiceError extends Error {
  constructor(public code: string, message: string) {
    super(message)
    this.name = 'ServiceError'
  }
}
```

Rules:
- Stateless classes with static methods only — no `new TourService()`
- Throw `ServiceError(code, message)` — `withError` maps these to 4xx responses
- No HTTP, NextRequest, or NextResponse imports

### Repository Layer (`domains/*/[domain].repository.ts`)

```typescript
import { prisma } from '@/lib/prisma'

export class TourRepository {
  static async create(data: CreateTourData) {
    return prisma.tour.create({ data })
  }

  static async findByUser(userId: string) {
    return prisma.tour.findMany({
      where: { userId },
      select: { id: true, title: true, startDate: true, status: true },
      orderBy: { createdAt: 'desc' }
    })
  }
}
```

Rules:
- All Prisma queries here and nowhere else
- Always use explicit `select` — never return full model rows (prevents leaking sensitive fields)
- `prisma.$transaction()` for multi-step mutations
- Parameterized queries only — never string-concatenate into `where` clauses

### Schema Layer (`domains/*/[domain].schema.ts`)

```typescript
import { z } from 'zod'

export const createTourSchema = z.object({
  title: z.string().min(1).max(200),
  startDate: z.coerce.date().min(new Date()),
  endDate: z.coerce.date(),
  participantCount: z.number().int().min(1).max(500),
  budgetCents: z.number().int().min(10_000),  // minimum $100.00
}).refine(d => d.endDate > d.startDate, {
  message: 'End date must be after start date',
  path: ['endDate']
})

export type CreateTourInput = z.infer<typeof createTourSchema>
```

Rules:
- Export schema AND inferred type from the same file
- Money: always integer cents — column names MUST end in `Cents`
- `z.coerce.date()` for date fields coming from JSON

### Server Components

```typescript
import { requireSession } from '@/lib/auth'
import { TourRepository } from '@/domains/tours/tour.repository'

export default async function ToursPage() {
  const session = await requireSession()   // redirects to /sign-in if no session
  const tours = await TourRepository.findByUser(session.user.id)
  return <TourList tours={tours} />
}
```

Rules:
- Fetch via repository directly — never `fetch()` to own API in Server Components
- `requireSession()` or `requireRole()` at the top of every protected page
- Pass only serialisable props to Client Components

### Client Components

```typescript
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTourSchema, type CreateTourInput } from '@/domains/tours/tour.schema'

export function TourForm() {
  const qc = useQueryClient()
  const form = useForm<CreateTourInput>({ resolver: zodResolver(createTourSchema) })
  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateTourInput) =>
      fetch('/api/tours', { method: 'POST', body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      }).then(r => { if (!r.ok) throw new Error('Failed'); return r.json() }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tours'] }),
  })
  // render: handle isPending, error, and empty states explicitly
}
```

Rules:
- React Hook Form + `zodResolver` always — never uncontrolled form state
- React Query `useMutation` for mutations — not raw `useState` + `fetch`
- `useQueryClient().invalidateQueries` after mutations — do not manually patch cache
- Always render isPending, error, and empty states

---

## §4 LLM Output Standards

Claude MUST follow all of these when generating code for this project:

1. **File path comment** as first line: `// src/app/api/tours/route.ts`
2. **`export const runtime = 'nodejs'`** on every route file importing Prisma
3. **HOF composition** in routes — never inline auth or validation
4. **Cents for money** — never `amount: number` meaning dollars; column names end in `Cents`
5. **Zod schema before handler** — schema first, type inference, then handler
6. **Never `any`** — use `unknown` + type guards or proper generics
7. **Never `console.log`** in production paths — use Sentry `captureException`
8. **`// TEST:`** comment at end of every new function, listing what tests are needed
9. **Loading + error + empty states** in every data-fetching component
10. **JSDoc** on all exported service methods and shared hooks

---

## §5 Authentication — Auth.js v5

```typescript
// src/lib/auth.ts
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { redirect } from 'next/navigation'
import { prisma } from './prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) { token.id = user.id; token.role = (user as any).role }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as UserRole
      return session
    }
  }
})

export async function requireSession() {
  const session = await auth()
  if (!session) redirect('/sign-in')
  return session
}

export async function requireRole(role: UserRole | UserRole[]) {
  const session = await requireSession()
  const allowed = Array.isArray(role) ? role : [role]
  if (!allowed.includes(session.user.role)) redirect('/unauthorized')
  return session
}
```

**Protecting API routes:**
```typescript
export const POST = withError(withAuth(handler, { role: 'ORGANISER' }))
export const GET  = withError(withAuth(handler))                          // any auth'd user
export const PUT  = withError(withAuth(handler, { role: ['ADMIN', 'PROVIDER'] }))
```

**Session type** in `src/types/next-auth.d.ts`:
```typescript
import 'next-auth'
declare module 'next-auth' {
  interface Session {
    user: { id: string; email: string; name: string; role: UserRole }
  }
}
export type UserRole = 'TRAVELLER' | 'ORGANISER' | 'PROVIDER' | 'ADMIN'
```

**Client UX**: `<RoleGate allowedRoles={['ADMIN']}>` renders null for wrong roles.
Security always lives on the server — RoleGate is convenience only.

---

## §6 Security Checklist

Every API route MUST satisfy ALL of these before it is complete:

- [ ] `withAuth` applied with correct role constraint
- [ ] `withValidation` with Zod schema (GET routes: validate query params too)
- [ ] Ownership: `where: { id, ownerId: session.user.id }`
- [ ] Stripe webhooks: `stripe.webhooks.constructEvent(rawBody, sig, secret)` before any logic
- [ ] Payment amounts re-fetched from DB — never trust client-sent amounts
- [ ] Rate limiting on auth + AI + expensive routes via `@upstash/ratelimit`
- [ ] Sensitive fields excluded via explicit `select` (password, stripeCustomerId, etc.)
- [ ] No internal error detail in production responses
- [ ] CSP configured in `next.config.ts` via `headers()` export

---

## §7 TDD Requirements

| Layer | Test type | Required |
|---|---|---|
| Service methods | Unit (Jest 30) | Every public method — happy + error paths |
| Repository queries | Integration (Jest + test DB) | Every query with a WHERE clause |
| API routes | Integration | Auth rejection, validation rejection, success |
| Zod schemas | Unit | Boundary values, invalid types |
| Payment webhooks | Integration | Signature failure + each event type |
| Critical E2E flows | Playwright | Sign-up, browse destinations, book tour, payment |

**TDD rule**: write the test file FIRST, then implement.

Integration test isolation (transaction-per-test):
```typescript
beforeEach(() => prisma.$executeRaw`BEGIN`)
afterEach(()  => prisma.$executeRaw`ROLLBACK`)
```

Unit test pattern:
```typescript
describe('TourService.create', () => {
  it('throws END_BEFORE_START when endDate <= startDate', async () => {
    await expect(TourService.create('user-1', {
      ...validInput, startDate: new Date('2026-06-05'), endDate: new Date('2026-06-04')
    })).rejects.toMatchObject({ code: 'END_BEFORE_START' })
  })
})
```

---

## §8 Prisma Conventions (v7)

Schema rules:
- IDs: `String @id @default(cuid())`
- Money: `Int` — column names MUST end in `Cents` (e.g. `budgetCents`, `totalCents`)
- Timestamps: `createdAt DateTime @default(now())` + `updatedAt DateTime @updatedAt`
- Soft deletes: `deletedAt DateTime?` — never hard-delete users, bookings, or payments
- Enums: defined in Prisma, imported as `import type { UserRole } from '@prisma/client'`
- Table mapping: `@@map("snake_case_plural")`, `@map("snake_case")`

Migration workflow:
```bash
npx prisma migrate dev --name <descriptive-name>  # creates + applies migration
npx prisma generate                                 # regenerate client
```

Schema evolution (never rename columns in place):
1. Add new column → 2. Backfill data → 3. Update code → 4. Drop old column in later migration

Always index FK columns and common filter combinations:
```prisma
@@index([userId, status])
@@index([createdAt(sort: Desc)])
```

`DATABASE_URL` = pooled connection (PgBouncer for serverless).
`DIRECT_URL` = direct connection for migrations only.

---

## §9 Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Files | kebab-case | `tour-booking-widget.tsx` |
| React components | PascalCase | `TourBookingWidget` |
| Service classes | PascalCase + `Service` | `TourService` |
| Repository classes | PascalCase + `Repository` | `TourRepository` |
| Custom hooks | `use` prefix | `useTourBuilder` |
| Zustand stores | camelCase + `Store` | `tourBuilderStore` |
| Zod schemas | camelCase + `Schema` | `createTourSchema` |
| Inferred types | PascalCase | `CreateTourInput` |
| API route folders | kebab-case | `app/api/tour-requests/` |
| Env vars | SCREAMING_SNAKE_CASE | `STRIPE_WEBHOOK_SECRET` |
| Prisma models | PascalCase singular | `Tour`, `ServiceProvider` |
| DB tables via `@@map` | snake_case plural | `"tours"`, `"service_providers"` |

---

## §10 Environment Variables

All vars validated at startup via `src/lib/env.ts` (Zod schema — throws at module load if missing).
`NEXT_PUBLIC_` prefix ONLY on browser-safe vars.

Required groups:
```bash
# Database
DATABASE_URL=          # PostgreSQL + PgBouncer pooled
DIRECT_URL=            # Direct connection for migrations

# Auth.js v5
AUTH_SECRET=           # openssl rand -base64 32
AUTH_URL=              # https://letstourzimbabwe.com (prod) or http://localhost:3000

# Stripe
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Local ZW gateways
ECOCASH_API_KEY=
ECOCASH_API_URL=
ONEMONEY_API_KEY=
ONEMONEY_API_URL=

# Real-time
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=

# Cache / rate limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Email
RESEND_API_KEY=

# Monitoring
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

# Storage
BLOB_READ_WRITE_TOKEN=

# External APIs
GOOGLE_MAPS_API_KEY=
OPENWEATHER_API_KEY=
```

Never access `process.env` directly in components or modules — always go through `src/lib/env.ts`.
Staging and production secrets live in Vercel project settings only.

---

## §11 Payment Integration

**Stripe:**
- Amounts always calculated server-side from DB quote — never trust client payload
- Webhook: read raw body with `req.text()`, verify signature, return `200` immediately, process async
- Idempotency: check event ID in DB before processing

**Local gateways (EcoCash, OneMoney):**
- Unified `PaymentGateway` interface in `domains/payments/gateway.interface.ts`
- HMAC verification on all callbacks before processing
- Never log raw gateway responses (may contain token data)

---

## §12 Real-Time (Pusher)

- Private channels only: `private-traveller-{id}`, `private-organiser-{id}`, `private-provider-{id}`
- Auth endpoint: `app/api/pusher/auth/route.ts` — validate session before authorizing channel
- Never use public Pusher channels for business data

---

## §13 Monitoring

- Sentry Prisma integration for query tracing
- Always include context: `captureException(error, { extra: { userId, action } })`
- `instrumentation.ts` at project root for OpenTelemetry (Next.js 16 convention)

---

## §14 What NOT to Generate

- `pages/` directory, `getServerSideProps`, `getStaticProps`
- Class-based React components
- Redux — Zustand for client state, React Query for server state
- `fetch()` to own API inside Server Components — call repository/service directly
- `useEffect` for data fetching
- `any` casts — use `unknown` + narrowing
- Raw SQL strings — Prisma query API or `prisma.$queryRaw` with template literals only
- Floating-point numbers for money — always integers (cents)
