/* ═══════════════════════════════════════════════════════════════
   GABRIELE BIANCO // PORTFOLIO — shared script
   ═══════════════════════════════════════════════════════════════ */

/* ── Hamburger ───────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  })
);

/* ── SVG Buttons ─────────────────────────────────────────────── */
const R  = 2;
const N  = 14;
const SW = 1.5;

function btnPath(W, H, r, n) {
  return [
    `M ${r} 0`, `L ${W-n} 0`,
    `M ${W} ${n}`, `L ${W} ${H-r}`, `Q ${W} ${H} ${W-r} ${H}`,
    `L ${n} ${H}`,
    `M 0 ${H-n}`, `L 0 ${r}`, `Q 0 0 ${r} 0`,
  ].join(' ');
}

function btnFillPath(W, H, r, n) {
  return [
    `M ${r} 0`, `L ${W-n} 0`, `L ${W} ${n}`,
    `L ${W} ${H-r}`, `Q ${W} ${H} ${W-r} ${H}`,
    `L ${n} ${H}`, `L 0 ${H-n}`,
    `L 0 ${r}`, `Q 0 0 ${r} 0`, `Z`,
  ].join(' ');
}

function setupBtn(btnEl, svgBorder, svgFill, strokeColor, fillColor) {
  function draw() {
    const W = btnEl.offsetWidth;
    const H = btnEl.offsetHeight;
    [svgBorder, svgFill].forEach(s => {
      s.setAttribute('viewBox', `0 0 ${W} ${H}`);
      s.setAttribute('width', W);
      s.setAttribute('height', H);
    });
    svgBorder.innerHTML = `<path d="${btnPath(W,H,R,N)}" fill="none" stroke="${strokeColor}" stroke-width="${SW}" stroke-linecap="round"/>`;
    svgFill.innerHTML   = `<path d="${btnFillPath(W,H,R,N)}" fill="${fillColor}" stroke="none"/>`;
  }
  draw();
  window.addEventListener('resize', draw);
}

/* ── Toast ───────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── Copy email ──────────────────────────────────────────────── */
function copyEmail() {
  navigator.clipboard.writeText('gabriele.bianco001@gmail.com')
    .then(() => showToast('Email copied to clipboard'))
    .catch(() => showToast('Email copied to clipboard'));
}

/* ── Downloads ───────────────────────────────────────────────── */
function downloadCV()  { showToast('CV coming soon — file not yet uploaded'); }
function downloadPDF() { showToast('Portfolio PDF coming soon — file not yet uploaded'); }

/* ── Custom Cursor ───────────────────────────────────────────── */
const dot  = document.createElement('div');
const ring = document.createElement('div');
dot.className  = 'cursor-dot';
ring.className = 'cursor-ring';
document.body.appendChild(dot);
document.body.appendChild(ring);

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;
let rafId;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  rafId = requestAnimationFrame(animateRing);
}
animateRing();

/* Expand ring su elementi interattivi */
const hoverTargets = 'a, button, .sw-card, .exp-card, .tag, .copy-btn, .back-to-top, .social-link';
document.addEventListener('mouseover', e => {
  if (e.target.closest(hoverTargets)) ring.classList.add('expanded');
});
document.addEventListener('mouseout', e => {
  if (e.target.closest(hoverTargets)) ring.classList.remove('expanded');
});

/* Nascondi cursore quando esce dalla finestra */
document.addEventListener('mouseleave', () => {
  dot.style.opacity  = '0';
  ring.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  dot.style.opacity  = '1';
  ring.style.opacity = '1';
});

/* ── Scroll Indicator ────────────────────────────────────────── */
const scrollIndicator = document.getElementById('scrollIndicator');
if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      scrollIndicator.classList.add('hidden');
    } else {
      scrollIndicator.classList.remove('hidden');
    }
  }, { passive: true });
}

/* ── Back to Top ─────────────────────────────────────────────── */
const btt = document.createElement('button');
btt.className   = 'back-to-top';
btt.setAttribute('aria-label', 'Back to top');
btt.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e8a2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`;
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.body.appendChild(btt);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btt.classList.add('visible');
  } else {
    btt.classList.remove('visible');
  }
}, { passive: true });

/* ── Reveal on scroll (IntersectionObserver) ─────────────────── */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  // Piccolo delay iniziale così gli elementi già nel viewport animano al load
  setTimeout(() => {
    revealEls.forEach(el => observer.observe(el));
  }, 100);
}
