# ALKOTA CYCLES — FULL AUDIT, COMPETITOR ANALYSIS & BRAND STRATEGY
### Repo `alkotabikes.ag.v001` · staging `alkotabikes-ag-v001.vercel.app` · 10 August 2026

---

# 0. THE HEADLINE FINDING

**The repo and the deployment are not the same build.**

The repo contains 81 routes under `/[region]/`, a full `/studio` CMS, region routing, hreflang, a two-tier claims system and the legal centre. The live deployment has none of the region work:

```
/uk                        → 404
/us                        → 404
/uk/bikes/project-01       → 404
/journal                   → 3 words ("LOADING JOURNAL FEED...")
/partners                  → 41 words (portal only, recruitment gone)
/partners/portal           → 404
robots.txt                 → "Allow: /"  ← the hostname fix IS in the repo
```

The `robots.ts` hostname check, the journal SSR fix and the whole Phase 7A locale tree exist in code and are not serving. This is the exact failure mode that recurs across your builds: **AG reports completion against the repo, not against production.** Nothing in this audit's remediation list matters until the deployment pipeline is verified — you could fix everything below and still be looking at the same site.

**First action: work out why the Vercel production deployment is behind the repo.** Wrong branch, failed build silently falling back to last-good, or the zip is a local state never pushed. Until `curl https://<url>/uk` returns 200, treat all AG completion reports as unverified.

---

# 1. BUILD AUDIT

## 1.1 What's genuinely good

The engineering discipline in this repo is well above what I'd expect. Specifically:

**The two-tier claims architecture.** `lib/claims.ts` governs editorial/marketing assertions; `src/lib/claims/` plus `src/content/project01/claims.ts` governs engineering specifications with its own status ladder (10 claims currently at `EVIDENCE_REQUIRED`) and a `publicLanguage.ts` module whose stated rule is that no public component may render an internal claim status directly. That separation — engineering classification vs approved commercial language — is a genuinely sophisticated piece of design and it's the thing most likely to keep this brand honest at scale.

**The prebuild gate is real.** `prebuild` runs `verify-claims`, `verify-assets` and `placeholder-report` before every build. `verify-claims.ts` fails on `UNSET` status, missing evidence, duplicate IDs, 180-day staleness and forbidden literal patterns.

**Commercial gating is properly separated.** `featureFlags.ts` holds `STORE_MODE = "CATALOGUE"` and `PROJECT01_PAID_RESERVATIONS_ENABLED = false`, with the comment that the flag is "the human intent signal; the gate is the machine enforcement" and enforcement lives server-side in `legal-status.ts`. That's the right model.

**Placeholders are honest.** 12 `PLACEHOLDER — ` strings in `company.ts`, greppable exactly as specified. No invented company numbers.

**`/studio` is auth-gated.** All studio routes 307 to login. Good.

## 1.2 Constitution drift

`CLAUDE.md` no longer describes the codebase.

| CLAUDE.md says | Reality |
|---|---|
| "Animation: GSAP ScrollTrigger with scrub" | **gsap not in package.json** |
| "Smooth scroll: Lenis" | **lenis not in package.json** |
| "Never IntersectionObserver" | **1 usage** — `about/build-process/ProcessNav.tsx` |
| "Any required env var missing at build time must **throw**, never default" | `lib/env.ts` **defaults** to `https://alkotacycles.com` and only `console.warn`s |

The animation stack is actually `motion` (Framer) plus `three` / `@react-three/fiber` / `drei`. That may be a perfectly good decision — R3F is a reasonable choice for the hotspot viewer and configurator — but the constitution should record the decision that was made, not one that wasn't. A constitution that's wrong teaches the next session to ignore it.

The env guard is the more serious one. It silently defaults, which is **why the preview deployment emits `alkotacycles.com` canonicals and sitemap URLs**. Rule 6 was written specifically to prevent this and it was implemented as a warning.

## 1.3 Module duplication

`lib/env.ts` (root, 25 lines, the guard) and `src/lib/env.ts` (2 lines, re-export). `@/lib/env` resolves to the re-export via the `@/* → ./src/*` path alias, while `WorkshopFeature.tsx` reaches the root claims file by relative path `../../../lib/claims`. Two resolution styles for the same conceptual layer. It works, but it's the kind of thing that produces a duplicate registry six months from now. Consolidate under `src/lib/` with the path alias.

## 1.4 Live-site defects (present in deployment)

- `/journal` renders 3 words — fixed in repo, not deployed
- `/partners` is the portal at 41 words; recruitment content lives at `/[region]/dealers` in the repo but the live `/dealers` **308s to `/partners`**, so recruitment is unreachable
- Title template doubles the brand: `About | Alkota Cycles | Alkota Cycles`
- 404 pages emit `<link rel="canonical" href="https://alkotacycles.com">` — a 404 canonicalising to the homepage. Should be self-referential or absent, plus `noindex`
- `/design-system` is publicly reachable and indexable — an internal reference page
- `/demo` 78 words, `/racing/2027` 68 words, `/ownership` 142 words — stubs shipping live

## 1.5 Asset weight

`public/` is **69MB across 61 images**, with a dozen files over 1.7MB stored as PNG:

```
3.4M  pete-currey-founder-portrait.png
2.0M  pete-currey-glacier-white-presentation.png
1.9M  pete-currey-naked-carbon-inspection.png
1.8M  ×7 story images
```

These are photographs stored as PNG. `next/image` mitigates delivery, but the repo, the build and every deploy carry the full weight, and any raw-served asset (OG images, anything outside `next/image`) ships at full size. Convert to WebP/AVIF at source.

---

# 2. COMPETITOR ANALYSIS

## 2.1 Mondraker — own the vocabulary

Mondraker's brand is built on **named proprietary concepts that became industry language**. <cite index="21-1">By extending the reach of their frames, Mondraker initiated what's known as the "long reach movement" within the cycling industry</cite>. They didn't just build a longer bike — they named the idea *Forward Geometry*, and the entire industry adopted the geometry while Mondraker kept the credit.

The pattern repeats: <cite index="18-1">the ZERO suspension system, then FORWARD GEOMETRY setting a benchmark for what became standard progressive geometry, then MIND telemetry</cite>. <cite index="24-1">MIND was launched as the "world's first" fully integrated telemetry device for mountain bikes</cite>, with <cite index="20-1">sensors measuring travel usage 100 times per second, transmitted via Bluetooth to the myMondraker app</cite>.

**What they do:** name the philosophy, not just the product. Three named systems, each of which generates permanent earned media because journalists must use your word to describe the category.

**What they don't do:** show the process. Mondraker markets finished technology. Development happens behind closed doors and arrives as a launch.

**For Alkota:** you have an extensive internal taxonomy — R00, APC claim references, APN partner criteria, ALK-DOC legal IDs, SYSTEM 01/16. That's an *administrative* vocabulary. You have **no named public engineering concept**. This is the single biggest brand gap in the build.

## 2.2 Santa Cruz — the warranty *is* the club

Santa Cruz converts a cost centre into the loyalty mechanism. <cite index="16-1">Frames are warranted for the lifetime of the frame to the original owner</cite>, plus <cite index="12-1">free replacement pivot bearings to the original owner for as long as they own the bike, lifetime carbon handlebar and bottle cage coverage, lifetime Reserve rim coverage including damage from riding, and no-fault replacement parts at reduced charge in non-warranty situations</cite>.

Then they wrap it in membership. The Owners Club offers <cite index="11-1">exclusive insider ownership information — tips, setup information, lifetime care — plus free bearings for life and global rider support</cite>. **Registration is the door into the club**, so the warranty form is simultaneously the CRM, the community list and the retention mechanism.

The evidence it works is in the forums. <cite index="17-1">A rider describing a claim: fill out an online form, attach a receipt, and within a day an email from a friendly warranty rep with a replacement part on the way — "good warranty service can turn a frustrating situation into a brand-loyalty win"</cite>. <cite index="14-1">When the lifetime warranty launched, riders framed it as something no other company was doing</cite>.

**What they don't do:** they're now a Pon Holdings brand at mainstream scale. They cannot be scrappy, cannot show unfinished work, cannot be personally accessible. Their cult is legacy-powered and maintained by service, not by intimacy.

**For Alkota:** your `/warranty` page currently defers all terms to production — which was the right fix legally. But you've deferred the *mechanism* along with the terms, and the mechanism is a brand asset you could be building right now. More on this in §4.

## 2.3 Atherton — manufacturing as identity, access as product

Atherton is the closest structural analogue to what Alkota is attempting, and the most instructive.

They manufacture <cite index="29-1">in Machynlleth, mid Wales using additive manufacturing — 3D printing in titanium — technology widely used in Formula One and aerospace but relatively unknown in mountain biking</cite>. The positioning is explicitly oppositional: <cite index="29-1">"Unlike the majority of high-end brands we don't rely on carbon moulds or Far East production"</cite>.

That manufacturing choice generates the product advantage: <cite index="31-1">22 standard sizes for the enduro bike and 12 for the downhill bike, with custom available if none fit — and the additive process eliminates the limitations of a three-year product cycle, so learnings from the race track or continuous testing at Dyfi Bike Park can be immediately incorporated into production bikes</cite>.

And the founders carry <cite index="34-1">49 World Cup wins between them</cite>.

But read what an actual customer valued most: <cite index="31-1">"being able to pick up the phone and chat to the guys that are building your bike is great… the fit and finish and the support you get before, during and after purchase"</cite>. **Access to the makers was the thing worth writing about.**

**What they don't do:** publish the development process either. And the scepticism is public — <cite index="31-1">"I'm not sure they'll be able to survive on that manufacturing process alone"</cite>. A manufacturing story alone isn't a moat.

## 2.4 The wider boutique tier

BikeRadar's read on the British boutique scene is the strategic context: <cite index="32-1">"British mountain biking has always had a healthy appetite for the unusual. While the biggest brands tend to chase global trends, smaller UK builders are often more willing to try something different… What links them all is a willingness to do things differently."</cite>

Starling ships <cite index="32-1">a 32in front wheel paired with a 29in rear — niche, questionable, fascinating and somehow completely logical once you start thinking about it</cite>. That sentence is the entire boutique playbook: be legibly strange in a way that rewards thinking.

<cite index="30-1">Atherton's unique selling point is completely personalised custom frame dimensions and bike fit, made possible only by selling direct</cite>. Direct-to-consumer isn't a distribution choice for these brands — it's what makes the product possible.

## 2.5 Summary matrix

| | Mondraker | Santa Cruz | Atherton | Starling | **Alkota (current)** |
|---|---|---|---|---|---|
| Named engineering concept | ✅ ×3 | ✅ VPP | ✅ additive lugs | ✅ 32/29 | ❌ **none** |
| Warranty as membership | ❌ | ✅ **best in class** | ❌ | ❌ | ⚠️ deferred |
| Founder legitimacy | Corporate | Legacy | ✅ 49 WC wins | ✅ engineer-founder | ⚠️ untold |
| Manufacturing story | Asia carbon | Asia carbon | ✅ Wales, Ti | ✅ Bristol, steel | ❌ **undeclared** |
| Access to makers | ❌ | ❌ | ✅ | ✅ | ⚠️ implied |
| Named place | Alicante | Santa Cruz | Dyfi | Bristol | ❌ **unused** |
| **Public development process** | ❌ | ❌ | ❌ | ❌ | ✅ **owned** |
| Publishes failures | ❌ | ❌ | ❌ | ❌ | ✅ **stated intent** |
| Community surface | App | Owners Club | Phone | Forums | ❌ **none** |
| Publishing cadence | Launches | Launches | Launches | Ad hoc | ❌ **none** |

---

# 3. THE CULT BRAND THESIS

## 3.1 What you already own that nobody else does

Every competitor launches finished products. Development happens privately and arrives as an announcement. **Not one of them shows the process.**

Alkota's entire proposition — arrive before the product exists, watch it get built, including the parts that don't work — is genuinely unoccupied territory in this category. `/order` already articulates it: "YOU ARE NOT BUYING A RENDER. YOU ARE JOINING THE PROCESS THAT TURNS IT INTO A BICYCLE." The design archive already promises "Sketches. Geometry. Rejected ideas. Better ones that replaced them."

That is a cult brand premise. It is currently a premise and not yet a brand, because of five missing pieces.

## 3.2 What's missing

**① No named engineering concept.** Mondraker owns Forward Geometry. Santa Cruz owns VPP. Alkota owns nothing a journalist could name. Your kinematics page is 1,029 words of good general explanation — but general explanation builds nobody's vocabulary. You need one proprietary named idea, defined publicly, that the press must use your word for. It doesn't need to be revolutionary; Forward Geometry was "longer reach, shorter stem". It needs to be **named, defined, and defended in writing.**

**② No cadence.** 13 journal entries with no publication schedule. A serialised documentary with no schedule isn't a serial — it's an archive. The proposition is "follow the development"; following requires something to follow. Fortnightly, on a stated day, is the minimum viable rhythm, and the commitment itself is content ("Dispatch every other Thursday until the bike exists").

**③ The register confers nothing.** Someone registers and receives… a reference number. No position, no name, no badge, no access, no early information, no acknowledgement. Santa Cruz's warranty registration opens a door. Alkota's register currently opens nothing. **This is the cheapest, highest-impact fix available.**

**④ No place.** Santa Cruz is a town. Atherton is Dyfi. Mondraker is Alicante. Alkota is registered in Chesterfield, on the edge of the **Peak District** — arguably the birthplace of British mountain biking, with terrain that is technical, rocky, wet and genuinely hard on equipment. That's not a detail; it's a founding myth sitting unused. A bike proven on gritstone and Peak District mud is a more credible story for a UK brand than borrowed alpine imagery — and it has the considerable advantage of being *true*, which the alpine testing claim wasn't.

**⑤ No face.** The repo contains `pete-currey-founder-portrait.png`, `pete-currey-riding-history-origin.png`, `pete-currey-naked-carbon-inspection.png`. Atherton's cult runs on the Athertons. Starling's runs on Joe McEwan. Your founder story — two decades building industrial machinery businesses, now applying that discipline to a bicycle — is differentiated and largely untold. It's also *why* the engineering-documentation tone is authentic rather than affected.

## 3.3 The strategic risk

The brand currently reads as an **institution** — document IDs, revision codes, status registers, legal centre, compliance language. It's impressively rigorous and slightly cold. Institutions command respect; they don't generate cults.

Cults form around **people doing something difficult in public and letting you watch**. The systems architecture you've built is the right skeleton. What's missing is the warmth, the voice, the person, the place and the rhythm.

The design archive line — "Sketches. Geometry. Rejected ideas. Better ones that replaced them." — is the best writing on the site. It's human, confident and slightly funny. There should be far more of that and far less of `ALK-DOC-PRIVACY-001`.

---

# 4. WHAT TO BUILD — THE CULT LAYER

Ordered by impact per unit of effort.

## 4.1 Founding Register (highest impact, lowest cost)

Turn the register from a form into a membership.

- **Sequential founding number**, displayed and permanent. "Founder #0047." Non-sequential internal ID for auth (per Phase 5), but a human-facing number people will screenshot.
- **A hard cap that closes.** "The first 500." Scarcity that's real and verifiable, not a countdown timer.
- **What it actually confers** — pick two or three you'll genuinely honour: first allocation of production slots, a founding-register discount fixed at registration, the name in the frame graphic or on a workshop plaque, early access to the configurator, an invitation to the first ride day, dispatch 24 hours before public.
- **Live count**, only once real and only the true number.
- **A physical artifact.** A printed dispatch, a decal, a numbered card. The single most effective cult mechanic available to a pre-production brand, and it costs almost nothing.

## 4.2 Name the engineering

Create one named concept and give it a permanent home. Candidates from what's already in the build: the fit-first sizing approach (`fitModel.ts` exists), the chassis architecture, or the validation methodology.

Requirements: a name that isn't a spec, a one-page definition, a diagram, a stated reason it matters, and consistent use everywhere. Then defend it in the journal. Mondraker got two decades of press from three words.

## 4.3 Publishing rhythm

- Fixed cadence, stated publicly, held religiously
- A recurring format — "Dispatch 0xx" — so the series has a spine
- **Publish at least one genuine failure per quarter.** This is the trust engine and nobody else in the category will do it. It's also the thing most likely to get you covered on Pinkbike and Vital, because it's *news*.
- Email is the distribution channel; the journal is the archive

## 4.4 Give it a place

Build the Peak District into the identity. Named test loops, seasonal conditions, why gritstone and Peak mud are a harder validation environment than groomed alpine trail. Photograph it properly — that's a day's work and it retires the borrowed-imagery problem permanently.

## 4.5 Access as product

Atherton's customer valued phoning the people building the bike. Offer a scheduled version: a monthly open call, a "ask the engineer" thread answered in the journal, workshop visits for founding registrants. Structured access scales better than an open phone line and is more legible as a benefit.

## 4.6 Go where the community is

A cult cannot form entirely on your own domain. Pinkbike, Vital MTB and YouTube are where MTB community actually lives. The development-diary format is native to those platforms and currently unoccupied by any manufacturer. Cross-post dispatches, engage in the comments under your own name, accept that the audience forms off-site and converts on-site.

---

# 5. SEO AUDIT

## 5.1 Critical

| # | Issue | Detail |
|---|---|---|
| 1 | **Deployment lag** | Region routing, hreflang, journal SSR and the robots hostname fix all exist in repo and are not live. Every SEO item below may already be fixed in code — verify against production, not the repo. |
| 2 | **Preview fully crawlable** | Live `robots.txt` serves `Allow: /` and advertises `https://alkotacycles.com/sitemap.xml`. The `robots.ts` hostname check is correct in the repo. Root cause is compounded by `lib/env.ts` defaulting to the production URL instead of throwing. |
| 3 | **404s canonicalise to homepage** | `/uk/anything` returns 404 with `<link rel="canonical" href="https://alkotacycles.com">`. Should be self-referential or absent, plus `noindex`. |
| 4 | **`/journal` is 3 words** | The content hub for the entire brand proposition renders "LOADING JOURNAL FEED..." server-side. |
| 5 | **Partner recruitment unreachable** | Live `/dealers` 308s to `/partners` (the portal). Recruitment content exists at `/[region]/dealers` in repo. No shop can apply. |

## 5.2 High

- **Title duplication sitewide** — `About | Alkota Cycles | Alkota Cycles`. Layout template and per-page metadata both append the brand.
- **`/design-system` publicly indexable** — internal reference page. `noindex` and gate it.
- **Thin pages live** — `/demo` 78, `/racing/2027` 68, `/ownership` 142, `/partners` 41 words.
- **Asset weight** — 69MB `public/`, twelve PNGs over 1.7MB, a 3.4MB founder portrait. Convert to WebP/AVIF at source.
- **Brand entity confusion** — "Alkota" SERP remains owned by Alkota Cleaning Systems. Every title, H1 and schema `name` must read "Alkota Cycles", never bare "Alkota". Worth a repo-wide grep once the region build is live.

## 5.3 Verify once deployed

The repo suggests these are done. Confirm with production curl before believing it:

- hreflang reciprocity across `/uk/` and `/us/`, absolute URLs, `x-default` on root
- self-referential canonicals per region (never `/us/` → `/uk/`)
- sitemap index with `xhtml:link` alternates
- legacy redirects resolving in **one hop** to locale-prefixed destinations — this is your third URL migration and chains are the real hazard
- `Organization` schema naming the correct regional entity
- no `offers` block on Project 01 while pricing is TBC

## 5.4 Content opportunity

The four engineering pillar pages (kinematics 1,029, materials 1,056, testing 1,234, chassis 581) are now real assets. `/engineering/chassis` at 581 words is the laggard — bring it in line.

These are the pages that can rank for non-brand terms and the ones most likely to be cited by AI answer engines, which matters more than rankings for a pre-launch brand with no domain authority. **Adding a named proprietary concept (§4.2) gives you a term you own outright and will rank #1 for by definition** — which is the cheapest ranking in existence, and the reason Mondraker still owns "Forward Geometry" fifteen years on.

---

# 6. WHAT TO FIX, IN ORDER

## Immediate — deployment integrity
1. Diagnose why production is behind the repo. Nothing else counts until `curl /uk` returns 200.
2. Make `lib/env.ts` **throw** on missing or `vercel.app` values, per constitution rule 6.
3. Verify robots, canonicals, hreflang and redirect hops against production.

## This week — live defects
4. Restore partner recruitment reachability and fix the apply route.
5. Deploy the journal SSR fix; confirm >400 server-rendered words.
6. Fix title duplication; `noindex` + gate `/design-system`; fix 404 canonical and add `noindex`.
7. Convert oversized PNGs to WebP/AVIF.

## This month — repo hygiene
8. Update `CLAUDE.md` to the real stack (motion + R3F, not GSAP/Lenis), or install what it claims. Resolve the single `IntersectionObserver` usage either way.
9. Consolidate `lib/` and `src/lib/`.
10. Fill the thin pages or unpublish them.
11. Complete Phase 3-R legal items (company identity, trade mark line, dangling references).

## Next build phase — the cult layer
12. **Founding Register** with number, cap, live count and real benefits. Highest impact on the site.
13. **Name one engineering concept** and build its page.
14. **Publishing cadence** — fixed schedule, stated publicly, failure posts included.
15. **Peak District identity** — photograph it, name the test loops, retire borrowed imagery.
16. **Founder story** — the industrial-engineering lineage, told properly, with the portrait assets already in the repo.
17. **Off-site presence** — Pinkbike, Vital, YouTube.

---

## THE ONE-LINE VERSION

The engineering architecture is better than the brand architecture. You've built an institution when the goal was a cult — and the fix isn't more systems, it's a number on a register, a name for the thing you've invented, a fixed day of the week, a place on a map, and a face.
