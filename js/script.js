// ====== 📱 Mobile Menu Toggle ======
const menuBtn = document.querySelector('#menuBtn');
const mobileNav = document.querySelector('#mobileNav');

menuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('translate-x-full');

  // Toggle menu ↔ close icon
  const icon = menuBtn.querySelector('i');
  icon.classList.toggle('bx-menu');
  icon.classList.toggle('bx-x');
});


// ====== ✨ Scroll Reveal Animations ======
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        // Fade-in
        el.classList.add('opacity-100');
        el.classList.remove('opacity-0');

        // HEADER 🎥
        if (el.id === 'headerSection') {
          const text = el.querySelector('#textBlock');
          const img = el.querySelector('#heroImg');

          text.classList.add('transition-all', 'duration-[1200ms]', 'ease-out', 'delay-[150ms]');
          img.classList.add('transition-all', 'duration-[1200ms]', 'ease-out', 'delay-[400ms]');

          text.classList.remove('translate-x-[-200px]', 'opacity-0');
          text.classList.add('translate-x-0', 'opacity-100');

          setTimeout(() => {
            img.classList.remove('translate-x-[200px]', 'opacity-0');
            img.classList.add('translate-x-0', 'opacity-100');
          }, 200);
        }

        // ABOUT (vertical rise)
        if (el.id === 'aboutSection') {
          el.classList.add('transition-all', 'duration-[1200ms]', 'ease-in-out', 'delay-[150ms]');
          el.classList.remove('translate-y-20');
          el.classList.add('translate-y-0', 'opacity-100');
        }

        // SKILLS (horizontal slide)
        if (el.id === 'skillsSection') {
          el.classList.add('transition-all', 'duration-[900ms]', 'ease-out', 'delay-[200ms]');
          el.classList.remove('translate-x-[-50px]');
          el.classList.add('translate-x-0', 'opacity-100');
        }

        // PORTFOLIO (scale + staggered fade)
        if (el.id === 'portfolioSection') {
          el.classList.add('transition-all', 'duration-[800ms]', 'ease-in');
          el.classList.remove('scale-90');
          el.classList.add('scale-100', 'opacity-100');

          const images = el.querySelectorAll('.portfolio-img');
          images.forEach((img, i) => {
            img.style.transitionDelay = `${i * 150}ms`;
            img.classList.remove('-translate-y-10', 'opacity-0', 'scale-90');
            img.classList.add('translate-y-0', 'opacity-100', 'scale-100');
          });
        }

      } else {
        // Reset when scrolling away
        el.classList.add('opacity-0');
        if (el.id === 'aboutSection') el.classList.add('translate-y-20');
        if (el.id === 'skillsSection') el.classList.add('translate-x-[-50px]');
        if (el.id === 'portfolioSection') el.classList.add('scale-90');

        if (el.id === 'portfolioSection') {
          const images = el.querySelectorAll('.portfolio-img');
          images.forEach(img => {
            img.classList.add('-translate-y-10', 'opacity-0', 'scale-90');
          });
        }
      }
    });
  }, { threshold: 0.3 });

  revealElements.forEach(el => observer.observe(el));
});


// Telegram Bot Form Logic 
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  const sendBtn = document.querySelector("#sendBtn");

  if (!form) return;

  // Enable button when all required fields filled
  form.addEventListener("input", () => {
    const required = [...form.querySelectorAll("[required]")];
    sendBtn.disabled = !required.every(input => input.value.trim());
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";

    const formData = {
      name: form.userName.value.trim(),
      email: form.userEmail.value.trim(),
      phone: form.userPhone.value.trim(),
      telegram: form.userTelegram.value.trim(),
      message: form.userMessage.value.trim(),
    };

    try {
      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok && data.ok) {
        sendBtn.textContent = "✅ Sent!";
        form.reset();
      } else {
        sendBtn.textContent = "❌ Error";
        alert("Server Error: " + (data.error || "Unknown"));
      }
    } catch (err) {
      console.error("Network error:", err);
      sendBtn.textContent = "⚠️ Network Error";
    }

    setTimeout(() => {
      sendBtn.textContent = "🚀 Submit";
      sendBtn.disabled = false;
    }, 2500);
  });
});
