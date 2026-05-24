import os
import glob

SECURITY_HEAD = """  <!-- Enterprise Security Headers -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://img.youtube.com https://i.ytimg.com; frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com;">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="no-referrer">
  <!-- Core Anti-Tampering Engine -->
  <script src="js/security-core.js"></script>
"""

for filepath in glob.glob("*.html"):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()

    if "security-core.js" not in content:
        # inject right after <head>
        content = content.replace('<head>', '<head>\n' + SECURITY_HEAD)
        
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(content)
        print(f"Secured {filepath}")
