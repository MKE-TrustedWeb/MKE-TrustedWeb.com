// Set current year

const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(
  ".section-hero, .section-about-hero, .section-pricing-head, .section-more-info-head"
);

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Make mobile navigation work

document.addEventListener("DOMContentLoaded", function () {
  const btnNavEl = document.querySelector(".btn-mobile-nav");
  const headerEl = document.querySelector(".header");

  btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
  });
});
///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Scroll to links pointing to external pages
    if (!href.startsWith("#")) {
      // Navigate to the external page
      window.location.href = href;
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// pricing card slider
// Functie om de kaartenschuifregelaar in te stellen
document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const cards = document.querySelectorAll(".pricing-card");
  const indicators = document.querySelectorAll(".slider-indenticator");

  let currentCardIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function showCard(index) {
    cards.forEach((card, i) => {
      card.classList.remove("active", "next", "prev");

      if (i === index) {
        card.classList.add("active");
      }
      if (i === (index + 1) % cards.length) {
        card.classList.add("next", "active");
      }
      if (i === (index - 1 + cards.length) % cards.length) {
        card.classList.add("prev", "active");
      }
    });

    indicators.forEach((indicator) => {
      indicator.classList.remove("active-slider-indicator");
    });

    indicators[index].classList.add("active-slider-indicator");
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      showCard(index);
    });
  });

  prevBtn.addEventListener("click", function () {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    showCard(currentCardIndex);
  });

  nextBtn.addEventListener("click", function () {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    showCard(currentCardIndex);
  });

  document.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
  });

  document.addEventListener("touchend", function (event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 100;
    if (touchStartX - touchEndX > swipeThreshold) {
      nextCard();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevCard();
    }
  }

  function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    showCard(currentCardIndex);
  }

  function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    showCard(currentCardIndex);
  }

  showCard(currentCardIndex);
});

///////////////////////////////////////////////////////////
// Price more info show

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// cards, hide and show
function toggleText(element) {
  var textBox = element.querySelector(".value-text-box, .information-text-box");
  var upIcon = element.querySelector(".pricing-title-icon.up");
  var downIcon = element.querySelector(".pricing-title-icon.down");

  var isTextBoxOpen = !textBox.classList.contains("hidden");

  // Als het tekstvak open was, sluit het dan; anders open het
  if (isTextBoxOpen) {
    textBox.classList.add("hidden");
    upIcon.classList.add("hidden");
    downIcon.classList.remove("hidden");
  } else {
    textBox.classList.remove("hidden");
    upIcon.classList.remove("hidden");
    downIcon.classList.add("hidden");
  }
}
