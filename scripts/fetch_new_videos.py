import json
import subprocess
import sys
import time
import os

def search(query: str) -> dict | None:
    if not query:
        return None
    cmd = [
        sys.executable, "-m", "yt_dlp",
        "--print", "%(id)s|%(channel)s",
        f"ytsearch1:{query}",
    ]
    try:
        out = subprocess.check_output(cmd, stderr=subprocess.DEVNULL, text=True, timeout=60)
        line = out.strip().split("\n")[0]
        vid, channel = line.split("|", 1)
        return {"youtube_id": vid, "canale": channel}
    except Exception as e:
        print(f"Error searching {query}: {e}")
        return None

def main():
    seed_file = 'data/new_items_seed.json'
    if not os.path.exists(seed_file):
        print("Seed file not found.")
        return

    with open(seed_file, 'r', encoding='utf8') as f:
        items = json.load(f)

    # Load existing items to avoid duplicates by ID
    existing_ids = set()
    for cat in ['tecnica', 'trucco', 'cardistry']:
        cat_file = f'data/items/{cat}.json'
        if os.path.exists(cat_file):
            with open(cat_file, 'r', encoding='utf8') as f:
                cat_items = json.load(f)
                for ci in cat_items:
                    existing_ids.add(ci['id'])

    results = {'tecnica': [], 'trucco': [], 'cardistry': []}
    
    count = 0
    for item in items:
        if item['id'] in existing_ids:
            print(f"Skipping {item['id']}, already exists.")
            continue
        
        query = item.pop('search_query', '')
        print(f"[{count+1}/{len(items)}] Searching for {item['id']} ...", flush=True)
        yt_data = search(query)
        if yt_data:
            item['youtube_id'] = yt_data['youtube_id']
            item['canale'] = yt_data['canale']
            results[item['categoria']].append(item)
            existing_ids.add(item['id'])
            print(f"Found: {item['youtube_id']} by {item['canale']}")
        else:
            print(f"Failed to find video for {item['id']}")
            
        count += 1

    # Append to category files
    for cat in ['tecnica', 'trucco', 'cardistry']:
        if not results[cat]:
            continue
        cat_file = f'data/items/{cat}.json'
        existing_items = []
        if os.path.exists(cat_file):
            with open(cat_file, 'r', encoding='utf8') as f:
                existing_items = json.load(f)
        
        existing_items.extend(results[cat])
        
        with open(cat_file, 'w', encoding='utf8') as f:
            json.dump(existing_items, f, indent=2, ensure_ascii=False)
            
        print(f"Saved {len(results[cat])} new items to {cat_file}")

if __name__ == '__main__':
    main()
