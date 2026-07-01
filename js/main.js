/* K Hand Works - main.js */

// Hamburger / Drawer
const hamburger = document.querySelector('.hamburger');
const drawer    = document.querySelector('.nav-drawer');
const overlay   = document.querySelector('.overlay');

function openMenu()  { hamburger.classList.add('open'); drawer.classList.add('open'); overlay.classList.add('show'); document.body.style.overflow = 'hidden'; }
function closeMenu() { hamburger.classList.remove('open'); drawer.classList.remove('open'); overlay.classList.remove('show'); document.body.style.overflow = ''; }

hamburger?.addEventListener('click', () => drawer.classList.contains('open') ? closeMenu() : openMenu());
overlay?.addEventListener('click', closeMenu);

// Close on nav link click
document.querySelectorAll('.nav-drawer a').forEach(a => a.addEventListener('click', closeMenu));

// Back to top
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('show', window.scrollY > 300);
});
backToTop?.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

// Works filter
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards  = document.querySelectorAll('.work-card[data-category]');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    workCards.forEach(c => { c.style.display = (f === 'all' || c.dataset.category === f) ? '' : 'none'; });
  });
});
