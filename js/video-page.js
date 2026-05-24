import { loadData, getById, CATEGORIA_LABEL, LIVELLO_LABEL } from './data.js';
import { isLearned, toggleLearned } from './storage.js';
import { badgeClass } from './ui.js';
import { getLessonId, lessonUrl } from './routing.js';
import { escapeHtml, youtubeEmbedUrl, isValidLessonId } from './security.js';
import { renderWiki } from './wiki.js';
import { getDependents, getNextSuggestion, renderRelatedList } from './graph.js';
import { mountLayout } from './layout.js';
import { i18n } from './i18n.js';
import { translateStaticContent } from './translate-ui.js';

const root = document.getElementById('video-root');

async function init() {
  translateStaticContent();
  mountLayout('video', { showSearch: true });

  const id = getLessonId();
  if (!id || !isValidLessonId(id)) {
    root.innerHTML =
      `<p class="text-red-400">${i18n.t('common.error')}. Torna alla <a href="browse.html" class="underline text-amber-400">${i18n.t('nav.browse')}</a>.</p>`;
    return;
  }

  const items = await loadData();
  const item = getById(items, id);
  if (!item) {
    root.innerHTML = `<p class="text-red-400">${i18n.t('encyclopedia.no-results')}</p>`;
    return;
  }

  document.title = `${i18n.t(`item.${item.id}.title`, item.titolo)} — OpenMagic`;

  const metaDesc = document.querySelector('meta[name="description"]');
  const metaContent = `${i18n.t(`item.${item.id}.description`, item.descrizione)} - ${i18n.t('video.meta.suffix')}`;
  if (metaDesc) {
    metaDesc.setAttribute('content', metaContent);
  } else {
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = metaContent;
    document.head.appendChild(meta);
  }

  const lang = i18n.getLang();

  // Translated labels
  const categoryLabel = lang === 'it'
    ? CATEGORIA_LABEL[item.categoria]
    : i18n.t('stats.' + item.categoria, CATEGORIA_LABEL[item.categoria]);
  const levelLabel = lang === 'it'
    ? LIVELLO_LABEL[item.livello]
    : (item.livello === 1 ? 'Beginner' : item.livello === 2 ? 'Intermediate' : 'Advanced');

  const prereqs = (item.prerequisiti || [])
    .map((pid) => {
      const p = getById(items, pid);
      if (!p) return '';
      return `<a href="${lessonUrl(p.id)}" class="text-amber-400 hover:text-amber-300 underline underline-offset-2">${escapeHtml(i18n.t(`item.${p.id}.title`, p.titolo))}</a>`;
    })
    .filter(Boolean);

  const dependents = getDependents(items, item.id).slice(0, 6);
  const next = getNextSuggestion(items, item);
  const learned = isLearned(item.id);
  const yt = youtubeEmbedUrl(item.youtube_id);
  const channelUrl = item.canale.includes('52Kards')
    ? 'https://www.youtube.com/@52Kards'
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(item.canale + ' card magic')}`;

  const learnedBtnHtml = (isLearned) => isLearned
    ? `<svg class="w-5 h-5 text-white inline-block" fill="none" stroke="currentColor" stroke-width="3.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> <span>${i18n.t('video.learned')}</span>`
    : `<span>${i18n.t('video.mark-learned')}</span>`;

  root.innerHTML = `
    <nav class="text-sm text-zinc-500 mb-6">
      <a href="index.html" class="hover:text-zinc-300">${i18n.t('nav.home')}</a>
      <span class="mx-2">/</span>
      <a href="browse.html?categoria=${encodeURIComponent(item.categoria)}" class="hover:text-zinc-300">${categoryLabel}</a>
      <span class="mx-2">/</span>
      <span class="text-zinc-400">${escapeHtml(i18n.t(`item.${item.id}.title`, item.titolo))}</span>
    </nav>
    <div class="lg:grid lg:grid-cols-3 lg:gap-8">
      <div class="lg:col-span-2">
        <div class="aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-2xl">
          ${
            yt
              ? `<iframe class="w-full h-full" src="${yt}" title="${escapeHtml(i18n.t(`item.${item.id}.title`, item.titolo))}"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`
              : `<p class="p-8 text-zinc-500">${i18n.t('video.missing-video')}</p>`
          }
        </div>
        <h1 class="text-2xl md:text-3xl font-bold mt-6 text-zinc-50 font-serif">${escapeHtml(i18n.t(`item.${item.id}.title`, item.titolo))}</h1>
        <p class="text-zinc-400 mt-3 leading-relaxed">${escapeHtml(i18n.t(`item.${item.id}.description`, item.descrizione))}</p>
        ${prereqs.length ? `
        <section class="mt-8 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
          <h2 class="text-sm font-semibold text-amber-400 uppercase tracking-wide mb-2">${i18n.t('video.prereqs.heading')}</h2>
          <p class="text-zinc-300 text-sm">${i18n.t('video.prereqs.must-know')} ${prereqs.join(', ')}</p>
        </section>` : ''}
        ${next ? `
        <section class="mt-4 p-4 rounded-xl border border-zinc-700 bg-zinc-900/50">
          <h2 class="text-sm font-semibold text-zinc-400 uppercase mb-2">${i18n.t('video.next-step')}</h2>
          <a href="${lessonUrl(next.id)}" class="text-amber-400 font-medium hover:underline inline-flex items-center gap-1">
            <span>${escapeHtml(i18n.t(`item.${next.id}.title`, next.titolo))}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
          </a>
        </section>` : ''}
        ${renderWiki(item.wiki, item.id)}
      </div>
      <aside class="mt-8 lg:mt-0 space-y-4">
        <div class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 space-y-4 sticky top-24">
          <div>
            <span class="text-xs text-zinc-500 uppercase">${i18n.t('video.author')}</span>
            <p class="mt-1">
              <a href="${channelUrl}" target="_blank" rel="noopener noreferrer" class="text-amber-400 hover:underline inline-flex items-center gap-1">
                <span>${escapeHtml(item.canale)}</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            </p>
          </div>
          <div>
            <span class="text-xs text-zinc-500 uppercase">${i18n.t('video.category')}</span>
            <p class="mt-1"><span class="text-xs px-2 py-0.5 rounded-full border ${badgeClass(item.categoria)}">${categoryLabel}</span></p>
          </div>
          <div>
            <span class="text-xs text-zinc-500 uppercase">${i18n.t('video.level')}</span>
            <p class="mt-1 text-zinc-200">${levelLabel} (${item.livello}/3)</p>
          </div>
          <div>
            <span class="text-xs text-zinc-500 uppercase">${i18n.t('video.tags')}</span>
            <p class="mt-1 flex flex-wrap gap-1">${(item.tags || []).map((t) => `<span class="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">${escapeHtml(t)}</span>`).join('')}</p>
          </div>
        </div>
        <button id="learn-btn" type="button"
          class="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all inline-flex items-center justify-center gap-1.5
          ${learned ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-amber-500 hover:bg-amber-400 text-zinc-950'}">
          ${learnedBtnHtml(learned)}
        </button>
        ${dependents.length ? renderRelatedList(items, dependents.map((d) => d.id), i18n.t('video.related.unlocks')) : ''}
        <a href="browse.html?categoria=${item.categoria}" class="block text-center text-sm text-zinc-500 hover:text-zinc-300 inline-flex items-center justify-center gap-1 w-full mt-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
          <span>${i18n.t('video.back-category')}</span>
        </a>
      </aside>
    </div>`;

  document.getElementById('learn-btn').addEventListener('click', (e) => {
    const now = toggleLearned(item.id);
    const btn = e.currentTarget;
    btn.innerHTML = learnedBtnHtml(now);
    btn.className = `w-full py-4 px-6 rounded-xl font-bold text-lg transition-all inline-flex items-center justify-center gap-1.5 ${
      now ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-amber-500 hover:bg-amber-400 text-zinc-950'
    }`;
  });
}

// Re-translate on language change and re-render dynamic content
window.addEventListener('languageChange', () => {
  translateStaticContent();
  init();
});

init();
