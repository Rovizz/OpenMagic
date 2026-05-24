import { escapeHtml } from './security.js';
import { i18n } from './i18n.js';

export function renderWiki(wiki, itemId) {
  if (!wiki) return '';

  const sections = [];

  if (wiki.cos_e) {
    // Try to get translated content, fallback to original
    const cosEKey = `wiki.${itemId}.cos_e`;
    const cosE = i18n.t(cosEKey, wiki.cos_e);
    sections.push(block('Cos\'è', `<p>${escapeHtml(cosE)}</p>`));
  }
  if (wiki.perche) {
    const percheKey = `wiki.${itemId}.perche`;
    const perche = i18n.t(percheKey, wiki.perche);
    sections.push(block('Perché impararlo', `<p>${escapeHtml(perche)}</p>`));
  }
  if (wiki.come_praticare?.length) {
    const comePraticare = wiki.come_praticare.map((item, index) => {
      const key = `wiki.${itemId}.come_praticare.${index}`;
      return i18n.t(key, item);
    });
    sections.push(
      block(
        'Come praticare',
        `<ol class="list-decimal list-inside space-y-2 text-zinc-300">${comePraticare.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ol>`
      )
    );
  }
  if (wiki.errori_comuni?.length) {
    const erroriComuni = wiki.errori_comuni.map((item, index) => {
      const key = `wiki.${itemId}.errori_comuni.${index}`;
      return i18n.t(key, item);
    });
    sections.push(
      block(
        'Errori comuni',
        `<ul class="list-disc list-inside space-y-1 text-zinc-400">${erroriComuni.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>`
      )
    );
  }
  if (wiki.tempo_stima) {
    const tempoKey = `wiki.${itemId}.tempo_stima`;
    const tempoStima = i18n.t(tempoKey, wiki.tempo_stima);
    sections.push(
      `<p class="text-sm text-zinc-500 mt-4 flex items-center gap-1.5"><svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Tempo stimato: <span class="text-amber-400/90">${escapeHtml(tempoStima)}</span></p>`
    );
  }

  if (!sections.length) return '';

  return `
    <section class="wiki-article mt-10 border-t border-zinc-800 pt-8">
      <h2 class="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2 font-serif">
        <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
        <span>Scheda Wiki</span>
      </h2>
      <div class="space-y-6">${sections.join('')}</div>
    </section>`;
}

function block(title, body) {
  return `
    <div>
      <h3 class="text-sm font-semibold text-amber-400/90 uppercase tracking-wide mb-2">${escapeHtml(title)}</h3>
      <div class="text-zinc-300 text-sm leading-relaxed">${body}</div>
    </div>`;
}
