import { loadData, filterItems } from './data.js';
import { getProgressStats } from './storage.js';
import { renderCard } from './ui.js';
import { loadSearchIndex, searchItems } from './search.js';
import { mountLayout } from './layout.js';
import { PAGE_SIZE } from './config.js';
import { i18n } from './i18n.js';

const grid = document.getElementById('results-grid');
const search = document.getElementById('search');
const countEl = document.getElementById('result-count');
const loadMoreBtn = document.getElementById('load-more');
const params = new URLSearchParams(location.search);

let allItems = [];
let searchIndex = null;
let filtered = [];
let visibleCount = PAGE_SIZE;

function readFilters() {
  return {
    q: search?.value || params.get('q') || '',
    categoria: document.querySelector('[name=categoria]:checked')?.value || params.get('categoria') || '',
    livello: document.querySelector('[name=livello]:checked')?.value || params.get('livello') || '',
  };
}

function syncUrl(filters) {
  const p = new URLSearchParams();
  if (filters.categoria) p.set('categoria', filters.categoria);
  if (filters.livello) p.set('livello', filters.livello);
  if (filters.q) p.set('q', filters.q);
  const qs = p.toString();
  history.replaceState(null, '', qs ? `browse.html?${qs}` : 'browse.html');
}

function applyParamsToForm() {
  const cat = params.get('categoria');
  const lvl = params.get('livello');
  const q = params.get('q');
  if (cat) document.querySelector(`[name=categoria][value="${cat}"]`)?.click();
  if (lvl) document.querySelector(`[name=livello][value="${lvl}"]`)?.click();
  if (q && search) search.value = q;
}

function renderPage(reset = true) {
  if (reset) visibleCount = PAGE_SIZE;
  const slice = filtered.slice(0, visibleCount);
  grid.innerHTML = slice.length
    ? slice.map(renderCard).join('')
    : `<p class="text-zinc-500 col-span-full text-center py-12">${i18n.t('encyclopedia.no-results')}</p>`;
  countEl.textContent = `${filtered.length} ${i18n.getLang() === 'it' ? 'voci nell\'enciclopedia' : 'items in encyclopedia'}`;
  if (loadMoreBtn) {
    loadMoreBtn.classList.toggle('hidden', visibleCount >= filtered.length);
  }
}

async function init() {
  mountLayout('browse', { showSearch: false });
  allItems = await loadData();
  searchIndex = await loadSearchIndex();
  applyParamsToForm();

  const stats = getProgressStats(allItems);
  document.getElementById('progress-text').textContent =
    `${stats.done}/${stats.total} ${i18n.getLang() === 'it' ? 'completati' : 'completed'} (${stats.percent}%)`;

  const update = () => {
    const f = readFilters();
    syncUrl(f);
    let items = allItems;
    if (f.q && searchIndex.length) {
      items = searchItems(items, f.q, searchIndex);
    } else if (f.q) {
      items = searchItems(items, f.q);
    }
    filtered = filterItems(items, { categoria: f.categoria, livello: f.livello });
    renderPage(true);
  };

  search?.addEventListener('input', update);
  document.querySelectorAll('[name=categoria],[name=livello]').forEach((el) => el.addEventListener('change', update));
  loadMoreBtn?.addEventListener('click', () => {
    visibleCount += PAGE_SIZE;
    renderPage(false);
  });

  // Re-render on language change
  window.addEventListener('languageChange', () => {
    renderPage(true);
  });

  update();
}

init();
