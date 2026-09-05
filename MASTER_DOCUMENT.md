# MASTER DOCUMENT — Beatwork Access AI (Nagishut Widget)
**Single Source of Truth & Master Operational Blueprint**
*Last Updated: September 5, 2026 | Version: 1.2.3*

---

## 1. Executive Identity & Purpose

- **Project Name:** Beatwork Access AI (Web Accessibility Widget / <div dir="rtl">סרגל נגישות לאתרים</div>).
- **Owner / Agency:** **Beatwork AI** (Israel).
- **Core Purpose:** Deliver an enterprise-grade, zero-dependency digital accessibility widget for Israeli and international business websites, achieving instant compliance with Israeli law and international accessibility standards via a single `<script>` embed.
- **Branding Standard:** Gray-Label / White-Label under **Beatwork AI**. Footer badge strictly displays `Powered by Beatwork AI` in English (matching industry standards like UserWay/accessiBe).
- **Strict Brand Protection Rule:** **ZERO** mentions of "GoHighLevel" or "GHL" anywhere in code, user interfaces, documentation, or error handlers. All agency tools and client sub-accounts are referred to neutrally as agency CMS / website systems under Beatwork AI.
- **Hosting & CDN:** Vercel Edge Network (`https://access-widget.vercel.app`), auto-deployed from GitHub.
- **GitHub Repository:** `https://github.com/beatwork-ai/access-widget` (Branch: `main`).

---

## 2. Legal & Regulatory Compliance Framework

This widget is architected to fulfill the following statutory and technical standards:
1. **Israeli Equal Rights Law:** <div dir="rtl">חוק שוויון זכויות לאנשים עם מוגבלות, תשנ"ח-1998 ותקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013</div>.
2. **Israeli Standard:** <div dir="rtl">ת"י 5568 ברמה AA (קווים מנחים לנגישות תכנים באינטרנט)</div>.
3. **WCAG 2.1 Level AAA:** Meets Web Content Accessibility Guidelines (WCAG) 2.1 Level A, AA, and key AAA criteria (contrast ratios, animation pausing, focus visibility, keyboard navigation).
4. **ADA Title III:** Americans with Disabilities Act compliance for commercial digital assets.
5. **Section 508:** Rehabilitation Act digital compliance.

---

## 3. Complete File Map & Directory Inventory

```text
/Users/michael/Anti-gravity IDE/nagishut_widget/access-widget/
├── .gitignore               # Standard Git ignore rules
├── vercel.json              # Edge CDN headers: CORS Allow-Origin '*', caching directives
├── index.html               # Agency embed code generator + live interactive preview
├── README.md                # Public repository overview & quickstart guide
├── PROJECT_CONTEXT.md       # AI assistant quick-onboarding memory
├── MASTER_DOCUMENT.md       # [THIS FILE] Comprehensive system blueprint & historical truth
└── v1/                      # Production API version 1 runtime
    ├── widget.js            # Core runtime engine (Vanilla JS, 0 dependencies, ~52 KB)
    ├── widget.css           # Scoped styling, contrast modes, 4-corner positions (~25 KB)
    └── locales/             # Multi-language localization dictionaries
        ├── he.json          # Hebrew (default, RTL, native Israeli legal & UI terms)
        ├── en.json          # English (international LTR)
        └── ru.json          # Russian (LTR)
```

---

## 4. Deep Architectural Anatomy

### 4.1. Core Runtime (`v1/widget.js`)
- **Zero Runtime Dependencies:** No jQuery, React, or build bundlers required. Operates directly in modern browsers via standard DOM APIs.
- **Script Discovery:** Intelligently locates its own `<script>` tag using `document.currentScript` or scanning `script[src*="widget.js"]`.
- **Dynamic Multi-Tenancy:** Parses client parameters directly from HTML5 `data-*` attributes (`data-client-name`, `data-coordinator-name`, etc.). No per-client database or backend is needed.
- **Dynamic Accessibility Statement Modal:** Renders `#aw-statement-modal` on demand. Injects clinic/business name, coordinator contacts, and physical accommodation details with direct `mailto:` barrier-reporting integration.
- **Quick Profiles Engine:**
  - *Seizure Safe:* Stops CSS animations, clears video autoplay, dims flashing colors.
  - *Vision Impaired:* Enhances contrast, saturation, and text sizing.
  - *ADHD Friendly:* Activates reading mask (`#aw-reading-mask`) and focus ruler (`#aw-reading-guide`).
  - *Keyboard Navigation:* Injects bypass block (Skip-to-Content anchor), forces bold outline on `:focus-visible`.
  - *Cognitive Disability:* Highlights headings and links with clear visual indicators.
- **Page Structure Explorer:** Queries all `h1`–`h6` tags in the host DOM and builds a navigable tree in `#aw-struct`.
- **State Persistence:** Saves user accessibility preferences in `localStorage` under domain-scoped keys, restoring them across page transitions.

### 4.2. Styling & Isolation (`v1/widget.css`)
- **Prefix Isolation:** Every class and ID is strictly prefixed with `aw-` (e.g., `#aw-panel`, `#aw-toggle`, `.aw-btn`) to prevent collision with client website styles.
- **High Contrast Palettes:** Custom CSS overrides for dark contrast, inverted contrast, yellow-on-black, and monochrome.
- **Dyslexia Font Support:** Dynamically applies OpenDyslexic or clean high-legibility sans-serif fonts.

### 4.3. Localization (`v1/locales/`)
- All user-facing strings are abstracted into JSON files.
- `he.json` has been rigorously proofread for native Sabra Israeli phrasing (e.g., <div dir="rtl">הצהרת נגישות, דיווח על תקלה, איפוס כל ההגדרות, ת"י 5568 | AAA</div>).
- The brand badge is standardized across all languages as `Powered by Beatwork AI`.

---

## 5. The 4-Corner Positioning Engine

The widget toggle button (`#aw-toggle`), main panel (`#aw-panel`), and structure panel (`#aw-struct`) adapt to 4 distinct screen corners via `data-position`:

| Value | Desktop Toggle Position | Desktop Panel Position | Mobile Position (`max-width: 480px`) |
| :--- | :--- | :--- | :--- |
| `"right"` / `"bottom-right"` (Default) | `bottom: 24px; right: 24px;` | `bottom: 96px; right: 24px;` | `bottom: 16px; right: 16px;` |
| `"left"` / `"bottom-left"` | `bottom: 24px; left: 24px;` | `bottom: 96px; left: 24px;` | `bottom: 16px; left: 16px;` |
| `"top-left"` | `top: 24px; left: 24px;` | `top: 96px; left: 24px;` | `top: 16px; left: 16px;` (Panel `top: 76px`) |
| `"top-right"` | `top: 24px; right: 24px;` | `top: 96px; right: 24px;` | `top: 16px; right: 16px;` (Panel `top: 76px`) |

*All positions are fully responsive, auto-scaling to full width (`calc(100vw - 24px)`) on mobile devices.*

---

## 6. Reset Engine & UX Design Evolution

### Historical Problem & Resolution:
- **Prior State:** The reset button was styled with red alert colors (`#fef2f2`, `#fecaca`, `#dc2626`). Users mistook it for an error message/alert banner. Furthermore, clicking it when no settings were altered provided no visible response, causing users to believe the button was broken.
- **Current Refined State:**
  - **Neutral Styling:** Changed to modern slate/neutral (`background: #f8fafc; border: 1px solid #cbd5e1; color: #475569;`). It now reads unmistakably as a clean utility button.
  - **Active Confirmation:** Clicking `#aw-rst` triggers a green success state (`.aw-rst--success`) for 1.6s with a checkmark (`✓`) and the label:
    <div dir="rtl">ההגדרות אופסו בהצלחה</div>
    *(Settings successfully reset)*.
  - Users receive immediate visual confirmation regardless of whether prior options were toggled.

---

## 7. Multi-Tenant Configuration Reference (`data-*`)

| Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | URL | Mandatory | `https://access-widget.vercel.app/v1/widget.js` |
| `data-lang` | string | `"he"` | `"he"` (Hebrew RTL), `"en"` (English LTR), `"ru"` (Russian LTR). |
| `data-position` | string | `"right"` | `"right"`, `"left"`, `"top-left"`, `"top-right"`. |
| `data-client-name` | string | `document.title` | Official business/clinic name for legal statement. |
| `data-coordinator-name` | string | `""` | Accessibility Coordinator full name (<div dir="rtl">רכז נגישות</div>). |
| `data-coordinator-phone` | string | `""` | Accessibility Coordinator contact phone. |
| `data-coordinator-email` | string | `""` | Accessibility Coordinator email for reporting barriers. |
| `data-physical-access` | string | `""` | Physical accommodations (parking, ramps, elevators, restrooms). |
| `data-statement-date` | string | Current Date | Last audit / statement update date. |
| `data-whitelabel` | boolean | `false` | If `"true"`, completely suppresses the Beatwork AI brand badge. |
| `defer` | boolean | Mandatory | Ensures non-blocking background script loading. |

---

## 8. Client Registry & Production Deployments

### Client 01: <div dir="rtl">מרכז רפואי רובין (Rubin Dental / Medical Center)</div>
- **Website URL / Setup:** Top-Left placement (`data-position="top-left"`).
- **Coordinator:** <div dir="rtl">מרקיאל מלייב</div>
- **Phone:** `052-7394164`
- **Email:** `rubindent@gmail.com`
- **Physical Accommodations:** <div dir="rtl">חניית נכים מסומנת, כניסה נגישה עם רמפה, מעלית מונגשת לקומה 2, שירותי נכים</div>
- **Statement Date:** <div dir="rtl">ספטמבר 2026</div>
- **Production Embed Snippet:**
```html
<script 
  src="https://access-widget.vercel.app/v1/widget.js"
  data-lang="he"
  data-position="top-left"
  data-client-name="מרכז רפואי רובין"
  data-coordinator-name="מרקיאל מלייב"
  data-coordinator-phone="052-7394164"
  data-coordinator-email="rubindent@gmail.com"
  data-physical-access="חניית נכים מסומנת, כניסה נגישה עם רמפה, מעלית מונגשת לקומה 2, שירותי נכים"
  data-statement-date="ספטמבר 2026"
  defer>
</script>
```

---

## 9. Infrastructure & Deployment Playbook

### 9.1. GitHub & Vercel Edge CI/CD
- **Remote URL:** `https://github.com/beatwork-ai/access-widget.git`
- **Branch:** `main`
- **Deployment Flow:** Every `git push origin main` triggers an automatic production build on Vercel.
- **CORS & Cache Policy (`vercel.json`):**
  - `Access-Control-Allow-Origin: "*"` on all endpoints.
  - `Cache-Control: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"` for `/v1/*`.
  - Background edge revalidation serves updates seamlessly without downtime.

### 9.2. Custom Domain Setup (Hostinger DNS to Vercel)
To point a custom agency domain/subdomain (e.g. `access.beatwork.ai` or `nagishut.yourdomain.com`):
1. In Hostinger **hPanel** > **Domains** > **DNS / Nameservers**:
   - **Type:** `CNAME`
   - **Name:** `access` (or chosen subdomain)
   - **Target / Value:** `cname.vercel-dns.com`
   - **TTL:** `300`
2. In **Vercel Dashboard** > Project Settings > **Domains**:
   - Add the domain name. SSL is provisioned automatically.

---

## 10. Invariant Rules for Future Engineering & AI Sessions

1. **Brand Integrity:** Always display `Powered by Beatwork AI` in English in the widget footer. Never translate this badge into Hebrew or Russian unless explicitly ordered by the user.
2. **Zero GHL Mentions:** Never expose "GoHighLevel" or "GHL" in code comments, markup, demos, or documentation.
3. **Preserve Zero-Dependency Principle:** Never add bundlers, npm packages, or framework runtimes to the `/v1/` distribution. The widget must remain raw, vanilla, and universally executable.
4. **Hebrew RTL Rule:** Any Hebrew copy output in chat, artifacts, or documentation MUST be enclosed in `<div dir="rtl">...</div>`.
5. **Always Update This Document:** If adding a new position, client, profile, or attribute, update this `MASTER_DOCUMENT.md` and push to GitHub.

---
*Maintained with precision by Beatwork AI Engineering.*
