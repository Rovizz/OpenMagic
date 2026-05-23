/** Legge l'ID lezione da query (?id=) o hash (#id o #nome-id). Il hash sopravvive ai redirect di alcuni server statici. */
export function getLessonId() {
  const q = new URLSearchParams(location.search).get('id');
  if (q) return q;

  const raw = location.hash.replace(/^#/, '').trim();
  if (!raw) return null;
  if (raw.startsWith('id=')) return new URLSearchParams(raw).get('id');
  return decodeURIComponent(raw);
}

export function lessonUrl(id) {
  return `video.html#${encodeURIComponent(id)}`;
}
