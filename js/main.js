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

// Contact form (Formspree AJAX submit)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const statusEl = document.getElementById('form-status');
  const submitBtn = contactForm.querySelector('.form-submit');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';
    statusEl.className = 'form-status';
    statusEl.textContent = '';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        statusEl.textContent = '送信しました。担当より1〜2営業日以内にご連絡します。';
        statusEl.className = 'form-status show success';
        contactForm.reset();
      } else {
        statusEl.textContent = '送信に失敗しました。お手数ですがお電話にてご連絡ください。';
        statusEl.className = 'form-status show error';
      }
    } catch (err) {
      statusEl.textContent = '送信に失敗しました。お手数ですがお電話にてご連絡ください。';
      statusEl.className = 'form-status show error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '送信する →';
    }
  });
}

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
