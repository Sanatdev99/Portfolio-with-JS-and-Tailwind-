// For Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
	if (mobileNav.classList.contains("hidden")) {
		mobileNav.classList.remove("hidden");
		setTimeout(() => {
			mobileNav.classList.remove("translate-x-full");
		}, 10);
	} else {
	 
		mobileNav.classList.add("translate-x-full");
		setTimeout(() => {
			mobileNav.classList.add("hidden");
		}, 700); 
	}
});


// Header section 
const observerOptions = { threshold: 0.5 };

const animateOnScroll = entries => {
	entries.forEach(({ target, isIntersecting }) => {
		target.classList.toggle('opacity-0', !isIntersecting);
		target.classList.toggle('translate-x-20', !isIntersecting);
	});
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Select multiple elements at once (by class, id, or any selector)
document.querySelectorAll('#textBlock, #heroImg')
	.forEach(el => observer.observe(el));

	// About section 
	const observer2 = new IntersectionObserver(
		([entry]) => {
			entry.target.classList.toggle('opacity-0', !entry.isIntersecting);
			entry.target.classList.toggle('-translate-y-20', !entry.isIntersecting);
		},
		{ threshold: 0.5 }
	);

	document.querySelectorAll('#aboutSection')
		.forEach(el => observer.observe(el));


// Portfolio 
const images = document.querySelectorAll('.portfolio-img');
  const section = document.getElementById('portfolioSection');

  if (section && images.length > 0) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          images.forEach((img, i) => {
            setTimeout(() => {
              img.classList.remove('opacity-0', '-translate-y-10');
            }, i * 200);
          });
          observer.unobserve(entry.target); // Trigger only once
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
  }

//   Contact form  Logic 
const form = document.querySelector("#contactForm");
  const sendBtn = document.querySelector("#sendBtn");

  //  Enable button when required fields filled
  const checkForm = () => {
    const required = ["userName", "userEmail", "userPhone", "userMessage"];
    const allFilled = required.every(name => form[name].value.trim() !== "");
    sendBtn.disabled = !allFilled;
  };
  form.addEventListener("input", checkForm);

  //  Handle submit
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    // Get all form values cleanly with FormData API
    const name = formData.get("userName").trim();
    const email = formData.get("userEmail").trim();
    const phone = formData.get("userPhone").trim();
    const telegram = formData.get("userTelegram")?.trim() || "—";
    const message = formData.get("userMessage").trim();

    // 🧩 Telegram credentials
    const BOT_TOKEN = "8180682419:AAGWFWe7xmGxu2QD6mWP4O2qyNdDx5DZyU4";
    const CHAT_ID = "891637381";

    const text = `
📩 *New Message from Contact Form*
👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${phone}
💬 *Telegram Username:* ${telegram}
🗒️ *Message:* ${message}
    `;

    try {
      sendBtn.textContent = "⏳ Sending...";
      sendBtn.disabled = true;

      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "Markdown"
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Telegram API error:", err);
        throw new Error("Failed to send");
      }

      alert("✅ Message sent successfully!");
      form.reset();
      checkForm();
    } catch (err) {
      console.error(err);
      alert("⚠️ Error sending message. Please try again.");
    } finally {
      sendBtn.textContent = "🚀 Submit";
    }
  });