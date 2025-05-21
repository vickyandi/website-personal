// Collapsible functionality
const collapsibles = document.querySelectorAll('.collapsible');
collapsibles.forEach(btn => {
  btn.addEventListener('click', function() {
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

// Back to top button functionality
const backToTopBtn = document.getElementById('backToTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Gallery navigation buttons and drag to scroll
const gallerySlider = document.querySelector('.gallery-slider');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

leftBtn.addEventListener('click', () => {
  gallerySlider.scrollBy({ left: -300, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
  gallerySlider.scrollBy({ left: 300, behavior: 'smooth' });
});

// Drag to scroll variables
let isDown = false;
let startX;
let scrollLeft;

gallerySlider.addEventListener('mousedown', (e) => {
  isDown = true;
  gallerySlider.classList.add('active-grab');
  startX = e.pageX - gallerySlider.offsetLeft;
  scrollLeft = gallerySlider.scrollLeft;
  gallerySlider.style.cursor = 'grabbing';
});

gallerySlider.addEventListener('mouseleave', () => {
  isDown = false;
  gallerySlider.classList.remove('active-grab');
  gallerySlider.style.cursor = 'grab';
});

gallerySlider.addEventListener('mouseup', () => {
  isDown = false;
  gallerySlider.classList.remove('active-grab');
  gallerySlider.style.cursor = 'grab';
});

gallerySlider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - gallerySlider.offsetLeft;
  const walk = (x - startX) * 2; //scroll-fast
  gallerySlider.scrollLeft = scrollLeft - walk;
});

// Touch support
let touchStartX = 0;
let touchScrollLeft = 0;

gallerySlider.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].pageX - gallerySlider.offsetLeft;
  touchScrollLeft = gallerySlider.scrollLeft;
});

gallerySlider.addEventListener('touchmove', (e) => {
  const x = e.touches[0].pageX - gallerySlider.offsetLeft;
  const walk = (x - touchStartX) * 2; //scroll-fast
  gallerySlider.scrollLeft = touchScrollLeft - walk;
});

// Fullscreen modal functionality
const fullscreenOverlay = document.getElementById('fullscreenOverlay');
const fullscreenImg = document.getElementById('fullscreenImg');
const closeFullscreenBtn = document.getElementById('closeFullscreen');

function openFullscreen(src, alt) {
  fullscreenImg.src = src;
  fullscreenImg.alt = alt;
  fullscreenOverlay.classList.add('show');
  fullscreenOverlay.setAttribute('aria-hidden', 'false');
  fullscreenOverlay.focus();
}

function closeFullscreen() {
  fullscreenImg.src = '';
  fullscreenImg.alt = '';
  fullscreenOverlay.classList.remove('show');
  fullscreenOverlay.setAttribute('aria-hidden', 'true');
}

// Click on gallery image to open fullscreen
gallerySlider.querySelectorAll('img').forEach(img => {
  img.addEventListener('click', () => {
    openFullscreen(img.src, img.alt);
  });
  img.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openFullscreen(img.src, img.alt);
    }
  });
});

// Close fullscreen on button
closeFullscreenBtn.addEventListener('click', closeFullscreen);

// Close fullscreen on clicking overlay outside image
fullscreenOverlay.addEventListener('click', (e) => {
  if(e.target === fullscreenOverlay) {
    closeFullscreen();
  }
});

// Close fullscreen on Escape keyboard
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && fullscreenOverlay.classList.contains('show')) {
    closeFullscreen();
  }
});

// Keyboard gallery navigation (left/right arrow while focused inside gallery)
gallerySlider.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowLeft') {
    gallerySlider.scrollBy({ left: -300, behavior: 'smooth' });
  }
  if(e.key === 'ArrowRight') {
    gallerySlider.scrollBy({ left: 300, behavior: 'smooth' });
  }
});
