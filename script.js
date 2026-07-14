// ===== Shared header/footer partials =====
const NAV = [
  { href: 'index.html', label: 'Home' },
  { href: 'menu.html', label: 'Menu' },
  { href: 'about.html', label: 'About' },
  { href: 'franchise.html', label: 'Franchise' },
  { href: 'contact.html', label: 'Contact' },
];

function buildHeader() {
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const links = NAV.map(n =>
    `<a href="${n.href}" class="${page === n.href ? 'active' : ''}">${n.label}</a>`
  ).join('');

  const mlinks = NAV.map(n =>
    `<a href="${n.href}" class="${page === n.href ? 'active' : ''}">${n.label}</a>`
  ).join('');

  return `
  <header class="site-header" id="siteHeader">
    <div class="header-container">
      <div class="header-bar">

        <a href="index.html" class="logo">
          <img
            src="./images/logo2.png"
            alt="MALBA_REE Logo"
            class="logo-img">
        </a>

        <nav class="nav">
          ${links}
        </nav>

        <a href="menu.html" class="btn btn-red btn-order-nav">
          Order Now
        </a>

        <button class="menu-toggle" id="menuToggle">
          ☰
        </button>

      </div>

      <div class="mobile-nav" id="mobileNav">
        ${mlinks}
      </div>

    </div>
  </header>`;
}

function buildFooter() {
  return `
  <footer class="site-footer">
    <div class="footer-grid footer">
      <div>
        <div class="footer-logo-wrap">
          <div class="logo"><span class="logo-mark">M</span><span>MALBA_REE</span></div>
        </div>
        <p class="font-script" style="margin-top:16px;font-size:24px;line-height:1.2;opacity:.9">Sip the taste of Kerala in every glass.</p>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><a href="menu.html">Menu</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="franchise.html">Franchise</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Visit Us</h4>
        <ul>
          <li>📍 Hyderabad, Telangana</li>
          <li>📞 +91 90000 00000</li>
          <li>✉️ hello@malbaree.in</li>
        </ul>
      </div>
      <div>
        <h4>Stay Updated</h4>
        <form class="footer-newsletter" onsubmit="event.preventDefault();showToast('Subscribed!')">
          <input type="email" required placeholder="Your email">
          <button>Join</button>
        </form>
        <div class="socials">
          <a href="#" aria-label="Instagram">📷</a>
          <a href="#" aria-label="Facebook">📘</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span id="yr"></span> MALBA_REE. All rights reserved.</span>
      <span>Made in Hyderabad · Inspired by Kerala</span>
    </div>
  </footer>
  <a class="wa-float" href="https://wa.me/919000000000?text=Hello%20MALBA_REE" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
  <div class="toast" id="toast"></div>`;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), 2200);
}

document.addEventListener('DOMContentLoaded', () => {
  // Inject header/footer
  const h = document.getElementById('siteHeader');
  const f = document.getElementById('siteFooter');
  if (h) h.outerHTML = buildHeader();
  if (f) f.outerHTML = buildFooter();
  const yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.getElementById('menuToggle');
  const mNav = document.getElementById('mobileNav');
  if (toggle && mNav) toggle.addEventListener('click', () => mNav.classList.toggle('open'));

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // FAQ toggle
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.faq').classList.toggle('open'));
  });

  // Menu filter/search
  const search = document.getElementById('menuSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-malba]');
  let curFilter = 'all';
  function apply() {
    const q = (search?.value || '').toLowerCase();
    let visible = 0;
    cards.forEach(c => {
      const tag = c.dataset.tag;
      const name = c.dataset.name.toLowerCase();
      const show = (curFilter === 'all' || tag === curFilter) && name.includes(q);
      c.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const empty = document.getElementById('menuEmpty');
    if (empty) empty.style.display = visible ? 'none' : 'block';
  }
  if (search) search.addEventListener('input', apply);
  filterBtns.forEach(b => b.addEventListener('click', () => {
    filterBtns.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    curFilter = b.dataset.filter;
    apply();
  }));

  // Add to cart toasts
  document.querySelectorAll('[data-add]').forEach(b => {
    b.addEventListener('click', () => showToast(`${b.dataset.add} added to cart`));
  });

  // Forms
  document.querySelectorAll('form[data-toast]').forEach(f => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast(f.dataset.toast);
      f.reset();
    });
  });
});
