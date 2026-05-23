/**
 * Compila i chunk JSON in data.json + indice di ricerca.
 * Esegui: node scripts/build-data.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'data');
const ITEMS_DIR = join(DATA_DIR, 'items');

const WIKI_OVERRIDES = {
  'double-lift': {
    cos_e:
      'Il double lift consiste nel sollevare due carte come se fossero una sola. È il cuore di migliaia di effetti: apparizioni, predizioni, trasformazioni.',
    perche:
      'Senza un double lift affidabile sei limitato ai trucchi self-working. Con questa mossa apri la cartomagia “vera” — quella che sembra impossibile.',
    come_praticare: [
      'Impara prima il pinky break solido (10 minuti al giorno per una settimana).',
      'Esegui il turnover guardando lo spettatore, non le carte.',
      'Pratica davanti allo specchio con carte segnate (angolo diverso sul dorso).',
      'Obiettivo: 10 double lift consecutivi senza “flash” o separazione.',
    ],
    errori_comuni: [
      'Premere troppo forte e far scricchiolare le carte.',
      'Alzare il gomito creando angolo sospetto.',
      'Fare il double lift quando non serve — meno è meglio.',
    ],
    tempo_stima: '2-4 settimane di pratica quotidiana',
  },
  'pinky-break': {
    cos_e:
      'Un break è un piccolo spazio tra due carte, tenuto invisibile dal mignolo. Segna la posizione di una carta senza che lo spettatore lo sappia.',
    perche:
      'È il “GPS” del mazzo. Quasi ogni controllo, force e setup avanzato parte da un break ben tenuto.',
    tempo_stima: '3-7 giorni',
  },
};

function enrichWiki(item) {
  if (WIKI_OVERRIDES[item.id]) {
    return { ...item, wiki: { ...defaultWiki(item), ...WIKI_OVERRIDES[item.id] } };
  }
  if (item.wiki) return item;
  return { ...item, wiki: defaultWiki(item) };
}

function defaultWiki(item) {
  const tipo =
    item.categoria === 'tecnica'
      ? 'tecnica fondamentale'
      : item.categoria === 'trucco'
        ? 'effetto da spettatori'
        : 'movimento di cardistry';
  return {
    cos_e: item.descrizione,
    perche: `${item.titolo} è una ${tipo} di livello ${item.livello}. Padroneggiarla sblocca voci successive nell'enciclopedia e decine di tutorial gratuiti online.`,
    come_praticare: [
      'Studia il video senza carte, poi con mazzo lento.',
      '10 ripetizioni pulite > 100 ripetizioni sloppate.',
      'Collega la mossa a un effetto breve per motivazione.',
    ],
    errori_comuni: [
      'Saltare i prerequisiti indicati sopra.',
      'Praticare solo seduto se l\'effetto è da in piedi.',
      'Non registrarsi: il video mente, lo specchio no.',
    ],
    tempo_stima: item.livello === 1 ? '2-5 giorni' : item.livello === 2 ? '1-3 settimane' : '1-3 mesi',
  };
}

function tokenize(item) {
  const text = [item.id, item.titolo, item.descrizione, item.categoria, ...(item.tags || [])]
    .join(' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
  return [...new Set(text.split(/[^a-z0-9]+/).filter((t) => t.length > 1))];
}

function loadItems() {
  if (!existsSync(ITEMS_DIR)) {
    const legacy = JSON.parse(readFileSync(join(ROOT, 'data.json'), 'utf8'));
    mkdirSync(ITEMS_DIR, { recursive: true });
    const groups = { tecnica: [], trucco: [], cardistry: [] };
    for (const item of legacy) groups[item.categoria]?.push(item);
    for (const [cat, list] of Object.entries(groups)) {
      writeFileSync(join(ITEMS_DIR, `${cat}.json`), JSON.stringify(list, null, 2), 'utf8');
    }
    console.log('Creati chunk in data/items/ dal data.json legacy');
  }
  const files = readdirSync(ITEMS_DIR).filter((f) => f.endsWith('.json'));
  return files.flatMap((f) => JSON.parse(readFileSync(join(ITEMS_DIR, f), 'utf8')));
}

const items = loadItems().map(enrichWiki);
const ids = new Set(items.map((i) => i.id));
if (ids.size !== items.length) throw new Error('ID duplicati nel database');

for (const item of items) {
  for (const p of item.prerequisiti || []) {
    if (!ids.has(p)) console.warn(`⚠ ${item.id}: prerequisito mancante "${p}"`);
  }
}

mkdirSync(DATA_DIR, { recursive: true });

const manifest = {
  version: 2,
  updated: new Date().toISOString().slice(0, 10),
  total: items.length,
  chunks: readdirSync(ITEMS_DIR).filter((f) => f.endsWith('.json')),
};

writeFileSync(join(DATA_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
writeFileSync(join(ROOT, 'data.json'), JSON.stringify(items, null, 2), 'utf8');

const searchIndex = items.map((item) => ({
  id: item.id,
  tokens: tokenize(item).join(' '),
}));
writeFileSync(join(DATA_DIR, 'search-index.json'), JSON.stringify(searchIndex), 'utf8');

console.log(`✓ ${items.length} voci · manifest + search-index + data.json`);
