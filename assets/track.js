/* Eventos de clique do site (Microsoft Clarity + dataLayer).
   Incluído em todas as páginas. Não depende do Clarity já ter carregado:
   o snippet do <head> cria a fila window.clarity antes.

   Eventos:
     clique_cadastro   link para web.terapee.com.br/register
     clique_entrar     link para web.terapee.com.br (login)
     clique_whatsapp   link para o WhatsApp
     menu_abrir        botão do menu no celular
     menu_<item>       link do menu do topo (menu_planos, menu_blog...)
     <data-track>      qualquer elemento com data-track="nome_do_evento"
   A posição do clique (topo, menu, hero, id da seção...) vai na tag
   "<evento>_posicao" do Clarity e no campo "posicao" do dataLayer. */
(function () {
  function slug(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  }
  function posicao(el) {
    var p = el.closest('[data-pos]');
    if (p) return p.getAttribute('data-pos');
    if (el.closest('.nav')) return 'menu';
    if (el.closest('header')) return 'topo';
    if (el.closest('footer')) return 'rodape';
    var s = el.closest('section[id], [id]');
    return s ? slug(s.id) : 'pagina';
  }
  function envia(nome, pos) {
    (window.dataLayer = window.dataLayer || []).push({ event: nome, posicao: pos });
    if (typeof window.clarity === 'function') {
      window.clarity('event', nome);
      if (pos) window.clarity('set', nome + '_posicao', pos);
    }
  }
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    if (t.closest('.mobile-toggle')) { envia('menu_abrir', 'topo'); return; }

    var marcado = t.closest('[data-track]');
    if (marcado) envia(marcado.getAttribute('data-track'), posicao(marcado));

    var a = t.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';

    if (/^https?:\/\/web\.terapee\.com\.br\/register/.test(href)) { envia('clique_cadastro', posicao(a)); return; }
    if (/^https?:\/\/web\.terapee\.com\.br/.test(href)) { envia('clique_entrar', posicao(a)); return; }
    if (/^https?:\/\/(api\.whatsapp\.com|wa\.me)\//.test(href)) { envia('clique_whatsapp', posicao(a)); return; }
    if (a.closest('header .nav')) envia('menu_' + slug(a.textContent), 'menu');
  }, true);
})();
