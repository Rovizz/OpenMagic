import { SITE } from './config.js';
import { escapeHtml } from './security.js';
import { i18n } from './i18n.js';

const NAV = [
  { href: 'index.html', label: 'home', key: 'home', i18nKey: 'nav.home' },
  { href: 'percorsi.html', label: 'Percorsi', key: 'paths', i18nKey: 'nav.paths' },
  { href: 'browse.html', label: 'Enciclopedia', key: 'browse', i18nKey: 'nav.browse' },
  { href: 'glossario.html', label: 'Glossario', key: 'glossary', i18nKey: 'nav.glossary' },
  { href: 'progressi.html', label: 'Progressi', key: 'progress', i18nKey: 'nav.progress' },
  { href: 'missione.html', label: 'Missione', key: 'mission', i18nKey: 'nav.mission' },
];

function renderNav() {
  const active = window.__currentPage || 'home';
  return NAV.map(
    (l) =>
      `<a href="${l.href}" class="text-sm whitespace-nowrap transition-colors ${active === l.key ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'}">${i18n.t(l.i18nKey, l.label)}</a>`
  ).join('');
}

function renderLangToggle() {
  const currentLang = i18n.getLang();
  const toggleLang = currentLang === 'it' ? 'en' : 'it';
  const toggleLabel = toggleLang.toUpperCase();
  
  return `
    <button id="lang-toggle" class="text-sm px-2 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-slate-200 whitespace-nowrap" data-lang="${toggleLang}">
      ${toggleLabel}
    </button>`;
}

export function mountLayout(active = 'home', { showSearch = true } = {}) {
  window.__currentPage = active;
  
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (!header) return;

  const nav = renderNav();
  const langToggle = renderLangToggle();

  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <a href="index.html" class="text-2xl font-bold tracking-tight shrink-0 font-display">
        <span class="text-blue-500">Open</span>Magic
      </a>
      <nav class="flex flex-wrap gap-4 md:gap-6 order-3 md:order-2 w-full md:w-auto justify-center">${nav}</nav>
      <div class="flex items-center gap-2 order-2 md:order-3 md:ml-auto">
        ${langToggle}
        ${
          showSearch
            ? `<div class="hidden sm:block">
          <input id="global-search" type="search" maxlength="80" autocomplete="off"
            placeholder="${i18n.t('encyclopedia.search')}"
            class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 placeholder:text-slate-500 shadow-inner" />
        </div>`
            : ''
        }
      </div>
    </div>`;

  // Setup language toggle
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const newLang = langBtn.dataset.lang;
      i18n.setLang(newLang);
      window.location.reload();
    });
  }

  if (footer) {
    footer.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-sm text-slate-500">
        <div>
          <p class="font-display font-bold text-slate-300 mb-3">${escapeHtml(SITE.name)}</p>
          <p class="font-light">${i18n.t('footer.tagline')} ${i18n.t('footer.free')}</p>
        </div>
        <div>
          <p class="font-display font-bold text-slate-300 mb-3">${i18n.t('footer.learn')}</p>
          <ul class="space-y-2 font-light">
            <li><a href="percorsi.html" class="hover:text-blue-400 transition-colors">${i18n.t('nav.paths')}</a></li>
            <li><a href="browse.html" class="hover:text-blue-400 transition-colors">${i18n.t('nav.browse')}</a></li>
            <li><a href="glossario.html" class="hover:text-blue-400 transition-colors">${i18n.t('nav.glossary')}</a></li>
          </ul>
        </div>
        <div>
          <p class="font-display font-bold text-slate-300 mb-3">Privacy</p>
          <p class="font-light">${i18n.t('footer.privacy-text')}</p>
        </div>
      </div>
      <p class="text-center text-xs text-slate-600 pb-8">© OpenMagic — ${i18n.t('footer.copyright')}</p>`;
  }

  const gs = document.getElementById('global-search');
  if (gs) {
    gs.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && gs.value.trim()) {
        location.href = `browse.html?q=${encodeURIComponent(gs.value.trim())}`;
      }
    });
  }

  // Re-render nav on language change
  window.addEventListener('languageChange', () => {
    const header = document.getElementById('site-header');
    if (header) {
      const nav = renderNav();
      const langToggle = renderLangToggle();
      // Update navigation part while preserving other elements
      const navContainer = header.querySelector('nav');
      const langBtn = header.querySelector('#lang-toggle');
      if (navContainer) navContainer.innerHTML = nav.split('</nav>')[0].replace('<nav class="flex flex-wrap gap-4 md:gap-6 order-3 md:order-2 w-full md:w-auto justify-center">', '');
      // Simpler: just reload
    }
  });
}
