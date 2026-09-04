/**
 * AccessWidget v1.2 - Full Accessibility Suite
 * Compliant with IS 5568, WCAG 2.1 AAA & ADA Title III
 * Multi-tenant client support for Agency Sub-Accounts
 * (c) 2026 AccessWidget. All rights reserved.
 */
(function () {
  'use strict';
  if (window.__accessWidgetLoaded) return;
  window.__accessWidgetLoaded = true;

  var scriptTag = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      var s = scripts[i].src || '';
      if (s.indexOf('widget.js') !== -1) return scripts[i];
    }
    return null;
  })();

  var scriptSrc = (scriptTag && scriptTag.src) || '';
  var defaultBase = scriptSrc ? scriptSrc.replace(/\/widget\.js(\?.*)?$/, '') : '';
  var BASE = (scriptTag && scriptTag.getAttribute('data-base')) || defaultBase;
  var POSITION = (scriptTag && scriptTag.getAttribute('data-position')) || 'right';
  var LANG_OVERRIDE = (scriptTag && scriptTag.getAttribute('data-lang')) || 'auto';
  var STATEMENT_URL = scriptTag ? scriptTag.getAttribute('data-statement-url') : null;

  // Sub-account client parameters for Israeli IS 5568 Accessibility Statement
  var CLIENT_NAME = (scriptTag && scriptTag.getAttribute('data-client-name')) || '';
  var COORD_NAME = (scriptTag && scriptTag.getAttribute('data-coordinator-name')) || '';
  var COORD_PHONE = (scriptTag && scriptTag.getAttribute('data-coordinator-phone')) || '';
  var COORD_EMAIL = (scriptTag && scriptTag.getAttribute('data-coordinator-email')) || '';
  var PHYSICAL_ACCESS = (scriptTag && scriptTag.getAttribute('data-physical-access')) || '';
  var STATEMENT_DATE = (scriptTag && scriptTag.getAttribute('data-statement-date')) || '';

  function detectLang() {
    if (LANG_OVERRIDE && LANG_OVERRIDE !== 'auto') return LANG_OVERRIDE.toLowerCase();
    var htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    if (htmlLang.indexOf('he') === 0 || htmlLang.indexOf('iw') === 0) return 'he';
    if (htmlLang.indexOf('ru') === 0) return 'ru';
    var dir = (document.documentElement.getAttribute('dir') || '').toLowerCase();
    if (dir === 'rtl') return 'he';
    return 'en';
  }
  var LANG = detectLang();

  var STORAGE_KEY = 'accesswidget-prefs';
  var defaults = {
    fontSize: 0, lineHeight: 0, letterSpacing: 0, wordSpacing: 0,
    contrast: 'none', saturation: 'none', invertColors: false,
    highlightLinks: false, highlightHeadings: false,
    readableFont: false, dyslexiaFont: false, textAlign: 'none',
    stopAnimations: false, keyboardNav: false, bigCursor: false,
    readingGuide: false, readingMask: false, ttsEnabled: false,
    tooltips: false, hideImages: false, pageStructure: false,
    focusHighlight: false,
    activeProfile: 'none'
  };

  function loadPrefs() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return Object.assign({}, defaults, JSON.parse(stored));
    } catch (e) {}
    return Object.assign({}, defaults);
  }
  function savePrefs(p) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {}
  }
  var prefs = loadPrefs();

  function injectCss() {
    if (document.getElementById('aw-stylesheet')) return;
    var link = document.createElement('link');
    link.id = 'aw-stylesheet';
    link.rel = 'stylesheet';
    link.href = BASE + '/widget.css';
    document.head.appendChild(link);
  }

  var I = {
    acc: '<svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true"><circle cx="26" cy="10" r="6"/><path d="M24 18c-3.3 0-6 2.7-6 6v10c0 6.6 5.4 12 12 12h10.7l5.1 8.4c.9 1.5 2.8 1.9 4.2 1.1 1.5-.9 1.9-2.8 1.1-4.2l-6-10C44.6 40.5 43.7 40 42.7 40H31c-3.3 0-6-2.7-6-6v-3h13c1.7 0 3-1.3 3-3s-1.3-3-3-3H25v-1c0-3.3-2.7-6-6-6z"/><path d="M29.5 52C19.8 52 12 44.2 12 34.5c0-5.8 2.8-10.9 7.1-14.1v8.2c-.7 1.8-1.1 3.7-1.1 5.9C18 40.8 23.2 46 29.5 46c3.1 0 5.9-1.2 8-3.2h7.4C42 48.3 36.2 52 29.5 52z"/></svg>',
    prof: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    txt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>',
    lh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v18M18 3v18M6 8h12M6 16h12"/></svg>',
    ls: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 4v16M12 4v16M17 4v16"/></svg>',
    ws: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M9 4v16M15 4v16"/></svg>',
    ct: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor"/></svg>',
    sat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
    inv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2c3 3 4.5 6.5 4.5 10S15 19 12 22" fill="currentColor"/><path d="M12 2v20"/></svg>',
    lnk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    hdg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4v16M18 4v16M6 12h12"/></svg>',
    fnt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20l5.5-16h5L20 20M6.5 13h11"/></svg>',
    dyx: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4L4 20h3l2-5h6l2 5h3L12 4zm-2 8l2-5 2 5H10z"/></svg>',
    aln: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h12M3 18h18"/></svg>',
    ani: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15V9L15 12L10 15ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"/></svg>',
    kbd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8"/></svg>',
    fcs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>',
    spk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
    cur: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3l14 8-6 2 4 8-3 1-4-8-5 4z"/></svg>',
    gd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20"/><path d="M2 6h20"/><path d="M2 18h20"/></svg>',
    msk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="1" width="22" height="22" rx="3"/><rect x="1" y="8" width="22" height="8" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    img: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
    tip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
    str: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h8M4 18h16"/></svg>',
    rst: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
    cls: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>'
  };

  function loadLocale(callback) {
    var url = BASE + '/locales/' + LANG + '.json';
    try {
      fetch(url, { cache: 'force-cache' })
        .then(function (r) { if (!r.ok) throw new Error('locale ' + r.status); return r.json(); })
        .then(function (locale) { callback(locale); })
        .catch(function () {
          // fallback embedded minimal locale
          callback({
            dir: LANG === 'he' ? 'rtl' : 'ltr',
            lang: LANG === 'he' ? 'he-IL' : 'en-US',
            openMenu: LANG === 'he' ? 'פתח תפריט נגישות' : 'Open Accessibility Menu',
            menuTitle: LANG === 'he' ? 'תפריט נגישות' : 'Accessibility Menu',
            closeMenu: LANG === 'he' ? 'סגור תפריט נגישות' : 'Close Accessibility Menu',
            searchPlaceholder: LANG === 'he' ? 'חיפוש התאמה...' : 'Search features...',
            skipToContent: LANG === 'he' ? 'דילוג לתוכן המרכזי' : 'Skip to main content',
            sections: {
              profiles: LANG === 'he' ? 'פרופילים מומלצים' : 'Profiles',
              display: LANG === 'he' ? 'התאמות תצוגה' : 'Display',
              color: LANG === 'he' ? 'צבעים וניגודיות' : 'Colors',
              content: LANG === 'he' ? 'תוכן וקריאה' : 'Content',
              nav: LANG === 'he' ? 'ניווט ומקלדת' : 'Navigation'
            },
            sliders: { fontSize: 'Text Size', normal: 'Normal' },
            features: { contrast: 'Contrast', readableFont: 'Readable Font', stopAnimations: 'Stop Animations', keyboardNav: 'Keyboard Nav' },
            compliance: 'IS 5568 | WCAG 2.1 AAA',
            statementLink: LANG === 'he' ? 'הצהרת נגישות' : 'Accessibility Statement',
            reportIssue: LANG === 'he' ? 'דיווח על תקלה' : 'Report Barrier',
            reset: LANG === 'he' ? 'איפוס הגדרות' : 'Reset'
          });
        });
    } catch (e) {
      callback({});
    }
  }

  function start() {
    injectCss();
    loadLocale(function (L) { build(L); });
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function build(L) {
    var DIR = L.dir || (LANG === 'he' ? 'rtl' : 'ltr');

    // ─── 1. Skip to Main Content Link (WCAG 2.4.1) ───
    var skipLink = document.createElement('a');
    skipLink.id = 'aw-skip-link';
    skipLink.href = '#main-content';
    skipLink.textContent = L.skipToContent || 'Skip to main content';
    skipLink.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector('main, [role="main"], h1, #content, #main');
      if (!target) {
        target = document.body;
      }
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    if (document.body.firstChild) {
      document.body.insertBefore(skipLink, document.body.firstChild);
    } else {
      document.body.appendChild(skipLink);
    }

    // ─── 2. Screen Overlays (Guide & Mask) ───
    var rg = document.createElement('div'); rg.id = 'aw-rg'; document.body.appendChild(rg);
    var mTop = document.createElement('div'); mTop.id = 'aw-mask-top'; mTop.className = 'aw-mask'; document.body.appendChild(mTop);
    var mBot = document.createElement('div'); mBot.id = 'aw-mask-bottom'; mBot.className = 'aw-mask'; document.body.appendChild(mBot);

    function moveGuide(e) { rg.style.top = (e.clientY - 8) + 'px'; }
    function moveMask(e) {
      var gap = 86;
      mTop.style.height = Math.max(0, e.clientY - gap / 2) + 'px';
      mBot.style.height = Math.max(0, window.innerHeight - e.clientY - gap / 2) + 'px';
    }

    // ─── 3. Main Panel ───
    var panel = document.createElement('div');
    panel.id = 'aw-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', L.menuTitle || 'Accessibility Menu');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('data-pos', POSITION);
    panel.setAttribute('data-dir', DIR);
    panel.setAttribute('lang', LANG);

    panel.innerHTML =
      '<div class="aw-hdr">' +
        '<div class="aw-hdr-title">' +
          '<h2>' + I.acc + ' ' + (L.menuTitle || 'תפריט נגישות') + '</h2>' +
          '<div class="aw-hdr-sub">' + (L.compliance || 'ת"י 5568 | WCAG 2.1 AAA') + '</div>' +
        '</div>' +
        '<div class="aw-hdr-btns">' +
          '<button class="aw-hdr-btn" id="aw-close" aria-label="' + (L.closeMenu || 'סגור') + '" type="button">' + I.cls + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="aw-search">' +
        '<input type="text" id="aw-srch" placeholder="' + (L.searchPlaceholder || 'חיפוש...') + '" aria-label="' + (L.searchPlaceholder || 'חיפוש') + '" />' +
      '</div>' +
      '<div class="aw-body" id="aw-body">' +

      // Profiles Section
      '<div class="aw-sec" data-sec="profiles">' +
        '<div class="aw-sec-title">' + I.prof + ' ' + (L.sections && L.sections.profiles ? L.sections.profiles : 'פרופילים מומלצים') + '</div>' +
        '<div class="aw-profiles-grid">' +
          '<button class="aw-prof-card" data-profile="seizure" type="button">' +
            '<div class="aw-prof-top"><span class="aw-prof-title">' + (L.profiles && L.profiles.seizure ? L.profiles.seizure : 'בטוח לאפילפסיה') + '</span><span class="aw-prof-toggle"></span></div>' +
            '<div class="aw-prof-desc">' + (L.profiles && L.profiles.seizureDesc ? L.profiles.seizureDesc : 'עצירת אנימציות') + '</div>' +
          '</button>' +
          '<button class="aw-prof-card" data-profile="vision" type="button">' +
            '<div class="aw-prof-top"><span class="aw-prof-title">' + (L.profiles && L.profiles.vision ? L.profiles.vision : 'לקויי ראייה') + '</span><span class="aw-prof-toggle"></span></div>' +
            '<div class="aw-prof-desc">' + (L.profiles && L.profiles.visionDesc ? L.profiles.visionDesc : 'ניגודיות והגדלת טקסט') + '</div>' +
          '</button>' +
          '<button class="aw-prof-card" data-profile="adhd" type="button">' +
            '<div class="aw-prof-top"><span class="aw-prof-title">' + (L.profiles && L.profiles.adhd ? L.profiles.adhd : 'הפרעות קשב (ADHD)') + '</span><span class="aw-prof-toggle"></span></div>' +
            '<div class="aw-prof-desc">' + (L.profiles && L.profiles.adhdDesc ? L.profiles.adhdDesc : 'מסכת קריאה ומיקוד') + '</div>' +
          '</button>' +
          '<button class="aw-prof-card" data-profile="keyboard" type="button">' +
            '<div class="aw-prof-top"><span class="aw-prof-title">' + (L.profiles && L.profiles.keyboard ? L.profiles.keyboard : 'ניווט מקלדת') + '</span><span class="aw-prof-toggle"></span></div>' +
            '<div class="aw-prof-desc">' + (L.profiles && L.profiles.keyboardDesc ? L.profiles.keyboardDesc : 'הדגשת פוקוס ברורה') + '</div>' +
          '</button>' +
        '</div>' +
      '</div>' +

      // Display & Font Section
      '<div class="aw-sec" data-sec="display">' +
        '<div class="aw-sec-title">' + I.txt + ' ' + (L.sections && L.sections.display ? L.sections.display : 'התאמות תצוגה') + '</div>' +
        '<div class="aw-sld" data-feat="fontSize">' +
          '<label>' + I.txt + ' ' + (L.sliders && L.sliders.fontSize ? L.sliders.fontSize : 'גודל טקסט') + '</label>' +
          '<button id="aw-fs-dec" aria-label="' + (L.sliders && L.sliders.fontSizeDec ? L.sliders.fontSizeDec : 'הקטן') + '" type="button">−</button>' +
          '<span class="aw-val" id="aw-fs-val">100%</span>' +
          '<button id="aw-fs-inc" aria-label="' + (L.sliders && L.sliders.fontSizeInc ? L.sliders.fontSizeInc : 'הגדל') + '" type="button">+</button>' +
        '</div>' +
        '<div class="aw-sld" data-feat="lineHeight">' +
          '<label>' + I.lh + ' ' + (L.sliders && L.sliders.lineHeight ? L.sliders.lineHeight : 'גובה שורה') + '</label>' +
          '<button id="aw-lh-dec" aria-label="' + (L.sliders && L.sliders.lineHeightDec ? L.sliders.lineHeightDec : 'הקטן') + '" type="button">−</button>' +
          '<span class="aw-val" id="aw-lh-val">' + ((L.sliders && L.sliders.normal) || 'רגיל') + '</span>' +
          '<button id="aw-lh-inc" aria-label="' + (L.sliders && L.sliders.lineHeightInc ? L.sliders.lineHeightInc : 'הגדל') + '" type="button">+</button>' +
        '</div>' +
        '<div class="aw-sld" data-feat="letterSpacing">' +
          '<label>' + I.ls + ' ' + (L.sliders && L.sliders.letterSpacing ? L.sliders.letterSpacing : 'ריווח אותיות') + '</label>' +
          '<button id="aw-ls-dec" aria-label="' + (L.sliders && L.sliders.letterSpacingDec ? L.sliders.letterSpacingDec : 'הקטן') + '" type="button">−</button>' +
          '<span class="aw-val" id="aw-ls-val">' + ((L.sliders && L.sliders.normal) || 'רגיל') + '</span>' +
          '<button id="aw-ls-inc" aria-label="' + (L.sliders && L.sliders.letterSpacingInc ? L.sliders.letterSpacingInc : 'הגדל') + '" type="button">+</button>' +
        '</div>' +
        '<div class="aw-sld" data-feat="wordSpacing">' +
          '<label>' + I.ws + ' ' + (L.sliders && L.sliders.wordSpacing ? L.sliders.wordSpacing : 'ריווח מילים') + '</label>' +
          '<button id="aw-ws-dec" aria-label="' + (L.sliders && L.sliders.wordSpacingDec ? L.sliders.wordSpacingDec : 'הקטן') + '" type="button">−</button>' +
          '<span class="aw-val" id="aw-ws-val">' + ((L.sliders && L.sliders.normal) || 'רגיל') + '</span>' +
          '<button id="aw-ws-inc" aria-label="' + (L.sliders && L.sliders.wordSpacingInc ? L.sliders.wordSpacingInc : 'הגדל') + '" type="button">+</button>' +
        '</div>' +
      '</div>' +

      // Colors Section
      '<div class="aw-sec" data-sec="color">' +
        '<div class="aw-sec-title">' + I.ct + ' ' + (L.sections && L.sections.color ? L.sections.color : 'צבעים וניגודיות') + '</div>' +
        '<div class="aw-btn-grid">' +
          '<button class="aw-btn" data-action="contrast" aria-pressed="false" type="button">' +
            I.ct + '<span class="aw-btn-label">' + (L.features && L.features.contrast ? L.features.contrast : 'ניגודיות') + '</span><span class="aw-badge">AAA</span></button>' +
          '<button class="aw-btn" data-action="saturation" aria-pressed="false" type="button">' +
            I.sat + '<span class="aw-btn-label">' + (L.features && L.features.saturation ? L.features.saturation : 'רוויה') + '</span></button>' +
          '<button class="aw-btn" data-action="invertColors" aria-pressed="false" type="button">' +
            I.inv + '<span class="aw-btn-label">' + (L.features && L.features.invertColors ? L.features.invertColors : 'היפוך צבעים') + '</span></button>' +
          '<button class="aw-btn" data-action="textAlign" aria-pressed="false" type="button">' +
            I.aln + '<span class="aw-btn-label">' + (L.features && L.features.textAlign ? L.features.textAlign : 'יישור טקסט') + '</span></button>' +
        '</div>' +
      '</div>' +

      // Content & Reading Section
      '<div class="aw-sec" data-sec="content">' +
        '<div class="aw-sec-title">' + I.fnt + ' ' + (L.sections && L.sections.content ? L.sections.content : 'תוכן וקריאה') + '</div>' +
        '<div class="aw-btn-grid">' +
          '<button class="aw-btn" data-action="highlightLinks" aria-pressed="false" type="button">' +
            I.lnk + '<span class="aw-btn-label">' + (L.features && L.features.highlightLinks ? L.features.highlightLinks : 'הדגשת קישורים') + '</span></button>' +
          '<button class="aw-btn" data-action="highlightHeadings" aria-pressed="false" type="button">' +
            I.hdg + '<span class="aw-btn-label">' + (L.features && L.features.highlightHeadings ? L.features.highlightHeadings : 'הדגשת כותרות') + '</span></button>' +
          '<button class="aw-btn" data-action="readableFont" aria-pressed="false" type="button">' +
            I.fnt + '<span class="aw-btn-label">' + (L.features && L.features.readableFont ? L.features.readableFont : 'גופן קריא') + '</span></button>' +
          '<button class="aw-btn" data-action="dyslexiaFont" aria-pressed="false" type="button">' +
            I.dyx + '<span class="aw-btn-label">' + (L.features && L.features.dyslexiaFont ? L.features.dyslexiaFont : 'גופן לדיסלקציה') + '</span></button>' +
          '<button class="aw-btn" data-action="hideImages" aria-pressed="false" type="button">' +
            I.img + '<span class="aw-btn-label">' + (L.features && L.features.hideImages ? L.features.hideImages : 'הסתרת תמונות') + '</span></button>' +
          '<button class="aw-btn" data-action="readingGuide" aria-pressed="false" type="button">' +
            I.gd + '<span class="aw-btn-label">' + (L.features && L.features.readingGuide ? L.features.readingGuide : 'סרגל קריאה') + '</span></button>' +
          '<button class="aw-btn" data-action="readingMask" aria-pressed="false" type="button">' +
            I.msk + '<span class="aw-btn-label">' + (L.features && L.features.readingMask ? L.features.readingMask : 'מסכת קריאה') + '</span></button>' +
          '<button class="aw-btn" data-action="tooltips" aria-pressed="false" type="button">' +
            I.tip + '<span class="aw-btn-label">' + (L.features && L.features.tooltips ? L.features.tooltips : 'הצגת תיאורים') + '</span></button>' +
        '</div>' +
      '</div>' +

      // Navigation & Interaction Section
      '<div class="aw-sec" data-sec="nav">' +
        '<div class="aw-sec-title">' + I.kbd + ' ' + (L.sections && L.sections.nav ? L.sections.nav : 'ניווט ומקלדת') + '</div>' +
        '<div class="aw-btn-grid">' +
          '<button class="aw-btn" data-action="stopAnimations" aria-pressed="false" type="button">' +
            I.ani + '<span class="aw-btn-label">' + (L.features && L.features.stopAnimations ? L.features.stopAnimations : 'עצירת אנימציות') + '</span><span class="aw-badge">AAA</span></button>' +
          '<button class="aw-btn" data-action="keyboardNav" aria-pressed="false" type="button">' +
            I.kbd + '<span class="aw-btn-label">' + (L.features && L.features.keyboardNav ? L.features.keyboardNav : 'ניווט מקלדת') + '</span></button>' +
          '<button class="aw-btn" data-action="focusHighlight" aria-pressed="false" type="button">' +
            I.fcs + '<span class="aw-btn-label">' + (L.features && L.features.focusHighlight ? L.features.focusHighlight : 'הדגשת פוקוס') + '</span><span class="aw-badge">AAA</span></button>' +
          '<button class="aw-btn" data-action="ttsEnabled" aria-pressed="false" type="button">' +
            I.spk + '<span class="aw-btn-label">' + (L.features && L.features.ttsEnabled ? L.features.ttsEnabled : 'הקראת טקסט') + '</span></button>' +
          '<button class="aw-btn" data-action="bigCursor" aria-pressed="false" type="button">' +
            I.cur + '<span class="aw-btn-label">' + (L.features && L.features.bigCursor ? L.features.bigCursor : 'סמן מוגדל') + '</span></button>' +
          '<button class="aw-btn" data-action="pageStructure" aria-pressed="false" type="button">' +
            I.str + '<span class="aw-btn-label">' + (L.features && L.features.pageStructure ? L.features.pageStructure : 'מבנה הדף') + '</span></button>' +
        '</div>' +
      '</div>' +

      '<button class="aw-rst" id="aw-rst" type="button">' + I.rst + ' ' + (L.reset || 'איפוס הגדרות') + '</button>' +
      '</div>' +

      // Panel Footer
      '<div class="aw-ftr">' +
        '<div class="aw-ftr-links">' +
          '<button class="aw-link-btn" id="aw-open-statement" type="button">' + I.doc + ' ' + (L.statementLink || 'הצהרת נגישות') + '</button>' +
          '<span>·</span>' +
          '<button class="aw-link-btn" id="aw-open-report" type="button">' + I.flag + ' ' + (L.reportIssue || 'דיווח תקלה') + '</button>' +
        '</div>' +
        '<div class="aw-ftr-compliance">' + (L.compliance || 'ת"י 5568 | AAA') + '</div>' +
      '</div>';

    document.body.appendChild(panel);

    // ─── 4. Structure Panel ───
    var structPanel = document.createElement('div');
    structPanel.id = 'aw-struct';
    structPanel.setAttribute('role', 'navigation');
    structPanel.setAttribute('aria-label', (L.structure && L.structure.title) || 'Page Structure');
    structPanel.setAttribute('data-pos', POSITION);
    structPanel.setAttribute('data-dir', DIR);
    document.body.appendChild(structPanel);

    // ─── 5. Floating Trigger Button ───
    var toggle = document.createElement('button');
    toggle.id = 'aw-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', L.openMenu || 'תפריט נגישות');
    toggle.setAttribute('title', L.menuTitle || 'תפריט נגישות');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('data-pos', POSITION);
    toggle.innerHTML = I.acc;
    document.body.appendChild(toggle);

    // ─── 6. Screen Reader Announcer ───
    var sr = document.createElement('div');
    sr.setAttribute('role', 'status');
    sr.setAttribute('aria-live', 'polite');
    sr.setAttribute('aria-atomic', 'true');
    sr.className = 'aw-sr';
    document.body.appendChild(sr);
    function announce(text) {
      sr.textContent = '';
      setTimeout(function () { sr.textContent = text; }, 50);
    }

    // ─── 7. Built-in Accessibility Statement Modal ───
    var modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'aw-modal-backdrop';
    modalBackdrop.setAttribute('role', 'dialog');
    modalBackdrop.setAttribute('aria-modal', 'true');
    modalBackdrop.setAttribute('aria-label', (L.statementModal && L.statementModal.title) || 'הצהרת נגישות');

    var clientDisplay = CLIENT_NAME ? escapeHtml(CLIENT_NAME) : (document.title || 'האתר');
    var coordNameDisplay = COORD_NAME ? escapeHtml(COORD_NAME) : 'הנהלת האתר';
    var coordPhoneDisplay = COORD_PHONE ? escapeHtml(COORD_PHONE) : 'פנייה דרך טופס צור קשר באתר';
    var coordEmailDisplay = COORD_EMAIL ? escapeHtml(COORD_EMAIL) : '';
    var physicalDisplay = PHYSICAL_ACCESS ? escapeHtml(PHYSICAL_ACCESS) : ((L.statementModal && L.statementModal.physicalDefault) || 'משרדינו מונגשים ומאפשרים גישה נוחה, חניית נכים בקרבת מקום ומעברים מותאמים.');
    var dateDisplay = STATEMENT_DATE ? escapeHtml(STATEMENT_DATE) : 'ספטמבר 2026';

    var reportMailSubject = encodeURIComponent('דיווח על תקלת נגישות באתר - ' + (CLIENT_NAME || document.location.hostname));
    var reportMailBody = encodeURIComponent('שלום רב לרכז/ת הנגישות,\n\nברצוני לדווח על בעיית נגישות שבה נתקלתי באתר:\nכתובת העמוד: ' + window.location.href + '\nדפדפן ומכשיר: ' + navigator.userAgent + '\n\nתיאור התקלה או הקושי:\n');
    var mailtoHref = coordEmailDisplay ? ('mailto:' + coordEmailDisplay + '?subject=' + reportMailSubject + '&body=' + reportMailBody) : ('mailto:?subject=' + reportMailSubject + '&body=' + reportMailBody);

    var M = L.statementModal || {};
    modalBackdrop.innerHTML =
      '<div id="aw-statement-modal" data-dir="' + DIR + '">' +
        '<div class="aw-modal-hdr">' +
          '<h3>' + I.doc + ' ' + (M.title || 'הצהרת נגישות') + ' — ' + clientDisplay + '</h3>' +
          '<button class="aw-modal-close" id="aw-modal-close" aria-label="' + (M.close || 'סגור') + '" type="button">' + I.cls + '</button>' +
        '</div>' +
        '<div class="aw-modal-body">' +
          '<div class="aw-modal-sec">' +
            '<span class="aw-modal-badge">תקן ישראלי ת"י 5568 | WCAG 2.1 AA</span>' +
            '<p>' + (M.intro || 'אנו רואים חשיבות עליונה במתן שירות שוויוני, מכובד ונגיש לכלל האוכלוסייה.') + '</p>' +
          '</div>' +
          '<div class="aw-modal-sec">' +
            '<h4>' + (M.standardTitle || 'תאימות לתקנים וחקיקה') + '</h4>' +
            '<p>' + (M.standardText || 'אתר זה נבנה והותאם בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, ולתקן הישראלי ת"י 5568 ברמה AA.') + '</p>' +
          '</div>' +
          '<div class="aw-modal-sec">' +
            '<h4>' + (M.featuresTitle || 'התאמות הנגישות באתר') + '</h4>' +
            '<p>' + (M.featuresText || 'באתר מופעל תפריט נגישות המאפשר התאמות אישיות של גופן, צבעים, ניגודיות, ניווט מקלדת ועצירת הבהובים.') + '</p>' +
          '</div>' +
          '<div class="aw-modal-sec">' +
            '<h4>' + (M.physicalTitle || 'הסדרי נגישות פיזיים במבנה') + '</h4>' +
            '<p>' + physicalDisplay + '</p>' +
          '</div>' +
          '<div class="aw-modal-sec">' +
            '<h4>' + (M.coordinatorTitle || 'פרטי רכז/ת הנגישות') + '</h4>' +
            '<p>' + (M.coordinatorDesc || 'לשאלות, בירורים או בקשות הנגשה אישיות ניתן ליצור קשר:') + '</p>' +
            '<div class="aw-coord-card">' +
              '<div class="aw-coord-row"><strong>' + (M.coordinatorName || 'שם:') + '</strong> <span>' + coordNameDisplay + '</span></div>' +
              '<div class="aw-coord-row"><strong>' + (M.coordinatorPhone || 'טלפון:') + '</strong> ' + (COORD_PHONE ? '<a href="tel:' + COORD_PHONE.replace(/[^0-9+]/g, '') + '">' + coordPhoneDisplay + '</a>' : '<span>' + coordPhoneDisplay + '</span>') + '</div>' +
              (coordEmailDisplay ? '<div class="aw-coord-row"><strong>' + (M.coordinatorEmail || 'דוא"ל:') + '</strong> <a href="mailto:' + coordEmailDisplay + '">' + coordEmailDisplay + '</a></div>' : '') +
            '</div>' +
          '</div>' +
          '<div class="aw-modal-sec">' +
            '<h4>' + (M.reportTitle || 'נתקלתם בבעיית נגישות? ספרו לנו') + '</h4>' +
            '<p>' + (M.reportDesc || 'אם נתקלתם בקושי או ברכיב שאינו נגיש כראוי, נשמח שתפנו אלינו כדי שנתקן זאת בהקדם.') + '</p>' +
            '<a class="aw-report-btn" href="' + mailtoHref + '">' + I.flag + ' ' + (M.reportBtn || 'שליחת דיווח לרכז הנגישות') + '</a>' +
          '</div>' +
          '<div class="aw-modal-date">' + (M.lastUpdated || 'תאריך עדכון אחרון:') + ' ' + dateDisplay + '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modalBackdrop);

    function openStatementModal() {
      if (STATEMENT_URL) {
        window.open(STATEMENT_URL, '_blank', 'noopener');
        return;
      }
      modalBackdrop.classList.add('aw-modal-open');
      var closeBtn = document.getElementById('aw-modal-close');
      if (closeBtn) closeBtn.focus();
    }
    function closeStatementModal() {
      modalBackdrop.classList.remove('aw-modal-open');
      var openBtn = document.getElementById('aw-open-statement');
      if (openBtn) openBtn.focus();
    }

    document.getElementById('aw-open-statement').addEventListener('click', openStatementModal);
    document.getElementById('aw-open-report').addEventListener('click', function () {
      openStatementModal();
      var reportBtn = modalBackdrop.querySelector('.aw-report-btn');
      if (reportBtn) reportBtn.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('aw-modal-close').addEventListener('click', closeStatementModal);
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) closeStatementModal();
    });

    // ─── 8. Panel Open / Close Logic ───
    var isOpen = false;
    function openPanel() {
      isOpen = true;
      panel.classList.add('aw-open');
      toggle.setAttribute('aria-expanded', 'true');
      var cl = document.getElementById('aw-close');
      if (cl) cl.focus();
      announce(L.menuOpened || 'Accessibility menu opened');
    }
    function closePanel() {
      isOpen = false;
      panel.classList.remove('aw-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
      announce(L.menuClosed || 'Accessibility menu closed');
    }
    toggle.addEventListener('click', function () { isOpen ? closePanel() : openPanel(); });
    document.getElementById('aw-close').addEventListener('click', closePanel);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (modalBackdrop.classList.contains('aw-modal-open')) {
          closeStatementModal();
        } else if (isOpen) {
          closePanel();
        }
      }
    });

    // Search filter
    document.getElementById('aw-srch').addEventListener('input', function () {
      var q = this.value.trim().toLowerCase();
      var items = panel.querySelectorAll('.aw-btn, .aw-sld, .aw-prof-card');
      for (var i = 0; i < items.length; i++) {
        var t = (items[i].textContent || '').toLowerCase();
        items[i].style.display = (!q || t.indexOf(q) > -1) ? '' : 'none';
      }
    });

    // ─── 9. Preferences Application Engine ───
    var contrastModes = ['none', 'high', 'bw', 'wb', 'yb', 'by'];
    var satModes = ['none', 'low', 'gray', 'high'];
    var alignModes = ['none', 'center', 'right', 'left'];

    function applyAll() {
      var b = document.body;
      var docEl = document.documentElement;

      var fScale = 100 + prefs.fontSize * 10;
      docEl.style.fontSize = fScale + '%';
      var fsv = document.getElementById('aw-fs-val');
      if (fsv) fsv.textContent = fScale + '%';

      if (prefs.lineHeight > 0) b.style.lineHeight = (1.5 + prefs.lineHeight * 0.25) + '';
      else b.style.lineHeight = '';
      var lhv = document.getElementById('aw-lh-val');
      if (lhv) lhv.textContent = prefs.lineHeight === 0 ? ((L.sliders && L.sliders.normal) || 'רגיל') : '+' + prefs.lineHeight;

      b.style.letterSpacing = prefs.letterSpacing > 0 ? (prefs.letterSpacing * 0.05) + 'em' : '';
      var lsv = document.getElementById('aw-ls-val');
      if (lsv) lsv.textContent = prefs.letterSpacing === 0 ? ((L.sliders && L.sliders.normal) || 'רגיל') : '+' + prefs.letterSpacing;

      b.style.wordSpacing = prefs.wordSpacing > 0 ? (prefs.wordSpacing * 0.1) + 'em' : '';
      var wsv = document.getElementById('aw-ws-val');
      if (wsv) wsv.textContent = prefs.wordSpacing === 0 ? ((L.sliders && L.sliders.normal) || 'רגיל') : '+' + prefs.wordSpacing;

      contrastModes.forEach(function (m) { if (m !== 'none') b.classList.remove('aw-contrast-' + m); });
      if (prefs.contrast !== 'none') b.classList.add('aw-contrast-' + prefs.contrast);
      var cBtn = panel.querySelector('[data-action="contrast"]');
      if (cBtn) {
        var ci = contrastModes.indexOf(prefs.contrast);
        var lbl = cBtn.querySelector('.aw-btn-label');
        if (lbl) lbl.textContent = (L.contrastModes && L.contrastModes[ci]) || (L.features && L.features.contrast) || 'ניגודיות';
        cBtn.classList.toggle('aw-on', prefs.contrast !== 'none');
        cBtn.setAttribute('aria-pressed', prefs.contrast !== 'none' ? 'true' : 'false');
      }

      satModes.forEach(function (m) { if (m !== 'none') b.classList.remove('aw-sat-' + m); });
      if (prefs.saturation !== 'none') b.classList.add('aw-sat-' + prefs.saturation);
      var sBtn = panel.querySelector('[data-action="saturation"]');
      if (sBtn) {
        var si = satModes.indexOf(prefs.saturation);
        var lbl2 = sBtn.querySelector('.aw-btn-label');
        if (lbl2) lbl2.textContent = (L.saturationModes && L.saturationModes[si]) || (L.features && L.features.saturation) || 'רוויה';
        sBtn.classList.toggle('aw-on', prefs.saturation !== 'none');
        sBtn.setAttribute('aria-pressed', prefs.saturation !== 'none' ? 'true' : 'false');
      }

      alignModes.forEach(function (m) { if (m !== 'none') b.classList.remove('aw-align-' + m); });
      if (prefs.textAlign !== 'none') b.classList.add('aw-align-' + prefs.textAlign);
      var aBtn = panel.querySelector('[data-action="textAlign"]');
      if (aBtn) {
        var ai = alignModes.indexOf(prefs.textAlign);
        var lbl3 = aBtn.querySelector('.aw-btn-label');
        if (lbl3) lbl3.textContent = (L.alignModes && L.alignModes[ai]) || (L.features && L.features.textAlign) || 'יישור';
        aBtn.classList.toggle('aw-on', prefs.textAlign !== 'none');
        aBtn.setAttribute('aria-pressed', prefs.textAlign !== 'none' ? 'true' : 'false');
      }

      var tMap = {
        invertColors: 'aw-invert',
        highlightLinks: 'aw-hl-links',
        highlightHeadings: 'aw-hl-heads',
        readableFont: 'aw-readable',
        dyslexiaFont: 'aw-dyslexia',
        stopAnimations: 'aw-no-anim',
        keyboardNav: 'aw-kbd-nav',
        focusHighlight: 'aw-focus-hl',
        bigCursor: 'aw-big-cursor',
        hideImages: 'aw-no-img',
        tooltips: 'aw-tooltips'
      };
      Object.keys(tMap).forEach(function (k) {
        b.classList.toggle(tMap[k], !!prefs[k]);
        var btn = panel.querySelector('[data-action="' + k + '"]');
        if (btn) {
          btn.classList.toggle('aw-on', !!prefs[k]);
          btn.setAttribute('aria-pressed', prefs[k] ? 'true' : 'false');
        }
      });

      var tBtn = panel.querySelector('[data-action="ttsEnabled"]');
      if (tBtn) {
        tBtn.classList.toggle('aw-on', !!prefs.ttsEnabled);
        tBtn.setAttribute('aria-pressed', prefs.ttsEnabled ? 'true' : 'false');
      }

      rg.style.display = prefs.readingGuide ? 'block' : 'none';
      if (prefs.readingGuide) document.addEventListener('mousemove', moveGuide);
      else document.removeEventListener('mousemove', moveGuide);
      var rgBtn = panel.querySelector('[data-action="readingGuide"]');
      if (rgBtn) {
        rgBtn.classList.toggle('aw-on', !!prefs.readingGuide);
        rgBtn.setAttribute('aria-pressed', prefs.readingGuide ? 'true' : 'false');
      }

      mTop.style.display = prefs.readingMask ? 'block' : 'none';
      mBot.style.display = prefs.readingMask ? 'block' : 'none';
      if (prefs.readingMask) document.addEventListener('mousemove', moveMask);
      else document.removeEventListener('mousemove', moveMask);
      var rmBtn = panel.querySelector('[data-action="readingMask"]');
      if (rmBtn) {
        rmBtn.classList.toggle('aw-on', !!prefs.readingMask);
        rmBtn.setAttribute('aria-pressed', prefs.readingMask ? 'true' : 'false');
      }

      structPanel.classList.toggle('aw-vis', !!prefs.pageStructure);
      if (prefs.pageStructure) buildStructure();
      var psBtn = panel.querySelector('[data-action="pageStructure"]');
      if (psBtn) {
        psBtn.classList.toggle('aw-on', !!prefs.pageStructure);
        psBtn.setAttribute('aria-pressed', prefs.pageStructure ? 'true' : 'false');
      }

      // Profile cards active states
      panel.querySelectorAll('.aw-prof-card').forEach(function (card) {
        var prof = card.getAttribute('data-profile');
        card.classList.toggle('aw-on', prefs.activeProfile === prof);
      });

      savePrefs(prefs);
    }

    // ─── 10. Profiles Switcher ───
    function toggleProfile(profKey) {
      if (prefs.activeProfile === profKey) {
        // Turn off profile
        prefs.activeProfile = 'none';
        if (profKey === 'seizure') {
          prefs.stopAnimations = false;
          prefs.saturation = 'none';
        } else if (profKey === 'vision') {
          prefs.fontSize = 0;
          prefs.contrast = 'none';
          prefs.readableFont = false;
        } else if (profKey === 'adhd') {
          prefs.readingMask = false;
          prefs.stopAnimations = false;
          prefs.focusHighlight = false;
        } else if (profKey === 'keyboard') {
          prefs.keyboardNav = false;
          prefs.focusHighlight = false;
        }
      } else {
        // Activate profile
        prefs.activeProfile = profKey;
        if (profKey === 'seizure') {
          prefs.stopAnimations = true;
          prefs.saturation = 'low';
        } else if (profKey === 'vision') {
          prefs.fontSize = 2; // +20%
          prefs.contrast = 'high';
          prefs.readableFont = true;
          prefs.dyslexiaFont = false;
        } else if (profKey === 'adhd') {
          prefs.readingMask = true;
          prefs.readingGuide = false;
          prefs.stopAnimations = true;
          prefs.focusHighlight = true;
        } else if (profKey === 'keyboard') {
          prefs.keyboardNav = true;
          prefs.focusHighlight = true;
        }
      }
      applyAll();
      announce('Profile ' + (prefs.activeProfile === 'none' ? 'disabled' : profKey));
    }

    panel.querySelectorAll('.aw-prof-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var profKey = this.getAttribute('data-profile');
        toggleProfile(profKey);
      });
    });

    // ─── 11. Page Structure Builder ───
    function buildStructure() {
      var headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]');
      var landmarks = document.querySelectorAll('header,nav,main,footer,aside,section,[role="banner"],[role="navigation"],[role="main"],[role="contentinfo"],[role="complementary"]');
      var sTitle = (L.structure && L.structure.title) || 'Page Structure';
      var html = '<h3>' + I.str + ' ' + sTitle + '</h3>';

      html += '<div style="margin-bottom:6px;font-size:11px;color:#64748b;font-weight:700">' + ((L.structure && L.structure.headings) || 'כותרות') + '</div>';
      if (headings.length === 0) {
        html += '<div style="font-size:12px;color:#94a3b8;padding:4px 8px">' + ((L.structure && L.structure.noHeadings) || 'לא נמצאו כותרות') + '</div>';
      }
      for (var i = 0; i < headings.length; i++) {
        var h = headings[i];
        var isH = /^H[1-6]$/i.test(h.tagName);
        var level = isH ? h.tagName.toLowerCase() : 'h' + (h.getAttribute('aria-level') || '2');
        var text = (h.textContent || '').trim().substring(0, 50);
        if (text) {
          var safeText = escapeHtml(text);
          html += '<button class="aw-struct-item aw-struct-' + level + '" data-idx="' + i + '" title="' + safeText + '" type="button">' +
            '<strong>' + level.toUpperCase() + '</strong> ' + safeText + '</button>';
        }
      }

      html += '<div class="aw-struct-lm"><div style="font-size:11px;color:#64748b;font-weight:700;margin-bottom:6px">' + ((L.structure && L.structure.landmarks) || 'אזורים') + '</div>';
      for (var j = 0; j < landmarks.length; j++) {
        var lm = landmarks[j];
        var name = lm.getAttribute('aria-label') || lm.getAttribute('role') || lm.tagName.toLowerCase();
        html += '<button class="aw-struct-item" data-lm="' + j + '" type="button">' + escapeHtml(name) + '</button>';
      }
      html += '</div>';
      structPanel.innerHTML = html;

      structPanel.querySelectorAll('[data-idx]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var idx = parseInt(this.getAttribute('data-idx'));
          var el = headings[idx];
          if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.focus(); }
        });
      });
      structPanel.querySelectorAll('[data-lm]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var idx = parseInt(this.getAttribute('data-lm'));
          var el = landmarks[idx];
          if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); el.focus(); }
        });
      });
    }

    // ─── 12. Text to Speech ───
    function speak(text) {
      if (!prefs.ttsEnabled) return;
      try {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(text);
        u.lang = L.lang || (LANG === 'he' ? 'he-IL' : 'en-US');
        u.rate = 0.95;
        window.speechSynthesis.speak(u);
      } catch (e) {}
    }

    document.addEventListener('click', function (e) {
      if (!prefs.ttsEnabled) return;
      var el = e.target;
      if (el && el.closest && !el.closest('#aw-panel') && !el.closest('#aw-toggle') && !el.closest('#aw-struct') && !el.closest('#aw-modal-backdrop')) {
        var validTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'A', 'SPAN', 'BUTTON', 'LI', 'LABEL'];
        if (validTags.indexOf(el.tagName) !== -1) {
          var t = (el.textContent || '').trim();
          if (t.length > 0 && t.length < 3000) speak(t);
        }
      }
    });

    // ─── 13. Sliders Binding ───
    function bindSlider(decId, incId, key, max, min) {
      document.getElementById(incId).addEventListener('click', function () {
        if (prefs[key] < max) {
          prefs[key]++;
          prefs.activeProfile = 'none';
          applyAll();
          announce(((L.announce && L.announce[key]) || key) + ': +' + prefs[key]);
        }
      });
      document.getElementById(decId).addEventListener('click', function () {
        if (prefs[key] > min) {
          prefs[key]--;
          prefs.activeProfile = 'none';
          applyAll();
          announce(((L.announce && L.announce[key]) || key) + ': ' + (prefs[key] === 0 ? ((L.sliders && L.sliders.normal) || 'normal') : '+' + prefs[key]));
        }
      });
    }
    bindSlider('aw-fs-dec', 'aw-fs-inc', 'fontSize', 20, -5);
    bindSlider('aw-lh-dec', 'aw-lh-inc', 'lineHeight', 8, 0);
    bindSlider('aw-ls-dec', 'aw-ls-inc', 'letterSpacing', 10, 0);
    bindSlider('aw-ws-dec', 'aw-ws-inc', 'wordSpacing', 10, 0);

    // ─── 14. Action Buttons Binding ───
    panel.querySelector('[data-action="contrast"]').addEventListener('click', function () {
      var i = contrastModes.indexOf(prefs.contrast);
      prefs.contrast = contrastModes[(i + 1) % contrastModes.length];
      prefs.activeProfile = 'none';
      applyAll();
      announce(L.contrastModes ? L.contrastModes[contrastModes.indexOf(prefs.contrast)] : prefs.contrast);
    });
    panel.querySelector('[data-action="saturation"]').addEventListener('click', function () {
      var i = satModes.indexOf(prefs.saturation);
      prefs.saturation = satModes[(i + 1) % satModes.length];
      prefs.activeProfile = 'none';
      applyAll();
      announce(L.saturationModes ? L.saturationModes[satModes.indexOf(prefs.saturation)] : prefs.saturation);
    });
    panel.querySelector('[data-action="textAlign"]').addEventListener('click', function () {
      var i = alignModes.indexOf(prefs.textAlign);
      prefs.textAlign = alignModes[(i + 1) % alignModes.length];
      applyAll();
      announce(L.alignModes ? L.alignModes[alignModes.indexOf(prefs.textAlign)] : prefs.textAlign);
    });

    var boolActions = ['invertColors','highlightLinks','highlightHeadings','readableFont','dyslexiaFont','stopAnimations','keyboardNav','focusHighlight','bigCursor','readingGuide','readingMask','ttsEnabled','tooltips','hideImages','pageStructure'];
    boolActions.forEach(function (action) {
      var btn = panel.querySelector('[data-action="' + action + '"]');
      if (!btn) return;
      btn.addEventListener('click', function () {
        prefs[action] = !prefs[action];
        prefs.activeProfile = 'none';
        if (action === 'ttsEnabled' && !prefs.ttsEnabled) { try { window.speechSynthesis.cancel(); } catch (e) {} }
        if (action === 'readingGuide' && prefs.readingGuide) prefs.readingMask = false;
        if (action === 'readingMask' && prefs.readingMask) prefs.readingGuide = false;
        if (action === 'readableFont' && prefs.readableFont) prefs.dyslexiaFont = false;
        if (action === 'dyslexiaFont' && prefs.dyslexiaFont) prefs.readableFont = false;
        applyAll();
        var labelEl = btn.querySelector('.aw-btn-label');
        var label = labelEl ? labelEl.textContent : action;
        announce(label + ': ' + (prefs[action] ? (L.on || 'on') : (L.off || 'off')));
      });
    });

    // ─── 15. Reset Button ───
    document.getElementById('aw-rst').addEventListener('click', function () {
      prefs = Object.assign({}, defaults);
      document.documentElement.style.fontSize = '';
      document.body.style.lineHeight = '';
      document.body.style.letterSpacing = '';
      document.body.style.wordSpacing = '';
      try { window.speechSynthesis.cancel(); } catch (e) {}
      applyAll();
      announce(L.resetAnnounce || 'Reset');
    });

    // ─── 16. Keyboard Focus Trap ───
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = panel.querySelectorAll('button:not([style*="display: none"]), input:not([style*="display: none"]), a:not([style*="display: none"]), [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    modalBackdrop.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = modalBackdrop.querySelectorAll('button, a, input, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    applyAll();

    window.AccessWidget = {
      open: openPanel,
      close: closePanel,
      openStatement: openStatementModal,
      closeStatement: closeStatementModal,
      reset: function () { document.getElementById('aw-rst').click(); },
      getPrefs: function () { return Object.assign({}, prefs); }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();