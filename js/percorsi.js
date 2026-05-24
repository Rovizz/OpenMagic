import { loadData, loadPaths, getById, CATEGORIA_LABEL } from './data.js';
import { isLearned } from './storage.js';
import { lessonUrl } from './routing.js';
import { escapeHtml } from './security.js';
import { mountLayout } from './layout.js';
import { i18n } from './i18n.js';
import { translateStaticContent } from './translate-ui.js';

const root = document.getElementById('paths-root');

async function init() {
  translateStaticContent();
  mountLayout('paths', { showSearch: true });
  const [paths, items] = await Promise.all([loadPaths(), loadData()]);

  function renderPaths() {
    root.innerHTML = paths
      .map((path) => {
        const steps = path.steps
          .map((id) => {
            const item = getById(items, id);
            if (!item) return '';
            const done = isLearned(id);
            const stepCircle = done
              ? `<span class="w-6 h-6 rounded-full flex items-center justify-center bg-emerald-600/90 text-white shrink-0 shadow-sm"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></span>`
              : `<span class="w-6 h-6 rounded-full flex items-center justify-center border border-zinc-700 bg-zinc-950 text-zinc-600 shrink-0"><span class="w-1.5 h-1.5 rounded-full bg-zinc-700"></span></span>`;
            return `
            <li class="flex items-center gap-3 py-2 border-b border-zinc-800/80 last:border-0">
              ${stepCircle}
              <a href="${lessonUrl(id)}" class="flex-1 hover:text-amber-400 ${done ? 'text-zinc-500 line-through decoration-zinc-600' : 'text-zinc-200'}">${escapeHtml(i18n.t(`item.${item.id}.title`, item.titolo))}</a>
              <span class="text-xs text-zinc-500 font-semibold bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700/60">L${item.livello}</span>
            </li>`;
          })
          .join('');

        const doneCount = path.steps.filter((id) => isLearned(id)).length;
        const pct = Math.round((doneCount / path.steps.length) * 100);

        return `
        <article class="rounded-2xl glow-card p-6">
          <div class="flex items-start gap-4 mb-4">
            <span class="text-4xl filter drop-shadow-md select-none">${path.icona || '📚'}</span>
            <div>
              <h2 class="text-xl font-bold text-zinc-100 font-serif">${escapeHtml(i18n.t(`path.${path.id}.title`, path.titolo))}</h2>
              <p class="text-sm text-zinc-500 mt-1">${escapeHtml(i18n.t(`path.${path.id}.duration`, path.durata_stima || ''))} · ${doneCount}/${path.steps.length} (${pct}%)</p>
            </div>
          </div>
          <p class="text-zinc-400 text-sm mb-4 leading-relaxed">${escapeHtml(i18n.t(`path.${path.id}.description`, path.descrizione))}</p>
          <div class="h-2 bg-zinc-950 rounded-full mb-4 overflow-hidden border border-zinc-800">
            <div class="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500 rounded-full" style="width:${pct}%"></div>
          </div>
          <ol class="text-sm mt-4 space-y-1">${steps}</ol>
        </article>`;
      })
      .join('');
  }

  renderPaths();

  // Re-render on language change
  window.addEventListener('languageChange', () => {
    renderPaths();
  });
}

init();
