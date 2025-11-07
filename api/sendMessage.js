document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  const sendBtn = document.querySelector("#sendBtn");

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
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        sendBtn.textContent = "✅ Sent!";
        form.reset();
      } else {
        console.error("Server error:", data);
        sendBtn.textContent = "❌ Failed";
      }
    } catch (err) {
      console.error("Network error:", err);
      sendBtn.textContent = "⚠️ Network error";
    }

    setTimeout(() => {
      sendBtn.textContent = "🚀 Submit";
      sendBtn.disabled = false;
    }, 2500);
  });
});
