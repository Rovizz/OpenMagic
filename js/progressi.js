import { loadData, getById, CATEGORIA_LABEL } from './data.js';
import { getLearned, getProgressStats } from './storage.js';
import { lessonUrl } from './routing.js';
import { escapeHtml } from './security.js';
import { mountLayout } from './layout.js';
import { i18n } from './i18n.js';

const root = document.getElementById('progress-root');

async function init() {
  mountLayout('progress', { showSearch: true });
  const items = await loadData();
  const learned = getLearned();
  const stats = getProgressStats(items);

  function renderProgress() {
    const byCat = { tecnica: [], trucco: [], cardistry: [] };
    learned.forEach((id) => {
      const item = getById(items, id);
      if (item) byCat[item.categoria].push(item);
    });

    const lang = i18n.getLang();
    const categoryLabels = {
      tecnica: lang === 'it' ? CATEGORIA_LABEL.tecnica : i18n.t('stats.technique'),
      trucco: lang === 'it' ? CATEGORIA_LABEL.trucco : i18n.t('stats.trick'),
      cardistry: lang === 'it' ? CATEGORIA_LABEL.cardistry : i18n.t('stats.cardistry'),
    };

    root.innerHTML = `
      <div class="grid md:grid-cols-3 gap-4 mb-10">
        <div class="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 text-center shadow-lg">
          <p class="text-4xl font-bold text-amber-400 font-serif">${stats.percent}%</p>
          <p class="text-sm text-zinc-400 mt-1">${lang === 'it' ? 'Completamento globale' : 'Overall completion'}</p>
        </div>
        <div class="rounded-xl glow-card p-6 text-center">
          <p class="text-4xl font-bold text-zinc-100 font-serif">${stats.done}</p>
          <p class="text-sm text-zinc-400 mt-1">${lang === 'it' ? 'Voci imparate' : 'Items learned'}</p>
        </div>
        <div class="rounded-xl glow-card p-6 text-center">
          <p class="text-4xl font-bold text-zinc-100 font-serif">${stats.total - stats.done}</p>
          <p class="text-sm text-zinc-400 mt-1">${lang === 'it' ? 'Ancora da imparare' : 'Still to learn'}</p>
        </div>
      </div>
      ${Object.entries(byCat)
        .map(([cat, list]) => {
          if (!list.length)
            return `<section class="mb-8"><h2 class="text-lg font-bold text-zinc-200 mb-2 font-serif">${categoryLabels[cat]}</h2><p class="text-zinc-500 text-sm">${lang === 'it' ? 'Nessuna voce ancora completata in questa categoria.' : 'No items completed in this category yet.'}</p></section>`;
          return `
          <section class="mb-8">
            <h2 class="text-lg font-bold text-zinc-200 mb-3 font-serif border-b border-zinc-800 pb-1.5">${categoryLabels[cat]} (${list.length})</h2>
            <ul class="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              ${list.map((i) => `
                <li class="flex items-center gap-2">
                  <svg class="w-3.5 h-3.5 text-amber-500/80 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
                  <a href="${lessonUrl(i.id)}" class="text-amber-400 hover:text-amber-300 hover:underline text-sm font-medium transition-colors">${escapeHtml(i.titolo)}</a>
                </li>`).join('')}
            </ul>
          </section>`;
        })
        .join('')}
      <p class="text-xs text-zinc-600 mt-8 flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> ${lang === 'it' ? 'I dati restano solo in questo browser. Nessun account, nessun server.' : 'Data stays only in this browser. No account, no server.'}</p>`;
  }

  renderProgress();

  // Re-render on language change
  window.addEventListener('languageChange', () => {
    renderProgress();
  });
}

init();
