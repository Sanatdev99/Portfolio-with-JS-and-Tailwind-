// // /api/sendMessage.js — runs on Vercel server
// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { name, email, phone, telegram, message } = req.body || {};
//   if (!name || !email || !phone || !message) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const BOT_TOKEN = process.env.BOT_TOKEN;
//   const CHAT_ID = process.env.CHAT_ID;

//   if (!BOT_TOKEN || !CHAT_ID) {
//     return res.status(500).json({ error: "Server not configured correctly" });
//   }

//   const text = `<b>📩 New Message from Contact Form</b>
// <b>👤 Name:</b> ${escape(name)}
// <b>📧 Email:</b> ${escape(email)}
// <b>📞 Phone:</b> ${escape(phone)}
// <b>💬 Telegram Username:</b> ${escape(telegram || "—")}
// <b>🗒️ Message:</b> ${escape(message)}`;

//   try {
//     const tg = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         chat_id: CHAT_ID,
//         text,
//         parse_mode: "HTML",
//       }),
//     });

//     const data = await tg.json();
//     if (!tg.ok || !data.ok) {
//       console.error("Telegram error", data);
//       return res.status(500).json({ error: "Telegram send failed", detail: data });
//     }

//     return res.status(200).json({ ok: true });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

// function escape(str = "") {
//   return String(str)
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;");
// }
