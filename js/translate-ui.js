// Script to translate static HTML elements based on data-i18n attributes
import { i18n } from './i18n.js';

function translateStaticContent() {
  // Translate elements with data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const translated = i18n.t(key);
    if (el.tagName.toLowerCase() === 'meta') {
      el.setAttribute('content', translated);
    } else {
      el.textContent = translated;
    }
  });

  // Update page title
  const pageTitle = document.querySelector('[data-i18n-title]');
  if (pageTitle) {
    const key = pageTitle.getAttribute('data-i18n-title');
    document.title = i18n.t(key);
  }

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = i18n.t(key);
  });
}

// Translate on page load
translateStaticContent();

// Re-translate on language change
window.addEventListener('languageChange', () => {
  translateStaticContent();
});

export { translateStaticContent };
