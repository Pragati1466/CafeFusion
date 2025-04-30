document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const navbarLinks = document.querySelectorAll(".nav-menu .nav-item");
  const openMenuButton = document.getElementById("open-menu-button");
  const closeMenuButton = document.getElementById("close-menu-button");

  openMenuButton.addEventListener('click', () => {
    // Toggle mobile menu visibility
    document.body.classList.toggle('show-mobile-menu');
  });

  navbarLinks.forEach(link => {
    // Close menu when a link is clicked
    link.addEventListener("click", () => openMenuButton.click());
  });

  // Close menu when the close button is clicked
  closeMenuButton.addEventListener('click', () => openMenuButton.click());

  // Seasonal offers display
  displaySeasonalOffer();

  function displaySeasonalOffer() {
    const offers = document.querySelectorAll(".offer-item");
    const specialOffersSection = document.getElementById("special-offers");
    const currentMonth = new Date().getMonth() + 1;

    let offerDisplayed = false;

    offers.forEach(offer => offer.style.display = 'none');

    if (currentMonth >= 10 && currentMonth <= 11) { // October to November for Diwali
      document.getElementById("diwali-offer").style.display = 'block';
      offerDisplayed = true;
    }
    if (currentMonth === 12) { // December for Christmas
      document.getElementById("christmas-offer").style.display = 'block';
      document.getElementById("newyear-offer").style.display = 'block';
      offerDisplayed = true;
    }
    if (currentMonth === 1) { // January for New Year
      document.getElementById("newyear-offer").style.display = 'block';
      offerDisplayed = true;
    }
    if (currentMonth === 3) { // March for Holi
      document.getElementById("holi-offer").style.display = 'block';
      offerDisplayed = true;
    }
    if (currentMonth === 8) { // August for Raksha Bandhan
      document.getElementById("rakhi-offer").style.display = 'block';
      offerDisplayed = true;
    }

    // Show or hide the section based on whether any offers are displayed
    if (offerDisplayed) {
      specialOffersSection.style.display = 'block';
    } else {
      specialOffersSection.style.display = 'none';
    }
  }
// Menu Carousel
  const menuSlider = document.querySelector('.menu-slider');
  const menuItems = document.querySelectorAll('.menu-item');
  const prevBtn = document.querySelector('.menu-nav-btn.prev');
  const nextBtn = document.querySelector('.menu-nav-btn.next');
  const progressBar = document.querySelector('.menu-progress-bar');
  const menuDots = document.querySelector('.menu-dots');
  const filterBtns = document.querySelectorAll('.menu-btn');

  let currentSlide = 0;
  const slideWidth = 320; // Width of each slide + gap
  const maxSlides = menuItems.length;
  let isAnimating = false;

  // Initialize dots
  menuItems.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('menu-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => !isAnimating && goToSlide(index));
    menuDots.appendChild(dot);
  });

  // Update active states
  function updateActiveStates() {
    // Update dots
    document.querySelectorAll('.menu-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });

    // Update items
    menuItems.forEach((item, index) => {
      item.classList.toggle('active', index === currentSlide);
    });

    // Update progress bar
    const progress = ((currentSlide + 1) / maxSlides) * 100;
    progressBar.style.width = `${progress}%`;

    // Update navigation buttons
    prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentSlide === maxSlides - 1 ? '0.5' : '1';
  }

  // Slide animation
  function goToSlide(index) {
    if (isAnimating) return;
    isAnimating = true;
    currentSlide = index;

    menuSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateActiveStates();

    // Reset animation lock after transition
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  // Navigation functions
  function nextSlide() {
    if (currentSlide < maxSlides - 1 && !isAnimating) {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 0 && !isAnimating) {
      goToSlide(currentSlide - 1);
    }
  }

  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Touch/Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  menuSlider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  menuSlider.addEventListener('touchend', e => {
    if (isAnimating) return;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentSlide < maxSlides - 1) {
        nextSlide();
      } else if (diff < 0 && currentSlide > 0) {
        prevSlide();
      }
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (isAnimating) return;
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter items
      let visibleItems = [];
      menuItems.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          visibleItems.push(item);
        } else {
          item.style.display = 'none';
        }
      });

      // Reset carousel
      currentSlide = 0;
      goToSlide(0);

      // Update dots for visible items only
      menuDots.innerHTML = '';
      visibleItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('menu-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => !isAnimating && goToSlide(index));
        menuDots.appendChild(dot);
      });
    });
  });

  // Initialize
  updateActiveStates();

  // Add hover pause for auto-play
  let autoPlayTimer;

  function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
      if (currentSlide < maxSlides - 1) {
        nextSlide();
      } else {
        goToSlide(0);
      }
    }, 5000);
  }

  menuSlider.addEventListener('mouseenter', () => {
    clearInterval(autoPlayTimer);
  });

  menuSlider.addEventListener('mouseleave', () => {
    startAutoPlay();
  });

  // Start auto-play
  startAutoPlay();

  // Swiper JS initialization
  let swiper = new Swiper('.slide-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 25,

    // Pagination bullets
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    /* Responsive breakpoints */
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1080: {
        slidesPerView: 3,
      },
    }
  });

  // Intersection Observer configuration for all animations
  const animationObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  // Create a single observer for all animations
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        animationObserver.unobserve(entry.target);
      }
    });
  }, animationObserverOptions);

  // Function to initialize animations for elements
  function initializeAnimations() {
    // Observe feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = `all 0.6s ease ${index * 0.1}s`;
      animationObserver.observe(item);
    });

    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = `all 0.6s ease ${index * 0.1}s`;
      animationObserver.observe(item);
    });

    // Observe reveal texts
    const revealTexts = document.querySelectorAll('.reveal-text');
    revealTexts.forEach((text, index) => {
      text.style.opacity = '0';
      text.style.transform = 'translateY(20px)';
      text.style.transition = `all 0.5s ease ${index * 0.1}s`;
      animationObserver.observe(text);
    });
  }

  initializeAnimations();

  // Initialize Swiper for testimonials
  const testimonialSwiper = new Swiper('.testimonial-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // Gallery Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
          item.style.display = 'block';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeLightbox = document.querySelector('.close-lightbox');

  // Open lightbox
  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('h3').textContent;
      const desc = card.querySelector('p').textContent;

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Close lightbox on outside click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Add hover effect for items
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-8px)';
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0)';
    });
  });

  // Coffee order tracker functionality
  const steps = {
    preparation: document.getElementById("step-preparation"),
    brewing: document.getElementById("step-brewing"),
    delivery: document.getElementById("step-delivery"),
  };

  const statusElement = document.getElementById("tracker-status");

  function updateTracker(step) {
    // Reset all steps
    for (const key in steps) {
      steps[key].classList.remove("active");
    }

    // Activate the current step
    if (steps[step]) {
      steps[step].classList.add("active");
    }

    // Update status message
    switch (step) {
      case "preparation":
        statusElement.textContent = "Your coffee is being prepared.";
        break;
      case "brewing":
        statusElement.textContent = "Your coffee is brewing.";
        break;
      case "delivery":
        statusElement.textContent = "Your coffee is on its way!";
        break;
      default:
        statusElement.textContent = "Invalid status.";
    }
  }

  // Example usage:
  // updateTracker('brewing'); // Update this based on your actual order tracking logic

  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
