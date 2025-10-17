class Slider {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autoplay: options.autoplay || false,
      autoplayInterval: options.autoplayInterval || 3000,
      infinite: options.infinite || true,
      ...options
    };

    this.track = element.querySelector('.slider-track');
    this.slides = element.querySelectorAll('.slide');
    this.prevBtn = element.querySelector('.slider-btn.prev');
    this.nextBtn = element.querySelector('.slider-btn.next');
    this.dotsContainer = element.querySelector('.slider-dots');
    
    this.currentIndex = 0;
    this.autoplayTimer = null;

    this.init();
  }

  init() {
    this.createDots();
    this.bindEvents();
    this.updateSlider();
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  createDots() {
    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });
  }

  updateDots() {
    const dots = this.dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  updateSlider() {
    const slideWidth = this.slides[0].offsetWidth;
    this.track.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
    
    if (!this.options.infinite) {
      this.prevBtn.disabled = this.currentIndex === 0;
      this.nextBtn.disabled = this.currentIndex === this.slides.length - 1;
    }
    
    this.updateDots();
  }

  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentIndex = index;
      this.updateSlider();
    }
  }

  slideToPrev() {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    } else if (this.options.infinite && this.currentIndex === 0) {
      this.goToSlide(this.slides.length - 1);
    }
  }

  slideToNext() {
    if (this.currentIndex < this.slides.length - 1) {
      this.goToSlide(this.currentIndex + 1);
    } else if (this.options.infinite && this.currentIndex === this.slides.length - 1) {
      this.goToSlide(0);
    }
  }

  startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      if (this.currentIndex === this.slides.length - 1) {
        this.goToSlide(0);
      } else {
        this.slideToNext();
      }
    }, this.options.autoplayInterval);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.slideToPrev());
    this.nextBtn.addEventListener('click', () => this.slideToNext());
    window.addEventListener('resize', () => this.updateSlider());
    
    if (this.options.autoplay) {
      this.element.addEventListener('mouseenter', () => this.stopAutoplay());
      this.element.addEventListener('mouseleave', () => this.startAutoplay());
    }
  }
}

// Initialize all sliders on the page
document.addEventListener('DOMContentLoaded', () => {
  new Slider(document.getElementById('slider1'), {
    autoplay: true,
    autoplayInterval: 2000
  });
  new Slider(document.getElementById('slider2'), {
    autoplay: true,
    autoplayInterval: 3000
  });
  new Slider(document.getElementById('slider3'), {
    infinite: false
  });
});
