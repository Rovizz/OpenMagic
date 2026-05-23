import { loadData, filterItems, CATEGORIA_LABEL } from './data.js';
import { getProgressStats } from './storage.js';
import { renderCard } from './ui.js';
import { mountLayout } from './layout.js';

const grid = document.getElementById('results-grid');
const search = document.getElementById('search');
const progressEl = document.getElementById('progress-text');
const statsGrid = document.getElementById('stats-grid');

let allItems = [];

async function init() {
  mountLayout('home', { showSearch: false });
  allItems = await loadData();
  const stats = getProgressStats(allItems);

  progressEl.textContent = `${stats.done} / ${stats.total} voci segnate come imparate (${stats.percent}%)`;

  const byCat = { tecnica: 0, trucco: 0, cardistry: 0 };
  allItems.forEach((i) => byCat[i.categoria]++);
  if (statsGrid) {
    statsGrid.innerHTML = Object.entries(byCat)
      .map(
        ([cat, n]) => `
      <div class="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
        <p class="text-3xl font-display font-bold text-blue-500 mb-1">${n}</p>
        <p class="text-sm text-slate-400 uppercase tracking-widest font-semibold">${CATEGORIA_LABEL[cat]}</p>
      </div>`
      )
      .join('');
  }

  render(filterItems(allItems));
  search.addEventListener('input', () => render(filterItems(allItems, { q: search.value })));
}

function render(items) {
  if (!items.length) {
    grid.innerHTML = '<p class="text-slate-500 col-span-full text-center py-8">Nessun risultato.</p>';
    return;
  }
  grid.innerHTML = items.slice(0, 12).map(renderCard).join('');
}

init();
