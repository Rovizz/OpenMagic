import { SITE } from './config.js';
import { escapeHtml } from './security.js';

const NAV = [
  { href: 'index.html', label: 'Home', key: 'home' },
  { href: 'percorsi.html', label: 'Percorsi', key: 'paths' },
  { href: 'browse.html', label: 'Enciclopedia', key: 'browse' },
  { href: 'glossario.html', label: 'Glossario', key: 'glossary' },
  { href: 'progressi.html', label: 'Progressi', key: 'progress' },
  { href: 'missione.html', label: 'Missione', key: 'mission' },
];

export function mountLayout(active = 'home', { showSearch = true } = {}) {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (!header) return;

  const nav = NAV.map(
    (l) =>
      `<a href="${l.href}" class="text-sm whitespace-nowrap transition-colors ${active === l.key ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'}">${l.label}</a>`
  ).join('');

  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <a href="index.html" class="text-2xl font-bold tracking-tight shrink-0 font-display">
        <span class="text-blue-500">Open</span>Magic
      </a>
      <nav class="flex flex-wrap gap-4 md:gap-6 order-3 md:order-2 w-full md:w-auto justify-center">${nav}</nav>
      ${
        showSearch
          ? `<div class="w-full md:w-64 order-2 md:order-3 md:ml-auto">
        <input id="global-search" type="search" maxlength="80" autocomplete="off"
          placeholder="Cerca nell'enciclopedia…"
          class="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 placeholder:text-slate-500 shadow-inner" />
      </div>`
          : ''
      }
    </div>`;

  if (footer) {
    footer.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-sm text-slate-500">
        <div>
          <p class="font-display font-bold text-slate-300 mb-3">${escapeHtml(SITE.name)}</p>
          <p class="font-light">${escapeHtml(SITE.tagline)}. Gratuito, open knowledge, zero paywall.</p>
        </div>
        <div>
          <p class="font-display font-bold text-slate-300 mb-3">Impara</p>
          <ul class="space-y-2 font-light">
            <li><a href="percorsi.html" class="hover:text-blue-400 transition-colors">Percorsi guidati</a></li>
            <li><a href="browse.html" class="hover:text-blue-400 transition-colors">Enciclopedia</a></li>
            <li><a href="glossario.html" class="hover:text-blue-400 transition-colors">Glossario</a></li>
          </ul>
        </div>
        <div>
          <p class="font-display font-bold text-slate-300 mb-3">Privacy</p>
          <p class="font-light">Progressi solo nel tuo browser. Nessun account. Video tramite YouTube embed.</p>
        </div>
      </div>
      <p class="text-center text-xs text-slate-600 pb-8">© OpenMagic — I video appartengono ai rispettivi creator.</p>`;
  }

  const gs = document.getElementById('global-search');
  if (gs) {
    gs.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && gs.value.trim()) {
        location.href = `browse.html?q=${encodeURIComponent(gs.value.trim())}`;
      }
    });
  }
}
