document.getElementById('scrollToFeatures').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
});

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = easeOutExpo(progress);
    const value = Math.round(eased * target);
    el.textContent = value + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target + suffix; // lock the exact final value
    }
  }

  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target); // only run once
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.counter-number').forEach((el) => {
  counterObserver.observe(el);
});

(function(){
  const banner = document.getElementById('testimonialBanner');
  const slides = banner.querySelectorAll('.testimonial-slide');
  const dots = banner.querySelectorAll('.testimonial-dot');
  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = index;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function startAutoplay() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index, 10));
      startAutoplay(); // reset the timer so it doesn't jump right after a manual click
    });
  });

  startAutoplay();
})();

(function(){
  const items = document.querySelectorAll('#faqAccordion .faq-item');

  items.forEach((item) => {
    const button = item.querySelector('.faq-question');

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

(function(){
  const banner = document.getElementById('devBanner');
  const closeBtn = document.getElementById('devBannerClose');

  if (localStorage.getItem('devBannerDismissed') === 'true') {
    banner.style.display = 'none';
  }

  closeBtn.addEventListener('click', () => {
    banner.style.display = 'none';
    localStorage.setItem('devBannerDismissed', 'true');
  });
})();
