/**
 * OpenMagic Enterprise Security Core
 * Anti-Tampering, Anti-Debugging, and Architecture Protection
 */

(function() {
  // 1. Disable Right-Click (Context Menu)
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  // 2. Disable Keyboard Shortcuts for DevTools
  document.addEventListener('keydown', function(e) {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
    }
    // Ctrl+Shift+I (Inspector)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
    }
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
    }
    // Ctrl+Shift+C (Element Selector)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      e.preventDefault();
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
    }
  });

  // 3. DevTools Detection & Anti-Debugging Loop
  // This constantly triggers the debugger if devtools are open, freezing the inspector.
  const antiDebug = function() {
    const start = new Date().getTime();
    debugger; // If DevTools is open, execution pauses here.
    const end = new Date().getTime();
    // If it took longer than expected, someone is likely stepping through the code.
    if (end - start > 100) {
      document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:20vh; font-family:sans-serif;'>Access Denied. Security Protocol Triggered.</h1>";
      window.location.replace("about:blank");
    }
  };

  // Run anti-debug loop continuously
  setInterval(antiDebug, 1000);

  // 4. Overwrite console to prevent logging
  const noop = () => {};
  window.console.log = noop;
  window.console.warn = noop;
  window.console.error = noop;
  window.console.info = noop;
  window.console.table = noop;
  window.console.dir = noop;

})();
