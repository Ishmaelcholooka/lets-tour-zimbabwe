---
description: Generate a complete test file for an existing service, repository, or component
argument-hint: <path-to-source-file>
---

Read the file at `$ARGUMENTS` and generate a complete test file following CLAUDE.md §7.

**Determine test type by file path:**

- `src/domains/*/**.service.ts` → Unit test in `tests/unit/domains/<domain>/<domain>.service.test.ts`
  - Cover every public static method
  - Include happy path, each ServiceError code, and edge cases
  - Mock the repository layer with `jest.spyOn`

- `src/domains/*/**.repository.ts` → Integration test in `tests/integration/domains/<domain>/<domain>.repository.test.ts`
  - Use transaction-per-test isolation:
    ```typescript
    beforeEach(() => prisma.$executeRaw`BEGIN`)
    afterEach(()  => prisma.$executeRaw`ROLLBACK`)
    ```
  - Cover every method that has a WHERE clause

- `src/app/api/**/route.ts` → Integration test in `tests/integration/api/<path>.test.ts`
  - Test cases: unauthenticated (401), wrong role (403), invalid body (400), success (2xx)
  - Use `supertest` or Next.js route handler test utilities

- `src/components/**/*.tsx` → Unit test in `tests/unit/components/<path>.test.tsx`
  - Use React Testing Library
  - Test: renders correctly, user interactions, loading/error/empty states

**Output format:**
1. Show the full test file path
2. Show the complete test file content
3. List any missing mocks or test fixtures needed

Do NOT create the file automatically — show it for review first.
