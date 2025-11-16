const startTime = Date.now();
const minLoadTime = 2000;
window.addEventListener("load", () => {
  const loader = document.getElementById("loader-wrapper");
  if (!loader) return;
  const timeElapsed = Date.now() - startTime;
  const remainingTime = minLoadTime - timeElapsed;

  if (remainingTime > 0) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, remainingTime);
  } else {
    loader.classList.add("hidden");
  }
});

//Sample Toast Messages
const toastMessages = [
  "Delhi user ordered a Latte",
  "Mumbai user ordered a Cappuccino",
  "Bangalore user ordered an Espresso",
  "Chennai user ordered a Mocha",
  "Kolkata user ordered an Americano"
];

//createToast Functionality
function createToast() {
  let toast = document.createElement('div');
  toast.id = 'cafe-toast';
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.background = '#333';
  toast.style.color = '#fff';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
  toast.style.fontSize = '1rem';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s';
  document.body.appendChild(toast);
  return toast;
}
// Show and hide the toast with a random message
function showToast() {
  let toast = document.getElementById('cafe-toast');
  if (!toast) toast = createToast();
  // Pick a random message
  toast.textContent = toastMessages[Math.floor(Math.random() * toastMessages.length)];
  // Show the toast
  toast.style.opacity = '1';
  // Hide after 2 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 2000);
}
// Example: Show a toast when the page loads, or call showToast() after an order
window.onload = () => {
  showToast();
  // change time a/c as you like
  setInterval(showToast, 5000);
};
// THEME SWITCHER FUNCTIONALITY
function setTheme(themeName) {
  document.body.classList.remove("theme-beige", "theme-mocha", "theme-brown");
  document.body.classList.add(themeName);
  localStorage.setItem("selectedTheme", themeName);
}

// Apply saved theme on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    document.body.classList.add(savedTheme);
  }

  // 🎨 Theme dropdown toggle
  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      themeBtn.parentElement.classList.toggle("show");
    });
  }

  // Live Time Display Function
  function updateLiveTime() {
    const timeElement = document.getElementById("live-time");
    const now = new Date();

    // Format time with AM/PM
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12

    // Add leading zeros
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Display time
    timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
  }

  // Update time immediately and then every second
  updateLiveTime();
  setInterval(updateLiveTime, 1000);

  // Mobile menu functionality
  const navbarLinks = document.querySelectorAll(".nav-menu .nav-item");
  const openMenuButton = document.getElementById("open-menu-button");
  const closeMenuButton = document.getElementById("close-menu-button");

  openMenuButton.addEventListener("click", () => {
    // Toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
  });

  navbarLinks.forEach((link) => {
    // Close menu when a link is clicked
    link.addEventListener("click", () => openMenuButton.click());
  });

  // Close menu when the close button is clicked
  closeMenuButton.addEventListener("click", () => openMenuButton.click());

  // Seasonal offers display
  displaySeasonalOffer();

  function displaySeasonalOffer() {
    const offers = document.querySelectorAll(".offer-item");
    const specialOffersSection = document.getElementById("special-offers");
    const currentMonth = new Date().getMonth() + 1;

    let offerDisplayed = false;

    offers.forEach((offer) => (offer.style.display = "none"));

    if (currentMonth >= 10 && currentMonth <= 11) {
      // October to November for Diwali
      document.getElementById("diwali-offer").style.display = "block";
      offerDisplayed = true;
    }
    if (currentMonth === 12) {
      // December for Christmas
      document.getElementById("christmas-offer").style.display = "block";
      document.getElementById("newyear-offer").style.display = "block";
      offerDisplayed = true;
    }
    if (currentMonth === 1) {
      // January for New Year
      document.getElementById("newyear-offer").style.display = "block";
      offerDisplayed = true;
    }
    if (currentMonth === 3) {
      // March for Holi
      document.getElementById("holi-offer").style.display = "block";
      offerDisplayed = true;
    }
    if (currentMonth === 8) {
      // August for Raksha Bandhan
      document.getElementById("rakhi-offer").style.display = "block";
      offerDisplayed = true;
    }

    // Show or hide the section based on whether any offers are displayed
    if (offerDisplayed) {
      specialOffersSection.style.display = "block";
    } else {
      specialOffersSection.style.display = "none";
    }
  }
  // search menu
  function stopSlider() {
    const slider = document.querySelector(".menu-slider");
    slider.style.animationPlayState = "paused"; // for CSS animation 
  }

  function startSlider() {
    const slider = document.querySelector(".menu-slider");
    slider.style.animationPlayState = "running"; 
  }

  const searchMenu = document.getElementById("searchMenu");
  const searchIcon = document.getElementById("icon");
  const menuitems = document.querySelectorAll(".menu-item");

  searchMenu.addEventListener("input", (e) => {
    const query = searchMenu.value.toLowerCase();
    stopSlider();
    // hide icon while typing
    searchIcon.style.opacity = query.length > 0 ? "0" : "1";

    // filter items
    menuitems.forEach((item) => {
      const itemName = item.querySelector("h3").textContent.toLowerCase();
      item.style.display = itemName.includes(query) ? "block" : "none";
    });

    // resume slider if input is empty
    if (query.length === 0) {
      startSlider();
    }
  });
  // Menu Carousel
  const menuSlider = document.querySelector(".menu-slider");
  const menuItems = document.querySelectorAll(".menu-item");
  const prevBtn = document.querySelector(".menu-nav-btn.prev");
  const nextBtn = document.querySelector(".menu-nav-btn.next");
  const progressBar = document.querySelector(".menu-progress-bar");
  const menuDots = document.querySelector(".menu-dots");
  const filterBtns = document.querySelectorAll(".menu-btn");

  let currentSlide = 0;
  const slideWidth = 320; // Width of each slide + gap
  const maxSlides = menuItems.length;
  let isAnimating = false;

  // Initialize dots
  menuItems.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("menu-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => !isAnimating && goToSlide(index));
    menuDots.appendChild(dot);
  });

  // Update active states
  function updateActiveStates() {
    // Update dots
    document.querySelectorAll(".menu-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });

    // Update items
    menuItems.forEach((item, index) => {
      item.classList.toggle("active", index === currentSlide);
    });

    // Update progress bar
    const progress = ((currentSlide + 1) / maxSlides) * 100;
    progressBar.style.width = `${progress}%`;

    // Update navigation buttons
    prevBtn.style.opacity = currentSlide === 0 ? "0.5" : "1";
    nextBtn.style.opacity = currentSlide === maxSlides - 1 ? "0.5" : "1";
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
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Touch/Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  menuSlider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  menuSlider.addEventListener("touchend", (e) => {
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
  document.addEventListener("keydown", (e) => {
    if (isAnimating) return;
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter items
      let visibleItems = [];
      menuItems.forEach((item) => {
        const category = item.dataset.category;
        if (filter === "all" || category === filter) {
          item.style.display = "block";
          visibleItems.push(item);
        } else {
          item.style.display = "none";
        }
      });

      // Reset carousel
      currentSlide = 0;
      goToSlide(0);

      // Update dots for visible items only
      menuDots.innerHTML = "";
      visibleItems.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("menu-dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => !isAnimating && goToSlide(index));
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

  menuSlider.addEventListener("mouseenter", () => {
    clearInterval(autoPlayTimer);
  });

  menuSlider.addEventListener("mouseleave", () => {
    startAutoPlay();
  });

  // Start auto-play
  startAutoPlay();

  // Swiper JS initialization
  let swiper = new Swiper(".slide-wrapper", {
    loop: true,
    grabCursor: true,
    spaceBetween: 25,

    // Pagination bullets
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
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
    },
  });

  // Intersection Observer configuration for all animations
  const animationObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  // Create a single observer for all animations
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        animationObserver.unobserve(entry.target);
      }
    });
  }, animationObserverOptions);

  // Function to initialize animations for elements
  function initializeAnimations() {
    // Observe feature items
    const featureItems = document.querySelectorAll(".feature-item");
    featureItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)";
      item.style.transition = `all 0.6s ease ${index * 0.1}s`;
      animationObserver.observe(item);
    });

    // Observe gallery items
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)";
      item.style.transition = `all 0.6s ease ${index * 0.1}s`;
      animationObserver.observe(item);
    });

    // Observe reveal texts
    const revealTexts = document.querySelectorAll(".reveal-text");
    revealTexts.forEach((text, index) => {
      text.style.opacity = "0";
      text.style.transform = "translateY(20px)";
      text.style.transition = `all 0.5s ease ${index * 0.1}s`;
      animationObserver.observe(text);
    });
  }

  initializeAnimations();

  // Initialize Swiper for testimonials
  const testimonialSwiper = new Swiper(".testimonial-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
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
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
          item.style.display = "block";
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Lightbox functionality
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-image");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const closeLightbox = document.querySelector(".close-lightbox");

  // Open lightbox
  document.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title = card.querySelector("h3").textContent;
      const desc = card.querySelector("p").textContent;

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close lightbox
  closeLightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Close lightbox on outside click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Add hover effect for items
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateY(-8px)";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateY(0)";
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
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Playlist Section Scroll
  document.getElementById("playlist-btn")?.addEventListener("click", () => {
    const playlistSection = document.getElementById("playlist-vibes");
    playlistSection.scrollIntoView({ behavior: "smooth" });
  });

  // Order Tracking Functionality
  const orderNumberInput = document.getElementById("order-number");
  const trackOrderBtn = document.getElementById("track-order-btn");
  const orderStatusDisplay = document.getElementById("order-status");

  // Simulated order statuses
  const orderStatuses = {
    received: {
      steps: ["received", "preparing", "ready"],
      currentStep: 0,
    },
    preparing: {
      steps: ["received", "preparing", "ready"],
      currentStep: 1,
    },
    ready: {
      steps: ["received", "preparing", "ready"],
      currentStep: 2,
    },
  };

  // Mock order database (in a real app, this would be a backend API)
  const mockOrderDatabase = {
    CAFE123: "preparing",
    CAFE456: "received",
    CAFE789: "ready",
  };

  trackOrderBtn.addEventListener("click", () => {
    const orderNumber = orderNumberInput.value.toUpperCase();

    // Clear previous status
    orderStatusDisplay.querySelectorAll(".status-step").forEach((step) => {
      step.classList.remove("active");
    });

    // Check if order exists
    if (mockOrderDatabase[orderNumber]) {
      const orderStatus = mockOrderDatabase[orderNumber];
      const statusInfo = orderStatuses[orderStatus];

      // Activate steps up to current status
      statusInfo.steps.slice(0, statusInfo.currentStep + 1).forEach((step) => {
        const stepElement = orderStatusDisplay.querySelector(
          `[data-status="${step}"]`
        );
        if (stepElement) {
          stepElement.classList.add("active");
        }
      });

      // Optional: Show toast or notification
      showNotification(
        `Order ${orderNumber} is currently ${orderStatus}`,
        "success"
      );
    } else {
      // Order not found
      showNotification(
        "Order not found. Please check your order number.",
        "error"
      );
    }
  });

  // Notification helper function
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Append to body
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }

  // Contact Form Handling
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value.trim(),
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    // Email validation regex (Indian-friendly)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    // Phone number validation (Indian mobile numbers)
    const phoneRegex = /^(\+91[-\s]?)?[6-9]\d{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      showNotification("Please enter a valid Indian mobile number", "error");
      return;
    }

    // Simulate form submission (replace with actual API call in production)
    try {
      // Mock API submission
      console.log("Submitting form:", formData);

      // Clear form
      contactForm.reset();

      // Show success notification
      showNotification(
        "संदेश सफलतापूर्वक भेजा गया! हम जल्द ही आपसे संपर्क करेंगे। (Message sent successfully! We'll get back to you soon.)",
        "success"
      );
    } catch (error) {
      showNotification(
        "संदेश भेजने में असफल। कृपया पुनः प्रयास करें। (Failed to send message. Please try again.)",
        "error"
      );
    }
  });

  // Newsletter Subscription Handling
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterInput = newsletterForm.querySelector('input[type="email"]');
  const newsletterButton = newsletterForm.querySelector("button");

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get email value and trim whitespace
    const email = newsletterInput.value.trim();

    // Email validation regex (Indian-friendly)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate email
    if (!email) {
      showNotification("Please enter your email address", "error");
      return;
    }

    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    // Simulate newsletter subscription (replace with actual API call in production)
    try {
      // Mock API submission
      console.log("Subscribing email:", email);

      // Clear input
      newsletterInput.value = "";

      // Show success notification in both English and Hindi
      showNotification(
        "🎉 सफलतापूर्वक सब्सक्राइब! (Successfully subscribed!) You'll now receive our latest updates.",
        "success"
      );
    } catch (error) {
      // Error handling
      showNotification(
        "सब्सक्रिप्शन विफल। कृपया पुनः प्रयास करें। (Subscription failed. Please try again.)",
        "error"
      );
    }
  });
});
function notify(msg) {
  const box = document.getElementById("added");
  box.innerText = msg;
  box.classList.add('show'); // Add the 'show' class
  setTimeout(() => {
    box.classList.remove('show'); // Remove after 2 seconds
  }, 2000);
}

function changeQty(index, change) {
  cartItems[index].quantity += change;
  if (cartItems[index].quantity <= 0) {
    removeItem(index);
  } else {
    showCartPopup();
  }
}

function removeItem(index) {
 
  cartItems.splice(index, 1);

  
  if (cartItems.length === 0) {
    document.getElementById("cart-panel").classList.add("hidden");
    notify("Cart is now empty");
  } else {
    showCartPopup();
  }
}
function generateOrderTable() {
  if (cartItems.length === 0) {
    notify("Cart is empty");
    return;
  }

  // Show popup form for customer details
  showCustomerForm();
}

function showCustomerForm() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999999999;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
  `;

  // Create form popup
  const popup = document.createElement('div');
  popup.style.cssText = `
    background: white;
    padding: 35px;
    border-radius: 15px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 450px;
    animation: slideIn 0.3s ease;
  `;

  popup.innerHTML = `
    <style>
      @keyframes slideIn {
        from {
          transform: translateY(-50px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    </style>
    <h2 style="margin: 0 0 25px 0; color: #532303; font-size: 24px; text-align: center; border-bottom: 2px solid #532303; padding-bottom: 15px;">
      Customer Details
    </h2>
    <form id="customerForm">
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; color: #333; font-weight: 600; font-size: 14px;">
          Name <span style="color: red;">*</span>
        </label>
        <input 
          type="text" 
          id="customerName" 
          required 
          style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box; transition: border 0.3s;"
          onfocus="this.style.borderColor='#532303'"
          onblur="this.style.borderColor='#ddd'"
          placeholder="Enter customer name"
        />
      </div>
      <div style="margin-bottom: 25px;">
        <label style="display: block; margin-bottom: 8px; color: #333; font-weight: 600; font-size: 14px;">
          Address <span style="color: red;">*</span>
        </label>
        <textarea 
          id="customerAddress" 
          required 
          rows="3"
          style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box; resize: vertical; transition: border 0.3s; font-family: inherit;"
          onfocus="this.style.borderColor='#532303'"
          onblur="this.style.borderColor='#ddd'"
          placeholder="Enter customer address"
        ></textarea>
      </div>
      <div style="display: flex; gap: 12px;">
        <button 
          type="submit" 
          style="flex: 1; padding: 12px; background: linear-gradient(135deg, #532303, #3d1a02); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: transform 0.2s;"
          onmouseover="this.style.transform='translateY(-2px)'"
          onmouseout="this.style.transform='translateY(0)'"
        >
          Generate Receipt
        </button>
        <button 
          type="button" 
          id="cancelBtn"
          style="flex: 1; padding: 12px; background: #e0e0e0; color: #333; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s;"
          onmouseover="this.style.background='#d0d0d0'"
          onmouseout="this.style.background='#e0e0e0'"
        >
          Cancel
        </button>
      </div>
    </form>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // Handle form submission
  document.getElementById('customerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('customerName').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    
    if (name && address) {
      document.body.removeChild(overlay);
      generateReceipt(name, address);
    }
  });

  // Handle cancel
  document.getElementById('cancelBtn').addEventListener('click', () => {
    document.body.removeChild(overlay);
  });

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}

function generateReceipt(customerName, customerAddress) {
  try {
    // Check if jsPDF is available
    if (typeof window.jspdf === 'undefined') {
      console.error('jsPDF library not loaded');
      generateHTMLReceipt(customerName, customerAddress);
      return;
    }

    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add header with cafe branding
    doc.setFillColor(83, 35, 3);
    doc.rect(0, 0, 210, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont(undefined, 'bold');
    doc.text('Cafe Fusion', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Hauz Khas Village, New Delhi | +91 (011) 4567-8901', 105, 28, { align: 'center' });

    // Invoice title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('INVOICE', 105, 48, { align: 'center' });
    
    // Order details in classical bill pattern
    doc.setFontSize(10);
    const currentDate = new Date().toLocaleString('en-IN', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const orderNumber = 'CF-' + Date.now().toString().slice(-6);

    // Left side - Customer details
    doc.setFont(undefined, 'bold');
    doc.text('Bill To:', 14, 58);
    doc.setFont(undefined, 'normal');
    doc.text(customerName, 14, 64);
    const addressLines = doc.splitTextToSize(customerAddress, 80);
    doc.text(addressLines, 14, 70);

    // Right side - Order details
    doc.setFont(undefined, 'bold');
    doc.text('Order No:', 140, 58);
    doc.setFont(undefined, 'normal');
    doc.text(orderNumber, 165, 58);
    
    doc.setFont(undefined, 'bold');
    doc.text('Date:', 140, 64);
    doc.setFont(undefined, 'normal');
    const dateLines = doc.splitTextToSize(currentDate, 45);
    doc.text(dateLines, 165, 64);

    // Prepare table data
    const tableData = [];
    let total = 0;

    cartItems.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      tableData.push([
        item.name,
        'Rs ' + item.price,
        item.quantity.toString(),
        'Rs ' + subtotal
      ]);
    });

    // Add table
    doc.autoTable({
      startY: 85,
      head: [['Item', 'Price', 'Qty', 'Subtotal']],
      body: tableData,
      foot: [['', '', 'Total:', 'Rs ' + total]],
      theme: 'striped',
      headStyles: {
        fillColor: [83, 35, 3],
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: 'bold',
        halign: 'center'
      },
      footStyles: {
        fillColor: [245, 245, 245],
        textColor: [0, 0, 0],
        fontSize: 13,
        fontStyle: 'bold',
        halign: 'right'
      },
      bodyStyles: {
        fontSize: 10,
        halign: 'left'
      },
      columnStyles: {
        0: { cellWidth: 85, halign: 'left' },
        1: { halign: 'right', cellWidth: 35 },
        2: { halign: 'center', cellWidth: 25 },
        3: { halign: 'right', cellWidth: 35 }
      },
      margin: { left: 14, right: 14 }
    });

    // Signature section
    const finalY = doc.lastAutoTable.finalY + 20;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Customer Signature:', 14, finalY);
    doc.line(50, finalY, 90, finalY);
    
    doc.text('Authorized Signatory:', 120, finalY);
    doc.line(165, finalY, 196, finalY);

    // Footer at bottom of page
    const pageHeight = doc.internal.pageSize.height;
    doc.setDrawColor(83, 35, 3);
    doc.setLineWidth(0.5);
    doc.line(14, pageHeight - 30, 196, pageHeight - 30);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for choosing Cafe Fusion!', 105, pageHeight - 22, { align: 'center' });
    doc.setFontSize(9);
    doc.text('hello@cafefusion.in | www.cafefusion.in', 105, pageHeight - 17, { align: 'center' });
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('This is a computer-generated receipt', 105, pageHeight - 12, { align: 'center' });

    const filename = 'CafeFusion_Receipt_' + Date.now() + '.pdf';
    doc.save(filename);

    notify("PDF downloaded successfully!");

  } catch (error) {
    console.error('PDF Generation Error:', error);
    notify("Failed to generate PDF. Opening HTML version...");
    generateHTMLReceipt(customerName, customerAddress);
  }
}

function generateHTMLReceipt(customerName, customerAddress) {
  let tableHTML = `
    <table border="1" cellpadding="10" cellspacing="0" style="width:100%; border-collapse:collapse;">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
  `;

  let total = 0;
  cartItems.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    tableHTML += `
      <tr>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>${item.quantity}</td>
        <td>₹${subtotal}</td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3"><strong>Total</strong></td>
          <td><strong>₹${total}</strong></td>
        </tr>
      </tfoot>
    </table>
  `;

  const currentDate = new Date().toLocaleString('en-IN', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const orderNumber = 'CF-' + Date.now().toString().slice(-6);

  const newWindow = window.open('', '_blank');
  newWindow.document.write(`
    <html>
      <head>
        <title>Café Fusion - Invoice</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: #f5f5f5;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .receipt-container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .header {
            background: linear-gradient(135deg, #532303, #3d1a02);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 { 
            margin: 0 0 10px 0;
            font-size: 36px;
          }
          .header-info {
            font-size: 13px;
            opacity: 0.95;
          }
          .content {
            padding: 40px;
            flex: 1;
          }
          .invoice-title {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 30px;
            color: #532303;
            letter-spacing: 2px;
          }
          .bill-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
          }
          .bill-to, .bill-details {
            width: 48%;
          }
          .bill-to h3, .bill-details h3 {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #532303;
          }
          .bill-to p, .bill-details p {
            margin: 5px 0;
            font-size: 14px;
            line-height: 1.6;
          }
          .bill-details p {
            display: flex;
            justify-content: space-between;
          }
          .bill-details strong {
            font-weight: 700;
            min-width: 100px;
          }
          table { 
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          th { 
            background: linear-gradient(135deg, #532303, #3d1a02);
            color: white;
            padding: 15px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
          }
          td {
            padding: 12px 15px;
            border-bottom: 1px solid #f0f0f0;
            text-align: center;
            font-size: 14px;
          }
          tbody tr:hover {
            background-color: #f9f9f9;
          }
          tfoot tr {
            background-color: #f5f5f5;
          }
          tfoot td {
            border: none;
            padding: 15px;
            font-weight: bold;
            font-size: 16px;
          }
          .signature-section {
            display: flex;
            justify-content: space-between;
            margin: 50px 0 30px 0;
          }
          .signature-box {
            width: 45%;
            text-align: center;
          }
          .signature-line {
            border-top: 2px solid #000;
            margin-top: 60px;
            padding-top: 8px;
            font-size: 13px;
            color: #666;
            font-weight: 600;
          }
          .footer {
            background: #f9f9f9;
            padding: 25px;
            text-align: center;
            border-top: 3px solid #532303;
            margin-top: auto;
          }
          .footer p {
            margin: 5px 0;
            color: #666;
            font-size: 13px;
          }
          .footer strong {
            color: #532303;
            font-size: 15px;
          }
          .footer-note {
            margin-top: 15px;
            font-size: 11px;
            color: #999;
          }
          .print-btn {
            display: block;
            margin: 20px auto;
            padding: 12px 40px;
            background: linear-gradient(135deg, #532303, #3d1a02);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: transform 0.2s ease;
          }
          .print-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(83, 35, 3, 0.4);
          }
          @media print {
            body {
              background: white;
              padding: 0;
            }
            .print-btn { 
              display: none; 
            }
            .receipt-container {
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="header">
            <h1>☕ Café Fusion</h1>
            <div class="header-info">
              Hauz Khas Village, New Delhi | +91 (011) 4567-8901<br>
              hello@cafefusion.in | www.cafefusion.in
            </div>
          </div>
          
          <div class="content">
            <div class="invoice-title">INVOICE</div>
            
            <div class="bill-info">
              <div class="bill-to">
                <h3>Bill To:</h3>
                <p><strong>${customerName}</strong></p>
                <p>${customerAddress.replace(/\n/g, '<br>')}</p>
              </div>
              <div class="bill-details">
                <p><strong>Order No:</strong> <span>${orderNumber}</span></p>
                <p><strong>Date:</strong> <span>${currentDate}</span></p>
              </div>
            </div>
            
            ${tableHTML}
            
            <div class="signature-section">
              <div class="signature-box">
                <div class="signature-line">Customer Signature</div>
              </div>
              <div class="signature-box">
                <div class="signature-line">Authorized Signatory</div>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Thank you for choosing Café Fusion!</strong></p>
            <p class="footer-note">This is a computer-generated receipt</p>
          </div>
          
          <button class="print-btn" onclick="window.print()">🖨️ Print Receipt</button>
        </div>
      </body>
    </html>
  `);
  newWindow.document.close();
}

function showCartPopup() {
  const panel = document.getElementById("cart-panel");

  if (cartItems.length === 0) {
    panel.classList.add("hidden");
    notify("Your cart is empty");
    return;
  }

  let html = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    html += `
      <div class="cart-row"> 
        <img src="${item.image}" alt="${item.name}" class="cart-image">
        <div class="cart-name">${item.name}</div>
        <div class="cart-price">₹${item.price}</div>
        <div class="qty-controls">
          <button class="qty-btn qty-decrease" data-index="${index}">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn qty-increase" data-index="${index}">+</button>
        </div>
        <div class="cart-subtotal">₹${subtotal}</div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;
  });

  html += `
    <div class="cart-total"><strong>Total:</strong> ₹${total}</div>
    <div class="card-divider_2">
      <button class="export-table-btn">Generate Order Receipt</button>
      <button class="close-cart">Close</button>
    </div>
  `;

  panel.innerHTML = html;
  panel.classList.remove("hidden");

  
  panel.querySelector(".close-cart").addEventListener("click", (e) => {
    e.stopPropagation();
    panel.classList.add("hidden");
  });

  panel.querySelector(".export-table-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    generateOrderTable();
  });

  panel.querySelectorAll(".qty-decrease").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = parseInt(btn.dataset.index);
      changeQty(index, -1);
    });
  });

 
  panel.querySelectorAll(".qty-increase").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = parseInt(btn.dataset.index);
      changeQty(index, 1);
    });
  });

  
  panel.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = parseInt(btn.dataset.index);
      removeItem(index);
    });
  });
}


let count = 0;
let cartItems = [];

function setupCart() {
  const cartIcon = document.querySelector('.cart');

  function triggerShake() {
    if (count === 0) {
      cartIcon.classList.add('shake');
      setTimeout(() => {
        cartIcon.classList.remove('shake');
      }, 500);
    }
  }

  triggerShake();
  setInterval(triggerShake, 10000);

  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest(".menu-card");
      const name = card.querySelector(".menu-card-front h3").innerText;
      const price = card.querySelector(".price").innerText.replace("₹", "");
      const image = card.querySelector(".menu-image").src;

      let existing = cartItems.find(item => item.name === name);
      if (existing) {
        existing.quantity++;
        notify("Quantity increased in cart");
        count--;
        
      } else {
        cartItems.push({ name, price, image, quantity: 1 });
        notify("Item added to cart");
      }
      
      count++;
      document.getElementById('cart-count').innerHTML = count;
      
      if (count > 0) {
        cartIcon.classList.remove('shake');
      }
    });
  });
  cartIcon.addEventListener('click', (e) => {
    e.stopPropagation(); 
    showCartPopup();
  });
}

document.addEventListener("click", function (e) {
  const panel = document.getElementById("cart-panel");
  const cartIcon = document.querySelector(".cart");

  if (!panel || panel.classList.contains("hidden")) return;

 
  if (panel.contains(e.target)) return;


  if (cartIcon && cartIcon.contains(e.target)) return;

  panel.classList.add("hidden");
  console.log("Cart closed by outside click"); 
});

setupCart();

