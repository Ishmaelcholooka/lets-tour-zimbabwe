---
description: Generate a type-safe API route with HOF composition (auth, validation, error handling)
argument-hint: <HTTP_METHOD> <route-path> <ROLE>
---

Generate an API route for: $ARGUMENTS

Parse arguments as: `METHOD /api/path ROLE`
Examples:
- `POST /api/tours ORGANISER`
- `GET /api/providers/search TRAVELLER`
- `PUT /api/bookings/:id ADMIN,PROVIDER`

**Create `src/app/api/<path>/route.ts`** using the exact HOF pattern from CLAUDE.md §3:

```typescript
// src/app/api/<path>/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/middleware/with-auth'
import { withValidation } from '@/lib/middleware/with-validation'
import { withError } from '@/lib/middleware/with-error'
import { <action>Schema } from '@/domains/<domain>/<domain>.schema'
import { <Domain>Service } from '@/domains/<domain>/<domain>.service'
import type { RouteContext } from '@/lib/middleware/with-auth'

export const runtime = 'nodejs'

async function handler(req: NextRequest, ctx: RouteContext) {
  const { session, body } = ctx
  // TODO: implement — call domain service, return { data: result }
  throw new Error('Not implemented')
  // TEST: auth rejection (no session), wrong role, validation rejection, success path
}

export const <METHOD> = withError(withAuth(withValidation(<action>Schema, handler), { role: '<ROLE>' }))
```

**Also add the Zod schema** to the matching `src/domains/<domain>/<domain>.schema.ts` if it
doesn't exist yet.

After creating the files, run: `npx tsc --noEmit`

For multiple roles, pass an array: `{ role: ['ADMIN', 'PROVIDER'] }`
For unauthenticated routes (public), omit the role argument: `withAuth(handler)`
