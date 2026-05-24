import { loadGlossary } from './data.js';
import { lessonUrl } from './routing.js';
import { escapeHtml } from './security.js';
import { mountLayout } from './layout.js';
import { i18n } from './i18n.js';

const list = document.getElementById('glossary-list');
const search = document.getElementById('glossary-search');

let terms = [];

function render(filter = '') {
  const f = filter.trim().toLowerCase();
  const filtered = terms.filter(
    (t) => !f || t.termine.toLowerCase().includes(f) || t.definizione.toLowerCase().includes(f)
  );
  list.innerHTML = filtered.length
    ? filtered
        .map(
          (t) => `
      <article class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
        <h2 class="text-lg font-bold text-amber-400">${escapeHtml(t.termine)}</h2>
        <p class="text-zinc-300 text-sm mt-2 leading-relaxed">${escapeHtml(t.definizione)}</p>
        ${
          t.collegamenti?.length
            ? `<p class="mt-3 text-xs text-zinc-500">${i18n.getLang() === 'it' ? 'Vedi:' : 'See:'} ${t.collegamenti
                .map((id) => `<a href="${lessonUrl(id)}" class="text-amber-400/80 hover:underline">${escapeHtml(id)}</a>`)
                .join(', ')}</p>`
            : ''
        }
      </article>`
        )
        .join('')
    : `<p class="text-zinc-500">${i18n.t('glossary.no-results')}</p>`;
}

async function init() {
  mountLayout('glossary', { showSearch: true });
  terms = await loadGlossary();
  render();
  search?.addEventListener('input', () => render(search.value));

  // Re-render on language change
  window.addEventListener('languageChange', () => {
    render(search?.value || '');
  });
}

init();
