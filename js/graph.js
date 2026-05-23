import { getById } from './data.js';
import { lessonUrl } from './routing.js';
import { escapeHtml } from './security.js';
import { isLearned } from './storage.js';

/** Voci che richiedono questa come prerequisito. */
export function getDependents(items, itemId) {
  return items.filter((i) => (i.prerequisiti || []).includes(itemId));
}

/** Prossimo passo consigliato nel percorso naturale (livello + categoria), preferendo voci non apprese. */
export function getNextSuggestion(items, current) {
  // 1. Cerca prima voci dipendenti dirette non ancora apprese
  const depUnlearned = getDependents(items, current.id).filter((i) => !isLearned(i.id));
  if (depUnlearned.length) return depUnlearned[0];

  // 2. Altrimenti cerca voci della stessa categoria e livello non ancora apprese
  const sameCatUnlearned = items.filter(
    (i) =>
      i.categoria === current.categoria &&
      i.livello === current.livello &&
      i.id !== current.id &&
      !isLearned(i.id) &&
      (i.prerequisiti || []).every((p) => p !== current.id)
  );
  if (sameCatUnlearned.length) return sameCatUnlearned[0];

  // 3. Altrimenti cerca voci del livello successivo non ancora apprese
  const nextLevelUnlearned = items.filter(
    (i) =>
      i.categoria === current.categoria &&
      i.livello === current.livello + 1 &&
      !isLearned(i.id)
  );
  if (nextLevelUnlearned.length) return nextLevelUnlearned[0];

  // Fallback: se tutto è già appreso, consiglia le prime disponibili
  const dep = getDependents(items, current.id);
  if (dep.length) return dep[0];

  const sameCat = items.filter(
    (i) =>
      i.categoria === current.categoria &&
      i.livello === current.livello &&
      i.id !== current.id &&
      (i.prerequisiti || []).every((p) => p !== current.id)
  );
  if (sameCat.length) return sameCat[0];

  const nextLevel = items.filter(
    (i) => i.categoria === current.categoria && i.livello === current.livello + 1
  );
  if (nextLevel.length) return nextLevel[0];

  return null;
}

export function renderRelatedList(items, idsOrItems, title) {
  const ids = Array.isArray(idsOrItems)
    ? idsOrItems.map((x) => (typeof x === 'string' ? x : x.id))
    : [];
  if (!ids.length) return '';
  const links = ids
    .map((id) => {
      const p = getById(items, id);
      return p
        ? `<li><a href="${lessonUrl(p.id)}" class="text-amber-400 hover:underline">${escapeHtml(p.titolo)}</a></li>`
        : '';
    })
    .filter(Boolean)
    .join('');
  if (!links) return '';
  return `<section class="mt-6"><h3 class="text-sm font-semibold text-zinc-400 uppercase mb-2">${escapeHtml(title)}</h3><ul class="space-y-1 text-sm">${links}</ul></section>`;
}
