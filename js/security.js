/** Sanitizzazione output HTML — previene XSS da dati JSON. */
export function escapeHtml(str) {
  if (str == null) return '';
  const d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}

/** Valida ID lezione (slug alfanumerico). */
export function isValidLessonId(id) {
  return typeof id === 'string' && /^[a-z0-9][a-z0-9-]{0,63}$/.test(id);
}

/** URL YouTube embed sicuro (solo ID 11 caratteri). */
export function youtubeEmbedUrl(videoId) {
  if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId || '')) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}
