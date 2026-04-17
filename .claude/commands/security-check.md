---
description: Audit an API route file against the CLAUDE.md §6 security checklist
argument-hint: <path-to-route-file>
---

Read the file at `$ARGUMENTS` and audit it against every item in CLAUDE.md §6.

Output a markdown table with this structure:

| # | Check | Status | Notes |
|---|---|---|---|
| 1 | withAuth applied with correct role | PASS / FAIL / N/A | ... |
| 2 | withValidation with Zod schema | PASS / FAIL / N/A | ... |
| 3 | Ownership check (ownerId = session.user.id) | PASS / FAIL / N/A | ... |
| 4 | Stripe webhook signature verified | PASS / FAIL / N/A | ... |
| 5 | Payment amounts from DB (not client) | PASS / FAIL / N/A | ... |
| 6 | Rate limiting applied | PASS / FAIL / N/A | ... |
| 7 | Sensitive fields excluded via select | PASS / FAIL / N/A | ... |
| 8 | No internal errors exposed in production | PASS / FAIL / N/A | ... |
| 9 | CSP configured in next.config.ts | PASS / FAIL / N/A | ... |

For each FAIL, provide the exact code snippet needed to fix it.

This command is READ-ONLY — do not modify any files.
Mark items as N/A only when they genuinely do not apply to this route type
(e.g. Stripe signature check on a non-webhook route).
