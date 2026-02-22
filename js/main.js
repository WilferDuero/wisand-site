const WHATSAPP_NUMBER = "3204477725";
const WHATSAPP_DEFAULT_COUNTRY_CODE = "57";
const WHATSAPP_MESSAGE =
  "Hola, quiero una demo de WISAND para mi negocio. Que plan me recomiendan segun mi tipo de negocio? Mi tipo de negocio es:";

function getWhatsAppNumber() {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  if (digits.length === 10) {
    return `${WHATSAPP_DEFAULT_COUNTRY_CODE}${digits}`;
  }
  return digits;
}

function buildWhatsAppUrl() {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  const normalizedNumber = getWhatsAppNumber();
  return `https://wa.me/${normalizedNumber}?text=${encodedMessage}`;
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

  yearElement.textContent = String(new Date().getFullYear());
}

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
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
