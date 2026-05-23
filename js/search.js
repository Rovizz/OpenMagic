let index = null;

export async function loadSearchIndex() {
  if (index) return index;
  const res = await fetch('data/search-index.json');
  if (!res.ok) return [];
  index = await res.json();
  return index;
}

export function searchItems(items, query, idSet) {
  const term = query.trim().toLowerCase();
  if (!term) return items;

  const queryTerms = term.split(/\s+/).filter(Boolean);

  if (idSet) {
    const matched = new Set();
    for (const row of idSet) {
      const rowTokens = row.tokens.toLowerCase();
      if (queryTerms.every((qt) => rowTokens.includes(qt))) {
        matched.add(row.id);
      }
    }
    return items.filter((i) => matched.has(i.id));
  }

  return items.filter((item) => {
    const hay = [item.id, item.titolo, item.descrizione, item.categoria, ...(item.tags || [])]
      .join(' ')
      .toLowerCase();
    return queryTerms.every((qt) => hay.includes(qt));
  });
}
