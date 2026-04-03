(() => {
  const header = document.querySelector("[data-elevate]");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-elevated", window.scrollY > 8);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInside =
        navMenu.contains(event.target) || navToggle.contains(event.target);

      if (!clickedInside && navMenu.classList.contains("is-open")) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  const whatsappButton = document.getElementById("kayne-whatsapp-button");
  const whatsappChat = document.getElementById("kayne-whatsapp-chat");
  const whatsappClose = document.getElementById("kayne-chat-close");
  const whatsappSend = document.getElementById("kayne-chat-send");
  const whatsappInput = document.getElementById("kayne-chat-input");

  const phone = "31612790499";

  if (whatsappButton && whatsappChat) {
    whatsappButton.addEventListener("click", function () {
      whatsappChat.classList.toggle("is-open");
    });
  }

  if (whatsappClose) {
    whatsappClose.addEventListener("click", function () {
      whatsappChat.classList.remove("is-open");
    });
  }

  function sendMessage() {
    if (!whatsappInput) return;

    let message = whatsappInput.value.trim();

    if (message === "") {
      message = "Hallo Kayne, ik heb een vraag via de website.";
    }

    const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
  }

  if (whatsappSend) {
    whatsappSend.addEventListener("click", sendMessage);
  }

  if (whatsappInput) {
    whatsappInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
      }
    });
  }
});