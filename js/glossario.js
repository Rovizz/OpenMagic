import { loadGlossary } from './data.js';
import { lessonUrl } from './routing.js';
import { escapeHtml } from './security.js';
import { mountLayout } from './layout.js';
import { i18n } from './i18n.js';
import { translateStaticContent } from './translate-ui.js';

const list = document.getElementById('glossary-list');
const search = document.getElementById('glossary-search');

let terms = [];

function render(filter = '') {
  const f = filter.trim().toLowerCase();
  const filtered = terms.filter((t) => {
    const term = i18n.t('glossary.term.' + t.slug, t.termine).toLowerCase();
    const def = i18n.t('glossary.definition.' + t.slug, t.definizione).toLowerCase();
    return !f || term.includes(f) || def.includes(f);
  });
  list.innerHTML = filtered.length
    ? filtered
        .map(
          (t) => `
      <article class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
        <h2 class="text-lg font-bold text-amber-400">${escapeHtml(i18n.t('glossary.term.' + t.slug, t.termine))}</h2>
        <p class="text-zinc-300 text-sm mt-2 leading-relaxed">${escapeHtml(i18n.t('glossary.definition.' + t.slug, t.definizione))}</p>
        ${
          t.collegamenti?.length
            ? `<p class="mt-3 text-xs text-zinc-500">${i18n.t('glossary.see')} ${t.collegamenti
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
  translateStaticContent();
  mountLayout('glossary', { showSearch: true });
  terms = await loadGlossary();
  render();
  search?.addEventListener('input', () => render(search.value));

  // Re-render on language change
  window.addEventListener('languageChange', () => {
    translateStaticContent();
    render(search?.value || '');
  });
}

init();
