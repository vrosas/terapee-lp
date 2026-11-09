/*
 * Consentimento de cookies de análise (LGPD, art. 7º, I e art. 8º).
 *
 * O Microsoft Clarity grava a navegação (cliques, rolagem, movimento do mouse)
 * e só é carregado DEPOIS que o visitante aceita. Recusar ou ignorar o aviso
 * mantém o site funcionando sem ele. A escolha fica no navegador
 * (localStorage) e pode ser mudada pelo link "Preferências de cookies" do
 * rodapé, que chama window.terapeeCookiePrefs().
 *
 * Sem localStorage (navegação privada, bloqueio de site), o aviso aparece de
 * novo a cada página e o Clarity não carrega: na dúvida, não há consentimento.
 */
(function () {
  var KEY = 'terapee_cookie_consent_v1';
  var CLARITY_ID = 'h8iifiakrd';
  var loaded = false;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* sem armazenamento: vale só nesta página */ }
  }

  function loadClarity() {
    if (loaded) return;
    loaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  function removeBanner() {
    var el = document.getElementById('tp-cookie-banner');
    if (el) el.parentNode.removeChild(el);
  }

  function choose(v) {
    write(v);
    removeBanner();
    if (v === 'granted') {
      loadClarity();
    } else if (loaded) {
      // Já carregado nesta página: a recusa vale a partir da próxima.
      try { window.clarity('consent', false); } catch (e) { /* ignora */ }
    }
  }

  function showBanner() {
    if (document.getElementById('tp-cookie-banner')) return;
    var css = document.createElement('style');
    css.textContent =
      '#tp-cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;' +
      'max-width:560px;margin:0 auto;background:#fff;color:#1E293B;border:1px solid #E2E8F0;' +
      'border-radius:14px;box-shadow:0 10px 30px rgba(15,23,42,.15);padding:16px 18px;' +
      'font:14px/1.5 "DM Sans",system-ui,-apple-system,sans-serif}' +
      '#tp-cookie-banner p{margin:0 0 12px}' +
      '#tp-cookie-banner a{color:#2563EB;text-decoration:underline}' +
      '#tp-cookie-banner .tp-cb-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}' +
      '#tp-cookie-banner button{font:inherit;font-weight:600;border-radius:10px;padding:8px 16px;cursor:pointer;' +
      'border:1px solid #CBD5E1;background:#fff;color:#1E293B}' +
      '#tp-cookie-banner button.tp-cb-ok{background:#2563EB;border-color:#2563EB;color:#fff}' +
      '@media (prefers-color-scheme: dark){#tp-cookie-banner{background:#0F172A;color:#E2E8F0;border-color:#334155}' +
      '#tp-cookie-banner a{color:#93C5FD}#tp-cookie-banner button{background:#0F172A;color:#E2E8F0;border-color:#475569}}';
    document.head.appendChild(css);

    var box = document.createElement('div');
    box.id = 'tp-cookie-banner';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-live', 'polite');
    box.setAttribute('aria-label', 'Aviso de cookies');
    box.innerHTML =
      '<p>Usamos cookies essenciais para o site funcionar. Com a sua permissão, também usamos o ' +
      'Microsoft Clarity para entender como as páginas são usadas (cliques e rolagem). ' +
      '<a href="/politica-de-privacidade#cookies">Saiba mais</a>.</p>' +
      '<div class="tp-cb-actions">' +
      '<button type="button" class="tp-cb-no">Recusar</button>' +
      '<button type="button" class="tp-cb-ok">Aceitar</button>' +
      '</div>';
    box.querySelector('.tp-cb-no').addEventListener('click', function () { choose('denied'); });
    box.querySelector('.tp-cb-ok').addEventListener('click', function () { choose('granted'); });
    document.body.appendChild(box);
  }

  window.terapeeCookiePrefs = function () { showBanner(); };

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-cookie-prefs]');
    if (a) { e.preventDefault(); showBanner(); }
  });

  var v = read();
  if (v === 'granted') {
    loadClarity();
  } else if (v !== 'denied') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
