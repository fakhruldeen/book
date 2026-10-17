/* Interactive book runtime: theme, Markdown enhancements, mermaid, math, quizzes, progress. No build step. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') n.className = v; else if (k === 'text') n.textContent = v; else n.setAttribute(k, v);
    }
    n.append(...kids);
    return n;
  };
  const root = document.documentElement;

  /* ---------- storage (always guarded: may be blocked) ---------- */
  const KEY = 'book:v1';
  const store = {
    read() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } },
    write(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { /* ignore */ } },
  };
  const passedMap = () => store.read().passed || {};
  const markPassed = (num, pct) => {
    const d = store.read(); d.passed = d.passed || {};
    d.passed[num] = Math.max(d.passed[num] || 0, pct);
    store.write(d);
  };

  /* ---------- theme ---------- */
  const toggle = $('#theme-toggle');
  toggle && toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('book:theme', next); } catch (e) { /* ignore */ }
    renderMermaid();
  });

  /* ---------- Markdown enhancements (inside .md) ---------- */
  const md = $('.md');
  const ALERTS = {
    note: ['ملاحظة', 'ℹ️'], tip: ['نصيحة', '💡'], important: ['مهم', '❗'],
    warning: ['تحذير', '⚠️'], caution: ['انتباه', '🛑'],
  };

  function enhance() {
    if (!md) return;

    // GitHub alerts:  > [!NOTE]
    $$('blockquote', md).forEach(bq => {
      const p = bq.firstElementChild;
      if (!p || p.tagName !== 'P') return;
      const m = /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i.exec(p.innerHTML.replace(/<br\s*\/?>/i, '\n'));
      if (!m) return;
      const kind = m[1].toLowerCase();
      p.innerHTML = p.innerHTML.replace(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(<br\s*\/?>)?\s*/i, '');
      const box = el('div', { class: `alert alert-${kind}`, role: 'note' },
        el('p', { class: 'alert-title' }, el('span', { 'aria-hidden': 'true', text: ALERTS[kind][1] }), el('span', { text: ALERTS[kind][0] })));
      while (bq.firstChild) box.append(bq.firstChild);
      if (!p.textContent.trim() && !p.children.length) p.remove();
      bq.replaceWith(box);
    });

    // Task lists:  - [ ] / - [x]
    $$('li', md).forEach(li => {
      const first = li.firstChild;
      const target = first && first.nodeType === 3 ? first : (li.firstElementChild && li.firstElementChild.tagName === 'P' ? li.firstElementChild.firstChild : null);
      if (!target || target.nodeType !== 3) return;
      const m = /^\s*\[( |x|X)\]\s+/.exec(target.nodeValue);
      if (!m) return;
      target.nodeValue = target.nodeValue.slice(m[0].length);
      const cb = el('input', { type: 'checkbox', disabled: '' });
      if (m[1] !== ' ') cb.checked = true;
      target.parentNode.insertBefore(cb, target);
      li.classList.add('task-list-item'); li.parentElement.classList.add('task-list');
    });

    // Tables: horizontal scroll wrapper
    $$('table', md).forEach(t => { if (!t.parentElement.classList.contains('table-wrap')) { const w = el('div', { class: 'table-wrap' }); t.replaceWith(w); w.append(t); } });

    // Heading anchors (## ### #### #####) with clean slugs
    const seenIds = new Set();
    const slugify = text => {
      const s = text.trim()
        .replace(/[#*`_~\[\]()<>]/g, '')
        .trim()
        .replace(/[\s\t\n]+/g, '-')
        .replace(/[^\w\u0600-\u06FF\-]/g, '')
        .toLowerCase() || 'section';
      let candidate = s;
      let c = 1;
      while (seenIds.has(candidate) || (document.getElementById(candidate) && document.getElementById(candidate).tagName.toLowerCase()[0] !== 'h')) {
        candidate = `${s}-${c++}`;
      }
      seenIds.add(candidate);
      return candidate;
    };

    $$('h2,h3,h4,h5', md).forEach(h => {
      if (!h.id || h.id.startsWith('section')) {
        h.id = slugify(h.textContent);
      } else {
        seenIds.add(h.id);
      }
      const anchor = el('a', { class: 'anchor', href: `#${h.id}`, 'aria-label': 'رابط مباشر لهذا العنوان', text: '#' });
      anchor.addEventListener('click', e => {
        e.preventDefault();
        history.pushState(null, '', `#${h.id}`);
        h.scrollIntoView({ behavior: 'smooth' });
        try { navigator.clipboard.writeText(location.href); } catch (err) {}
      });
      h.append(anchor);
    });

    // Code blocks: language label + copy button   (skip mermaid, handled separately)
    $$('div.highlighter-rouge', md).forEach(box => {
      const lang = (box.className.match(/language-([\w+-]+)/) || [])[1];
      if (lang === 'mermaid') return;
      if (lang && lang !== 'plaintext') box.prepend(el('span', { class: 'lang', text: lang }));
      const btn = el('button', { type: 'button', class: 'copy', text: 'نسخ' });
      btn.addEventListener('click', async () => {
        const code = $('pre code', box) || $('pre', box);
        try { await navigator.clipboard.writeText(code.innerText.replace(/\n$/, '')); btn.textContent = 'تم ✓'; }
        catch (e) { btn.textContent = 'تعذّر النسخ'; }
        setTimeout(() => (btn.textContent = 'نسخ'), 1500);
      });
      box.append(btn);
    });
  }

  /* ---------- Mermaid (loaded only when needed) ---------- */
  let mermaidMod = null;
  const diagrams = [];
  function collectMermaid() {
    if (!md) return;
    $$('div.language-mermaid, pre > code.language-mermaid', md).forEach(node => {
      const src = (node.textContent || '').trim();
      const pre = el('pre', { class: 'mermaid' }); pre.textContent = src;
      (node.tagName === 'CODE' ? node.parentElement : node).replaceWith(pre);
      diagrams.push({ pre, src });
    });
  }
  async function renderMermaid() {
    if (!diagrams.length) return;
    try {
      mermaidMod = mermaidMod || (await import('https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs')).default;
      const dark = root.dataset.theme === 'dark';
      mermaidMod.initialize({
        startOnLoad: false, securityLevel: 'strict', theme: dark ? 'dark' : 'neutral',
        fontFamily: 'Cairo, system-ui, sans-serif', flowchart: { htmlLabels: true }, gantt: { useWidth: 760 },
      });
      diagrams.forEach(d => { d.pre.removeAttribute('data-processed'); d.pre.textContent = d.src; });
      await mermaidMod.run({ nodes: diagrams.map(d => d.pre) });
    } catch (e) { console.warn('mermaid failed', e); }
  }

  /* ---------- Math (kramdown emits <script type="math/tex">) ---------- */
  function loadMath() {
    if (!$('script[type^="math/tex"]')) return;
    window.MathJax = { tex2jax: { skipTags: ['pre', 'code'] }, TeX: { extensions: ['AMSmath.js', 'AMSsymbols.js'] }, showProcessingMessages: false, messageStyle: 'none' };
    document.head.append(el('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-AMS_HTML', async: '' }));
  }

  /* ---------- Reading scroll progress (line under topbar) ---------- */
  function initReadingProgress() {
    const bar = $('#progress-bar');
    if (!bar) return;
    const update = () => {
      const docEl = document.documentElement;
      const scrollTop = window.scrollY || docEl.scrollTop || 0;
      const scrollHeight = docEl.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        bar.style.width = '0%';
        return;
      }
      const pct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ---------- On-page TOC (Desktop right sidebar + Mobile collapsed details) ---------- */
  function initPageTOC() {
    if (!md) return;
    const headings = $$('h2, h3, h4, h5', md);
    if (headings.length < 1) return;

    const shell = $('#page-shell');
    const aside = $('#page-toc');
    const nav = $('#page-toc-nav');
    const toggleBtn = $('#page-toc-toggle');
    const reopenBtn = $('#page-toc-reopen');
    const wrap = $('.wrap');

    const getCleanTitle = h => {
      const clone = h.cloneNode(true);
      const a = clone.querySelector('.anchor');
      if (a) a.remove();
      return clone.textContent.trim();
    };

    if (aside && nav && shell) {
      aside.hidden = false;
      shell.classList.add('has-toc');
      if (wrap) wrap.classList.add('has-toc');

      try {
        if (localStorage.getItem('book:toc-hidden') === 'true') {
          shell.classList.add('toc-hidden');
          if (wrap) wrap.classList.add('toc-hidden');
          if (reopenBtn) reopenBtn.hidden = false;
        } else {
          shell.classList.remove('toc-hidden');
          if (wrap) wrap.classList.remove('toc-hidden');
          if (reopenBtn) reopenBtn.hidden = true;
        }
      } catch (e) {}

      headings.forEach(h => {
        const level = parseInt(h.tagName[1], 10);
        const title = getCleanTitle(h);
        const link = el('a', {
          class: `page-toc-link toc-l${level}`,
          href: `#${h.id}`,
          text: title,
          'data-target': h.id
        });
        link.addEventListener('click', ev => {
          ev.preventDefault();
          history.pushState(null, '', `#${h.id}`);
          h.scrollIntoView({ behavior: 'smooth' });
        });
        nav.append(link);
      });

      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          shell.classList.add('toc-hidden');
          if (wrap) wrap.classList.add('toc-hidden');
          if (reopenBtn) reopenBtn.hidden = false;
          try { localStorage.setItem('book:toc-hidden', 'true'); } catch (e) {}
        });
      }

      if (reopenBtn) {
        reopenBtn.addEventListener('click', () => {
          shell.classList.remove('toc-hidden');
          if (wrap) wrap.classList.remove('toc-hidden');
          reopenBtn.hidden = true;
          try { localStorage.setItem('book:toc-hidden', 'false'); } catch (e) {}
        });
      }
    }

    const mobileDetails = el('details', { class: 'page-toc-mobile' },
      el('summary', {},
        el('span', { class: 'toc-m-icon', text: '📑' }),
        el('span', { class: 'toc-m-title', text: 'محتويات هذه الصفحة' }),
        el('span', { class: 'toc-m-count', text: `(${headings.length} أقسام)` })
      )
    );
    const mobileNav = el('nav', { class: 'page-toc-nav mobile-nav' });
    headings.forEach(h => {
      const level = parseInt(h.tagName[1], 10);
      const title = getCleanTitle(h);
      const mlink = el('a', {
        class: `page-toc-link toc-l${level}`,
        href: `#${h.id}`,
        text: title,
        'data-target': h.id
      });
      mlink.addEventListener('click', ev => {
        ev.preventDefault();
        mobileDetails.removeAttribute('open');
        history.pushState(null, '', `#${h.id}`);
        h.scrollIntoView({ behavior: 'smooth' });
      });
      mobileNav.append(mlink);
    });
    mobileDetails.append(mobileNav);
    md.parentElement.insertBefore(mobileDetails, md);

    const updateScrollspy = () => {
      const scrollPos = window.scrollY + 110;
      let currentId = '';
      for (const h of headings) {
        if (h.offsetTop <= scrollPos) {
          currentId = h.id;
        } else {
          break;
        }
      }
      $$('.page-toc-link').forEach(link => {
        link.classList.toggle('active', link.dataset.target === currentId);
      });
    };
    window.addEventListener('scroll', updateScrollspy, { passive: true });
    updateScrollspy();
  }

  /* ---------- Progress (topbar, cover, TOC) ---------- */
  function progressUI() {
    const total = +document.body.dataset.total || 0;
    const done = Object.keys(passedMap()).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const pill = $('#progress-pill'); if (pill && done) { pill.hidden = false; pill.textContent = `${done}/${total} ✓`; }
    const cp = $('#cover-progress');
    if (cp && done) {
      cp.hidden = false; $('i', cp).style.width = pct + '%';
      $('span', cp).textContent = `أنجزت ${done} من ${total} اختبارًا (${pct}٪)`;
      const start = $('#start-btn'); if (start) start.textContent = 'تابع القراءة';
    }
    const passed = passedMap();
    $$('.toc-item').forEach(li => li.classList.toggle('done', li.dataset.num in passed));
    const f = $('#toc-filter');
    f && f.addEventListener('input', () => {
      const q = f.value.trim().toLowerCase();
      $$('.toc-item').forEach(li => { li.hidden = q && !li.textContent.toLowerCase().includes(q); });
    });
  }

  /* ---------- Unlock "next" ---------- */
  const next = $('#next-link');
  function setNext(unlocked) {
    if (!next) return;
    next.classList.toggle('unlocked', unlocked);
    $('.hint', next).textContent = unlocked ? next.dataset.openHint : next.dataset.lockedHint;
  }

  /* ---------- Quiz ---------- */
  const LETTERS = ['أ', 'ب', 'ج', 'د', 'هـ', 'و', 'ز', 'ح'];
  const TYPE_LABEL = { mcq: 'اختيار من متعدد', radio: 'اختيار واحد', check: 'اختيار أكثر من إجابة', scale: 'مقياس رقمي', number: 'إجابة رقمية' };
  const toNum = s => {
    const map = '٠١٢٣٤٥٦٧٨٩';
    const t = String(s).trim().replace(/[٠-٩]/g, d => map.indexOf(d)).replace(/[٫,]/g, '.').replace(/\s/g, '');
    return t === '' ? NaN : Number(t);
  };

  function buildQuestion(q, i) {
    const type = (q.type || 'mcq').toLowerCase();
    const fs = el('fieldset', { class: 'q', 'data-type': type });
    fs.append(el('legend', {}, el('span', { class: 'qn', text: String(i + 1) }),
      el('span', {}, document.createTextNode(q.q || q.question || ''), el('span', { class: 'qtype', text: `(${TYPE_LABEL[type] || type})` }))));

    if (type === 'mcq' || type === 'radio' || type === 'check') {
      const multi = type === 'check';
      const box = el('div', { class: 'opts' + (type === 'radio' ? ' inline' : '') });
      (q.options || []).forEach((o, k) => {
        const input = el('input', { type: multi ? 'checkbox' : 'radio', name: `q${i}`, value: String(k + 1) });
        const lab = el('label', { class: 'opt' }, input);
        if (type === 'mcq') lab.append(el('span', { class: 'letter', 'aria-hidden': 'true', text: LETTERS[k] || String(k + 1) }));
        lab.append(el('span', { text: o }));
        box.append(lab);
      });
      fs.append(box);
    } else if (type === 'scale') {
      const min = q.min ?? 1, max = q.max ?? 5;
      const row = el('div', { class: 'scale' });
      if (q.low) row.append(el('small', { text: q.low }));
      for (let v = min; v <= max; v++) {
        row.append(el('label', {}, el('input', { type: 'radio', name: `q${i}`, value: String(v) }), el('span', { text: String(v) })));
      }
      if (q.high) row.append(el('small', { text: q.high }));
      fs.append(row);
    } else if (type === 'number') {
      fs.append(el('input', { class: 'numin', type: 'text', inputmode: 'decimal', name: `q${i}`, autocomplete: 'off', placeholder: q.placeholder || '0', 'aria-label': 'إجابتك الرقمية' }));
    }
    fs.append(el('div', { class: 'q-fb', 'aria-live': 'polite' }));
    return fs;
  }

  // Returns { scored, ok, answered }
  function grade(q, fs) {
    const type = (q.type || 'mcq').toLowerCase();
    if (type === 'scale') return { scored: false, ok: null, answered: !!$('input:checked', fs) };
    if (type === 'number') {
      const v = toNum($('input', fs).value);
      const tol = Number(q.tolerance || 0);
      return { scored: true, answered: !Number.isNaN(v), ok: !Number.isNaN(v) && Math.abs(v - Number(q.answer)) <= tol };
    }
    const picked = $$('input:checked', fs).map(i => +i.value).sort((a, b) => a - b);
    const want = (Array.isArray(q.answer) ? q.answer : [q.answer]).map(Number).sort((a, b) => a - b);
    return { scored: true, answered: picked.length > 0, ok: picked.length === want.length && picked.every((v, k) => v === want[k]) };
  }

  function showFeedback(q, fs, g) {
    const fb = $('.q-fb', fs); fb.className = 'q-fb';
    fb.replaceChildren();
    const type = (q.type || 'mcq').toLowerCase();
    if (type === 'scale') { if (g.answered) fb.append(el('span', { class: 'v', text: 'شكرًا على تقييمك 🙏' })); return; }
    fb.classList.add(g.ok ? 'ok' : 'no');
    fb.append(el('span', { class: 'v', text: g.ok ? '✓ إجابة صحيحة' : (g.answered ? '✗ إجابة غير صحيحة' : '✗ لم تُجب بعد') }));
    if (q.explain) fb.append(el('p', { text: q.explain }));
    if (type !== 'number') {
      const want = (Array.isArray(q.answer) ? q.answer : [q.answer]).map(Number);
      $$('.opt', fs).forEach(l => {
        const inp = $('input', l); const right = want.includes(+inp.value);
        l.classList.toggle('right', right); l.classList.toggle('wrong', inp.checked && !right);
      });
    } else if (!g.ok) fb.append(el('p', { text: `الإجابة الصحيحة: ${q.answer}` }));
  }

  function initQuiz() {
    const sec = $('#quiz');
    const num = $('.content') && $('.content').dataset.num;
    if (!sec) { setNext(true); return; }                      // no quiz => nothing to unlock
    let data = [];
    try { data = JSON.parse($('#quiz-data').textContent); } catch (e) { setNext(true); return; }
    const pass = +sec.dataset.pass || 80;
    const rootEl = $('#quiz-root');
    setNext(num in passedMap());

    const draw = () => {
      rootEl.replaceChildren();
      const form = el('form', { class: 'quiz-form', novalidate: '' });
      data.forEach((q, i) => form.append(buildQuestion(q, i)));
      const result = el('div', { class: 'result', hidden: '', 'aria-live': 'polite' });
      const submit = el('button', { type: 'submit', class: 'btn primary', text: 'تحقّق من إجاباتي' });
      const retry = el('button', { type: 'button', class: 'btn', text: 'إعادة المحاولة', hidden: '' });
      retry.addEventListener('click', draw);
      form.append(el('div', { class: 'quiz-actions' }, submit, retry), result);

      form.addEventListener('submit', ev => {
        ev.preventDefault();
        let scored = 0, right = 0;
        $$('fieldset.q', form).forEach((fs, i) => {
          const g = grade(data[i], fs); showFeedback(data[i], fs, g);
          if (g.scored) { scored++; if (g.ok) right++; }
        });
        const pct = scored ? Math.round((right / scored) * 100) : 100;
        const ok = pct >= pass;
        result.hidden = false; result.className = 'result' + (ok ? ' pass' : '');
        result.replaceChildren(
          el('div', { class: 'score', text: scored ? `${right} من ${scored} — ${pct}٪` : 'شكرًا على مشاركتك' }),
          el('p', { text: ok ? '🎉 أحسنت! تم تفعيل زر الصفحة التالية أدناه.' : `تحتاج إلى ${pass}٪ لتفعيل الزر، لكنك تستطيع المتابعة في أي وقت. راجع الإجابات ثم أعد المحاولة.` }));
        retry.hidden = false;
        if (ok) { markPassed(num, pct); setNext(true); progressUI(); }
        result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
      rootEl.append(form);
    };
    draw();
  }

  /* ---------- Page SHA-256 Checksum ---------- */
  async function initPageChecksum() {
    const shaEl = $('.page-sha');
    if (!shaEl) return;
    if (shaEl.dataset.sha && shaEl.dataset.sha.trim() !== '') {
      shaEl.textContent = shaEl.dataset.sha;
      return;
    }
    const content = $('.content');
    if (!content) return;
    try {
      const text = (content.innerText || content.textContent || '').trim();
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      shaEl.textContent = hashHex.slice(0, 16);
      shaEl.setAttribute('title', `SHA-256: ${hashHex} (انقر لنسخ البصمة كاملة)`);
      shaEl.style.cursor = 'pointer';
      shaEl.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(hashHex);
          const old = shaEl.textContent;
          shaEl.textContent = 'تم النسخ ✓';
          setTimeout(() => (shaEl.textContent = old), 1500);
        } catch (e) { /* ignore */ }
      });
    } catch (e) {
      shaEl.textContent = 'غير متوفر';
    }
  }

  /* ---------- Client-side Search Engine ---------- */
  function initSearch() {
    const searchInput = $('#book-search-input');
    const searchResults = $('#book-search-results');
    const searchStats = $('#book-search-stats');
    const searchClear = $('#book-search-clear');
    if (!searchInput || !searchResults) return;

    let indexData = null;
    let isLoading = false;
    const base = document.body.dataset.base || '';

    const fetchIndex = async () => {
      if (indexData) return indexData;
      if (isLoading) return [];
      isLoading = true;
      try {
        const res = await fetch(`${base}/search.json`);
        indexData = await res.json();
        return indexData;
      } catch (e) {
        console.warn('Search index load failed', e);
        return [];
      } finally {
        isLoading = false;
      }
    };

    const normalizeArabic = text => (text || '')
      .toLowerCase()
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/[إأآا]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/[\s\t\n]+/g, ' ')
      .trim();

    const highlightMatch = (text, term) => {
      if (!term || !text) return text;
      const cleanTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${cleanTerm})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    };

    let debounceTimer = null;
    const renderResults = (matches, query) => {
      searchResults.replaceChildren();
      if (searchClear) searchClear.hidden = !query;

      if (!query.trim()) {
        if (searchStats) searchStats.textContent = '';
        searchResults.append(el('p', { class: 'search-empty-prompt', text: 'أدخل كلمة البحث في الحقل أعلاه لعرض النتائج الفورية.' }));
        return;
      }

      if (searchStats) {
        searchStats.textContent = matches.length
          ? `عُثر على ${matches.length} نتيجة مطابقة لعبارة: «${query}»`
          : `لم يتم العثور على أي نتائج تطابق: «${query}»`;
      }

      if (!matches.length) {
        searchResults.append(
          el('div', { class: 'search-no-results' },
            el('p', { text: 'جرّب استخدام كلمات مرادفة أو تقليل عدد الكلمات المدخلة.' })
          )
        );
        return;
      }

      const list = el('ul', { class: 'search-results-list' });
      matches.forEach(({ item }) => {
        const li = el('li', { class: 'search-result-item' });
        const a = el('a', { href: item.url, class: 'search-result-link' });
        
        const head = el('div', { class: 'result-head' });
        if (item.num) head.append(el('span', { class: 'result-num', dir: 'ltr', text: item.num }));
        head.append(el('h3', { class: 'result-title', text: item.title }));
        if (item.layout) head.append(el('span', { class: `result-layout-badge badge-${item.layout}`, text: item.layout }));

        const snippet = el('p', { class: 'result-snippet' });
        snippet.innerHTML = highlightMatch(item.content || '', query.split(' ')[0] || '');

        a.append(head, snippet);
        li.append(a);
        list.append(li);
      });
      searchResults.append(list);
    };

    const doSearch = async () => {
      const q = searchInput.value;
      const query = q.trim();
      if (!query) {
        renderResults([], '');
        return;
      }
      const data = await fetchIndex();
      const normQ = normalizeArabic(query);
      const terms = normQ.split(' ').filter(Boolean);

      const matches = [];
      for (const item of data) {
        const normTitle = normalizeArabic(item.title);
        const normContent = normalizeArabic(item.content);
        let score = 0;
        let matched = true;

        for (const t of terms) {
          if (normTitle.includes(t)) {
            score += 15;
          } else if (normContent.includes(t)) {
            score += 3;
          } else {
            matched = false;
            break;
          }
        }

        if (matched) {
          matches.push({ item, score });
        }
      }

      matches.sort((a, b) => b.score - a.score);
      renderResults(matches, query);
    };

    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(doSearch, 150);
    });

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        renderResults([], '');
      });
    }

    // Pre-fetch index when search input is focused or present
    searchInput.addEventListener('focus', fetchIndex, { once: true });
    if (window.location.pathname.includes('/search')) {
      fetchIndex();
    }
  }

  /* ---------- boot ---------- */
  const boot = () => {
    enhance();
    initReadingProgress();
    initPageTOC();
    collectMermaid();
    progressUI();
    initQuiz();
    initPageChecksum();
    initSearch();
    loadMath();
    renderMermaid();
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
})();
