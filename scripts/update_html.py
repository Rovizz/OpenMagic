import os
import glob

# The old tailwind config to match
OLD_HEAD = """<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            serif: ['Cinzel', 'serif'],
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          }
        }
      }
    };
  </script>"""

# The new tailwind config to replace it with
NEW_HEAD = """<link rel="stylesheet" href="css/style.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: { 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb' },
            accent: { 400: '#a78bfa', 500: '#8b5cf6' }
          },
          fontFamily: {
            sans: ['Outfit', 'sans-serif'],
            display: ['"Space Grotesk"', 'sans-serif'],
          }
        }
      }
    };
  </script>"""

# The script for interactions to inject before </body>
INTERACTIONS_SCRIPT = '  <script type="module" src="js/interactions.js"></script>\n</body>'

for filepath in glob.glob("*.html"):
    if filepath == "index.html":
        continue # already updated manually
        
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()

    # 1. Update Head
    # Just a simple string replacement
    if "https://fonts.googleapis.com/css2?family=Cinzel" in content:
        # replace from <link href="...Cinzel... down to </script>
        import re
        content = re.sub(r'<link href="https://fonts\.googleapis\.com/css2\?family=Cinzel.*?</script>', NEW_HEAD, content, flags=re.DOTALL)
    
    # 2. Update Body Classes (from bg-zinc-950 to bg-[#050505])
    content = content.replace('bg-zinc-950', 'bg-[#050505]')
    content = content.replace('text-zinc-100', 'text-slate-100')
    
    # 3. Replace text-amber-400 and font-serif everywhere
    content = content.replace('text-amber-400', 'text-blue-500')
    content = content.replace('text-amber-500', 'text-blue-500')
    content = content.replace('bg-amber-500', 'bg-blue-600')
    content = content.replace('font-serif', 'font-display')
    content = content.replace('border-amber-500', 'border-blue-500')
    
    # 4. Inject interactions.js if not present
    if "interactions.js" not in content:
        content = content.replace('</body>', INTERACTIONS_SCRIPT)
        
    with open(filepath, 'w', encoding='utf8') as f:
        f.write(content)
    print(f"Updated {filepath}")
