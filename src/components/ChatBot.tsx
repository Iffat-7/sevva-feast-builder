import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, UtensilsCrossed } from "lucide-react";

interface Message {
  role: "bot" | "user";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "bot",
    content: "Welcome to Sevva Restaurant! 🍽️\n\nI'm here to help you with:\n• 📋 Menu & prices\n• 📞 Reservations\n• 📍 Location & hours\n• 🍽️ Buffet info\n• ☕ Deals & offers\n\nHow can I help you today?",
  },
];

// English keyword mappings
const ENGLISH_KEYWORDS: Record<string, string> = {
  "menu": "menu",
  "food": "menu",
  "price": "price",
  "cost": "price",
  "booking": "reservation",
  "reservation": "reservation",
  "table": "reservation",
  "address": "location",
  "location": "location",
  "where": "location",
  "hours": "hours",
  "time": "hours",
  "open": "hours",
  "close": "hours",
  "buffet": "buffet",
  "iftar": "iftar",
  "suhoor": "suhoor",
  "hi-tea": "hi-tea",
  "sajji": "sajji",
  "deal": "deal",
  "offer": "deal",
  "platter": "platter",
  "coffee": "coffee",
  "drink": "coffee",
  "karahi": "karahi",
  "bbq": "bbq",
  "tandoor": "tandoor",
  "handi": "handi",
  "soup": "soup",
  "dessert": "dessert",
  "thank": "thanks",
  "thanks": "thanks",
  "hello": "hello",
  "hi": "hello",
  "hey": "hello",
  "ramadan": "ramadan",
  "about": "about",
  "social": "social",
  "event": "event",
  "payment": "payment",
  "parking": "parking",
  "kids": "kids",
  "delivery": "delivery",
  "website": "website",
};

const FAQ_RESPONSES: Record<string, string> = {
  menu: "📋 Our Menu:\n\n⭐ Signature: Malai Boti (1,699), Shawaya Chicken (2,490)\n🔥 Tawa Special (950–3,299)\n🍲 Desi Handi (1,895–2,245)\n🥘 Karahi (1,300–2,500)\n🍢 BBQ (1,250–2,999)\n🍛 Mutton Specials (1,799–2,499)\n🥘 Turkish/Arabic Platters (2,395–49,995)\n🍽️ Deals (1,545–3,445)\n☕ Coffee & Beverages (145–600)\n🍰 Desserts (350–500)\n\nWant details on any section? 😊",

  price: "💰 Price Ranges:\n\n• Signature: PKR 1,699–2,995\n• Mains: PKR 950–3,299\n• Karahi: PKR 1,300–2,500\n• BBQ: PKR 1,250–2,999\n• Tandoor: PKR 50–1,200\n• Mocktails: PKR 250–600\n• Cold Coffee: PKR 315–495\n• Desserts: PKR 350–500\n• Hi-Tea Buffet: PKR 1,875–2,000 + Tax\n• Iftar Chicken: PKR 2,495 + Tax\n• Iftar Mutton: PKR 3,495 + Tax\n• Suhoor: PKR 2,495 + Tax\n\nPrices may vary. Contact us for updates!",

  reservation: "📞 Reservations:\n\nYou can book in several ways:\n1. 🌐 Visit our website\n2. 📞 Call: +92 315 177 3177\n3. 💬 WhatsApp: +92 315 177 3177\n\n💡 Tip: Book a day ahead for weekends! 😊",

  book: "📞 Reservations:\n\nYou can book in several ways:\n1. 🌐 Visit our website\n2. 📞 Call: +92 315 177 3177\n3. 💬 WhatsApp: +92 315 177 3177\n\n💡 Book ahead for weekends! 😊",

  location: "📍 Our Location:\n\nAdda Plot Roundabout, Raiwind Road,\nopposite GO Pump, near Lake City,\nLahore, Punjab 54790, Pakistan 🇵🇰\n\n⏰ Daily: 12:00 PM – 12:00 AM (Midnight)\n⭐ Google Rating: 4.6/5 (1000+ reviews)\n\n🌐 Website: sevva.pk",

  hours: "⏰ Opening Hours:\n\nMonday – Sunday\n🕐 12:00 PM – 12:00 AM (Midnight)\n\n⚠️ Hours may vary on public holidays.\n\nSpecial hours during Ramadan — Iftar & Suhoor buffets available! 🌙",

  buffet: "🍽️ Buffet Options:\n\n🫖 Hi-Tea (50+ dishes):\n• Mon-Thu: PKR 1,875 + Tax (25% OFF)\n• Fri-Sun: PKR 2,000 + Tax (20% OFF)\n• Slots: 3:00–4:30 PM & 5:00–6:30 PM\n\n🍽️ Iftar Chicken: PKR 2,495/person + Tax\n🍽️ Iftar Mutton: PKR 3,495/person + Tax\n• 2 hours after sunset\n\n🌙 Suhoor: PKR 2,495/person + Tax\n• Slot 1: 1:00 AM – 2:45 AM\n• Slot 2: 3:15 AM – Suhoor ends\n\n📞 Booking: +92 315 177 3177",

  iftar: "🍽️ Iftar Dinner Buffet:\n\n🐔 Chicken Menu: PKR 2,495/person + Tax\nStarters, Chicken Biryani, Spinach, Karahi, Spiced Kabab\nBBQ: Cheese Boti, Tandoori, Tikka, Gola Kabab, Silky Boti\nPan-Asian: Dhaka Chicken, Fried Rice, Manchurian\nTandoor, Dressings, Chutneys, Desserts (17+ items)\n\n🐑 Mutton Menu: PKR 3,495/person + Tax\nRich Curry, Royal Keema Pilaf, Broth Rice\nMutton Spinach Meat, Mutton Kabab, Madrassi Chicken\n+ All Starters, BBQ, Pan-Asian, Desserts\n\n⏰ 2 hours after sunset\n📞 Booking: +92 315 177 3177",

  suhoor: "🌙 Suhoor Buffet:\nPKR 2,495/person + Tax\n\n⏰ Slots:\n• Slot 1: 1:00 AM – 2:45 AM\n• Slot 2: 3:15 AM – Suhoor ends\n\n🥤 Welcome: Sweet Lassi\n🍲 Mains: Mutton Feet, Desi Chicken Broth, Haleem, Spinach, Dal, Lahori Chickpeas\n🍳 Live Egg Station: French Toast, Omelet, Potato & Egg\n🫓 Puri Station: Puri, Puri Bread, Semolina Halwa\n🍢 BBQ: Tandoori Boti, Tikka, Gola Kabab\n🍰 Desserts: Barfi, Rasgulla, Three Milk Cake + more\n\n📞 Booking: +92 315 177 3177",

  "hi-tea": "🫖 Hi-Tea Buffet (50+ dishes):\n\n💰 Prices:\n• Weekday (Mon-Thu): PKR 1,875 + Tax (25% OFF)\n• Weekend (Fri-Sun): PKR 2,000 + Tax (20% OFF)\n• Standard: PKR 2,499 + Tax\n\n⏰ Slots: 3:00–4:30 PM & 5:00–6:30 PM\n\n🍗 Charcoal Grill: Tandoori Boti, Cheese Gola Kabab, Green Options\n🍲 Desi: Shenwari Karahi, Madrassi, Mumbai Spicy Tikka\n🥡 Chinese: Chili Dry, Black Pepper, Chowmein\n🍚 Rice: Sindhi Biryani, Broth Rice, Egg Fried\n🥗 Salad Bar, Naan Shop, Dessert Bar (Chocolate Fountain!)\n\n👶 Children under 7: Half price | Baby Chair: Free\n📞 Booking: +92 315 177 3177",

  sajji: "🍗 Sevva's Special Sajji:\n\n• Chicken Sajji — PKR 1,800\n• Lamb Sajji — PKR 3,500\n\nSlow-roasted to perfection! 🔥\nDine-in available",

  deal: "🍽️ Lunch & Dinner Deals:\n\n• Deal 1 (2-3 people): PKR 3,445\n  Handi + Tandoori Boti (4) + Kabab (2) + Naan + Salad + Raita\n• Deal 5 (2 people): PKR 3,445\n  Leg/Chest + Silky Kabab (2) + Lebanese Boti (4) + Arabic Rice\n• Deal 3 (2-3 people): PKR 3,345\n  Egg Fried Rice + Chinese Gravy + Finger Chicken (8) + Samosa (3)\n• Deal 2 (2 people): PKR 1,795\n  Chicken Biryani + Turkish Kabab (2) + Salad + Mint Raita\n• Deal 4 (2 people): PKR 1,545\n  Chicken Karahi + Roti (3) + Flavored Naan + Raita + Salad\n\n👨‍👩‍👧‍👦 Great for families! 😊",

  platter: "🥘 Turkish & Arabic Platters:\n\n• Full Lamb Mandi: PKR 49,995 (Order 8 hours ahead)\n• Lamb Mandi III (8-10): PKR 24,445\n• Ala Safra (9-10): PKR 21,995\n• Lamb Mandi II (4-5): PKR 10,495\n• Lamb Mandi I (3-4): PKR 8,495\n• Flame Platter (3-4): PKR 6,995\n• Chicken Flame (4-5): PKR 5,995\n• Mandi Platter (2-3): PKR 5,445\n• Ribs Platter (2-3): PKR 5,445\n• 1 Meter Turkish Kabab: PKR 4,495\n• Arabic Shawaya (3-4): PKR 2,395\n\n🎉 Perfect for group dining!",

  coffee: "☕ Coffee & Beverages:\n\n🧊 Cold Coffee:\n• Mocha Honey Bunny: PKR 495\n• Caramel Macchiato / Vanilla Latte / Hazelnut Latte: PKR 445\n• Chocolate Macchiato / Classic Cold / Irish Cream: PKR 315\n\n🔥 Hot Beverages:\n• Hot Chocolate / Caramel / Hazelnut / French Vanilla: PKR 495\n• Cappuccino / Butter Scotch / Irish Cream Latte: PKR 445\n• Latte: PKR 415\n• Turkish Coffee: PKR 210\n• Green Tea: PKR 195\n• Ginger Tea: PKR 190\n• Spiced Tea: PKR 145\n\n🍹 Mocktails:\n• Mint Margarita: PKR 250\n• Signature Mocktails: PKR 300–600",

  karahi: "🥘 Karahi Section:\n\n• Half Chicken Karahi (½ kg): PKR 1,300\n• Full Chicken Karahi: PKR 2,500\n• Mutton Karahi: PKR 2,500\n• Boneless Karahi: PKR 2,500\n\nDelicious traditional Karahi! 🔥",

  bbq: "🍢 BBQ Special:\n\n• Tikka Boti (12 pcs): PKR 1,300\n• Chicken Seekh Kabab (4): PKR 1,250\n• Beef Seekh (4): PKR 1,399\n• Mutton Kabab (4): PKR 1,999\n• Malai Boti (12): PKR 1,699 ⭐\n• Charcoal Chicken: PKR 599\n• Mutton Chop (6): PKR 2,999\n• Fish Tikka: PKR 2,499\n\nCharcoal grilled! 🔥",

  tandoor: "🫓 Tandoor:\n\n• Fermented Roti: PKR 50\n• Nigella Naan: PKR 199\n• Garlic Naan: PKR 199\n• Flavored Naan: PKR 199\n• Spicy Naan: PKR 199\n• Plain Naan: PKR 199\n• Kandhari Naan: PKR 199\n• Chopped Roti: PKR 120\n• Green Spicy Naan: PKR —\n• Pizza Plain Naan: PKR —\n• Chicken Naan: PKR 749\n• Beef Keema Naan: PKR 849\n• Mutton Keema Naan: PKR 1,200\n\nFresh from tandoor! 🔥",

  handi: "🍲 Desi Handi Section:\n\n• Chicken Mogul Supreme: PKR 2,245\n• Chicken Patiala: PKR 2,245\n• Chicken Green Chili Lemon: PKR 2,095\n• Chicken Madrassi: PKR 1,995\n• Chicken Rajasthani: PKR 1,995\n• Chicken Hyderabadi: PKR 1,995\n• Chicken Achari: PKR 1,995\n• Chicken Jalfrezi: PKR 1,995\n• Chicken Green Chili: PKR 1,995\n• Chicken Ginger: PKR 1,995\n• Chicken Handi: PKR 1,895\n\nClay-pot cooked! 😋",

  soup: "🍜 Oriental Soups:\n\n• Sevva Special (H/F): PKR 945/1,645\n• Special Soup (H/F): PKR 945/1,645\n• Sichuan (H/F): PKR 845/1,445\n• Hot & Sour (H/F): PKR 795/1,395\n• Chicken Corn (H/F): PKR 795/1,395\n\nH = Half | F = Full",

  dessert: "🍰 Desserts:\n\n• Gulab Jamun (3 pcs): PKR 350\n• Royal Kheer: PKR 450\n• Carrot Halwa (250g): PKR 500\n\n🎂 More Desserts in Buffet:\nChocolate Fountain, Three Milk Cake, Basboussa, Mousse, Eclairs, Custard, Jelly, Panna Cotta + more! 🍮",

  hello: "Hello! Welcome to Sevva Restaurant! 🍽️\n\nHow can I help you today?\n\nYou can ask me about menu, prices, buffet, booking, location, or anything else! 😊",

  thanks: "Thank you! Much appreciated! 😊\n\nWe look forward to serving you at Sevva!\n\nFeel free to ask anything else!",

  ramadan: "🌙 Ramadan Special!\n\n🍽️ Iftar Chicken: PKR 2,495/person + Tax\n🍽️ Iftar Mutton: PKR 3,495/person + Tax\n🌙 Suhoor: PKR 2,495/person + Tax\n\n⏰ Iftar: 2 hours after sunset\n⏰ Suhoor Slot 1: 1 AM – 2:45 AM\n⏰ Suhoor Slot 2: 3:15 AM – Suhoor ends\n\n📞 Booking: +92 315 177 3177",

  about: "🏢 About Sevva Restaurant:\n\nSevva is a premium desi fine dining restaurant in Lahore.\n\n🍽️ Cuisine: Desi Fusion, Pakistani Classics, Grills, BBQ, Karahi\n📍 Address: Adda Plot, Raiwind Rd, near Lake City, Lahore\n⭐ Google Rating: 4.6/5 (1000+ reviews)\n🎉 Events, Catering, Private Parties\n\n🌐 Website: sevva.pk\n📸 Instagram: @sevvarestaurant\n🎵 TikTok: @sevvarestaurant",

  social: "📱 Social Media:\n\n📸 Instagram: @sevvarestaurant (~4.2K followers)\nFood photos, reels, menu highlights\n\n📘 Facebook: Sevva Restaurant | Lahore\nOffers, buffet promotions, events\n\n🎵 TikTok: @sevvarestaurant\nFood clips and restaurant videos\n\n🌐 Website: sevva.pk",

  event: "🎉 Events & Catering:\n\nAt Sevva, you can host your special occasions:\n• 🎂 Birthday Parties\n• 💍 Wedding Events\n• 🏢 Corporate Events\n• 🎊 Private Parties\n\nBoth terrace and indoor spaces available!\n📞 Booking: +92 315 177 3177",

  payment: "💳 Payment Methods:\n\nAt Sevva, we accept:\n• 💵 Cash\n• 💳 Credit/Debit Card\n\n⚠️ GST (as per PRA regulations) applies to all prices.\nFor latest info, call us!",

  parking: "🅿️ Parking:\n\nSevva Restaurant has ample parking space available.\nEasy access and secure parking!\n\n📍 Adda Plot Roundabout, Raiwind Road, Lahore",

  kids: "👶 For Kids:\n\n• Hi-Tea Buffet: Children under 7 — Half price\n• Baby Chairs — Free!\n• Kids-friendly atmosphere\n\nBring your family! Family-friendly dining! 👨‍👩‍👧‍👦",

  delivery: "🛵 Delivery:\n\nSevva food is also available on Foodpanda!\n\n🍽️ For the best experience, visit us for dine-in! 😊",

  website: "🌐 Website:\n\nhttps://sevva.pk\n\nOn our website you can see:\n• 📋 Complete menu\n• 📸 Gallery\n• 📞 Booking\n• 📍 Location\n\nVisit now! 😊",
};

// Extended keyword patterns for smarter matching
const KEYWORD_PATTERNS: Array<{ pattern: RegExp; response: string }> = [
  { pattern: /\b(what|which).*(sevva|restaurant)/i, response: "about" },
  { pattern: /\b(tell).*(about)/i, response: "about" },
  { pattern: /\b(who|whose).*(you|restaurant)/i, response: "about" },
  { pattern: /\b(open|close|timing|hours|when)/i, response: "hours" },
  { pattern: /\b(best|popular|recommend|special)/i, response: "menu" },
  { pattern: /\b(what|which).*(to eat|order|have)/i, response: "menu" },
  { pattern: /\b(how).*(reach|come|get there)/i, response: "location" },
  { pattern: /\b(where|address|location)/i, response: "location" },
  { pattern: /\b(ramadan|fasting|iftar|suhoor)/i, response: "ramadan" },
  { pattern: /\b(family|group|party)/i, response: "deal" },
  { pattern: /\b(event|wedding|birthday|celebration|catering)/i, response: "event" },
  { pattern: /\b(pay|payment|card|cash)/i, response: "payment" },
  { pattern: /\b(park|parking|car)/i, response: "parking" },
  { pattern: /\b(kid|child|baby)\b/i, response: "kids" },
  { pattern: /\b(deliver|delivery|home)/i, response: "delivery" },
  { pattern: /\b(instagram|facebook|tiktok|social|media)/i, response: "social" },
  { pattern: /\b(site|web|online)/i, response: "website" },
  { pattern: /\b(biryani)/i, response: "menu" },
  { pattern: /\b(chicken|poultry)/i, response: "menu" },
  { pattern: /\b(mutton|lamb|meat)/i, response: "menu" },
  { pattern: /\b(drink|beverage|juice|tea|coffee)/i, response: "coffee" },
  { pattern: /\b(chinese|asian)/i, response: "menu" },
  { pattern: /\b(rice)/i, response: "menu" },
  { pattern: /\b(cheap|affordable|budget)/i, response: "deal" },
  { pattern: /\b(expensive|luxury|premium)/i, response: "platter" },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getResponse = (userMsg: string): string => {
    const lower = userMsg.toLowerCase();

    // Common greetings
    if (/\b(hi|hey|hello|greetings)\b/i.test(lower)) {
      return FAQ_RESPONSES.hello;
    }
    if (/\b(thank|thanks|appreciate)\b/i.test(lower)) {
      return FAQ_RESPONSES.thanks;
    }
    // Goodbye
    if (/\b(bye|goodbye|farewell|see you)\b/i.test(lower)) {
      return "Goodbye! 😊 It was great chatting with you!\n\nWe look forward to seeing you at Sevva! 🍽️\n\n📞 +92 315 177 3177";
    }

    // Check English keywords
    for (const [englishKey, value] of Object.entries(ENGLISH_KEYWORDS)) {
      if (lower.includes(englishKey)) {
        return FAQ_RESPONSES[value] || FAQ_RESPONSES.menu;
      }
    }

    // Check extended regex patterns
    for (const { pattern, response } of KEYWORD_PATTERNS) {
      if (pattern.test(lower)) {
        return FAQ_RESPONSES[response] || FAQ_RESPONSES.menu;
      }
    }

    // Smart fallback
    return "Got your question! 😊\n\nI'm Sevva Restaurant's assistant and can help with restaurant-related info.\n\n🔹 Try asking:\n• 📋 \"menu\" — Full menu\n• 💰 \"price\" — Price ranges\n• 🍽️ \"buffet\" — Buffet options\n• 🌙 \"iftar\" — Ramadan menu\n• 🫖 \"hi-tea\" — Hi-Tea buffet\n• 🍽️ \"deals\" — Deals\n• 📍 \"location\" — Address\n• 📞 \"reservation\" — Table booking\n• ☕ \"coffee\" — Drinks\n• 🥘 \"platter\" — Platters\n\nOr call us: 📞 +92 315 177 3177";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    const botResponse: Message = { role: "bot", content: getResponse(input.trim()) };
    setMessages((prev) => [...prev, userMessage, botResponse]);
    setInput("");
  };

  return (
    <>
      {/* Chat Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary hover:bg-primary/80 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MessageSquare className="w-6 h-6 text-primary-foreground" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">

          {/* Header */}
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Sevva Assistant</h3>
              <p className="text-xs opacity-80">🟢 Online</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 px-3 py-2 overflow-x-auto border-b border-border bg-muted/30">
            {[
              { label: "📋 Menu", query: "menu" },
              { label: "🍽️ Deals", query: "deal" },
              { label: "🫖 Hi-Tea", query: "hi-tea" },
              { label: "🌙 Iftar", query: "iftar" },
              { label: "📍 Location", query: "location" },
            ].map((btn) => (
              <button
                key={btn.query}
                onClick={() => {
                  const userMsg: Message = { role: "user", content: btn.label };
                  const botResp: Message = { role: "bot", content: getResponse(btn.query) };
                  setMessages((prev) => [...prev, userMsg, botResp]);
                }}
                className="px-3 py-1 bg-muted text-foreground text-xs rounded-full whitespace-nowrap hover:bg-primary/20 hover:text-primary transition-colors shrink-0"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px] max-h-[320px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-2 border-t border-border flex items-center gap-2 bg-background">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              className="flex-1 bg-muted text-foreground text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
            <button onClick={handleSend} className="w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
