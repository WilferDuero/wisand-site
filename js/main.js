const WHATSAPP_NUMBER = "573000000000";
const WHATSAPP_MESSAGE = "Hola, quiero una demo de WISAND para mi negocio.";

function buildWhatsAppUrl() {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

function applyWhatsAppLinks() {
  const url = buildWhatsAppUrl();
  const links = document.querySelectorAll(".js-whatsapp-link");

  links.forEach((link) => {
    link.setAttribute("href", url);
  });
}

function setupCurrentYear() {
  const yearElement = document.getElementById("current-year");
  if (!yearElement) {
    return;
  }
  yearElement.textContent = new Date().getFullYear();
}

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function setupMobileMenu() {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  if (!menuButton || !nav) {
    return;
  }

  const closeMenu = () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyWhatsAppLinks();
  setupCurrentYear();
  setupRevealAnimations();
  setupMobileMenu();
});
