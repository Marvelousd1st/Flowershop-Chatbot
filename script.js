const panel = document.getElementById("chat-panel");
const launcher = document.getElementById("chat-launcher");
const closeButton = document.getElementById("close-chat");
const messages = document.getElementById("chat-messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");

function openChat() {
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
  launcher.style.display = "none";
  setTimeout(() => input.focus(), 50);
}
function closeChat() {
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
  launcher.style.display = "flex";
}
launcher.addEventListener("click", openChat);
closeButton.addEventListener("click", closeChat);
document.getElementById("open-chat-top").addEventListener("click", openChat);

function addMessage(text, sender) {
  const row = document.createElement("div");
  row.className = `message ${sender === "user" ? "user-message" : "bot-message"}`;
  if (sender !== "user") {
    const avatar = document.createElement("span");
    avatar.className = "message-avatar";
    avatar.textContent = "✿";
    row.appendChild(avatar);
  }
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function getReply(raw) {
  const q = raw.toLowerCase();
  if (/(hello|hi\b|hey|good morning|good afternoon)/.test(q)) {
    return "Hello! 🌷 Welcome to Bloom & Blossom. Are you shopping for a special occasion, or would you like to browse our bouquets?";
  }
  if (/(bouquet|flowers|what do you have|available|selection|rosy romance|sunshine days|wildflower wishes)/.test(q)) {
    return "Our sample collection includes Rosy Romance (pink roses, ₦18,000), Sunshine Days (yellow seasonal blooms, ₦15,000), and Wildflower Wishes (a playful seasonal mix, ₦12,500). These are demonstration prices.";
  }
  if (/(price|cost|how much|₦|naira|cheap|budget)/.test(q)) {
    return "Our demo prices start at ₦12,500 for Wildflower Wishes, ₦15,000 for Sunshine Days, and ₦18,000 for Rosy Romance. Tell me your budget and the occasion, and I can suggest one.";
  }
  if (/(deliver|delivery|shipping|when.*arrive|same.day|address)/.test(q)) {
    return "This demo shop does not process real orders, so delivery is not currently available. In a real shop, please share your delivery area and preferred date so the team can confirm coverage and timing.";
  }
  if (/(care|keep.*fresh|last longer|water|vase|maintain)/.test(q)) {
    return "For fresher flowers: trim the stems diagonally, place them in a clean vase with fresh water, remove leaves below the waterline, keep them away from direct sun and heat, and change the water every day or two.";
  }
  if (/(birthday|anniversary|romantic|love|sorry|apolog|congrat|gift|occasion)/.test(q)) {
    return "I'd love to help you choose! 💐 Rosy Romance is a lovely romantic gesture, Sunshine Days feels cheerful for celebrations, and Wildflower Wishes is a relaxed, playful gift. What occasion and budget do you have in mind?";
  }
  if (/(contact|phone|email|human|person|staff|speak to)/.test(q)) {
    return "This is a portfolio demo, so the contact details are placeholders. You can replace hello@example.com in index.html with the real shop email or add a phone number.";
  }
  if (/(thank|thanks)/.test(q)) {
    return "You're very welcome! 🌼 I'm happy to help. Is there anything else you'd like to know about our flowers?";
  }
  if (/(order|buy|purchase|checkout|pay|payment)/.test(q)) {
    return "Ordering and payment are not enabled in this demonstration. You can use the sample bouquets and prices to explore the chatbot experience; a real store would connect this flow to its ordering system.";
  }
  return "I can help with our sample bouquets, prices, gift ideas, flower care, and delivery information. Try asking “What bouquets do you have?” or “How much do your flowers cost?”";
}

function sendMessage(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  addMessage(trimmed, "user");
  input.value = "";
  const reply = getReply(trimmed);
  window.setTimeout(() => addMessage(reply, "bot"), 220);
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value);
});
document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => {
    openChat();
    sendMessage(button.dataset.question);
  });
});
