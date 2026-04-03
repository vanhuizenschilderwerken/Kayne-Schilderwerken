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
      const clickedInside = navMenu.contains(event.target) || navToggle.contains(event.target);

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

  const form = document.querySelector(".form");

  if (form) {
    const submitButton = form.querySelector("button[type='submit']");
    const originalText = submitButton ? submitButton.textContent : "Verstuur aanvraag";

    let statusMessage = form.querySelector(".form-status");

    if (!statusMessage) {
      statusMessage = document.createElement("p");
      statusMessage.className = "form-status";
      statusMessage.style.marginTop = "12px";
      statusMessage.style.fontWeight = "600";
      form.appendChild(statusMessage);
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!submitButton) return;

      const naam = document.getElementById("naam")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const telefoon = document.getElementById("telefoon")?.value.trim() || "";
      const dienst = document.getElementById("dienst")?.value.trim() || "";
      const bericht = document.getElementById("bericht")?.value.trim() || "";

      if (!naam || !email || !dienst || !bericht) {
        statusMessage.textContent = "Vul alle verplichte velden in.";
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = "Bezig met versturen...";
      statusMessage.textContent = "";

      const formData = new FormData();
      formData.append("access_key", "cb1c0c80-2b2f-45da-92e1-77459e7f29c6");
      formData.append("subject", "Nieuwe offerteaanvraag - Kayne Schilderwerken");
      formData.append("from_name", "Website Kayne Schilderwerken");
      formData.append("to", "kayneschilderwerken@outlook.com");
      formData.append("replyto", email);

      formData.append("naam", naam);
      formData.append("email", email);
      formData.append("telefoon", telefoon);
      formData.append("dienst", dienst);
      formData.append("bericht", bericht);

      formData.append("botcheck", "");

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (response.ok && result.success) {
          statusMessage.textContent = "Je aanvraag is succesvol verstuurd.";
          form.reset();
        } else {
          statusMessage.textContent = "Er ging iets mis bij het versturen.";
          console.error("Web3Forms fout:", result);
        }
      } catch (error) {
        statusMessage.textContent = "Server of netwerk niet bereikbaar. Probeer later opnieuw.";
        console.error("Verzendfout:", error);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".services-track");
  if (!track) return;

  const slides = Array.from(track.children);

  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  let position = 0;
  let speed = 0.6;

  function animateSlider() {
    const halfWidth = track.scrollWidth / 2;
    position -= speed;

    if (Math.abs(position) >= halfWidth) {
      position = 0;
    }

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animateSlider);
  }

  animateSlider();
});

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

document.addEventListener('DOMContentLoaded', () => {
    const swatches = document.querySelectorAll('.swatch');
    const selectedInput = document.getElementById('selected-ral');
    const nameDisplay = document.getElementById('color-display-name');
    const customBtn = document.getElementById('btn-custom-color');
    const customInput = document.getElementById('custom-color-input');

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            // Reset alle selecties
            swatches.forEach(s => s.classList.remove('is-selected'));
            customBtn.classList.remove('is-selected');
            
            // Activeer de geklikte swatch
            swatch.classList.add('is-selected');
            const colorName = swatch.getAttribute('data-name');
            
            // Update waarden
            selectedInput.value = colorName;
            nameDisplay.innerHTML = `Geselecteerd: <strong>${colorName}</strong>`;
            customInput.style.display = 'none';
        });
    });

    customBtn.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('is-selected'));
        customBtn.classList.add('is-selected');
        
        selectedInput.value = "Eigen kleurkeuze";
        nameDisplay.textContent = "Voer hieronder de gewenste kleur in:";
        customInput.style.display = 'block';
        customInput.focus();
    });
});