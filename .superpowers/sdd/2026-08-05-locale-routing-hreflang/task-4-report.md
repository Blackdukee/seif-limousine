# Task 4 Report: Adapt LanguageToggle Component to Navigate Locale URLs

## Summary
Updated `src/components/seif/LanguageToggle.tsx` to switch language paths using TanStack Router hooks (`useParams`, `useNavigate`, `useLocation`) in addition to updating `i18n.changeLanguage()` and `localStorage`.

## Changes Made
- Modified `LanguageToggle.tsx` to read the active locale from `params.lang` or `i18n.language`.
- Implemented `toggleLanguage()` to derive target language (`en` <-> `ar`), change i18n locale, save to `localStorage`, replace `/en` or `/ar` in current URL path (or prepend target locale), and trigger navigation via `navigate({ to: targetPath })`.

## Verification Results
- Ran `npx tsc --noEmit` with zero errors.
- Created commit `feat(i18n): update LanguageToggle to navigate localized route paths`.
