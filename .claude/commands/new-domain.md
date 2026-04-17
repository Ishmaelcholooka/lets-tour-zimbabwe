---
description: Scaffold a new bounded-context domain with service, repository, schema, types, and test skeleton
argument-hint: <domain-name>
---

Scaffold a new domain named "$ARGUMENTS" following CLAUDE.md §3 patterns exactly.

Create these 5 files:

**1. `src/domains/$ARGUMENTS/$ARGUMENTS.service.ts`**
```typescript
// src/domains/$ARGUMENTS/$ARGUMENTS.service.ts
import { $ARGUMENTSRepository } from './$ARGUMENTS.repository'
import type { Create$ARGUMENTSInput } from './$ARGUMENTS.types'

export class $ARGUMENTSService {
  /** TODO: implement business logic for creating a $ARGUMENTS */
  static async create(userId: string, input: Create$ARGUMENTSInput) {
    return $ARGUMENTSRepository.create({ ...input, userId })
  }
  // TEST: create — happy path, validation errors, ownership checks
}

export class ServiceError extends Error {
  constructor(public code: string, message: string) {
    super(message)
    this.name = 'ServiceError'
  }
}
```

**2. `src/domains/$ARGUMENTS/$ARGUMENTS.repository.ts`**
```typescript
// src/domains/$ARGUMENTS/$ARGUMENTS.repository.ts
import { prisma } from '@/lib/prisma'

export class $ARGUMENTSRepository {
  static async create(data: Record<string, unknown>) {
    // TODO: replace with typed Prisma call once schema is defined
    throw new Error('Not implemented')
  }
  // TEST: every query method that contains a WHERE clause
}
```

**3. `src/domains/$ARGUMENTS/$ARGUMENTS.schema.ts`**
```typescript
// src/domains/$ARGUMENTS/$ARGUMENTS.schema.ts
import { z } from 'zod'

export const create$ARGUMENTSSchema = z.object({
  // TODO: define fields — use z.number().int() for money fields (name must end in Cents)
})

export type Create$ARGUMENTSInput = z.infer<typeof create$ARGUMENTSSchema>
```

**4. `src/domains/$ARGUMENTS/$ARGUMENTS.types.ts`**
```typescript
// src/domains/$ARGUMENTS/$ARGUMENTS.types.ts
export type { Create$ARGUMENTSInput } from './$ARGUMENTS.schema'
```

**5. `tests/unit/domains/$ARGUMENTS/$ARGUMENTS.service.test.ts`**
```typescript
// tests/unit/domains/$ARGUMENTS/$ARGUMENTS.service.test.ts
import { $ARGUMENTSService, ServiceError } from '@/domains/$ARGUMENTS/$ARGUMENTS.service'

const validInput = {
  // TODO: fill with minimal valid input matching the schema
}

describe('$ARGUMENTSService.create', () => {
  it('creates a $ARGUMENTS with valid input', async () => {
    const result = await $ARGUMENTSService.create('user-1', validInput)
    expect(result).toBeDefined()
  })
})
```

After creating all files, run: `npx tsc --noEmit`

Use PascalCase for class names — convert `$ARGUMENTS` from kebab-case if needed
(e.g. `tour-requests` → `TourRequests`).
