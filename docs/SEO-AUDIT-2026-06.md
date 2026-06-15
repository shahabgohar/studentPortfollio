# SEO Audit & Action Plan — shahabgohar.dev

_Date: 15 June 2026 · Goal: rank the site to attract SuiteCRM / AI / full-stack consulting clients_

## TL;DR

The site is already well-built technically (clean meta, rich JSON-LD, optimized blog
posts, GA4, sitemap, robots). The real problem is **not on-page polish — it's that the
site is effectively invisible in search**: `site:shahabgohar.dev` returns zero results,
and a branded search for "Shahab Gohar SuiteCRM developer" surfaces other people.

That points to three root causes, in priority order:

1. **Indexation** — the domain is new / not yet crawled and indexed. No amount of on-page
   work matters until Google has the pages in its index.
2. **Thin content surface** — one homepage + 3 blog posts gives Google almost nothing to
   rank. I added a Services hub + 3 keyword-targeted landing pages to fix this.
3. **Zero domain authority** — a brand-new personal domain can't out-muscle agency
   competitors (Flexiple, Variance Infotech, RT Dynamic) on head terms. The winnable game
   is **long-tail niche terms** + off-page authority building (below).

---

## What I changed in the codebase (live after your next deploy)

| # | Change | File | Why |
|---|--------|------|-----|
| 1 | Homepage `<title>` was **"Portfolio \| Shahab Gohar — Software Engineer"** → now **"SuiteCRM Developer & Consultant — Custom Modules, Mautic & AI \| Shahab Gohar"** | `pages/index.vue`, `composeables/useMetaTags.ts` | "Portfolio" was a zero-value keyword in the single most important SEO field. Now it leads with the money keyword. |
| 2 | H1 changed from "I build AI-powered **CRM** systems." → "I build AI-powered **SuiteCRM** systems." | `pages/index.vue` | Puts the primary keyword in the H1. |
| 3 | Fonts: removed invalid `monospace` Google font, trimmed weights, added `display:swap` + `preload` | `nuxt.config.ts` | Fewer render-blocking requests → faster LCP → better Core Web Vitals (a ranking factor). |
| 4 | **New: `/services` hub + 3 landing pages** (`suitecrm-development`, `mautic-suitecrm-integration`, `salesforce-to-suitecrm-migration`) | `pages/services/*` | Indexable, keyword-targeted content for high-intent searches. Each has unique title/meta, ~700 words, FAQ, internal links, and Service + Breadcrumb + FAQPage JSON-LD. |
| 5 | Reusable `ServiceLanding.vue` + `useServiceSeo.ts` | `components/landing/`, `composeables/` | So you can spin up new service pages in minutes. |
| 6 | "Services" added to the navbar (desktop + mobile) | `components/Navbar.vue` | Internal links help crawlers discover and rank the new pages. |
| 7 | Sitemap updated: added 4 new URLs + `lastmod` on home/blogs | `scripts/generate-sitemap.mjs`, `public/sitemap.xml` | Tells Google what to crawl and that pages are fresh. |

### Target keywords now covered by a dedicated page
- "SuiteCRM developer", "SuiteCRM customization services", "hire SuiteCRM developer"
- "Mautic to SuiteCRM integration", "Mautic SuiteCRM sync"
- "Salesforce to SuiteCRM migration", "Salesforce alternative open source CRM"

These are **lower-competition, high-buyer-intent** terms where a specialist can realistically
rank — versus broad "full-stack developer for hire" which is saturated.

---

## What YOU need to do off-site (this is where the ranking actually comes from)

On-page work is done. Ranking now depends on these, roughly in order of impact:

### 1. Get indexed (do this first — today)
- **Google Search Console**: add & verify `shahabgohar.dev`, submit `sitemap.xml`, then use
  **URL Inspection → Request Indexing** for the homepage, `/services`, and each service page.
- **Bing Webmaster Tools**: same (also feeds ChatGPT/Copilot search).
- Confirm the site isn't accidentally blocked (robots.txt is fine; check no `noindex` slips in).

### 2. Build authority signals (weeks 1–8)
- **SuiteCRM Store**: your two add-ons (AI Dashlet Generator, Business Card Reader) should
  link back to shahabgohar.dev from their listings — a high-relevance backlink.
- **SuiteCRM community forum**: a real profile + helpful answers, with your site in the bio.
- **GitHub**: put `shahabgohar.dev` in your profile + pin the relevant repos; link from READMEs.
- **LinkedIn**: featured link to the site; post the blog case studies.
- **Directory/marketplace profiles**: Clutch, GoodFirms, Upwork/Fiverr profile links, Crunchbase.
- Aim for a handful of genuine, relevant links — quality over volume.

### 3. Keep publishing case-study content (ongoing)
Your blog posts are your best-ranking asset. Each real project = one post targeting a
specific long-tail term (e.g. "SuiteCRM 8 Angular field actions", "SuiteCRM quote to invoice
automation"). 1–2 per month compounds fast in a niche this thin.

### 4. AI / answer-engine visibility (AEO)
The FAQ schema I added helps you appear in Google AI Overviews and get cited by
ChatGPT/Perplexity. Reinforce by keeping answers concise and factual, and by being mentioned
on third-party sites (the authority work above).

---

## Known issues to fix
- **`/resume.pdf` 404**: the navbar "Resume" link points to `/resume.pdf`, but no such file
  exists in `public/`. Add the file or remove the link.
- **Build note**: this environment couldn't run `npm run build` (the sandbox is Linux/ARM
  but `node_modules` holds macOS native binaries for `oxc-parser`). All new `.vue` files were
  validated with the Vue SFC compiler instead. **Run `npm run build` on your Mac before
  deploying** to confirm — it should pass.

---

## Reality check on timeline
A brand-new low-authority domain typically takes **2–4 months** to rank for niche long-tail
terms even after everything above is done, and longer for competitive head terms. The fastest
client wins will still come from your Fiverr/Upwork profiles and direct outreach while the
site's organic authority builds. The site's job is to **convert** that traffic and rank for
the specific SuiteCRM terms agencies ignore.
