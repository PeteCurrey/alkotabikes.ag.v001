# ALKOTA CYCLES — DEPLOYMENT & DOMAIN MIGRATION RUNBOOK

## 1. Domain Configuration & Single Source of Truth

The canonical site domain is governed by the `NEXT_PUBLIC_SITE_URL` environment variable.

### Production Environment Variables (Vercel)
In Vercel → Project Settings → Environment Variables:

| Variable | Value | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://alkotacycles.avorria.com` | Primary canonical URL (No trailing slash) |
| `ALLOW_INDEXING` | `false` | Pre-launch crawl gate (Default: false) |

> [!IMPORTANT]
> `NEXT_PUBLIC_SITE_URL` must be set explicitly in Vercel for both Production and Preview environments.
> Build will **FAIL** if:
> - `NEXT_PUBLIC_SITE_URL` is unset or empty
> - `NEXT_PUBLIC_SITE_URL` contains `vercel.app`
> - `NEXT_PUBLIC_SITE_URL` does not start with `https://`

---

## 2. Purging Vercel Edge & Data Caches

When changing `NEXT_PUBLIC_SITE_URL` or updating domain DNS:

1. **Deploy Without Cache**:
   - In Vercel Dashboard → Deployments → Click the `...` menu on the latest commit.
   - Select **Redeploy**.
   - Ensure **"Use existing Build Cache"** is **UNCHECKED**.
2. **Purging Stale Static HTML Assets**:
   - Redeploying without cache forces Next.js to re-render static HTML pages (`/us`, `/uk`, etc.) with fresh metadata base and canonical links derived from `NEXT_PUBLIC_SITE_URL`.

---

## 3. Crawl Gate & Launch Protocol (`ALLOW_INDEXING`)

Pre-launch deployments are protected by a three-tiered crawl gate:
1. `robots.txt`: Returns `Disallow: /` for all user-agents when `ALLOW_INDEXING=false` (or unset).
2. `X-Robots-Tag`: Middleware injects `noindex, nofollow` headers on all responses when `ALLOW_INDEXING=false`.
3. `<meta name="robots">`: Root layout injects `content="noindex,nofollow"` into `<head>` when `ALLOW_INDEXING=false`.

### Launch Protocol (Go-Live Decision):
- Only set `ALLOW_INDEXING=true` in Vercel Production Environment Variables upon official commercial launch approval.
- **NEVER** set `ALLOW_INDEXING=true` on staging or preview environments.

---

## 4. Verification & Post-Deployment Checklist

After any domain update or deployment, run the following verification commands against the live URL:

```bash
# 1. Verify Canonical & Hreflang Tags (US Page)
curl -s https://alkotacycles.avorria.com/us | grep -E 'canonical|hreflang'

# 2. Verify Canonical & Hreflang Tags (UK Page)
curl -s https://alkotacycles.avorria.com/uk | grep -E 'canonical|hreflang'

# 3. Verify Robots.txt Output
curl -s https://alkotacycles.avorria.com/robots.txt

# 4. Verify X-Robots-Tag Header
curl -sI https://alkotacycles.avorria.com/us | grep -i x-robots-tag

# 5. Verify Sitemap URLs
curl -s https://alkotacycles.avorria.com/sitemap.xml | head -30
```
