// ===================== BELLA VIE — SCRIPT =====================

// Preloader
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => pre.classList.add('hide'), 500);
});

// Navbar scroll state
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

function onScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  if (window.scrollY > 600) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
}
window.addEventListener('scroll', onScroll);
onScroll();

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Mobile nav
const burgerBtn = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');

burgerBtn.addEventListener('click', () => mobileNav.classList.add('open'));
mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Testimonial slider
const testiTrack = document.getElementById('testiTrack');
const testiPrev = document.getElementById('testiPrev');
const testiNext = document.getElementById('testiNext');
let testiIndex = 0;

function testiCardWidth() {
  const card = testiTrack.querySelector('.testi-card');
  if (!card) return 0;
  const gap = 26;
  return card.getBoundingClientRect().width + gap;
}

function updateTestiPosition() {
  const total = testiTrack.querySelectorAll('.testi-card').length;
  const maxIndex = Math.max(0, total - 1);
  testiIndex = Math.min(Math.max(testiIndex, 0), maxIndex);
  testiTrack.style.transform = `translateX(-${testiIndex * testiCardWidth()}px)`;
}

testiNext.addEventListener('click', () => {
  const total = testiTrack.querySelectorAll('.testi-card').length;
  testiIndex = (testiIndex + 1) % total;
  updateTestiPosition();
});
testiPrev.addEventListener('click', () => {
  const total = testiTrack.querySelectorAll('.testi-card').length;
  testiIndex = (testiIndex - 1 + total) % total;
  updateTestiPosition();
});
window.addEventListener('resize', updateTestiPosition);

testiTrack.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';

// Booking form submission
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');
const formReset = document.getElementById('formReset');

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // In production: send form data to a booking endpoint / email service here.
  formSuccess.classList.add('show');
});

formReset.addEventListener('click', () => {
  formSuccess.classList.remove('show');
  bookingForm.reset();
});

// Set min date for date picker to today
const dateInput = document.getElementById('fdate');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}
