// Internationalization (i18n) system for OpenMagic
const translations = {
  it: {
    // Header & Navigation
    'nav.home': 'Home',
    'nav.browse': 'Esplora',
    'nav.paths': 'Percorsi',
    'nav.glossary': 'Glossario',
    'nav.video': 'Video',
    'nav.progress': 'Progressi',
    
    // Meta descriptions
    'meta.description.home': 'OpenMagic — La piattaforma iper-moderna per imparare la cartomagia.',
    'meta.description.glossary': 'Glossario della cartomagia — termini spiegati come su Wikipedia.',
    'meta.description.browse': 'Enciclopedia OpenMagic — tutte le tecniche, trucchi e figure cardistry.',
    'meta.description.video': 'Impara le migliori tecniche e trucchi di cartomagia su OpenMagic con video e schede wiki dettagliate.',
    'meta.description.paths': 'Percorsi guidati OpenMagic — da zero a mago senza corsi a pagamento.',
    'meta.description.progress': 'I tuoi progressi — OpenMagic',
    'meta.description.mission': 'Missione & Sicurezza — OpenMagic',
    
    // Hero section
    'hero.badge': 'Open source & Free forever',
    'hero.title.line1': 'Master card magic',
    'hero.title.line2': 'like a pro.',
    'hero.description': 'Esplora centinaia di tecniche, routine e fioriture. Curriculum strutturati, tutorial selezionati e interfacce ultra-moderne per accelerare il tuo apprendimento.',
    'hero.btn-start': 'Inizia un Percorso',
    'hero.btn-browse': 'Esplora Database',
    
    // Stats & Search
    'stats.title': 'Statistiche Globali',
    'stats.description': 'Tutto il materiale di cui hai bisogno per passare da principiante a maestro.',
    'stats.technique': 'Tecniche',
    'stats.trick': 'Trucchi',
    'stats.cardistry': 'Cardistry',
    'stats.progress': '{done} / {total} voci segnate come imparate ({percent}%)',
    
    // Encyclopedia
    'encyclopedia.title': 'L\'Enciclopedia',
    'encyclopedia.description': 'Cerca tra +180 voci. Double Lift, Faro Shuffle, Zarrow...',
    'encyclopedia.search': 'Cerca una tecnica o trucco...',
    'encyclopedia.no-results': 'Nessun risultato.',
    'encyclopedia.view-all': 'Vedi tutti gli elementi',
    
    // Paths page
    'paths.title': 'Percorsi guidati',
    'paths.description': 'Ordine ottimale di studio — meglio di un corso a pagamento sparso su YouTube.',
    'paths.loading': 'Caricamento…',
    
    // Browse page
    'browse.title': 'Esplora Database',
    'browse.description': 'Sfoglia tutte le tecniche, trucchi e cardistry della nostra enciclopedia.',
    'browse.filters': 'Filtri',
    'browse.all': 'Tutto',
    'browse.technique': 'Tecnica',
    'browse.trick': 'Trucco',
    'browse.cardistry': 'Cardistry',
    'browse.search': 'Filtra in tempo reale…',
    
    // Glossary
    'glossary.title': 'Glossario',
    'glossary.description': 'Termini essenziali per la cartomagia.',
    'glossary.no-results': 'Nessun termine trovato.',
    
    // Video page
    'video.title': 'Video Tutorial',
    'video.description': 'Tutorial video selezionati dalla community.',
    'video.loading': 'Caricamento video...',
    
    // Progress page
    'progress.title': 'I tuoi Progressi',
    'progress.description': 'Monitora il tuo percorso di apprendimento.',
    'progress.learned': 'Imparate',
    'progress.learning': 'In corso',
    'progress.total': 'Totale',
    'progress.empty': 'Nessuna tecnica segnata come imparata. Inizia a esplorare!',
    
    // Footer
    'footer.tagline': 'La piattaforma iper-moderna per imparare la cartomagia.',
    'footer.github': 'GitHub',
    'footer.license': 'License',
    'footer.about': 'About',
    
    // Common
    'common.loading': 'Caricamento...',
    'common.error': 'Si è verificato un errore. Riprova.',
    'common.back': 'Indietro',
    'common.close': 'Chiudi',
    
    // Dynamic content translations (wiki fields)
    'wiki.charlier-cut.cos_e': 'Il taglio a una mano più iconico. Prima mossa da cardist.',
    'wiki.charlier-cut.perche': 'Charlier Cut è un movimento di cardistry di livello 1. Padroneggiarla sblocca voci successive nell\'enciclopedia e decine di tutorial gratuiti online.',
    'wiki.charlier-cut.come_praticare.0': 'Studia il video senza carte, poi con mazzo lento.',
    'wiki.charlier-cut.come_praticare.1': '10 ripetizioni pulite > 100 ripetizioni sloppate.',
    'wiki.charlier-cut.come_praticare.2': 'Collega la mossa a un effetto breve per motivazione.',
    'wiki.charlier-cut.errori_comuni.0': 'Saltare i prerequisiti indicati sopra.',
    'wiki.charlier-cut.errori_comuni.1': 'Praticare solo seduto se l\'effetto è da in piedi.',
    'wiki.charlier-cut.errori_comuni.2': 'Non registrarsi: il video mente, lo specchio no.',
    'wiki.charlier-cut.tempo_stima': '2-5 giorni',
    
    // Item title and description translations
    'item.charlier-cut.title': 'Charlier Cut',
    'item.charlier-cut.description': 'The most iconic one-handed cut. The first move for cardists.',
    
    'item.scissor-cut.title': 'Scissor Cut',
    'item.scissor-cut.description': 'Two-handed scissor cut. Smooth transition between grips.',
    
    'item.revolution-cut.title': 'Revolution Cut',
    'item.revolution-cut.description': 'One-handed rotating cut. More spectacular than the Charlier.',
    
    'item.spring.title': 'Spring (Cascade)',
    'item.spring.description': 'Hand-to-hand tension cascade. The most recognizable flourish.',
    
    // Add more item translations as needed...
  },
  en: {
    // Header & Navigation
    'nav.home': 'Home',
    'nav.browse': 'Browse',
    'nav.paths': 'Paths',
    'nav.glossary': 'Glossary',
    'nav.video': 'Videos',
    'nav.progress': 'Progress',
    
    // Meta descriptions
    'meta.description.home': 'OpenMagic — The hyper-modern platform for learning card magic.',
    'meta.description.glossary': 'Card Magic Glossary — terms explained like on Wikipedia.',
    'meta.description.browse': 'OpenMagic Encyclopedia — all techniques, tricks and cardistry figures.',
    'meta.description.video': 'Learn the best techniques and tricks of card magic on OpenMagic with videos and detailed wiki sheets.',
    'meta.description.paths': 'OpenMagic Guided Paths — from zero to magician without paid courses.',
    'meta.description.progress': 'Your Progress — OpenMagic',
    'meta.description.mission': 'Mission & Security — OpenMagic',
    
    // Hero section
    'hero.badge': 'Open source & Free forever',
    'hero.title.line1': 'Master card magic',
    'hero.title.line2': 'like a pro.',
    'hero.description': 'Explore hundreds of techniques, routines and flourishes. Structured curriculum, curated tutorials and ultra-modern interfaces to accelerate your learning.',
    'hero.btn-start': 'Start a Path',
    'hero.btn-browse': 'Explore Database',
    
    // Stats & Search
    'stats.title': 'Global Statistics',
    'stats.description': 'All the material you need to go from beginner to master.',
    'stats.technique': 'Techniques',
    'stats.trick': 'Tricks',
    'stats.cardistry': 'Cardistry',
    'stats.progress': '{done} / {total} items marked as learned ({percent}%)',
    
    // Encyclopedia
    'encyclopedia.title': 'Encyclopedia',
    'encyclopedia.description': 'Search among +180 entries. Double Lift, Faro Shuffle, Zarrow...',
    'encyclopedia.search': 'Search for a technique or trick...',
    'encyclopedia.no-results': 'No results found.',
    'encyclopedia.view-all': 'View all items',
    
    // Paths page
    'paths.title': 'Guided Paths',
    'paths.description': 'Optimal study order — better than a paid course scattered on YouTube.',
    'paths.loading': 'Loading…',
    
    // Browse page
    'browse.title': 'Browse Database',
    'browse.description': 'Explore all techniques, tricks and cardistry from our encyclopedia.',
    'browse.filters': 'Filters',
    'browse.all': 'All',
    'browse.technique': 'Technique',
    'browse.trick': 'Trick',
    'browse.cardistry': 'Cardistry',
    'browse.search': 'Search in real time…',
    
    // Glossary
    'glossary.title': 'Glossary',
    'glossary.description': 'Essential card magic terms.',
    'glossary.no-results': 'No terms found.',
    
    // Video page
    'video.title': 'Video Tutorials',
    'video.description': 'Video tutorials selected from the community.',
    'video.loading': 'Loading videos...',
    
    // Progress page
    'progress.title': 'Your Progress',
    'progress.description': 'Track your learning journey.',
    'progress.learned': 'Learned',
    'progress.learning': 'Learning',
    'progress.total': 'Total',
    'progress.empty': 'No techniques marked as learned yet. Start exploring!',
    
    // Footer
    'footer.tagline': 'The hyper-modern platform for learning card magic.',
    'footer.github': 'GitHub',
    'footer.license': 'License',
    'footer.about': 'About',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred. Please try again.',
    'common.back': 'Back',
    'common.close': 'Close',
    
    // Dynamic content translations (wiki fields)
    'wiki.charlier-cut.cos_e': 'The most iconic one-handed cut. The first move for cardists.',
    'wiki.charlier-cut.perche': 'Charlier Cut is a level 1 cardistry move. Mastering it unlocks subsequent entries in the encyclopedia and dozens of free online tutorials.',
    'wiki.charlier-cut.come_praticare.0': 'Study the video without cards, then with slow deck.',
    'wiki.charlier-cut.come_praticare.1': '10 clean repetitions > 100 sloppy repetitions.',
    'wiki.charlier-cut.come_praticare.2': 'Connect the move to a brief effect for motivation.',
    'wiki.charlier-cut.errori_comuni.0': 'Skipping the prerequisites listed above.',
    'wiki.charlier-cut.errori_comuni.1': 'Practicing only seated if the effect is for standing.',
    'wiki.charlier-cut.errori_comuni.2': 'Not recording yourself: the video lies, the mirror does not.',
    'wiki.charlier-cut.tempo_stima': '2-5 days',
    
    // Add more wiki translations as needed...
  }
};

export class I18n {
  constructor() {
    this.lang = localStorage.getItem('lang') || 'it';
    this.updatePageLang();
  }

  t(key, params = {}) {
    let text = translations[this.lang]?.[key] || translations.it[key] || key;
    
    // Replace parameters like {done}, {total}, {percent}
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
    
    return text;
  }

  setLang(lang) {
    if (lang === 'it' || lang === 'en') {
      this.lang = lang;
      localStorage.setItem('lang', lang);
      this.updatePageLang();
      
      // Dispatch event for components to re-render
      window.dispatchEvent(new CustomEvent('languageChange', { detail: { lang } }));
    }
  }

  updatePageLang() {
    document.documentElement.lang = this.lang;
    document.documentElement.setAttribute('lang', this.lang);
  }

  getLang() {
    return this.lang;
  }

  getAvailableLangs() {
    return ['it', 'en'];
  }
}

export const i18n = new I18n();
