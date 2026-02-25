import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, UtensilsCrossed } from "lucide-react";

interface Message {
  role: "bot" | "user";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "bot",
    content: "Assalam o Alaikum! 🍽️ Sevva Restaurant mein khush aamdeed!\nWelcome to Sevva Restaurant!\n\nMain aap ki madad kar sakta/sakti hoon:\n• 📋 Menu & prices / مینو اور قیمتیں\n• 📞 Reservations / بکنگ\n• 📍 Location & hours / پتہ اور اوقات\n• 🍽️ Buffet info / بفے کی تفصیلات\n• ☕ Deals & offers / ڈیلز\n\nKaise madad kar sakta hoon? How can I help?",
  },
];

// Urdu keyword mappings
const URDU_KEYWORDS: Record<string, string> = {
  "مینو": "menu", "کھانا": "menu", "ميو": "menu",
  "قیمت": "price", "ریٹ": "price", "کتنے": "price", "قيمت": "price",
  "بکنگ": "reservation", "ریزرویشن": "reservation", "ٹیبل": "reservation",
  "پتہ": "location", "کہاں": "location", "لوکیشن": "location",
  "اوقات": "hours", "ٹائم": "hours", "وقت": "hours",
  "بفے": "buffet", "بوفے": "buffet",
  "افطار": "iftar", "افطاری": "iftar",
  "سحری": "suhoor", "سحور": "suhoor",
  "ہائی ٹی": "hi-tea", "چائے": "hi-tea",
  "سجی": "sajji",
  "ڈیل": "deal", "آفر": "deal",
  "پلیٹر": "platter",
  "کافی": "coffee", "چاے": "coffee",
  "شکریہ": "thanks", "مہربانی": "thanks",
  "ہیلو": "hello", "السلام": "hello", "سلام": "hello",
  "کراہی": "karahi", "کڑاہی": "karahi",
  "بی بی کیو": "bbq", "بربیکیو": "bbq",
  "تندور": "tandoor", "نان": "tandoor", "روٹی": "tandoor",
};

const FAQ_RESPONSES: Record<string, string> = {
  menu: "📋 ہمارا مینو / Our Menu:\n\n⭐ سگنیچر: ملائی بوٹی (1,699), شوایا چکن (2,490)\n🔥 توا سپیشل (950–3,299)\n🍲 دیسی ہانڈی (1,895–2,500)\n🥘 کڑاہی (1,300–2,500)\n🍢 BBQ (1,250–2,999)\n🍛 مٹن سپیشلز (1,799–2,499)\n🥘 ترکش/عربی پلیٹرز (2,395–49,995)\n🍽️ ڈیلز (1,545–3,445)\n☕ کافی و مشروبات (145–600)\n🍰 ڈیزرٹس (350–500)\n\nکسی سیکشن کی تفصیل چاہیں؟\nWant details on any section? 😊",

  price: "💰 قیمتیں / Price Ranges:\n\n• سگنیچر: PKR 1,699–2,995\n• مینز: PKR 950–3,299\n• کڑاہی: PKR 1,300–2,500\n• BBQ: PKR 1,250–2,999\n• تندور: PKR 50–1,200\n• موکٹیلز: PKR 250–600\n• کولڈ کافی: PKR 315–495\n• ڈیزرٹ: PKR 350–500\n• ہائی ٹی بفے: PKR 1,875–2,000 + ٹیکس\n• افطار چکن: PKR 2,495 + ٹیکس\n• افطار مٹن: PKR 3,495 + ٹیکس\n• سحور: PKR 2,495 + ٹیکس\n\nقیمتیں تبدیل ہو سکتی ہیں۔",

  reservation: "📞 بکنگ / Reservation:\n\n1. ویب سائٹ پر Reservations پیج دیکھیں\n2. کال/واٹس ایپ: +92 315 177 3177\n\nویک اینڈ کے لیے ایک دن پہلے بک کریں! 😊\n\nBook a day ahead for weekends!",
  book: "📞 بکنگ / Reservation:\n\n1. ویب سائٹ پر Reservations پیج دیکھیں\n2. کال/واٹس ایپ: +92 315 177 3177\n\nویک اینڈ کے لیے ایک دن پہلے بک کریں! 😊",

  location: "📍 ہمارا پتہ / Our Location:\n\nAdda Plot Roundabout, Raiwind Road,\nopposite GO Pump, near Lake City,\nLahore, Punjab 54790, Pakistan 🇵🇰\n\n⏰ روزانہ: دوپہر 12 – رات 12\n⭐ گوگل ریٹنگ: 4.6/5 (1000+ ریویوز)",

  hours: "⏰ اوقات کار / Hours:\n\nپیر – اتوار\n12:00 PM – 12:00 AM (آدھی رات)\n\nسرکاری تعطیلات پر اوقات مختلف ہو سکتے ہیں۔\nHours may vary on public holidays.",

  buffet: "🍽️ بفے آپشنز / Buffet Options:\n\n🫖 ہائی ٹی: PKR 1,875+ (Mon-Thu) / 2,000+ (Fri-Sun)\n50+ ڈشز! سلاٹ: 3:00–4:30 & 5:00–6:30 PM\n\n🍽️ افطار چکن: PKR 2,495/فی کس + ٹیکس\n🍽️ افطار مٹن: PKR 3,495/فی کس + ٹیکس\nٹائمنگ: مغرب سے 2 گھنٹے\n\n🌙 سحور: PKR 2,495/فی کس + ٹیکس\nسلاٹ 1: 1:00 AM – 2:45 AM\nسلاٹ 2: 3:15 AM – سحور تک\n\nبکنگ: +92 315 177 3177",

  iftar: "🍽️ افطار ڈنر بفے / Iftar Dinner:\n\n🐔 چکن مینو: PKR 2,495/فی کس + ٹیکس\nچکن بریانی، پالک، کڑاہی، کباب مصالحہ\nBBQ: چیز بوٹی، تندوری، ٹکہ، گولا کباب\n\n🐑 مٹن مینو: PKR 3,495/فی کس + ٹیکس\nدیگی قورمہ، شہزادی رعن قیمہ، یخنی پلاؤ\nمٹن پالک گوشت، مٹن کباب\n\nدونوں میں: سٹارٹرز، پان ایشین، پلیٹرز، تندور، ڈیزرٹس\nمغرب سے 2 گھنٹے\n\nبکنگ: +92 315 177 3177 📞",

  suhoor: "🌙 سحور بفے / Suhoor Buffet:\nPKR 2,495/فی کس + ٹیکس\n\nسلاٹ:\n• 1:00 AM – 2:45 AM\n• 3:15 AM – سحور ختم\n\nمٹن پائے، دیسی مرغ شوربا، حلیم\nلائیو ایگ سٹیشن، پوری سٹیشن\nBBQ، ڈیزرٹس، گرم مشروبات\n\nبکنگ: +92 315 177 3177",

  "hi-tea": "🫖 ہائی ٹی بفے (50+ ڈشز):\n\nویک ڈے (Mon-Thu): PKR 1,875 + ٹیکس (25% OFF)\nویک اینڈ (Fri-Sun): PKR 2,000 + ٹیکس (20% OFF)\nسٹینڈرڈ: PKR 2,499 + ٹیکس\n\nسلاٹ: 3:00–4:30 PM & 5:00–6:30 PM\n\nچارکول گرل، دیسی کھانے، چائنیز، رائس\nسلاد بار، نان شاپ، ڈیزرٹ بار\n\n7 سال سے کم بچے: آدھی قیمت\nبچے (baby chair): مفت\n\nبکنگ: +92 315 177 3177",

  sajji: "🍗 سویوا سپیشل سجی:\n\n• چکن سجی — PKR 1,800\n• لیمب سجی — PKR 3,500\n\nسست آنچ پر بھونا ہوا! Slow-roasted!\nDine-in available 🔥",

  deal: "🍽️ لنچ و ڈنر ڈیلز / Deals:\n\n• ڈیل 1 (2-3 افراد): PKR 3,445\n  ہانڈی + تندوری بوٹی + کباب + نان + سلاد\n• ڈیل 5 (2 افراد): PKR 3,445\n  لیگ/چیسٹ + ریشمی کباب + عربی رائس\n• ڈیل 3 (2-3 افراد): PKR 3,345\n  فرائیڈ رائس + چائنیز + فنگر چکن\n• ڈیل 2 (2 افراد): PKR 1,795\n  بریانی + ترکش کباب + سلاد\n• ڈیل 4 (2 افراد): PKR 1,545\n  چکن کڑاہی + روٹی + نان\n\nخاندان کے لیے بہترین! Great for families! 😊",

  platter: "🥘 ترکش و عربی پلیٹرز:\n\n• فل لحم مندی: PKR 49,995 (8 گھنٹے پہلے آرڈر)\n• لحم مندی III (8-10): PKR 24,445\n• علا سفرہ (9-10): PKR 21,995\n• لحم مندی II (4-5): PKR 10,495\n• شعلہ پلیٹر (3-4): PKR 6,995\n• دجاج الفحم (4-5): PKR 5,995\n• مندی پلیٹر (2-3): PKR 5,445\n• 1 میٹر ترکش کباب: PKR 4,495\n• عربی شوایا (3-4): PKR 2,395\n\nگروپ ڈائننگ کے لیے بہترین! 🎉",

  coffee: "☕ کافی و مشروبات / Beverages:\n\n🧊 کولڈ کافی:\n• موکا ہنی بنی: PKR 495\n• کیریمل/ونیلا/ہیزلنٹ لاٹے: PKR 445\n• کلاسک کولڈ/آئرش کریم: PKR 315\n\n🔥 ہاٹ:\n• ہاٹ چاکلیٹ/کپوچینو: PKR 445–495\n• لاٹے: PKR 415\n• ترکش قہوہ: PKR 210\n• گرین ٹی: PKR 195\n• کرک چائے: PKR 145\n\n🍹 موکٹیلز:\n• منٹ مارگریٹا: PKR 250\n• سگنیچر موکٹیلز: PKR 300–600",

  karahi: "🥘 کڑاہی سیکشن / Karahi:\n\n• آدھی چکن کڑاہی (½ کلو): PKR 1,300\n• فل چکن کڑاہی: PKR 2,500\n• مٹن کڑاہی: PKR 2,500\n• بون لیس کڑاہی: PKR 2,500\n\nدیسی تڑکے والی مزیدار کڑاہی! 🔥",

  bbq: "🍢 BBQ سپیشل:\n\n• ٹکہ بوٹی (12 pcs): PKR 1,300\n• چکن سیخ کباب (4): PKR 1,250\n• بیف سیخ (4): PKR 1,399\n• مٹن کباب (4): PKR 1,999\n• ملائی بوٹی (12): PKR 1,699\n• چارکول چکن: PKR 599\n• مٹن چاپ (6): PKR 2,999\n• فش ٹکہ: PKR 2,499\n\nچارکول پر بھونے ہوئے! 🔥",

  tandoor: "🫓 تندور / Tandoor:\n\n• خمیری روٹی: PKR 50\n• کلونجی نان: PKR 199\n• گارلک نان: PKR 199\n• روغنی نان: PKR 199\n• چوپڑی روٹی: PKR 120\n• چکن نان: PKR 749\n• بیف قیمہ نان: PKR 849\n• مٹن قیمہ نان: PKR 1,200\n\nتازہ تندور سے! Fresh from tandoor! 🔥",

  handi: "🍲 دیسی ہانڈی / Handi Section:\n\n• مرغ مغل اعظم: PKR 2,245\n• مرغ پٹیالہ: PKR 2,245\n• مرغ گرین چلی لیمن: PKR 2,095\n• مرغ مدراسی: PKR 1,995\n• مرغ راجستھانی: PKR 1,995\n• مرغ حیدرآبادی: PKR 1,995\n• مرغ اچاری: PKR 1,995\n• مرغ جلفریزی: PKR 1,995\n• مرغ ہری مرچ: PKR 1,995\n• مرغ ادرک: PKR 1,995\n• مرغ ہانڈی: PKR 1,895\n\nمٹی کے برتن میں پکی ہوئی! 😋",

  soup: "🍜 اورینٹل سوپ / Soups:\n\n• سویوا سپیشل (H/F): PKR 945/1,645\n• 19B سوپ (H/F): PKR 945/1,645\n• سیچوان (H/F): PKR 845/1,445\n• ہاٹ اینڈ ساور (H/F): PKR 795/1,395\n• چکن کارن (H/F): PKR 795/1,395",

  dessert: "🍰 ڈیزرٹس / Desserts:\n\n• گلاب جامن (3 pcs): PKR 350\n• شاہی کھیر: PKR 450\n• گاجر کا حلوہ (250g): PKR 500\n\nبفے میں مزید ڈیزرٹس دستیاب ہیں! 🍮",

  hello: "وعلیکم السلام! 😊 سویوا ریسٹورنٹ میں خوش آمدید!\n\nWa Alaikum Assalam! Welcome to Sevva! 🍽️\n\nآپ کیسے ہیں؟ میں آپ کی کیا مدد کر سکتا/سکتی ہوں?\nHow can I help you today?",

  thanks: "شکریہ! آپ کا بہت بہت مہربانی! 😊\n\nThank you so much! We look forward to serving you at Sevva! 🍽️\n\nکسی اور سوال کے لیے بتائیں!\nFeel free to ask anything else!",

  ramadan: "🌙 رمضان مبارک! Ramadan Kareem!\n\n🍽️ افطار چکن: PKR 2,495 + ٹیکس\n🍽️ افطار مٹن: PKR 3,495 + ٹیکس\n🌙 سحور: PKR 2,495 + ٹیکس\n\nمغرب سے 2 گھنٹے | سحور سلاٹ دستیاب\n\nبکنگ: +92 315 177 3177 📞",
};

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

    // Check Urdu keywords first
    for (const [urduKey, englishKey] of Object.entries(URDU_KEYWORDS)) {
      if (userMsg.includes(urduKey)) {
        return FAQ_RESPONSES[englishKey] || FAQ_RESPONSES.menu;
      }
    }

    // Check English keywords
    for (const [key, value] of Object.entries(FAQ_RESPONSES)) {
      if (lower.includes(key)) return value;
    }

    // Common greetings
    if (/^(hi|hey|hello|assalam|salam|aoa)\b/i.test(lower)) {
      return FAQ_RESPONSES.hello;
    }
    if (/\b(thank|shukriya|shukria|meherbani)\b/i.test(lower)) {
      return FAQ_RESPONSES.thanks;
    }

    return "شکریہ! آپ کا پیغام مل گیا! 😊\nThank you for your message!\n\nمزید مدد کے لیے ہمیں کال یا واٹس ایپ کریں:\n📞 +92 315 177 3177\n\nیا ان میں سے کوئی پوچھیں:\n• menu / مینو\n• price / قیمت\n• buffet / بفے\n• deals / ڈیلز\n• location / پتہ\n• reservation / بکنگ";
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
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary hover:bg-gold-dark rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <X size={24} className="text-primary-foreground" />
        ) : (
          <MessageSquare size={24} className="text-primary-foreground" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] max-h-[520px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gold-gradient px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <UtensilsCrossed size={18} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-heading font-bold text-primary-foreground">Sevva Assistant</h4>
              <p className="text-xs text-primary-foreground/80">🟢 آن لائن | Online</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="px-3 py-2 border-b border-border flex gap-2 overflow-x-auto scrollbar-hide">
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
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[340px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type or اردو میں لکھیں..."
              className="flex-1 bg-muted text-foreground text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center hover:bg-gold-dark transition-all duration-300 disabled:opacity-40"
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
