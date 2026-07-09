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

// Contact form (mailto handoff — no external service required)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const statusEl = document.getElementById('form-status');
  const submitBtn = contactForm.querySelector('.form-submit');
  const CONTACT_EMAIL = 'k.handworks.info@gmail.com';
  const SERVICE_LABELS = {
    repair: '住宅リペア・建材補修',
    infra: 'コンクリート・インフラ補修',
    asbestos: '石綿（アスベスト）事前調査',
    other: 'その他・複合的な相談',
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    // Honeypot: silently ignore bot submissions
    if (contactForm.elements['_gotcha']?.value) return;

    const data = new FormData(contactForm);
    const serviceValue = data.get('service');
    const lines = [
      `お名前: ${data.get('name') || ''}`,
      `会社名・屋号: ${data.get('company') || '(なし)'}`,
      `電話番号: ${data.get('tel') || ''}`,
      `メールアドレス: ${data.get('email') || '(なし)'}`,
      `ご相談内容の種別: ${SERVICE_LABELS[serviceValue] || '(未選択)'}`,
      '',
      'お問い合わせ内容:',
      data.get('message') || '',
    ];

    const subject = `【HPお問い合わせ】${data.get('name') || ''}様より`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;

    statusEl.textContent = 'メールソフトを起動しています。開いたメールの内容をご確認のうえ、送信してください。';
    statusEl.className = 'form-status show success';

    window.location.href = mailto;
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
