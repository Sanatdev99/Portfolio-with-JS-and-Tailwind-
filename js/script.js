const menuBtn = document.querySelector('#menuBtn');
const mobileNav = document.querySelector('#mobileNav');

menuBtn.addEventListener('click', () => {
  // Toggle slide in/out
  mobileNav.classList.toggle('translate-x-full');

  // Change icon
  const icon = menuBtn.querySelector('i');
  icon.classList.toggle('bx-menu');
  icon.classList.toggle('bx-x');
});

// JS Nice Scrolls Animation  
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        // Common fade-in
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

        // ABOUT  (vertical rise)
        if (el.id === 'aboutSection') {
          el.classList.add('transition-all', 'duration-[1200ms]', 'ease-in-out', 'delay-[150ms]');
          el.classList.remove('translate-y-20');
          el.classList.add('translate-y-0', 'opacity-100');
        }

        // SKILLS  (horizontal slide)
        if (el.id === 'skillsSection') {
          el.classList.add('transition-all', 'duration-[900ms]', 'ease-out', 'delay-[200ms]');
          el.classList.remove('translate-x-[-50px]');
          el.classList.add('translate-x-0', 'opacity-100');
        }

        // PORTFOLIO  (scale + staggered fade)
        if (el.id === 'portfolioSection') {
          el.classList.add('transition-all', 'duration-[800ms]', 'ease-in');
          el.classList.remove('scale-90');
          el.classList.add('scale-100', 'opacity-100');

          const images = el.querySelectorAll('.portfolio-img');
          images.forEach((img, i) => {
            img.style.transitionDelay = `${i * 150}ms`; // stagger effect
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






// 		([entry]) => {
// 			entry.target.classList.toggle('opacity-0', !entry.isIntersecting);
// 			entry.target.classList.toggle('-translate-y-20', !entry.isIntersecting);
// 		},
// 		{ threshold: 0.5 }
// 	);

// 	document.querySelectorAll('#aboutSection')
// 		.forEach(el => observer.observe(el));


// // Portfolio 
// const images = document.querySelectorAll('.portfolio-img');
//   const section = document.getElementById('portfolioSection');

//   if (section && images.length > 0) {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           images.forEach((img, i) => {
//             setTimeout(() => {
//               img.classList.remove('opacity-0', '-translate-y-10');
//             }, i * 200);
//           });
//           observer.unobserve(entry.target); // Trigger only once
//         }
//       },
//       { threshold: 0.5 }
//     );

//     observer.observe(section);
//   }


// // Instead of calling Telegram API directly:
// const payload = { name, email, phone, telegram, message };

// try {
//   sendBtn.textContent = "⏳ Sending...";
//   sendBtn.disabled = true;

//   const res = await fetch("/api/sendMessage", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json();
//   if (!res.ok || !data.ok) throw new Error(data.error || "Failed to send");

//   alert("✅ Message sent successfully!");
//   form.reset();
//   checkForm();
// } catch (err) {
//   console.error(err);
//   alert("⚠️ Error sending message. Please try again.");
// } finally {
//   sendBtn.textContent = "🚀 Submit";
// }
