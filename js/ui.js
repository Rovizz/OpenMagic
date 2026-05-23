import { CATEGORIA_LABEL, LIVELLO_LABEL } from './data.js';
import { isLearned } from './storage.js';
import { lessonUrl } from './routing.js';
import { escapeHtml } from './security.js';

export function badgeClass(categoria) {
  const map = {
    tecnica: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    trucco: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    cardistry: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  };
  return map[categoria] || 'bg-slate-500/20 text-slate-300';
}

export function levelDots(livello) {
  return [1, 2, 3]
    .map((n) =>
      n <= livello
        ? '<span class="inline-block w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>'
        : '<span class="inline-block w-2 h-2 rounded-full bg-slate-700"></span>'
    )
    .join('');
}

export function renderCard(item) {
  const learned = isLearned(item.id);
  const hasWiki = Boolean(item.wiki);
  const learnedIcon = learned 
    ? `<svg class="w-4 h-4 text-emerald-400 inline-block drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>` 
    : '';
  const wikiIcon = hasWiki 
    ? `<svg class="w-4 h-4 text-blue-400 inline-block drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>` 
    : '';
  return `
    <a href="${lessonUrl(item.id)}"
       class="group block glow-card p-5 h-full">
      <div class="flex items-start justify-between gap-2 mb-3">
        <span class="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border ${badgeClass(item.categoria)} font-semibold">
          ${CATEGORIA_LABEL[item.categoria] || item.categoria}
        </span>
        <span class="flex items-center gap-1.5">${learnedIcon}${wikiIcon}</span>
      </div>
      <h3 class="font-display font-bold text-lg text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2">
        ${escapeHtml(item.titolo)}
      </h3>
      <p class="text-sm text-slate-400 mt-2 line-clamp-2 font-light">${escapeHtml(item.descrizione)}</p>
      <div class="flex items-center justify-between mt-4 text-xs text-slate-500 font-medium">
        <span class="flex gap-1.5">${levelDots(item.livello)}</span>
        <span class="uppercase tracking-widest">${LIVELLO_LABEL[item.livello]}</span>
      </div>
    </a>`;
}
