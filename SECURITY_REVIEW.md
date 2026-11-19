# Security review

Reviewed: 2026-11-19. Scope: this frontend repository, installed/locked dependencies, authentication flows, HTML rendering, navigation, and Next.js configuration.

## Remediation update

The findings below preserve the original review and original source locations. Subsequent changes on 2026-11-19:

- Findings 1 and 2: all identified post-authentication flows now use a shared internal-path validator; all JSON-LD sinks use script-safe serialization.
- Finding 3: server-rendered CMS HTML now passes through a maintained allowlist sanitizer. Pagination labels render as controlled text. Inline styles and embedded frames are intentionally removed from rich content.
- Finding 5, partially addressed: cookies explicitly use `SameSite=Lax` and `Secure` on HTTPS; cached user data no longer bypasses backend validation. Tokens are still JavaScript-readable. A complete HttpOnly session migration remains outstanding.
- Finding 6: proxy cookie/login names are corrected and the dashboard now requires an uncached, timeout-bounded backend session check before rendering. Cookie presence alone cannot authorize that page. Future role-specific features still require explicit authorization.
- Finding 8: Next.js, its lint configuration, and the optional SWC package were updated to 16.4.6. Compatible tooling dependency updates removed the remaining audit findings. Both full and production-only npm audits now report zero vulnerabilities.
- Baseline security headers were added for MIME sniffing, referrers, framing, object embeds, and base URLs. This is not a complete script-source CSP.
- Eight regression tests cover hostile redirect destinations, script-element breakout, active HTML, valid rich content, forged cached users, rejected sessions, and cookie flags. They pass without contacting the backend.
- Final validation: `npm test` passed all eight tests; the production build passed; both npm audits returned zero findings. Targeted ESLint passed for the security helpers, auth services, proxy, dashboard, tests, and configuration. Repository-wide ESLint reports 59 existing errors and 18 warnings, including hook usage and JSX text issues; this remediation does not claim a clean repository-wide lint run. The build still logs existing dynamic-rendering messages from color-loading components before completing successfully.
- Local production HTTP checks verified that missing cookies, the obsolete `token` cookie, and an invalid `access_token` all redirect away from the dashboard. The login route returns 200, and all baseline security headers are present. The invalid-session check performed one non-mutating backend user lookup; no valid user sessions or live mutations were exercised. Browser interaction and mobile/desktop visual checks were not performed.

Still outstanding: assess and rotate the browser-visible API key (finding 4), migrate to server-managed HttpOnly sessions (remainder of finding 5), integrate a confirmed backend logout/revocation contract (finding 7), and verify backend ownership, pricing, rate limits, and deployment protections. No backend endpoints were invented and no credentials were rotated in this frontend-only change.

This was a source review with npm advisory checks and isolated local checks. No live exploit requests, account changes, or orders were submitted. The external backend, deployment proxy, production response headers, token expiration, and backend authorization rules were not tested. Severity below reflects the likely impact and stated prerequisites; it does not establish production exploitation.

## Findings

### 1. High: untrusted post-login destinations reach router.push

Locations:

- `src/components/LoginForm.jsx:37`
- `src/components/RegisterForm.jsx:57`
- `src/components/SocialAuthButtons.jsx:46-47`
- `src/components/OnboardingContent.jsx:102-104`

The `next` query parameter reaches `router.push` without origin or protocol validation after successful login, registration, social authentication, or onboarding. A crafted link can supply an external destination for phishing or a dangerous URL scheme. Next.js explicitly warns that passing untrusted `javascript:` URLs to these navigation methods can execute script in the page's context. This requires the victim to complete the relevant flow.

Fix: use a shared destination validator. Parse against a trusted origin, require that exact origin, and pass only the normalized pathname, search, and hash to the router. Reject dangerous protocols and malformed destinations; default to `/profile`. Cover external URLs, protocol-relative URLs, backslashes, encoded inputs, and valid internal destinations when validating the fix.

Reference: [Next.js useRouter security guidance](https://nextjs.org/docs/app/api-reference/functions/use-router).

### 2. High, conditional on writable API content: JSON-LD can escape its script element

Locations:

- `src/app/(pages)/product/[slug]/page.jsx:198-241`
- `src/app/(pages)/colors/page.jsx:60-83`

Product names/descriptions and color names are inserted into a script element using `JSON.stringify` and `dangerouslySetInnerHTML`. JSON serialization does not escape HTML script terminators. If an attacker can influence these API fields, a value containing a closing script tag can inject executable markup.

Confirmed locally with the installed React server renderer: the current rendering pattern preserves an injected closing script tag and a subsequent script element. This check generated markup only; it did not execute a script or modify API content. Attacker access to those fields and production CSP enforcement remain unverified.

Fix: serialize JSON-LD through a shared helper that replaces every literal `<` with the JSON escape `\u003c` before insertion, as recommended by Next.js. Apply it to every JSON-LD sink. The collections index currently uses static structured data, so its equivalent sink was not classified as an attacker-controlled source.

Reference: [Next.js JSON-LD guidance](https://nextjs.org/docs/app/guides/json-ld).

### 3. High, conditional on upstream sanitization: raw API HTML reaches multiple pages

Locations:

- `src/components/PageComponent.jsx:50`
- `src/app/(pages)/blogs/[slug]/page.jsx:158`
- `src/app/(pages)/event/[slug]/page.jsx:123`
- `src/app/(pages)/collections/[slug]/page.jsx:103`
- `src/app/(pages)/product/[slug]/page.jsx:304`
- `src/app/(pages)/collections/page.jsx:247` (pagination labels)

API-supplied HTML is inserted with `dangerouslySetInnerHTML` without a sanitizer in the reviewed frontend paths. If the backend accepts unsafe markup, visitors can receive stored XSS through event handlers, unsafe URLs, or other active HTML. Script tags being inert in some client insertion paths does not make raw HTML safe.

Fix: establish and verify an allowlist-based HTML sanitization policy. Sanitize rich content with a maintained HTML sanitizer, remove event handlers and dangerous URL schemes, and render pagination labels as text or controlled UI where possible. Verify any existing backend sanitization before deciding which content is trusted. Backend sanitization was not available for inspection.

### 4. High exposure; backend impact unverified: an API key is shipped to browsers

Locations: `src/lib/api.js:24`, `src/lib/api-server.js:20`.

Both API clients contain the same literal `X-API-KEY`. The Axios client is imported by client components, so the value is available in browser code and request headers. It cannot serve as a confidential application credential. The value is intentionally omitted from this report.

Fix: determine the key's permissions with the backend owner. If it grants privileged access, rotate it and keep the replacement exclusively on the server, for example behind a Next.js backend-for-frontend. Enforce user authorization, abuse controls, and rate limits on the backend. If it is intentionally a public identifier, document that and ensure it confers no security privilege. Moving it to a `NEXT_PUBLIC_*` variable would still expose it.

### 5. High: bearer tokens are readable by page JavaScript

Locations: `src/services/auth.js:12-15`, `86-97`, `112-123`; `src/lib/api.js:4-5`.

Password and social login persist bearer tokens in localStorage and JavaScript-created cookies. Cookies have a 30-day browser expiry and do not explicitly set `Secure` or `SameSite`; JavaScript-created cookies cannot be `HttpOnly`. Any successful same-origin XSS can read the tokens and send them elsewhere. Browser cookie expiry does not establish the backend token's actual lifetime.

Fix: migrate to server-issued `HttpOnly`, `Secure` session cookies with an appropriate explicit `SameSite` policy, supported by server-side API calls. Include CSRF protection appropriate to cookie-authenticated mutation endpoints. This requires coordination with backend/session behavior; adding cookie flags alone does not protect the localStorage copy.

Reference: [OWASP HTML5 storage guidance](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html).

### 6. Medium: dashboard access check accepts any token cookie

Locations: `src/proxy.js:4-7`; `src/app/dashboard/page.jsx`.

The proxy only checks the presence of a cookie named `token`; it does not verify a session. The main authentication flow instead writes `access_token`, and the proxy redirects to `/login` while the real login route is `/user/login`.

Confirmed in an isolated execution of the current proxy function: no cookie caused a redirect, and an arbitrary cookie value allowed the request. The dashboard currently renders starter UI; private dashboard data exposure was not found. This check would not safely protect future private content.

Fix: validate the actual session on the server before rendering private pages, use the correct cookie and login route, and enforce authorization again at protected backend endpoints. Do not rely on client context, cached localStorage user objects, or cookie presence as proof of identity.

### 7. Medium, dependent on backend lifetime: logout does not revoke credentials

Location: `src/services/auth.js:27-34`.

Logout removes browser state without calling a server logout or token revocation endpoint. A previously copied token may remain valid until backend expiry or independent revocation. Backend token lifetime and revocation behavior are unknown.

Fix: revoke or invalidate the current server session/token during logout, while still clearing local state if the request fails. Define short token lifetimes and refresh-token rotation where applicable.

### 8. Moderate: vulnerable dependency versions are locked

The installed and locked Next.js version is `16.4.3`; the manifest's range is `^16.2.6`. Audit results collected during this review:

| Check | Result |
| --- | --- |
| `npm audit --json` | 11 affected package entries: all moderate, zero high or critical |
| `npm audit --omit=dev --json` | 1 affected production package: Next.js, with two advisories |

The 11 entries include transitive impact paths and are not 11 distinct independently exploitable vulnerabilities. Both commands completed with exit code 1 because findings were reported.

Next.js advisories:

- [GHSA-mfr8-8qww-v76h](https://github.com/advisories/GHSA-mfr8-8qww-v76h): information disclosure involving root parameters, `use cache`, and `unstable_cache`.
- [GHSA-vc7v-qv4w-wrv8](https://github.com/advisories/GHSA-vc7v-qv4w-wrv8): root-parameter cache leakage through nested `use cache` functions.

Both advisories identify `16.4.5` as the patched version. A source search found no `use cache`, `unstable_cache`, or cache-components configuration in this application, so the required vulnerable feature paths were not established.

The full audit also identifies `postcss-selector-parser` `6.0.10` through typography tooling and `minimatch` `10.2.6` through ESLint tooling, with CPU-exhaustion advisories. Their practical relevance depends on processing attacker-controlled selectors or glob patterns; those paths were not found in application requests.

Fix: update Next.js to a version fixing both advisories, keep related Next.js packages compatible, and update affected tooling dependencies through supported upstream versions. Regenerate the lockfile, rebuild, and rerun both audits. The registry audit reported `fixAvailable: false`, despite the published Next.js advisories listing a patched release; do not assume `npm audit fix` alone will resolve this.

## Further checks requiring backend or deployment access

- Checkout sends the browser-controlled `cart`, `address_id`, and shipping/payment choices (`src/components/CheckoutPage.jsx:66-72`). Verify that the backend recalculates prices, quantities, discounts, and taxes and checks address ownership. Sending these fields does not by itself prove a backend vulnerability.
- Verify authorization and ownership on orders, addresses, profiles, password changes, and tracking results; rate limits on login, password reset, public forms, and tracking; and provider-token verification in social login callbacks.
- No application-level CSP, framing protection, or HSTS configuration was found in `next.config.mjs`. Hosting/CDN headers were not inspected. Check actual production responses before concluding those protections are absent, then add an appropriate CSP and framing policy without breaking the integrations.
- `src/lib/domain.jsx` trusts request `host` and `x-forwarded-proto` for metadata. Ensure the reverse proxy validates hosts and overwrites forwarded headers, or use a configured canonical origin. No server fetch using this value was found, so SSRF was not established.
- `.env*` files are ignored and none appeared in `git ls-files '.env*'`. Full Git history and deployed artifacts were not scanned for secrets.

## Recommended order

1. Validate all post-authentication destinations and escape dynamic JSON-LD.
2. Verify/sanitize rich HTML and assess/rotate the exposed API key with the backend owner.
3. Harden session storage, validation, and logout with backend support.
4. Update vulnerable dependencies and verify production headers and backend authorization.

The initial review changed no application code. The remediation update above describes the subsequent frontend and dependency fixes; credentials and backend/deployment settings remain unchanged.
