const panel = document.getElementById("chat-panel");
const launcher = document.getElementById("chat-launcher");
const closeButton = document.getElementById("close-chat");
const messages = document.getElementById("chat-messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
let pending = null;
let selectedCity = "";
let selectedOccasion = "";

const cities = ["Vancouver", "Lagos", "Abuja", "Port Harcourt", "United States"];
const occasions = ["Anniversary", "Birthday", "Christmas Day", "Get Well", "Graduation", "Mother's Day", "New Baby", "Romance", "Thank You", "Valentine's Day", "Wedding", "Other / Just because"];
const hours = "Our shop hours are 9am–5pm. The original assistant says stores are closed on Sundays and public holidays.";
const locations = {
  "vancouver": "Our Vancouver shop is located along the highway.",
  "lagos": "Our Lagos flower shop is listed at 11, Banks Street, Victoria Island.",
  "abuja": "Our Abuja store is listed at Baruwa Complex, along Gwagwalada Road.",
  "port harcourt": "Our Port Harcourt store is listed at 13, Jara Mall Road, beside the Senator's Complex.",
  "united states": "Our United States flower shop is listed at 4th Floor, Marvelous Complex, beside Shoprite."
};

function openChat() {
  panel.classList.add("open"); panel.setAttribute("aria-hidden", "false"); launcher.style.display = "none";
  setTimeout(() => input.focus(), 50);
}
function closeChat() { panel.classList.remove("open"); panel.setAttribute("aria-hidden", "true"); launcher.style.display = "flex"; }
launcher.addEventListener("click", openChat);
closeButton.addEventListener("click", closeChat);
document.getElementById("open-chat-top").addEventListener("click", openChat);

function addMessage(text, sender) {
  const row = document.createElement("div");
  row.className = `message ${sender === "user" ? "user-message" : "bot-message"}`;
  if (sender !== "user") { const avatar = document.createElement("span"); avatar.className = "message-avatar"; avatar.textContent = "✿"; row.appendChild(avatar); }
  const bubble = document.createElement("div"); bubble.className = "bubble"; bubble.textContent = text; row.appendChild(bubble);
  messages.appendChild(row); messages.scrollTop = messages.scrollHeight;
}
function showOptions(options, callback) {
  const wrap = document.createElement("div"); wrap.className = "suggestions";
  options.forEach(option => {
    const button = document.createElement("button"); button.type = "button"; button.textContent = option;
    button.addEventListener("click", () => { wrap.remove(); addMessage(option, "user"); callback(option); }); wrap.appendChild(button);
  });
  messages.appendChild(wrap); messages.scrollTop = messages.scrollHeight;
}
function bot(text) { addMessage(text, "bot"); }
function beginLocation(hoursOnly=false) {
  pending = hoursOnly ? "hours-city" : "location-city";
  bot(hoursOnly ? "Which store's opening hours would you like to know?" : "We have stores in Vancouver, Lagos, Abuja, Port Harcourt and the United States. Which store are you interested in?");
  showOptions(cities, city => { selectedCity = city; const key = city.toLowerCase(); if (pending === "hours-city") bot(`${city}: ${hours}`); else bot(locations[key] || "I don't have a location detail for that store in this demo."); pending = null; });
}
function beginRecommendation() {
  pending = "occasion"; bot("What's the special occasion?"); showOptions(occasions, occasion => { selectedOccasion = occasion; const o = occasion.toLowerCase();
    if (["birthday", "thank you", "other / just because"].includes(o)) {
      pending = "special-other"; bot("Is this for a significant other?"); showOptions(["Yes", "No"], answer => recommendation(selectedOccasion, answer.toLowerCase() === "yes"));
    } else { bot(recommendationText(occasion)); pending = null; }
  });
}
function recommendation(occasion, special) {
  const o = occasion.toLowerCase(); let response = "";
  if (o === "birthday") response = special ? "For a significant other, the original assistant recommends the Birthday Romance bouquet for a woman or Birthday Cheers for a man." : "For someone else, the original assistant recommends the Birth of Paradise plant for a woman or Prickly Pear Cactus for a man.";
  else if (o === "thank you") response = special ? "For a significant other, consider the Elegant Gratitude bouquet or Bold Thanks bouquet." : "For someone else, consider the Graceful Appreciation bouquet or Gratitude Cheers bouquet.";
  else response = special ? "For a significant other, consider the Just For Her bouquet or Just Because Charm bouquet." : "For someone else, consider Happy Blossoms or Just Because Vibrance.";
  bot(response + " These are the recommendations in your exported IBM action; the original flow branches by recipient, but this demo does not ask for gender."); pending = null;
}
function recommendationText(occasion) {
 const map = {
  "anniversary":"For an anniversary, the original assistant suggests Long Stem Roses for a woman or His Anniversary Bouquet for a man.",
  "christmas day":"For Christmas, the original assistant recommends an elegant Large Red Poinsettia.",
  "get well":"For a get-well gift, it suggests the Pink and Orange Get Well Soon Bouquet or Get Well Soon Bouquet.",
  "graduation":"For graduation, it suggests the Pink Happy Graduation bouquet or Way to Go Man bouquet.",
  "mother's day":"For Mother's Day, the original assistant recommends browsing the Mother's Day Bouquet collection.",
  "new baby":"For a new baby, it suggests an It's a Boy arrangement with blue flowers or an It's a Girl arrangement with pink flowers; both include a small balloon.",
  "romance":"For romance, it suggests Love Is in the Air or All You Need Is Love.",
  "valentine's day":"For Valentine's Day, it suggests Long Stem Roses or His Valentine's Day Bouquet.",
  "wedding":"For a wedding, it recommends browsing the Wedding Day Florals collection.",
 };
 return map[occasion.toLowerCase()] || "I can help with flower recommendations. Tell me the occasion and I'll suggest a bouquet.";
}
function getReply(raw) {
 const q = raw.toLowerCase();
 if (/(^|\b)(hi|hello|hey|good morning|good afternoon|good evening)(\b|!)/.test(q)) return "Hi, I'm Florence, a virtual assistant for the flower shop. I can help you find store locations, opening hours, or flower recommendations.";
 if (/(hour|open|close|sunday|public holiday|opening time)/.test(q)) { beginLocation(true); return null; }
 if (/(where|location|address|store|branch|located)/.test(q)) { beginLocation(false); return null; }
 if (/(recommend|suggest|bouquet|flowers for|flower for|what flowers|occasion|gift for)/.test(q)) { beginRecommendation(); return null; }
 if (/(thank|thanks|appreciate)/.test(q)) return "You're welcome! Let me know if I can help with anything else.";
 if (/(bye|goodbye|see you|catch ya)/.test(q)) return `Thank you for chatting! We hope you visit our ${selectedCity || "flower shop"} store.`;
 if (/(agent|human|person|speak to someone|customer service)/.test(q)) return "The original IBM assistant included a handoff-to-agent flow. This standalone demo cannot connect you to a live agent, but you can add real contact details to the website.";
 if (/(price|cost|how much)/.test(q)) return "The exported IBM action doesn't include bouquet prices. It recommends named arrangements and collections, so I don't want to invent prices.";
 return "I'm sorry, I didn't quite catch that. I can help with store locations, opening hours, or flower recommendations. Try asking: 'Where are your stores?', 'What are your opening hours?', or 'Can you recommend flowers for a birthday?'";
}
function sendMessage(text) {
 const trimmed = text.trim(); if (!trimmed) return; addMessage(trimmed, "user"); input.value = "";
 const reply = getReply(trimmed); if (reply) window.setTimeout(() => bot(reply), 180);
}
form.addEventListener("submit", event => { event.preventDefault(); sendMessage(input.value); });
document.querySelectorAll("[data-question]").forEach(button => button.addEventListener("click", () => { openChat(); sendMessage(button.dataset.question); }));
