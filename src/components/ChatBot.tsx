import { useState } from "react";
import { MessageSquare, X, Send, UtensilsCrossed } from "lucide-react";

interface Message {
  role: "bot" | "user";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "bot",
    content: "Assalam o Alaikum! Welcome to Sevva Restaurant. 🍽️\n\nI can help you with:\n• Menu & prices\n• Reservations\n• Location & hours\n• Special requests\n\nHow can I assist you today?",
  },
];

const FAQ_RESPONSES: Record<string, string> = {
  menu: "📋 Our menu features:\n\n⭐ Signature: Malai Boti (PKR 1,699), Arabic Shawaya (PKR 2,490)\n🔥 Tawa Specials (PKR 950–3,299)\n🍲 Desi Handi (PKR 1,895–2,500)\n🥘 Karahi (PKR 1,300–2,500)\n🍢 BBQ (PKR 1,250–2,999)\n🍛 Mutton Specials (PKR 1,799–2,499)\n🥘 Turkish/Arabic Platters (PKR 2,395–49,995)\n🍽️ Lunch/Dinner Deals (PKR 1,545–3,445)\n🍰 Desserts (PKR 350–500)\n🥤 Mocktails & Coffee (PKR 145–600)\n\nWould you like details on any section?",
  price: "💰 Our price ranges:\n\n• Signature Dishes: PKR 1,699–2,995\n• Mains: PKR 950–3,299\n• Karahi: PKR 1,300–2,500\n• BBQ items: PKR 1,250–2,999\n• Tandoor breads: PKR 50–1,200\n• Mocktails: PKR 250–600\n• Cold Coffee: PKR 315–495\n• Desserts: PKR 350–500\n• Hi-Tea Buffet: PKR 1,875–2,000 + tax\n• Iftar Chicken: PKR 2,495/head + tax\n• Iftar Mutton: PKR 3,495/head + tax\n• Suhoor Buffet: PKR 2,495/head + tax\n\nPrices may vary. Please confirm when booking.",
  reservation: "📞 To make a reservation:\n\n1. Visit our Reservations page on the website\n2. Call/WhatsApp: +92 315 177 3177\n\nWe recommend booking a day ahead for weekends!",
  book: "📞 To make a reservation:\n\n1. Visit our Reservations page on the website\n2. Call/WhatsApp: +92 315 177 3177\n\nWe recommend booking a day ahead for weekends!",
  location: "📍 We're located at:\nAdda Plot Roundabout, Raiwind Road,\nopposite GO Pump, near Lake City,\nLahore, Punjab 54790, Pakistan\n\n⏰ Open daily: 12:00 PM – 12:00 AM\n⭐ 4.6/5 on Google (1000+ reviews)",
  hours: "⏰ Operating Hours:\nMonday – Sunday\n12:00 PM – 12:00 AM (Midnight)\n\nHours may vary on public holidays.",
  buffet: "🍽️ Buffet Options:\n\n🫖 Hi-Tea Buffet: PKR 1,875+ tax (Mon-Thu) / PKR 2,000+ tax (Fri-Sun)\n50+ dishes! Slots: 3:00–4:30 PM & 5:00–6:30 PM\n\n🍽️ Iftar Chicken: PKR 2,495/head + tax\n🍽️ Iftar Mutton: PKR 3,495/head + tax\nTiming: From Maghreb for 2 hours\n\n🌙 Suhoor: PKR 2,495/head + tax\nSlot 1: 1:00 AM – 2:45 AM\nSlot 2: 3:15 AM – End of Suhoor\n\nCall to reserve: +92 315 177 3177",
  iftar: "🍽️ Iftar Dinner Buffets:\n\n🐔 Chicken Menu: PKR 2,495/head + tax\n🐑 Mutton Menu: PKR 3,495/head + tax\nTiming: From Maghreb for 2 hours\n\nIncludes starters, salads, BBQ, Pan-Asian, platters, tandoor, desserts & more!\n\nReserve now: +92 315 177 3177",
  suhoor: "🌙 Suhoor Buffet: PKR 2,495/head + tax\n\nSlots:\n• 1:00 AM – 2:45 AM\n• 3:15 AM – End of Suhoor\n\nIncludes live egg & puri stations, BBQ, main course, desserts & hot beverages!\n\nReserve: +92 315 177 3177",
  "hi-tea": "🫖 Hi-Tea Buffet (50+ Dishes):\n\nWeekday (Mon-Thu): PKR 1,875 + tax (25% OFF)\nWeekend (Fri-Sun): PKR 2,000 + tax (20% OFF)\nStandard: PKR 2,499 + tax\n\nSlots: 3:00–4:30 PM & 5:00–6:30 PM\n\nIncludes charcoal grill, desi, Chinese, rice, salad bar, naan shop & desserts!\n\nKids under 7: Half price | Infants: Free\n\nReserve: +92 315 177 3177",
  sajji: "🍗 Sevva's Special Sajji:\n\n• Chicken Sajji — PKR 1,800\n• Lamb Sajji — PKR 3,500\n\nSlow-roasted to perfection! Available for dine-in.",
  deal: "🍽️ Lunch & Dinner Deals:\n\n• Deal 1 (2-3 pax): PKR 3,445 — Handi + BBQ + Naan\n• Deal 5 (2 pax): PKR 3,445 — Leg/Chest + Arabic Rice\n• Deal 3 (2-3 pax): PKR 3,345 — Chinese combo\n• Deal 2 (2 pax): PKR 1,795 — Biryani + Kebab\n• Deal 4 (2 pax): PKR 1,545 — Karahi + Roti\n\nGreat value for families!",
  platter: "🥘 Turkish & Arabic Platters:\n\n• Full Laham Mandi: PKR 49,995 (order 8 hrs early)\n• Laham Mandi III (8-10): PKR 24,445\n• Ala Sufra (9-10): PKR 21,995\n• Laham Mandi II (4-5): PKR 10,495\n• Dujaj Ul Faham (4-5): PKR 5,995\n• Arabic Shawaya (3-4): PKR 2,395\n\nPerfect for group dining!",
  coffee: "☕ Coffee & Beverages:\n\n• Mocha Honey Bunny: PKR 495\n• Caramel Macchiato / Vanilla / Hazelnut Latte: PKR 445\n• Classic Cold Coffee: PKR 315\n• Hot Chocolate / Cappuccino: PKR 445–495\n• Karak Tea: PKR 145\n• Green Tea: PKR 195",
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const getResponse = (userMsg: string): string => {
    const lower = userMsg.toLowerCase();
    for (const [key, value] of Object.entries(FAQ_RESPONSES)) {
      if (lower.includes(key)) return value;
    }
    return "Thank you for your message! For detailed assistance, please call or WhatsApp us at +92 315 177 3177. We're happy to help! 😊";
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
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary hover:bg-gold-dark rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
        aria-label="Open chatbot"
      >
        {isOpen ? <X size={24} className="text-primary-foreground" /> : <MessageSquare size={24} className="text-primary-foreground" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[500px] bg-card border border-border rounded-xl shadow-2xl flex flex-col animate-fade-in-up overflow-hidden">
          {/* Header */}
          <div className="bg-gold-gradient px-4 py-3 flex items-center gap-3">
            <UtensilsCrossed size={20} className="text-primary-foreground" />
            <div>
              <h4 className="text-sm font-heading font-bold text-primary-foreground">Sevva Assistant</h4>
              <p className="text-xs text-primary-foreground/80">Here to help you</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[340px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
            <button
              onClick={handleSend}
              className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center hover:bg-gold-dark transition-colors"
              aria-label="Send message"
            >
              <Send size={16} className="text-primary-foreground" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
