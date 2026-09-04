# Beatwork Access AI — Enterprise Web Accessibility Widget

> WCAG 2.1 AAA | Israeli Standard IS 5568 Level AA | ADA Title III | Section 508 Compliant

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbeatwork-ai%2Faccess-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)]()
[![CDN](https://img.shields.io/badge/CDN-Vercel%20Edge-black.svg)](https://access-widget.vercel.app/v1/widget.js)

A lightweight, enterprise-grade, zero-dependency web accessibility widget built for high-converting Israeli and international businesses. Fully white-labeled/gray-labeled under **Beatwork AI** (`Powered by Beatwork AI`).

---

## 🚀 Live CDN & Demos

- **Live CDN Endpoint:** `https://access-widget.vercel.app/v1/widget.js`
- **Interactive Code Generator & Demo:** `https://access-widget.vercel.app/index.html`
- **GitHub Repository:** `https://github.com/beatwork-ai/access-widget`

---

## ⚡ Quick Start: Universal Embed Snippet

Place this single script tag right before the closing `</body>` tag (or in your global `<head>` / layout file):

```html
<script 
  src="https://access-widget.vercel.app/v1/widget.js"
  data-lang="he"
  data-position="right"
  data-client-name="שם העסק / החברה"
  data-coordinator-name="ישראל ישראלי"
  data-coordinator-phone="050-1234567"
  data-coordinator-email="accessibility@domain.co.il"
  data-physical-access="חניית נכים, כניסה נגישה, שירותי נכים"
  data-statement-date="ספטמבר 2026"
  defer>
</script>
```

---

## ⚙️ Configuration Parameters (`data-*` Attributes)

| Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data-lang` | `string` | `"he"` | Interface language: `"he"` (Hebrew RTL), `"en"` (English LTR), `"ru"` (Russian LTR). |
| `data-position` | `string` | `"right"` | Widget toggle position: `"right"` (bottom-right), `"left"` (bottom-left), `"top-left"`, `"top-right"`. |
| `data-client-name` | `string` | `document.title` | Business name shown in the built-in legal Accessibility Statement (<div dir="rtl">הצהרת נגישות</div>). |
| `data-coordinator-name` | `string` | `""` | Name of the business Accessibility Coordinator (<div dir="rtl">רכז נגישות</div>). |
| `data-coordinator-phone`| `string` | `""` | Phone number for accessibility inquiries. |
| `data-coordinator-email`| `string` | `""` | Email for reporting barriers; also wires the instant "Report Barrier" button. |
| `data-physical-access`  | `string` | `""` | Description of physical building accessibility arrangements (parking, ramps, elevators, restrooms). |
| `data-statement-date`   | `string` | Current Month/Year | Date of the accessibility audit/statement declaration. |

---

## 🏛️ Regulatory & Legal Compliance

This widget addresses mandatory requirements under:
1. **Israeli Law:** <div dir="rtl">חוק שוויון זכויות לאנשים עם מוגבלות, תשנ"ח-1998 ותקנות הנגישות לשירות (התאמות נגישות לשירות), תשע"ג-2013</div>.
2. **Israeli Standard:** <div dir="rtl">ת"י 5568 ברמה AA (קווים מנחים לנגישות תכנים באינטרנט)</div>.
3. **WCAG 2.1 AAA:** Meets Web Content Accessibility Guidelines Level A, AA, and AAA criteria.
4. **ADA Title III:** Americans with Disabilities Act compliance for digital assets.
5. **Section 508:** US Federal Rehabilitation Act compliance.

---

## 🧩 Core Architecture

- **Zero External Dependencies:** Built with pure vanilla JavaScript (`v1/widget.js`) and scoped CSS (`v1/widget.css`). Total payload is under 75 KB uncompressed, ~20 KB gzipped.
- **Dynamic Legal Modal:** Self-generates a compliant Accessibility Statement modal populated directly from the client's `data-*` attributes.
- **Skip to Content:** Automatically inserts a keyboard-accessible `<a href="#main">` skip link for screen reader and keyboard power users.
- **Page Structure Map:** Scans and builds a live hierarchical H1–H6 outline panel (`#aw-struct`) for screen-reader and mobility navigation.
- **User Preference Persistence:** Automatically saves active toggles to `localStorage` per domain so users don't need to reconfigure upon page refresh.
- **Global CORS & Edge Caching:** Pre-configured with `vercel.json` for instant CDN delivery across all domains.

---

## 📁 Repository Structure

```
├── index.html          # Interactive configuration UI & live demo
├── vercel.json         # Vercel Edge CDN headers (CORS & caching)
├── v1/
│   ├── widget.js       # Core logic, profiles, modal generator, DOM mutations
│   ├── widget.css      # Isolated styles, high contrast modes, RTL/LTR layouts
│   └── locales/
│       ├── he.json     # Native Hebrew (Sabra) dictionary
│       ├── en.json     # International English dictionary
│       └── ru.json     # Russian localization dictionary
├── README.md           # This document
└── PROJECT_CONTEXT.md  # Deep technical memory & context for AI assistants
```

---

## 👥 Production Client Deployments

### 1. <div dir="rtl">מרכז רפואי רובין (Rubin Dental & Medical Center)</div>
- **Location:** Top-Left (`data-position="top-left"`)
- **Language:** Hebrew (`data-lang="he"`)
- **Coordinator:** <div dir="rtl">מרקיאל מלייב (052-7394164, rubindent@gmail.com)</div>
- **Arrangements:** <div dir="rtl">חניית נכים מסומנת, כניסה נגישה עם רמפה, מעלית מונגשת לקומה 2, שירותי נכים</div>
- **Embed Code:**
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

## 🛠️ Local Development & Deployment

```bash
# Clone the repository
git clone https://github.com/beatwork-ai/access-widget.git
cd access-widget

# Test locally with any static server
npx serve .

# Deploy updates to Vercel (commits to main auto-deploy)
git add .
git commit -m "feat: your change"
git push origin main
```

© 2026 **Beatwork AI**. All rights reserved.
