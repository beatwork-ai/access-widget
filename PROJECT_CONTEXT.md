# PROJECT CONTEXT & ARCHITECTURE MEMORY
**Beatwork Access AI (Nagishut Widget)**
*Last Updated: September 5, 2026*

This document is the single source of truth for AI coding agents and developers working on this codebase. Read this file first when returning to this project after any absence.

---

## 1. Executive Overview

- **Product:** Enterprise-grade, multi-tenant Web Accessibility Widget (<div dir="rtl">סרגל נגישות לאתרים</div>).
- **Compliance:** 
  - Israeli Law: <div dir="rtl">חוק שוויון זכויות לאנשים עם מוגבלות (תקנות נגישות השירות, תשע"ג-2013)</div>
  - Israeli Standard: <div dir="rtl">תקן ישראלי ת"י 5568 ברמה AA</div>
  - International: WCAG 2.1 Level AAA, ADA Title III, Section 508.
- **Branding:** Gray-label / White-label by **Beatwork AI** (`Powered by Beatwork AI` in English).
- **Strict Rule:** **ZERO** public mentions of "GoHighLevel" or "GHL". All CRM/agency integrations are presented under Beatwork AI.
- **Repository:** `https://github.com/beatwork-ai/access-widget` (Branch: `main`)
- **Hosting / CDN:** Vercel Edge Network (`https://access-widget.vercel.app`)
- **Live Script URL:** `https://access-widget.vercel.app/v1/widget.js`

---

## 2. Technical Architecture & Design Decisions

### A. Zero Dependencies & CDN Delivery
- No React, Vue, jQuery, or third-party bundles. Pure vanilla ES5/ES6 JavaScript and scoped CSS.
- Fast load time (< 50ms) to ensure it does not impact host site Core Web Vitals (LCP, FID/INP, CLS).
- Script tag uses `defer` to prevent blocking the host site's initial DOM parse.

### B. Multi-Tenancy via `data-*` Attributes
Rather than maintaining a database per client, each client website configures the widget dynamically via script tag attributes:
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

### C. Legal Accessibility Statement Modal (<div dir="rtl">הצהרת נגישות דינמית</div>)
- Rendered on-the-fly inside `#aw-statement-modal`.
- Injects client business name, accessibility coordinator contact details, and physical accommodations.
- Features direct email feedback button: `<a href="mailto:...">` with pre-filled subject and diagnostic info (URL, user agent).

### D. CSS Scoping & Positioning System
- All widget classes are prefixed with `aw-` to prevent collisions with the host site's styles.
- Supported positions:
  - `data-position="right"` or `"bottom-right"`: `bottom: 24px; right: 24px;` (Panel opens bottom: 96px, right: 24px)
  - `data-position="left"` or `"bottom-left"`: `bottom: 24px; left: 24px;` (Panel opens bottom: 96px, left: 24px)
  - `data-position="top-left"`: `top: 24px; left: 24px;` (Panel opens top: 96px, left: 24px)
  - `data-position="top-right"`: `top: 24px; right: 24px;` (Panel opens top: 96px, right: 24px)
- Fully responsive on mobile (`@media (max-width: 480px)`): buttons scale to 52px, panels become full width (`calc(100vw - 24px)`).

---

## 3. Directory & File Walkthrough

```
├── index.html          # Interactive Embed Code Generator & Live Demo. Sanitized of all GHL mentions.
├── vercel.json         # CDN Edge configuration: CORS Allow-Origin '*', Cache-Control with stale-while-revalidate.
├── v1/
│   ├── widget.js       # Core runtime: DOM injection, profile handlers, localStorage state, dynamic statement.
│   ├── widget.css      # Isolated styles, contrast modes, dyslexia font, reading mask, position classes.
│   └── locales/
│       ├── he.json     # Hebrew translations (default, RTL, native Israeli terms).
│       ├── en.json     # English translations (LTR).
│       └── ru.json     # Russian translations (LTR).
├── README.md           # Public-facing repository documentation.
└── PROJECT_CONTEXT.md  # This technical blueprint file.
```

---

## 4. Key Profiles & Features Matrix

| Profile / Feature | How It Works in `widget.js` / `widget.css` |
| :--- | :--- |
| **Seizure Safe** | Adds `.aw-seizure-safe` to `<body>`, stops all CSS transitions, pauses GIFs/videos, dims flashes. |
| **Vision Impaired** | Boosts color saturation (+50%), increases font size, applies subtle contrast. |
| **ADHD Friendly** | Injects `#aw-reading-mask` and `#aw-reading-guide` to help focus on active lines. |
| **Keyboard Navigation** | Enhances `:focus-visible` with a bold 3px cyan/blue ring and activates the skip-to-content anchor. |
| **Cognitive Disability** | Highlights headings, paragraphs, and links with clear visual indicators. |
| **Contrast Modes** | Inverted, Dark High-Contrast (Black/White), Light High-Contrast (White/Black), Yellow on Black. |
| **Text Adjustments** | Font scaling (up to 200%), line-height adjustments, letter-spacing adjustments, dyslexia font. |
| **Page Structure Map** | Scans all `h1`-`h6` tags in the host DOM and builds a navigable tree inside `#aw-struct`. |

---

## 5. Active Client Register

### Client #1: <div dir="rtl">מרכז רפואי רובין (Rubin Dental / Medical Center)</div>
- **Website Location:** Top-Left (`data-position="top-left"`)
- **Language:** Hebrew (`data-lang="he"`)
- **Coordinator:** <div dir="rtl">מרקיאל מלייב</div>
- **Phone:** `052-7394164`
- **Email:** `rubindent@gmail.com`
- **Physical Accommodations:** <div dir="rtl">חניית נכים מסומנת, כניסה נגישה עם רמפה, מעלית מונגשת לקומה 2, שירותי נכים</div>
- **Statement Date:** <div dir="rtl">ספטמבר 2026</div>

---

## 6. How to Deploy & Invalidate CDN Cache

1. Make edits to `v1/widget.js`, `v1/widget.css`, or `v1/locales/*.json`.
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "feat/fix: describe changes"
   git push origin main
   ```
3. Vercel automatically deploys within 10–20 seconds.
4. CDN cache header is `s-maxage=86400, stale-while-revalidate=604800`.
   - In production, clients will receive the updated widget automatically on background revalidation.
   - For instant cache bypass during testing, append a version query string: `widget.js?v=1.2.1`.

---

## 7. Invariant Rules for Future Agent Sessions

1. **Brand Protection:** Always keep the brand badge in the footer as `Powered by Beatwork AI` in English. Do NOT translate this badge or replace it with generic terms unless explicitly instructed.
2. **Never Mention GHL:** GoHighLevel must never be referenced in user-facing code, demos, or error messages.
3. **Preserve Zero-Dependency:** Do not add npm packages, bundle tools (webpack/vite/rollup) to the CDN runtime unless requested. Keep the raw `.js` and `.css` files directly runnable.
4. **Hebrew RTL Rule:** Any Hebrew text output in chat or markdown must be enclosed in `<div dir="rtl">...</div>`.
