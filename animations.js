// animations.js — STOICO smooth animations

(function () {
  // ── CSS ─────────────────────────────────────────────────────────────────────
  const css = `
    /* Entrada de página */
    body { animation: pageFadeIn 0.35s ease both; }
    @keyframes pageFadeIn { from { opacity:0 } to { opacity:1 } }

    /* Base: elemento listo para animar */
    .anim {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 0.6s cubic-bezier(.25,.46,.45,.94),
                  transform 0.6s cubic-bezier(.25,.46,.45,.94);
    }
    .anim.in { opacity:1; transform:translateY(0); }

    /* Delays para stagger */
    .anim-d1 { transition-delay:.05s }
    .anim-d2 { transition-delay:.10s }
    .anim-d3 { transition-delay:.15s }
    .anim-d4 { transition-delay:.20s }
    .anim-d5 { transition-delay:.25s }
    .anim-d6 { transition-delay:.30s }

    /* Header sombra al hacer scroll */
    header { transition: box-shadow 0.3s ease; }
    header.scrolled { box-shadow: 0 2px 16px rgba(0,0,0,0.08); }

    /* Fade en imágenes al cargar */
    img.img-fade { opacity:0; transition: opacity 0.5s ease; }
    img.img-fade.img-loaded { opacity:1; }

    /* Hero: stagger al entrar */
    @keyframes heroUp {
      from { opacity:0; transform:translateY(28px) }
      to   { opacity:1; transform:translateY(0) }
    }
    .hero-content > * {
      animation: heroUp 0.75s cubic-bezier(.25,.46,.45,.94) both;
    }
    .hero-content > *:nth-child(1) { animation-delay:.10s }
    .hero-content > *:nth-child(2) { animation-delay:.25s }
    .hero-content > *:nth-child(3) { animation-delay:.40s }
    .hero-content > *:nth-child(4) { animation-delay:.55s }
    .hero-content > *:nth-child(5) { animation-delay:.68s }

    /* Press feedback en botones */
    button, a[class*="bg-primary"], a[class*="border-primary"] {
      -webkit-tap-highlight-color: transparent;
    }
    button:active { transform: scale(0.97); }

    /* Hover suave en tarjetas de producto */
    .group { transition: box-shadow 0.3s ease; }
    .group:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }

    /* Cart sidebar entrada suave (ya tiene transform, solo reforzamos) */
    #cart-sidebar { will-change: transform; }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── INTERSECTION OBSERVER ────────────────────────────────────────────────────
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  function observe(el, delayIndex) {
    if (!el || el.classList.contains('anim')) return;
    el.classList.add('anim');
    if (delayIndex) el.classList.add(`anim-d${Math.min(delayIndex, 6)}`);
    io.observe(el);
  }

  // ── INIT ─────────────────────────────────────────────────────────────────────
  function init() {
    // Hero stagger
    const heroContent = document.querySelector('section .relative.z-10');
    if (heroContent) heroContent.classList.add('hero-content');

    // Header scroll shadow
    const header = document.querySelector('header');
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 8);
      }, { passive: true });
    }

    // Grids de productos (stagger)
    ['editorial-grid', 'product-grid', 'related', 'related-products'].forEach(id => {
      animateGrid(id);
    });

    // Elementos de la página de detalle
    [
      '#product-name', '#product-price', '#product-desc',
      '#size-grid', '#btn-add-cart', '#btn-single', '#btn-bulk',
      '.accordion',
    ].forEach((sel, i) => {
      document.querySelectorAll(sel).forEach((el, j) => observe(el, i + j + 1));
    });

    // Secciones generales (headings, párrafos de sección)
    document.querySelectorAll('section > div > h2, section > div > p, #manifesto p, #manifesto a').forEach((el, i) => {
      observe(el, i + 1);
    });

    // Imágenes con fade
    document.querySelectorAll('img').forEach(img => {
      img.classList.add('img-fade');
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('img-loaded');
      } else {
        img.addEventListener('load',  () => img.classList.add('img-loaded'));
        img.addEventListener('error', () => img.classList.add('img-loaded'));
      }
    });
  }

  function animateGrid(id) {
    const grid = document.getElementById(id);
    if (!grid) return;
    grid.querySelectorAll(':scope > *').forEach((el, i) => observe(el, (i % 6) + 1));

    // Observar cambios dinámicos (Firestore)
    new MutationObserver(() => {
      grid.querySelectorAll(':scope > *:not(.anim)').forEach((el, i) => observe(el, (i % 6) + 1));
    }).observe(grid, { childList: true });
  }

  // Ejecutar después del DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Pequeño delay para que el CSS ya esté aplicado
    requestAnimationFrame(init);
  }
})();
