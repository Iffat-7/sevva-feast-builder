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
  menu: "📋 Our menu features:\n\n⭐ Signature: Malai Boti (PKR 1,699), Arabic Shawaya (PKR 2,490)\n🔥 Tawa Specials (PKR 950–3,299)\n🍲 Boneless Handi (PKR 2,100–2,500)\n🥘 Karahi (PKR 1,300–2,500)\n🍢 BBQ (PKR 1,250–2,999)\n🍛 Mutton Specials (PKR 1,799–2,499)\n🍽️ Signature Platters (PKR 3,358–6,000)\n🍰 Desserts (PKR 350–500)\n🥤 Mocktails (PKR 250–600)\n\nWould you like details on any section?",
  price: "💰 Our price ranges:\n\n• Signature Dishes: PKR 1,699–2,995\n• Mains: PKR 950–3,299\n• Karahi: PKR 1,300–2,500\n• BBQ items: PKR 1,250–2,999\n• Tandoor breads: PKR 50–1,200\n• Mocktails: PKR 250–600\n• Desserts: PKR 350–500\n• Hi-Tea Buffet: PKR 1,875–2,000 + tax\n• Iftar Buffet: PKR 3,495/head + tax\n• Suhoor Buffet: PKR 2,495/head + tax\n\nPrices may vary. Please confirm when booking.",
  reservation: "📞 To make a reservation:\n\n1. Visit our Reservations page on the website\n2. Call/WhatsApp: +92 315 177 3177\n\nWe recommend booking a day ahead for weekends!",
  book: "📞 To make a reservation:\n\n1. Visit our Reservations page on the website\n2. Call/WhatsApp: +92 315 177 3177\n\nWe recommend booking a day ahead for weekends!",
  location: "📍 We're located at:\nAdda Plot Roundabout, Raiwind Road,\nopposite GO Pump, near Lake City,\nLahore, Punjab 54790, Pakistan\n\n⏰ Open daily: 12:00 PM – 12:00 AM\n⭐ 4.6/5 on Google (1000+ reviews)",
  hours: "⏰ Operating Hours:\nMonday – Sunday\n12:00 PM – 12:00 AM (Midnight)\n\nHours may vary on public holidays.",
  buffet: "🍽️ Buffet Options:\n\n🫖 Hi-Tea Buffet: PKR 1,875+ tax (Mon-Thu) / PKR 2,000+ tax (Fri-Sun)\n50+ dishes across Desi, Chinese, Continental!\n\n🌙 Iftar Dinner Buffet: PKR 3,495/head + tax\nTiming: From Maghreb for 2 hours\n\n🌙 Suhoor Buffet: PKR 2,495/head + tax\nSlot 1: 1:00 AM – 2:45 AM\nSlot 2: 3:15 AM – End of Suhoor\n\nCall to reserve: +92 315 177 3177",
  iftar: "🍽️ Iftar Dinner Buffet: PKR 3,495/head + tax\nTiming: From Maghreb for 2 hours\n\nIncludes:\n• Starters & salads\n• 6+ BBQ items\n• Pan-Asian section\n• Turkish & Arabic platters\n• Live tandoor station\n• Desserts\n\nReserve now: +92 315 177 3177",
  suhoor: "🌙 Suhoor Buffet: PKR 2,495/head + tax\n\nSlots:\n• 1:00 AM – 2:45 AM\n• 3:15 AM – End of Suhoor\n\nIncludes live stations, BBQ, desserts & hot beverages!\n\nReserve: +92 315 177 3177",
  "hi-tea": "🫖 Hi-Tea Buffet:\n\nWeekday (Mon-Thu): PKR 1,875 + tax per person\nWeekend (Fri-Sun): PKR 2,000 + tax per person\n\n50+ dishes including:\n• Desi food corner & BBQ\n• Chinese & continental\n• Kids station\n• Salad & dessert bar\n\nReserve: +92 315 177 3177",
  sajji: "🍗 Sevva's Special Sajji:\n\n• Chicken Sajji — PKR 1,800\n• Lamb Sajji — PKR 3,500\n\nSlow-roasted to perfection! Available for dine-in.",
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
