/* Breaking Mental Models — theme toggle
   Persists choice in localStorage('bmm-theme'). The pre-paint
   inline snippet in each page's <head> applies the saved theme
   before first paint; this file builds the toggle control. */
(function () {
  var root = document.documentElement;
  function current() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  var btn;
  function update() {
    if (!btn) return;
    var dark = current() === 'dark';
    btn.querySelector('.tt-ico').textContent = dark ? '\u2600' : '\u263E'; // ☀ / ☾
    btn.querySelector('.tt-lab').textContent = dark ? 'Light' : 'Dark';
    btn.setAttribute('aria-pressed', String(dark));
  }
  function apply(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    try { localStorage.setItem('bmm-theme', theme); } catch (e) {}
    update();
  }
  function build() {
    btn = document.createElement('button');
    btn.className = 'bmm-theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle colour theme');
    btn.innerHTML = '<span class="tt-ico" aria-hidden="true"></span><span class="tt-lab"></span>';
    btn.addEventListener('click', function () { apply(current() === 'dark' ? 'light' : 'dark'); });
    document.body.appendChild(btn);
    update();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
