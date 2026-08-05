# Task 2 Report: Add FAQPage Schema to Homepage Route

## Implementation Summary
Added JSON-LD `FAQPage` schema markup inside the `Index` component in `src/routes/$lang/index.tsx`.

## Changes Made
- Modified `src/routes/$lang/index.tsx`:
  - Created `faqJsonLd` object adhering to standard `https://schema.org` `FAQPage` specification with 3 main entity Q&As regarding private chauffeur booking, airport transfer/meet & greet, and luxury vehicle fleet details.
  - Rendered `<script type="application/ld+json">` tag containing stringified `faqJsonLd`.

## Verification Results
- Ran `npx tsc --noEmit` which completed with 0 errors.
- Created git commit `e74cf85` with message `feat(seo): add FAQPage schema to homepage route`.
