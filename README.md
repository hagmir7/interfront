# Intercocina Frontend

Intercocina's French-language storefront for the Moroccan market. It includes furniture and kitchen product browsing, product configuration, cart and checkout, customer accounts, order tracking, showroom information, events, and blog content.

This repository contains the frontend. Product data, authentication, and other business operations use an external backend API.

## Technology

- Next.js 16 App Router and React 19, using JavaScript and JSX.
- Tailwind CSS 4, Radix/shadcn-style components, and Ant Design.
- Axios and native fetch for client and server API access.
- React Context for authentication and cart state.
- Figtree fonts, Framer Motion, Swiper, Splide, and PhotoSwipe.
- npm with a committed `package-lock.json`.

## Getting started

Prerequisites: Node.js 20.9 or later and npm. This minimum reflects the installed Next.js package's engine requirement.

From the repository root:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The home page is `src/app/(storefront)/page.jsx`; customer-facing routes live under `src/app/(storefront)/(pages)/`.

**Local development currently uses the live backend** at `https://app.intercocina.com/api`. Both shared API helpers use this address in development and production. Use mocks or non-mutating checks when testing; submitting orders, reviews, contact forms, or account changes can affect live data.

## Configuration

Local overrides belong in `.env.local`, which is ignored by Git. These public variables are referenced in source:

| Variable | Purpose | Current fallback |
| --- | --- | --- |
| `NEXT_PUBLIC_STORAGE_URL` | Product media in `Product.jsx` and `AddToCartModal.jsx` | `https://app.intercocina.com/storage` |
| `NEXT_PUBLIC_SITE_URL` | Site URLs in blog and colors metadata | Blog: `https://intercocina.com`; colors: a placeholder URL |
| `NEXT_PUBLIC_APP_URL` | Product sharing URLs | `https://intercocina.com` |
| `NEXT_PUBLIC_FACEBOOK_APP_ID` | Facebook SDK helper | An existing hardcoded app ID |

For local URL generation, for example:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Restart the development server after changing environment variables. Set the site and app URLs to the intended public origin before building for deployment. The root metadata base is separately derived from request headers in `src/lib/domain.jsx`.

API URLs, API headers, and the Google OAuth client ID currently include hardcoded settings. An API URL environment variable is not wired into the shared clients. `NEXT_PUBLIC_API_KEY` appears only in comments and does not configure active API headers. Keep credentials out of commits and logs; all `NEXT_PUBLIC_*` values are exposed to browsers.

## Build and run

The production build uses Webpack and a 3072 MB Node.js heap limit. The npm script uses `cross-env` and works in PowerShell and POSIX shells.

Build and start:

```sh
npm run build
npm run start
```

`npm run start` serves an existing production build. API-backed routes may require backend access during rendering or build validation.

`next.config.mjs` defines allowed remote image hosts, limits build workers, redirects requests for `intercocina.com` to `www.intercocina.com`, and adds security headers for MIME types, referrers, framing, objects, and base URLs. The CSP is a baseline; it does not yet restrict script sources.

## Project structure

```text
src/
  app/
    layout.jsx          Shared document, metadata, fonts, and loading bar
    globals.css         Tailwind imports, fonts, and global styles
    (storefront)/
      layout.jsx        Storefront navigation, footer, and providers
      page.jsx          Home page
      (pages)/          Storefront, account, and content routes
    dashboard/
      layout.jsx        Authenticated dashboard layout
      page.jsx          Client overview and account shortcuts
      orders/           Order history
      addresses/        Delivery addresses
      discounts/        Customer discounts
      profile/          Personal information
      password/         Password settings
      tracking/         Order tracking
      support/          Customer claims
      loading.jsx       Dashboard loading state
      error.jsx         Dashboard error state
      _components/      Client-area shell, account lists, and forms
      _lib/             Session guard and shared section definitions
  components/           Feature components and forms
    ui/                 Shared UI primitives and loading components
  context/              Authentication and cart state
  services/             Authentication and tracking operations
  lib/                  Client/server API helpers, domain, and utilities
  hooks/                Shared React hooks
  constants/            Shared constants, including tracking statuses
  proxy.js              Dashboard request proxy
public/                 Static images, fonts, and icons
lib/facebook-sdk.js     Facebook SDK helper
```

The `@/` import alias maps to `src/`. Route groups such as `(storefront)` and `(pages)` do not appear in URLs. Existing storefront URLs are preserved, including `/shop`, `/product/[slug]`, `/collections`, `/cart`, `/checkout`, `/user/login`, `/profile`, `/tracking`, and `/blogs`.

## Application conventions

- The storefront layout installs `CartProvider` and `AuthProvider`. Cart state persists under the `cart` localStorage key. The dashboard is the client area, with its own layout and navigation without the storefront header, footer, or promotional widgets.
- Account functionality lives under `/dashboard`: orders, addresses, discounts, profile, password, tracking, and claims. The old `/profile` URL redirects to `/dashboard`. Login and onboarding completion default to the client overview; safe explicit return destinations such as `/checkout` are preserved. Public tracking and claims pages remain available.
- Authentication services store `access_token` and user data in cookies and localStorage. The Axios client reads the browser token; server helpers read cookies.
- Authentication cookies explicitly use `SameSite=Lax` and `Secure` on HTTPS. Profile loading validates the token with the backend instead of trusting cached user data. Tokens remain JavaScript-readable until a server-managed session migration is completed.
- Post-authentication redirects use `src/lib/security.mjs`, which also escapes JSON-LD. Server-rendered rich content uses the allowlist in `src/lib/sanitize-html.mjs`; scripts, inline styles, event handlers, and embedded frames are removed.
- Server components handle route rendering and server data access. Interactive components use `"use client"`; keep browser APIs and server-only imports on their respective sides of that boundary.
- Tailwind 4 is loaded through `src/app/globals.css` and `postcss.config.mjs`. The root `tailwind.config.js` contains legacy Blade/Vue paths; check the active CSS setup before changing styling configuration.
- Preserve French customer-facing copy, responsive behavior, metadata, and existing route slugs when making changes.

## Validation and known limitations

Run the security regression tests and lint checks:

```sh
npm test
npm run lint
```

Tests use Node.js's built-in runner and do not contact the live backend. ESLint uses the Next.js flat configuration. Existing lint violations remain across the application; use `npx eslint <file-paths>` for targeted validation and distinguish existing violations from new ones.

For application changes, check affected pages on mobile and desktop, including loading, empty, and error states. Check signed-in and signed-out behavior for account changes, and persistence and quantity updates for cart changes. Run a production build when feasible without submitting live transactions.

The dashboard proxy checks for `access_token` and redirects to `/user/login`. Its layout and every page verify the token through an uncached backend lookup, deduplicated within the current render. Use `dashboard/_lib/session.js` in future protected pages and validate ownership on protected data operations. The client area requires a valid user session; administrative features would need separate authorization.

See [SECURITY_REVIEW.md](SECURITY_REVIEW.md) for the original findings, remediation status, and remaining backend/deployment work.

See [AGENTS.md](AGENTS.md) for repository-specific guidance for coding agents and contributors.
