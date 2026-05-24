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
    'nav.mission': 'Missione',
    
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
    'path.da-zero.title': 'Da Zero a Mago',
    'path.da-zero.description': 'Il percorso ufficiale OpenMagic: maneggiamento, controlli base e i primi effetti da mostrare agli amici. Nessun corso a pagamento necessario.',
    'path.da-zero.duration': '4-8 settimane',
    'path.sleight-master.title': 'Maestro delle Tecniche',
    'path.sleight-master.description': 'Per chi vuole la cartomagia “da vero mago”: pass, palming, false shuffle e controlli invisibili.',
    'path.sleight-master.duration': '6-12 mesi',
    'path.spettacolo.title': 'Routine da Spettacolo',
    'path.spettacolo.description': 'Effetti che fanno urlare il pubblico — triumph, ambitious, ACAAN e altri miracoli strutturati.',
    'path.spettacolo.duration': '3-6 mesi',
    'path.cardistry.title': 'Artista del Cardistry',
    'path.cardistry.description': 'Dalla Charlier cut al Sybil: acrobazie visive senza effetti magici, solo pura estetica.',
    'path.cardistry.duration': '2-6 mesi',
    
    // Browse page
    'browse.title': 'Esplora Database',
    'browse.description': 'Sfoglia tutte le tecniche, trucchi e cardistry della nostra enciclopedia.',
    'browse.filters': 'Filtri',
    'browse.all': 'Tutto',
    'browse.technique': 'Tecnica',
    'browse.trick': 'Trucco',
    'browse.cardistry': 'Cardistry',
    'browse.search': 'Filtra in tempo reale…',
    'browse.filter.all': 'Tutte',
    'browse.filter.technique': 'Tecniche',
    'browse.filter.trick': 'Trucchi',
    'browse.filter.cardistry': 'Cardistry',
    'browse.level.all': 'Tutti',
    'browse.level.1': 'Liv. 1',
    'browse.level.2': 'Liv. 2',
    'browse.level.3': 'Liv. 3',
    'browse.level.title': 'Livello',
    
    // Glossary
    'glossary.title': 'Glossario',
    'glossary.description': 'Termini essenziali per la cartomagia.',
    'glossary.no-results': 'Nessun termine trovato.',
    'glossary.search': 'Cerca un termine…',
    'glossary.see': 'Vedi:',
    
    'video.title': 'Video Tutorial',
    'video.description': 'Tutorial video selezionati dalla community.',
    'video.loading': 'Caricamento video...',
    'video.learned': 'Segnato come Imparato',
    'video.mark-learned': 'Segna come Imparato',
    'video.related.unlocks': 'Sblocca dopo questa',
    'video.back-category': 'Torna alla categoria',
    'video.author': 'Autore video',
    'video.category': 'Categoria',
    'video.level': 'Livello',
    'video.tags': 'Tag',
    'video.next-step': 'Prossimo passo consigliato',
    'video.missing-video': 'Video non disponibile.',
    'video.prereqs.must-know': 'Assicurati di conoscere:',
    'video.prereqs.heading': 'Prima di imparare questo',
    'video.meta.suffix': 'Impara con la scheda wiki e il video tutorial gratuito di OpenMagic.',
    
    // Wiki section headers
    'wiki.heading': 'Scheda Wiki',
    'wiki.section.what': 'Cos\'è',
    'wiki.section.why': 'Perché impararlo',
    'wiki.section.practice': 'Come praticare',
    'wiki.section.mistakes': 'Errori comuni',
    'wiki.section.time': 'Tempo stimato:',
    
    // Browse inline
    'browse.count': 'voci nell\'enciclopedia',
    'browse.completed': 'completati',
    
    // Progress inline
    'progress.completion': 'Completamento globale',
    'progress.items-learned': 'Voci imparate',
    'progress.still-to-learn': 'Ancora da imparare',
    'progress.no-items': 'Nessuna voce ancora completata in questa categoria.',
    'progress.privacy': 'I dati restano solo in questo browser. Nessun account, nessun server.',
    
    // Footer inline
    'footer.learn': 'Impara',
    'footer.privacy-text': 'Progressi solo nel tuo browser. Nessun account. Video tramite YouTube embed.',
    'footer.free': 'Gratuito, open knowledge, zero paywall.',
    'footer.copyright': 'I video appartengono ai rispettivi creator.',
    
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
    
    // Mission page
    'mission.title': 'La missione OpenMagic',
    'mission.better-than-course.title': 'Meglio di un corso a pagamento',
    'mission.better-than-course.text': 'I creator vendono percorsi chiusi. Noi colleghiamo i migliori tutorial gratuiti su YouTube in ordine logico, con prerequisiti, wiki e progressi \u2014 senza chiederti la carta di credito.',
    'mission.better-than-wiki.title': 'Meglio di Wikipedia',
    'mission.better-than-wiki.text': 'Wikipedia spiega i concetti ma non ti insegna a eseguirli. OpenMagic unisce enciclopedia + video + percorso pratico + "cosa imparare prima".',
    'mission.scalability.title': 'Scalabilità Globale',
    'mission.scalability.item1': 'Architettura serverless distribuita su edge network globale.',
    'mission.scalability.item2': 'Tempi di risposta inferiori a 50ms ovunque nel mondo.',
    'mission.scalability.item3': 'Indicizzazione automatica dei contenuti con algoritmi proprietari.',
    'mission.security.title': 'Sicurezza & Privacy di Livello Enterprise',
    'mission.security.item1': 'Nessuna raccolta dati: privacy assoluta by-design.',
    'mission.security.item2': 'Protezione DDoS e Content Security Policy (CSP) restrittiva.',
    'mission.security.item3': 'Sanitizzazione avanzata contro attacchi XSS e CSRF.',
    'mission.security.item4': 'Sistemi di anti-tampering e offuscamento dell\'architettura client-side.',
    'mission.contribute.title': 'Vuoi Contribuire?',
    'mission.contribute.text': 'La piattaforma è chiusa a modifiche esterne dirette per garantire la massima integrità e sicurezza. Se sei un creatore di contenuti, contattaci attraverso i canali ufficiali.',
  },
  en: {
    // Header & Navigation
    'nav.home': 'Home',
    'nav.browse': 'Browse',
    'nav.paths': 'Paths',
    'nav.glossary': 'Glossary',
    'nav.video': 'Videos',
    'nav.progress': 'Progress',
    'nav.mission': 'Mission',
    
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
    'path.da-zero.title': 'From Zero to Magician',
    'path.da-zero.description': 'The official OpenMagic path: handling, basic controls, and the first effects to show your friends. No paid course needed.',
    'path.da-zero.duration': '4-8 weeks',
    'path.sleight-master.title': 'Sleight Master',
    'path.sleight-master.description': 'For those who want real card magic: pass, palming, false shuffles, and invisible controls.',
    'path.sleight-master.duration': '6-12 months',
    'path.spettacolo.title': 'Show Routines',
    'path.spettacolo.description': 'Effects that make the audience scream — triumph, ambitious, ACAAN and other structured miracles.',
    'path.spettacolo.duration': '3-6 months',
    'path.cardistry.title': 'Cardistry Artist',
    'path.cardistry.description': 'From Charlier cut to Sybil: visual acrobatics without magic effects, just pure aesthetics.',
    'path.cardistry.duration': '2-6 months',
    
    // Browse page
    'browse.title': 'Browse Database',
    'browse.description': 'Explore all techniques, tricks and cardistry from our encyclopedia.',
    'browse.filters': 'Filters',
    'browse.all': 'All',
    'browse.technique': 'Technique',
    'browse.trick': 'Trick',
    'browse.cardistry': 'Cardistry',
    'browse.search': 'Search in real time…',
    'browse.filter.all': 'All',
    'browse.filter.technique': 'Techniques',
    'browse.filter.trick': 'Tricks',
    'browse.filter.cardistry': 'Cardistry',
    'browse.level.all': 'All',
    'browse.level.1': 'Level 1',
    'browse.level.2': 'Level 2',
    'browse.level.3': 'Level 3',
    'browse.level.title': 'Level',
    
    // Glossary
    'glossary.title': 'Glossary',
    'glossary.description': 'Essential card magic terms.',
    'glossary.no-results': 'No terms found.',
    'glossary.search': 'Search a term…',
    'glossary.see': 'See:',
    
    // Video page
    'video.title': 'Video Tutorials',
    'video.description': 'Video tutorials selected from the community.',
    'video.loading': 'Loading videos...',
    'video.learned': 'Marked as Learned',
    'video.mark-learned': 'Mark as Learned',
    'video.related.unlocks': 'Unlocks after this',
    'video.back-category': 'Back to category',
    'video.author': 'Video Author',
    'video.category': 'Category',
    'video.level': 'Level',
    'video.tags': 'Tags',
    'video.next-step': 'Recommended next step',
    'video.missing-video': 'Video not available.',
    'video.prereqs.must-know': 'Make sure you know:',
    'video.prereqs.heading': 'Before learning this',
    'video.meta.suffix': 'Learn with the wiki sheet and free video tutorial on OpenMagic.',
    
    // Wiki section headers
    'wiki.heading': 'Wiki Sheet',
    'wiki.section.what': 'What is it',
    'wiki.section.why': 'Why learn it',
    'wiki.section.practice': 'How to practice',
    'wiki.section.mistakes': 'Common mistakes',
    'wiki.section.time': 'Estimated time:',
    
    // Browse inline
    'browse.count': 'items in encyclopedia',
    'browse.completed': 'completed',
    
    // Progress inline
    'progress.completion': 'Overall completion',
    'progress.items-learned': 'Items learned',
    'progress.still-to-learn': 'Still to learn',
    'progress.no-items': 'No items completed in this category yet.',
    'progress.privacy': 'Data stays only in this browser. No account, no server.',
    
    // Footer inline
    'footer.learn': 'Learn',
    'footer.privacy-text': 'Progress stored only in your browser. No account needed. Videos via YouTube embed.',
    'footer.free': 'Free, open knowledge, zero paywall.',
    'footer.copyright': 'Videos belong to their respective creators.',
    
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
    
    // Glossary terms (en)
    'glossary.term.break': 'Break',
    'glossary.definition.break': 'A small gap between cards, held invisibly by the pinky or thumb, to mark a position in the deck.',
    'glossary.term.controllo': 'Control',
    'glossary.definition.controllo': 'Any technique that secretly moves one or more cards to a desired position in the deck.',
    'glossary.term.force': 'Force',
    'glossary.definition.force': 'Making a spectator believe they chose a card freely when it was actually pre-selected by the magician.',
    'glossary.term.false-shuffle': 'False Shuffle',
    'glossary.definition.false-shuffle': 'A shuffle that appears to mix the cards but retains the order of all or part of the deck.',
    'glossary.term.sleight': 'Sleight of Hand',
    'glossary.definition.sleight': 'The magician\'s secret manual skills. Sleight of hand.',
    'glossary.term.palming': 'Palming',
    'glossary.definition.palming': 'Hiding a card in the palm while the audience believes it has vanished or is not there.',
    'glossary.term.double-lift-term': 'Double Lift',
    'glossary.definition.double-lift-term': 'Lifting two cards as one. The most important sleight in modern card magic.',
    'glossary.term.pass': 'Pass',
    'glossary.definition.pass': 'Secretly exchanging the two halves of the deck. Considered the most difficult and powerful sleight.',
    'glossary.term.cardistry': 'Cardistry',
    'glossary.definition.cardistry': 'The visual art of manipulating cards without magic effects: cuts, flourishes, displays.',
    'glossary.term.impromptu': 'Impromptu',
    'glossary.definition.impromptu': 'A trick that can be performed with any normal deck, without any special preparation.',
    'glossary.term.self-working': 'Self-Working',
    'glossary.definition.self-working': 'A trick that works automatically (math, principles) with little or no sleight of hand.',
    'glossary.term.acaan-term': 'ACAAN',
    'glossary.definition.acaan-term': 'Any Card At Any Number: a freely chosen card at a freely chosen number.',
    
    // Add more wiki translations as needed...
    
    // Mission page
    'mission.title': 'The OpenMagic Mission',
    'mission.better-than-course.title': 'Better than a paid course',
    'mission.better-than-course.text': 'Creators sell closed courses. We link the best free tutorials on YouTube in logical order, with prerequisites, wiki and progress tracking \u2014 without asking for your credit card.',
    'mission.better-than-wiki.title': 'Better than Wikipedia',
    'mission.better-than-wiki.text': 'Wikipedia explains concepts but doesn\'t teach you how to perform them. OpenMagic combines encyclopedia + video + practice path + "what to learn first".',
    'mission.scalability.title': 'Global Scalability',
    'mission.scalability.item1': 'Serverless architecture distributed on global edge network.',
    'mission.scalability.item2': 'Response times under 50ms anywhere in the world.',
    'mission.scalability.item3': 'Automatic content indexing with proprietary algorithms.',
    'mission.security.title': 'Enterprise-Level Security & Privacy',
    'mission.security.item1': 'No data collection: absolute privacy by-design.',
    'mission.security.item2': 'DDoS protection and restrictive Content Security Policy (CSP).',
    'mission.security.item3': 'Advanced sanitization against XSS and CSRF attacks.',
    'mission.security.item4': 'Anti-tampering systems and client-side architecture obfuscation.',
    'mission.contribute.title': 'Want to Contribute?',
    'mission.contribute.text': 'The platform is closed to direct external modifications to ensure maximum integrity and security. If you are a content creator, contact us through official channels.',
  }
};

export class I18n {
  constructor() {
    this.lang = localStorage.getItem('lang') || 'it';
    this.updatePageLang();
  }

  t(key, fallbackOrParams = {}) {
    let text;
    let params = {};
    
    if (translations[this.lang] && key in translations[this.lang]) {
      text = translations[this.lang][key];
      if (typeof fallbackOrParams === 'object' && fallbackOrParams !== null) {
        params = fallbackOrParams;
      }
    } else if (translations.it && key in translations.it) {
      text = translations.it[key];
      if (typeof fallbackOrParams === 'object' && fallbackOrParams !== null) {
        params = fallbackOrParams;
      }
    } else {
      if (typeof fallbackOrParams === 'string') {
        text = fallbackOrParams;
      } else {
        text = key;
        if (typeof fallbackOrParams === 'object' && fallbackOrParams !== null) {
          params = fallbackOrParams;
        }
      }
    }
    
    // Replace parameters like {done}, {total}, {percent}
    if (params && typeof params === 'object') {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    
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
