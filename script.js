document.addEventListener('DOMContentLoaded', () => {

  // ─── FADE-UP ANIMATIONS ───
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        fadeObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => fadeObs.observe(el));

  // ─── VSL MUTE/UNMUTE ───
  const video = document.getElementById('hero-video');
  const muteBtn = document.getElementById('mute-btn');
  const muteIcon = document.getElementById('mute-icon');
  if (muteBtn && video) {
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      muteIcon.textContent = video.muted ? '🔇' : '🔊';
    });
  }

  // ─── COUNTDOWN TIMER ───
  let totalSeconds = 2 * 3600;
  const saved = localStorage.getItem('copa-love-cd');
  if (saved) {
    const diff = Math.floor((Date.now() - parseInt(saved)) / 1000);
    totalSeconds = Math.max(0, totalSeconds - diff);
  } else {
    localStorage.setItem('copa-love-cd', Date.now().toString());
  }
  function updateCountdown() {
    if (totalSeconds <= 0) { totalSeconds = 2 * 3600; localStorage.setItem('copa-love-cd', Date.now().toString()); }
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-min');
    const sEl = document.getElementById('cd-sec');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
    totalSeconds--;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ─── PURCHASE NOTIFICATIONS ───
  const names = [
    'Ana de São Paulo','Juliana de BH','Marcos de Curitiba','Fernanda do Rio',
    'Lucas de Brasília','Camila de Salvador','Pedro de Fortaleza','Amanda de Recife',
    'Gustavo de POA','Letícia de Goiânia','Rafael de Manaus','Bianca de Floripa'
  ];
  const times = ['agora mesmo','há 1 minuto','há 2 minutos','há 3 minutos','há 5 minutos'];
  const notif = document.getElementById('purchase-notif');
  const notifName = document.getElementById('notif-name');
  const notifTime = document.getElementById('notif-time');
  function showNotification() {
    if (!notif) return;
    notifName.textContent = names[Math.floor(Math.random() * names.length)];
    notifTime.textContent = times[Math.floor(Math.random() * times.length)];
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 4000);
  }
  setTimeout(showNotification, 8000);
  setInterval(() => setTimeout(showNotification, 15000 + Math.random() * 15000), 25000);

  // ─── VIEWER COUNT ───
  const viewerEl = document.getElementById('viewer-count');
  if (viewerEl) {
    setInterval(() => {
      const c = parseInt(viewerEl.textContent);
      viewerEl.textContent = Math.max(98, Math.min(230, c + Math.floor(Math.random() * 7) - 3));
    }, 4000);
  }

  // ─── SMOOTH SCROLL ───
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});

// ─── FAQ ACCORDION ───
function toggleFaq(el) {
  const item = el.parentElement;
  const wasActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  if (!wasActive) item.classList.add('active');
}

// ─── UPSELL POPUP ───
function openUpsell() {
  document.getElementById('upsell-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeUpsell(e) {
  if (e.target === document.getElementById('upsell-overlay') || e.target.closest('.upsell-close')) {
    document.getElementById('upsell-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }
}
