const WHATSAPP_URL =
  "https://wa.me/573204477725?text=Hola,%20quiero%20una%20demo%20de%20WISAND%20para%20mi%20negocio.%0A%0AMe%20gustaría%20que%20me%20recomienden%20el%20mejor%20plan%20según%20mi%20tipo%20de%20negocio.%0A%0AMi%20tipo%20de%20negocio%20es:";

function applyWhatsAppLinks() {
  const links = document.querySelectorAll(".js-whatsapp-link");
  if (!links.length) {
    return;
  }

  links.forEach((link) => {
    link.setAttribute("href", WHATSAPP_URL);
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
    { threshold: 0.16 }
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

function setupFloatingWhatsAppStopAtFooter() {
  const floatingButton = document.querySelector(".floating-whatsapp");
  const footer = document.querySelector(".site-footer");
  if (!floatingButton || !footer) {
    return;
  }

  const baseBottomPx = 16;
  const footerGapPx = 12;
  let ticking = false;

  const updateFloatingButton = () => {
    const footerTop = footer.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;
    const overlap = viewportHeight - footerTop;

    if (overlap > 0) {
      floatingButton.style.bottom = `${baseBottomPx + overlap + footerGapPx}px`;
    } else {
      floatingButton.style.bottom = `${baseBottomPx}px`;
    }

    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateFloatingButton);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  requestUpdate();
}

document.addEventListener("DOMContentLoaded", () => {
  applyWhatsAppLinks();
  setupCurrentYear();
  setupRevealAnimations();
  setupMobileMenu();
  setupFloatingWhatsAppStopAtFooter();
});
