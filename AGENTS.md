# Working in this repository

## Project overview

This repository contains Intercocina's French-language storefront for the Moroccan market. It includes furniture and kitchen product browsing, collections, product configuration, a shopping cart, checkout, customer accounts, order tracking, showroom information, events, and blog content. The backend is an external API; its implementation is not in this repository.

The application uses Next.js 16 App Router, React 19, JavaScript/JSX, Tailwind CSS 4, and npm (`package-lock.json`). UI code combines Radix/shadcn-style primitives, Ant Design, Lucide/React Icons, and existing carousel and animation libraries. Follow the patterns of the feature being changed rather than introducing another UI library.

## Repository map

- `src/app/layout.jsx`: shared document, fonts, metadata base, and loading bar. Keep storefront navigation/providers out of this layout so dashboard routes remain independent.
- `src/app/(storefront)/layout.jsx`: storefront navigation, footer, promotional widgets, and cart/auth providers.
- `src/app/(storefront)/page.jsx`: storefront home page.
- `src/app/(storefront)/(pages)/`: customer-facing routes. Route groups do not appear in URLs. Dynamic routes use `[slug]`, including products, categories, collections, blogs, and events.
- `src/app/dashboard/`: authenticated French client area. Includes the overview and `orders/`, `addresses/`, `discounts/`, `profile/`, `password/`, `tracking/`, and `support/` pages. `_components/` owns the account lists/forms and shell; `_lib/navigation.mjs` defines the sidebar/overview sections; `_lib/session.js` validates the session. Validate sessions in each protected page/data operation as well as the layout; layouts can persist during navigation.
- `/profile` is a legacy redirect to `/dashboard`. Successful login defaults to `/dashboard`, while an explicitly supplied safe `next` destination still takes precedence. Initial onboarding remains at `/onboarding`.
- `src/components/`: feature components, forms, product displays, cart, and checkout UI.
- `src/components/ui/`: shared UI primitives and loading components. `components.json` describes the shadcn conventions.
- `src/context/AuthContext.jsx`: current user, authentication loading state, discounts, and Google OAuth provider.
- The dashboard uses server-validated session data and its existing bearer-authenticated API components without storefront providers. Shared `AddressForm`, `Tracking`, and `ReclamationForm` remain in `src/components/` because they are also used outside the dashboard.
- `src/context/CartContext.jsx`: cart state and persistence under the `cart` localStorage key.
- `src/services/`: authentication and tracking API operations, including `auth.server.js` for server user lookup.
- `src/lib/api.js`: shared Axios client; reads the browser's `access_token` and attaches a bearer token.
- `src/lib/api-server.js`: server fetch helper; optionally reads the `access_token` cookie and throws on unsuccessful HTTP responses.
- `src/lib/domain.jsx`: request-derived domain for metadata; `src/lib/utils.js`: shared class-name utilities.
- `src/lib/security.mjs`: internal redirect validation and safe JSON-LD serialization.
- `src/lib/sanitize-html.mjs`: server-side allowlist sanitizer for CMS HTML. Keep it out of client component imports.
- `src/proxy.js`: request proxy for `/dashboard/:path*`.
- `src/app/globals.css`: Tailwind imports, plugins, fonts, and global styles.
- `public/`: static images, fonts, icons, and other assets. `lib/facebook-sdk.js` is a separate root-level Facebook SDK helper.

## Local commands

Run commands from the repository root:

```sh
npm ci
npm run dev
npm run start
```

The development server normally uses `http://localhost:3000`. `npm run start` requires a successful production build first.

The build script uses `cross-env` to set the Node.js heap limit and explicitly selects Webpack. It works in PowerShell and POSIX shells:

```sh
npm run build
```

`npm run lint` runs ESLint using Next.js's flat configuration. Use `npx eslint <file-paths>` for targeted checks. There are existing repository-wide lint violations; distinguish those from issues introduced by a change.

`npm test` runs Node.js regression tests in `tests/*.test.mjs` covering redirects, JSON-LD, HTML sanitization, and browser authentication handling. Keep security tests independent of the live backend.

## Implementation conventions

- Use `.js` and `.jsx` and the `@/` alias for imports within `src/` (`jsconfig.json`). Match the surrounding file's formatting and component conventions; avoid unrelated formatting changes.
- Keep route pages and data loading on the server where practical. Add `"use client"` for interactive components using hooks, browser APIs, or context. Keep server-only imports such as `next/headers` outside the client dependency tree.
- Validate post-authentication destinations with `safeRedirectPath`, serialize JSON-LD with `serializeJsonLd`, and sanitize API rich HTML with `sanitizeRichHtml` before inserting markup. Preserve these boundaries when adding content sinks.
- Guard browser storage and other browser-only APIs against server rendering. Preserve hydration behavior when changing cart or auth initialization.
- Reuse existing components and API helpers. Check the feature's actual request and response shapes before changing product options, dimensions, prices, discounts, shipping, or checkout payloads.
- Keep visible customer text in French and preserve existing route slugs, metadata, canonical URLs, and brand styling unless the task requires changing them.
- Use the Tailwind 4 setup in `globals.css` and `postcss.config.mjs` as the styling entry point. The root `tailwind.config.js` contains legacy Blade/Vue content paths; do not assume it controls the current app's styles.
- Preserve responsive layouts and accessible form labels, keyboard interaction, focus handling, and loading/error/empty states when editing UI.
- When adding remote image sources, check `next.config.mjs` image allowlists. Preserve its host redirect and resource-conscious build settings unless changing them is part of the task.

## API, authentication, and environment

- Both API helpers currently target `https://app.intercocina.com/api` in development and production. Local development therefore connects to the live backend. Use mocks or non-mutating checks for validation; do not submit real orders, messages, reviews, or account changes just to test UI.
- Authentication services persist `access_token` and user data in cookies and localStorage. Coordinate login, logout, social login, server user lookup, and client context when changing that contract.
- `src/proxy.js` checks for `access_token` only as an optimistic redirect to `/user/login`; the dashboard layout and each page validate it through an uncached backend user lookup shared only within the current render. Enforce backend ownership checks on client data; cookie presence and cached user data are not authentication. This is a client area, not an administrator dashboard; privileged features would require explicit role checks.
- Environment variables referenced in source include `NEXT_PUBLIC_FACEBOOK_APP_ID`, `NEXT_PUBLIC_STORAGE_URL`, `NEXT_PUBLIC_SITE_URL`, and `NEXT_PUBLIC_APP_URL`. Inspect each consumer for its fallback. API URLs and some integration settings are currently hardcoded; do not assume an environment variable overrides them.
- Keep `.env*` files and credentials out of commits and output. Do not copy existing hardcoded API credentials into documentation, tests, or new code. `NEXT_PUBLIC_*` values are exposed to browsers and must not contain private secrets.

## Validation and scope

- Inspect the relevant route, component, context, and service before editing. Keep changes focused and preserve unrelated local work.
- For application changes, run applicable checks and a production build when feasible. Report the exact checks performed and any tooling or backend limitations separately from failures caused by the change.
- For UI changes, check the affected route at mobile and desktop sizes, including relevant loading, empty, error, and signed-in/signed-out states. For cart changes, check persistence and quantity behavior; for checkout changes, validate without placing a live order.
- Documentation-only changes need a content review and `git diff --check`; they do not require an application build.
- Do not edit generated `.next/` or `node_modules/` contents. Keep dependency and lockfile changes intentional and use npm for this repository.
- Update this file when a change materially alters the architecture, commands, or workflows described here.
