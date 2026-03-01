# Playwright Framework

TypeScript-based Playwright automation framework with Page Object Model, custom fixtures, environment-based config, and custom reporting.

## Tech Stack
- Playwright (`@playwright/test`)
- TypeScript
- ESLint + TypeScript + Playwright plugin
- Dotenv for environment configuration

## Project Structure
```text
playwright-framework/
  src/
    data/testData.ts
    fixtures/index.ts
    pages/BasePage.ts
    pages/LoginPage.ts
    pages/RegistrationPage.ts
    types/index.ts
    utils/apiHelper.ts
    utils/config.ts
    utils/customReporter.ts
    utils/globalSetup.ts
    utils/globalTeardown.ts
    utils/logger.ts
  tests/
    api/
    e2e/login.spec.ts
  playwright.config.ts
  tsconfig.json
  .eslintrc.json
```

## Prerequisites
- Node.js 18+
- npm 9+

## Installation
```bash
npm install
npm run install:browsers
```

## Environment Setup
This framework supports environment-specific config via `ENVIRONMENT`:
- `.env.staging`
- `.env.prod`
- `.env` (fallback/override)

`src/utils/config.ts` loads `.env.<ENVIRONMENT>` first, then `.env`.
Default environment is `staging`.

### Required Environment Variables
```env
BASE_URL=https://example.com
API_URL=https://api.example.com
USERNAME=your_username
PASSWORD=your_password
```

## Running Tests
```bash
npm test
npm run test:headed
npm run test:debug
npm run test:ui
npm run test:staging
npm run test:prod
npm run test:chrome
npm run test:firefox
npm run test:safari
npm run test:smoke
npm run test:regression
npm run test:e2e
npm run test:api
npm run report
```

## Framework Highlights
- Page Object Model (`src/pages`)
- Custom fixtures (`src/fixtures/index.ts`)
- Global auth setup and teardown:
  - Saves auth state to `src/data/authState.json`
  - Cleans auth state in teardown
- Custom reporter:
  - Console + file logs via `src/utils/logger.ts`
  - JSON summary at `reports/test-summary.json`
- Trace/video/screenshot enabled on failure via `playwright.config.ts`

## Artifacts
Generated during test execution:
- `playwright-report/` (HTML report)
- `test-results/` (Playwright results)
- `reports/test.log` (custom log file)
- `reports/test-summary.json` (custom JSON summary)

## Linting
```bash
npm run lint
```

Current status:
- `npm run lint` fails with ESLint 10 because the project uses legacy `.eslintrc.json`.
- Options to fix:
  1. Migrate to `eslint.config.js` (flat config), or
  2. Pin ESLint to v8 for `.eslintrc` compatibility.

## Notes
- Path aliases are configured in `tsconfig.json`:
  - `@pages/*`, `@fixtures/*`, `@utils/*`, `@data/*`
- Base URL in `playwright.config.ts` has fallback value if env var is missing.
- `tests/api` folder exists but currently has no API test files.
