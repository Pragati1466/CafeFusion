document.addEventListener("DOMContentLoaded", function() {
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
});
