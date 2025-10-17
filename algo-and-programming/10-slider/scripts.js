const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let currentIndex = 0;

const updateSlider = () => {
  const slideWidth = slides[0].offsetWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === slides.length - 1;
};

const slideToPrev = () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
};

const slideToNext = () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlider();
  }
};

const bindEvents = () => {
  prevBtn.addEventListener('click', slideToPrev);
  nextBtn.addEventListener('click', slideToNext);
  window.addEventListener('resize', updateSlider);
};

const init = () => {
  bindEvents();
  updateSlider();
};

init();
