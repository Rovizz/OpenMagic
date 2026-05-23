import { isValidLessonId } from './security.js';

let cache = null;
let pathsCache = null;
let glossaryCache = null;

export async function loadData() {
  if (cache) return cache;
  try {
    const manifestRes = await fetch('data/manifest.json');
    if (manifestRes.ok) {
      const manifest = await manifestRes.json();
      const parts = await Promise.all(
        manifest.chunks.map((f) =>
          fetch(`data/items/${f}`).then((r) => {
            if (!r.ok) throw new Error(f);
            return r.json();
          })
        )
      );
      cache = parts.flat();
      return cache;
    }
  } catch {
    /* fallback */
  }
  const res = await fetch('data.json');
  if (!res.ok) throw new Error('Impossibile caricare il database');
  cache = await res.json();
  return cache;
}

export async function loadPaths() {
  if (pathsCache) return pathsCache;
  const res = await fetch('data/paths.json');
  pathsCache = res.ok ? await res.json() : [];
  return pathsCache;
}

export async function loadGlossary() {
  if (glossaryCache) return glossaryCache;
  const res = await fetch('data/glossary.json');
  glossaryCache = res.ok ? await res.json() : [];
  return glossaryCache;
}

export function getById(items, id) {
  if (!isValidLessonId(id)) return null;
  return items.find((i) => i.id === id);
}

export function filterItems(items, { q = '', categoria = '', livello = '' } = {}) {
  const term = q.trim().toLowerCase();
  return items.filter((item) => {
    if (categoria && item.categoria !== categoria) return false;
    if (livello && String(item.livello) !== String(livello)) return false;
    if (!term) return true;
    const hay = [item.titolo, item.descrizione, ...(item.tags || []), ...(item.wiki?.cos_e ? [item.wiki.cos_e] : [])]
      .join(' ')
      .toLowerCase();
    return hay.includes(term);
  });
}

export const CATEGORIA_LABEL = {
  tecnica: 'Tecniche',
  trucco: 'Trucchi',
  cardistry: 'Cardistry',
};

export const LIVELLO_LABEL = {
  1: 'Basi',
  2: 'Intermedio',
  3: 'Avanzato',
};
