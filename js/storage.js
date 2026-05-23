const STORAGE_KEY = 'openmagic-learned';

export function getLearned() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function isLearned(id) {
  return getLearned().includes(id);
}

export function toggleLearned(id) {
  const list = getLearned();
  const idx = list.indexOf(id);
  if (idx >= 0) list.splice(idx, 1);
  else list.push(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return list.includes(id);
}

export function getProgressStats(items) {
  const learned = getLearned();
  const total = items.length;
  const done = items.filter((i) => learned.includes(i.id)).length;
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}
