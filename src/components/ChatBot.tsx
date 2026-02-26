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
  menu: "📋 ہمارا مینو / Our Menu:\n\n⭐ سگنیچر: ملائی بوٹی (1,699), شوایا چکن (2,490)\n🔥 توا سپیشل (950–3,299)\n🍲 دیسی ہانڈی (1,895–2,245)\n🥘 کڑاہی (1,300–2,500)\n🍢 BBQ (1,250–2,999)\n🍛 مٹن سپیشلز (1,799–2,499)\n🥘 ترکش/عربی پلیٹرز (2,395–49,995)\n🍽️ ڈیلز (1,545–3,445)\n☕ کافی و مشروبات (145–600)\n🍰 ڈیزرٹس (350–500)\n\nکسی سیکشن کی تفصیل چاہیں؟\nWant details on any section? 😊",

  price: "💰 قیمتیں / Price Ranges:\n\n• سگنیچر: PKR 1,699–2,995\n• مینز: PKR 950–3,299\n• کڑاہی: PKR 1,300–2,500\n• BBQ: PKR 1,250–2,999\n• تندور: PKR 50–1,200\n• موکٹیلز: PKR 250–600\n• کولڈ کافی: PKR 315–495\n• ڈیزرٹ: PKR 350–500\n• ہائی ٹی بفے: PKR 1,875–2,000 + ٹیکس\n• افطار چکن: PKR 2,495 + ٹیکس\n• افطار مٹن: PKR 3,495 + ٹیکس\n• سحور: PKR 2,495 + ٹیکس\n\nقیمتیں تبدیل ہو سکتی ہیں۔",

  reservation: "📞 بکنگ / Reservation:\n\nآپ کئی طریقوں سے بک کر سکتے ہیں:\n1. 🌐 ویب سائٹ پر Reservations پیج\n2. 📞 کال: +92 315 177 3177\n3. 💬 واٹس ایپ: +92 315 177 3177\n\n💡 ٹِپ: ویک اینڈ (جمعہ/ہفتہ) کے لیے ایک دن پہلے بک کریں!\nTip: Book a day ahead for weekends! 😊",
  book: "📞 بکنگ / Reservation:\n\nآپ کئی طریقوں سے بک کر سکتے ہیں:\n1. 🌐 ویب سائٹ پر Reservations پیج\n2. 📞 کال: +92 315 177 3177\n3. 💬 واٹس ایپ: +92 315 177 3177\n\n💡 ویک اینڈ کے لیے ایک دن پہلے بک کریں! 😊",

  location: "📍 ہمارا پتہ / Our Location:\n\nAdda Plot Roundabout, Raiwind Road,\nopposite GO Pump, near Lake City,\nLahore, Punjab 54790, Pakistan 🇵🇰\n\n⏰ روزانہ: دوپہر 12 بجے – رات 12 بجے\n⭐ گوگل ریٹنگ: 4.6/5 (1000+ ریویوز)\n\n🌐 Website: sevva.pk",

  hours: "⏰ اوقات کار / Opening Hours:\n\nپیر – اتوار (Mon–Sun)\n🕐 12:00 PM – 12:00 AM (آدھی رات)\n\n⚠️ سرکاری تعطیلات پر اوقات مختلف ہو سکتے ہیں۔\nHours may vary on public holidays.\n\nرمضان میں خصوصی اوقات — افطار و سحور بفے دستیاب! 🌙",

  buffet: "🍽️ بفے آپشنز / Buffet Options:\n\n🫖 ہائی ٹی (50+ ڈشز):\n• Mon-Thu: PKR 1,875 + ٹیکس (25% OFF)\n• Fri-Sun: PKR 2,000 + ٹیکس (20% OFF)\n• سلاٹ: 3:00–4:30 & 5:00–6:30 PM\n\n🍽️ افطار چکن: PKR 2,495/فی کس + ٹیکس\n🍽️ افطار مٹن: PKR 3,495/فی کس + ٹیکس\n• مغرب سے 2 گھنٹے\n\n🌙 سحور: PKR 2,495/فی کس + ٹیکس\n• سلاٹ 1: 1:00 AM – 2:45 AM\n• سلاٹ 2: 3:15 AM – سحور تک\n\n📞 بکنگ: +92 315 177 3177",

  iftar: "🍽️ افطار ڈنر بفے / Iftar Dinner Buffet:\n\n🐔 چکن مینو: PKR 2,495/فی کس + ٹیکس\nسٹارٹرز، چکن بریانی، پالک، کڑاہی، کباب مصالحہ\nBBQ: چیز بوٹی، تندوری، ٹکہ، گولا کباب، ریشمی بوٹی\nپان ایشین: ڈھاکہ چکن، فرائیڈ رائس، منچورین\nتندور، ڈریسنگز، چٹنیاں، ڈیزرٹس (17+ آئٹمز)\n\n🐑 مٹن مینو: PKR 3,495/فی کس + ٹیکس\nدیگی قورمہ، شہزادی رعن قیمہ، یخنی پلاؤ\nمٹن پالک گوشت، مٹن کباب، مرغ مدراسی\n+ سب سٹارٹرز، BBQ، پان ایشین، ڈیزرٹس\n\n⏰ مغرب سے 2 گھنٹے\n📞 بکنگ: +92 315 177 3177",

  suhoor: "🌙 سحور بفے / Suhoor Buffet:\nPKR 2,495/فی کس + ٹیکس\n\n⏰ سلاٹ:\n• سلاٹ 1: 1:00 AM – 2:45 AM\n• سلاٹ 2: 3:15 AM – سحور ختم\n\n🥤 ویلکم: سویٹ لسی\n🍲 مین: مٹن پائے، دیسی مرغ شوربا، حلیم، پالک، ترکا دال، لاہوری چنے\n🍳 لائیو ایگ سٹیشن: فرنچ ٹوسٹ، آملیٹ، آلو انڈا\n🫓 پوری سٹیشن: پوری، پتھوری، سوجی حلوا\n🍢 BBQ: تندوری بوٹی، ٹکہ، گولا کباب\n🍰 ڈیزرٹس: برفی، رسگلہ، تھری ملک کیک + مزید\n\n📞 بکنگ: +92 315 177 3177",

  "hi-tea": "🫖 ہائی ٹی بفے (50+ ڈشز) / Hi-Tea Buffet:\n\n💰 قیمتیں:\n• ویک ڈے (Mon-Thu): PKR 1,875 + ٹیکس (25% OFF)\n• ویک اینڈ (Fri-Sun): PKR 2,000 + ٹیکس (20% OFF)\n• سٹینڈرڈ: PKR 2,499 + ٹیکس\n\n⏰ سلاٹ: 3:00–4:30 PM & 5:00–6:30 PM\n\n🍗 چارکول گرل: تندوری بوٹی، چیز گولا کباب، ہرا بھرا\n🍲 دیسی: شنواری کڑاہی، مدراسی، بمبئی ٹکہ مسالہ\n🥡 چائنیز: چلی ڈرائی، بلیک پیپر، چاؤمین\n🍚 رائس: سندھی بریانی، یخنی پلاؤ، ایگ فرائیڈ\n🥗 سلاد بار، نان شاپ، ڈیزرٹ بار (چاکلیٹ فاؤنٹین!)\n\n👶 7 سال سے کم: آدھی قیمت | بیبی چیئر: مفت\n📞 بکنگ: +92 315 177 3177",

  sajji: "🍗 سویوا سپیشل سجی / Sevva's Special Sajji:\n\n• چکن سجی — PKR 1,800\n• لیمب سجی — PKR 3,500\n\nسست آنچ پر بھونا ہوا! Slow-roasted to perfection! 🔥\nDine-in available",

  deal: "🍽️ لنچ و ڈنر ڈیلز / Lunch & Dinner Deals:\n\n• ڈیل 1 (2-3 افراد): PKR 3,445\n  ہانڈی + تندوری بوٹی (4) + کباب (2) + نان + سلاد + رائتہ\n• ڈیل 5 (2 افراد): PKR 3,445\n  لیگ/چیسٹ + ریشمی کباب (2) + لبنانی بوٹی (4) + عربی رائس\n• ڈیل 3 (2-3 افراد): PKR 3,345\n  ایگ فرائیڈ رائس + چائنیز گریوی + فنگر چکن (8) + سموسے (3)\n• ڈیل 2 (2 افراد): PKR 1,795\n  چکن بریانی + ترکش کباب (2) + کچومر سلاد + منٹ رائتہ\n• ڈیل 4 (2 افراد): PKR 1,545\n  چکن کڑاہی + روٹی (3) + روغنی نان + رائتہ + سلاد\n\n👨‍👩‍👧‍👦 خاندان کے لیے بہترین! Great for families! 😊",

  platter: "🥘 ترکش و عربی پلیٹرز / Turkish & Arabic Platters:\n\n• فل لحم مندی: PKR 49,995 (8 گھنٹے پہلے آرڈر)\n• لحم مندی III (8-10): PKR 24,445\n• علا سفرہ (9-10): PKR 21,995\n• لحم مندی II (4-5): PKR 10,495\n• لحم مندی I (3-4): PKR 8,495\n• شعلہ پلیٹر (3-4): PKR 6,995\n• دجاج الفحم (4-5): PKR 5,995\n• مندی پلیٹر (2-3): PKR 5,445\n• ربز پلیٹر (2-3): PKR 5,445\n• 1 میٹر ترکش کباب: PKR 4,495\n• عربی شوایا (3-4): PKR 2,395\n\n🎉 گروپ ڈائننگ کے لیے بہترین!",

  coffee: "☕ کافی و مشروبات / Coffee & Beverages:\n\n🧊 کولڈ کافی:\n• موکا ہنی بنی: PKR 495\n• کیریمل میکیاٹو / ونیلا لاٹے / ہیزلنٹ لاٹے: PKR 445\n• چاکلیٹ میکیاٹو / کلاسک کولڈ / آئرش کریم: PKR 315\n\n🔥 ہاٹ بیوریجز:\n• ہاٹ چاکلیٹ / کیریمل / ہیزلنٹ / فرنچ ونیلا: PKR 495\n• کپوچینو / بٹر سکاچ / آئرش کریم لاٹے: PKR 445\n• لاٹے: PKR 415\n• ترکش قہوہ: PKR 210\n• گرین ٹی: PKR 195\n• گوا: PKR 190\n• کرک چائے: PKR 145\n\n🍹 موکٹیلز:\n• منٹ مارگریٹا: PKR 250\n• سگنیچر موکٹیلز: PKR 300–600",

  karahi: "🥘 کڑاہی سیکشن / Karahi:\n\n• آدھی چکن کڑاہی (½ کلو): PKR 1,300\n• فل چکن کڑاہی: PKR 2,500\n• مٹن کڑاہی: PKR 2,500\n• بون لیس کڑاہی: PKR 2,500\n\nدیسی تڑکے والی مزیدار کڑاہی! 🔥",

  bbq: "🍢 BBQ سپیشل / BBQ Section:\n\n• ٹکہ بوٹی (12 pcs): PKR 1,300\n• چکن سیخ کباب (4): PKR 1,250\n• بیف سیخ (4): PKR 1,399\n• مٹن کباب (4): PKR 1,999\n• ملائی بوٹی (12): PKR 1,699 ⭐\n• چارکول چکن: PKR 599\n• مٹن چاپ (6): PKR 2,999\n• فش ٹکہ: PKR 2,499\n\nچارکول پر بھونے ہوئے! Charcoal grilled! 🔥",

  tandoor: "🫓 تندور / Tandoor:\n\n• خمیری روٹی: PKR 50\n• کلونجی نان: PKR 199\n• گارلک نان: PKR 199\n• روغنی نان: PKR 199\n• اچاری نان: PKR 199\n• سادہ نان: PKR 199\n• کندھاری نان: PKR 199\n• چوپڑی روٹی: PKR 120\n• ہرا سپائسی نان: PKR —\n• پیزا پلین نان: PKR —\n• چکن نان: PKR 749\n• بیف قیمہ نان: PKR 849\n• مٹن قیمہ نان: PKR 1,200\n\nتازہ تندور سے! Fresh from tandoor! 🔥",

  handi: "🍲 دیسی ہانڈی / Handi Section:\n\n• مرغ مغل اعظم: PKR 2,245\n• مرغ پٹیالہ: PKR 2,245\n• مرغ گرین چلی لیمن: PKR 2,095\n• مرغ مدراسی: PKR 1,995\n• مرغ راجستھانی: PKR 1,995\n• مرغ حیدرآبادی: PKR 1,995\n• مرغ اچاری: PKR 1,995\n• مرغ جلفریزی: PKR 1,995\n• مرغ ہری مرچ: PKR 1,995\n• مرغ ادرک: PKR 1,995\n• مرغ ہانڈی: PKR 1,895\n\nمٹی کے برتن میں پکی ہوئی! Clay-pot cooked! 😋",

  soup: "🍜 اورینٹل سوپ / Oriental Soups:\n\n• سویوا سپیشل (H/F): PKR 945/1,645\n• 19B سوپ (H/F): PKR 945/1,645\n• سیچوان (H/F): PKR 845/1,445\n• ہاٹ اینڈ ساور (H/F): PKR 795/1,395\n• چکن کارن (H/F): PKR 795/1,395\n\nH = ہاف | F = فل",

  dessert: "🍰 ڈیزرٹس / Desserts:\n\n• گلاب جامن (3 pcs): PKR 350\n• شاہی کھیر: PKR 450\n• گاجر کا حلوہ (250g): PKR 500\n\n🎂 بفے میں مزید ڈیزرٹس:\nچاکلیٹ فاؤنٹین، تھری ملک کیک، باسبوسہ، موس، ایکلیئرز، کسٹرڈ، جیلی، پنا کوٹا + مزید! 🍮",

  hello: "وعلیکم السلام! 😊 سویوا ریسٹورنٹ میں خوش آمدید!\nWa Alaikum Assalam! Welcome to Sevva! 🍽️\n\nآپ کیسے ہیں؟ میں آپ کی کیا مدد کر سکتا/سکتی ہوں?\nHow can I help you today?\n\nآپ مجھ سے مینو، قیمتیں، بفے، بکنگ، یا کچھ بھی پوچھ سکتے ہیں! 😊",

  thanks: "شکریہ! آپ کا بہت بہت مہربانی! 😊\nThank you so much!\n\nہم آپ کی خدمت کے منتظر ہیں! 🍽️\nWe look forward to serving you at Sevva!\n\nکسی اور سوال کے لیے بتائیں!\nFeel free to ask anything else!",

  ramadan: "🌙 رمضان مبارک! Ramadan Kareem!\n\n🍽️ افطار چکن: PKR 2,495/فی کس + ٹیکس\n🍽️ افطار مٹن: PKR 3,495/فی کس + ٹیکس\n🌙 سحور: PKR 2,495/فی کس + ٹیکس\n\n⏰ افطار: مغرب سے 2 گھنٹے\n⏰ سحور سلاٹ 1: 1 AM – 2:45 AM\n⏰ سحور سلاٹ 2: 3:15 AM – سحور ختم\n\n📞 بکنگ: +92 315 177 3177",

  // About the restaurant
  about: "🏢 سویوا ریسٹورنٹ / About Sevva:\n\nSevva Restaurant لاہور کا ایک پریمیم دیسی فائن ڈائننگ ریسٹورنٹ ہے۔\n\n🍽️ کوزین: دیسی فیوژن، پاکستانی کلاسکس، گرلز، BBQ، کڑاہی\n📍 پتہ: Adda Plot, Raiwind Rd, near Lake City, Lahore\n⭐ گوگل ریٹنگ: 4.6/5 (1000+ ریویوز)\n🎉 ایونٹس، کیٹرنگ، پرائیویٹ پارٹیز\n\n🌐 Website: sevva.pk\n📸 Instagram: @sevvarestaurant\n🎵 TikTok: @sevvarestaurant",

  // Social media
  social: "📱 سوشل میڈیا / Social Media:\n\n📸 Instagram: @sevvarestaurant (~4.2K followers)\nفوڈ فوٹوز، ریلز، مینو ہائی لائٹس\n\n📘 Facebook: Sevva Restaurant | Lahore\nآفرز، بفے پروموشنز، ایونٹس\n\n🎵 TikTok: @sevvarestaurant\nفوڈ کلپس اور ریسٹورنٹ کی ویڈیوز\n\n🌐 Website: sevva.pk",

  // Events & catering
  event: "🎉 ایونٹس و کیٹرنگ / Events & Catering:\n\nSevva میں آپ اپنے خاص موقعوں کی تقریبات منعقد کر سکتے ہیں:\n• 🎂 برتھ ڈے پارٹیز\n• 💍 شادی کی تقریبات\n• 🏢 کارپوریٹ ایونٹس\n• 🎊 پرائیویٹ پارٹیز\n\nٹیرس اور انڈور دونوں دستیاب!\n📞 بکنگ: +92 315 177 3177",

  // Payment
  payment: "💳 ادائیگی / Payment:\n\nSevva میں درج ذیل طریقے قبول ہیں:\n• 💵 کیش\n• 💳 کریڈٹ/ڈیبٹ کارڈ\n\n⚠️ تمام قیمتوں پر GST (PRA کے مطابق) لاگو ہوگا۔\nGST applied as per PRA regulations.",

  // Parking
  parking: "🅿️ پارکنگ / Parking:\n\nSevva ریسٹورنٹ میں وسیع پارکنگ ایریا دستیاب ہے۔\nAmple parking space available at the restaurant.\n\n📍 Adda Plot Roundabout, Raiwind Road, Lahore",

  // Kids
  kids: "👶 بچوں کے لیے / For Kids:\n\n• ہائی ٹی بفے: 7 سال سے کم بچے — آدھی قیمت\n• بیبی چیئر والے بچے — مفت!\n• Kids-friendly ماحول\n\nخاندان کے ساتھ آئیں! Family-friendly dining! 👨‍👩‍👧‍👦",

  // Delivery
  delivery: "🛵 ڈیلیوری / Delivery:\n\nSevva کا کھانا Foodpanda پر بھی دستیاب ہے!\nAlso available on Foodpanda for delivery.\n\n🍽️ بہترین تجربے کے لیے Dine-in تشریف لائیں!\nFor the best experience, visit us for dine-in! 😊",

  // Website
  website: "🌐 ویب سائٹ / Website:\n\nhttps://sevva.pk\n\nہماری ویب سائٹ پر آپ دیکھ سکتے ہیں:\n• 📋 مکمل مینو\n• 📸 گیلری\n• 📞 بکنگ\n• 📍 لوکیشن\n\nابھی وزٹ کریں! 😊",
};

// Extended keyword patterns for smarter matching
const KEYWORD_PATTERNS: Array<{ pattern: RegExp; response: string }> = [
  // General questions about the restaurant
  { pattern: /\b(what|kya|کیا).*(sevva|restaurant|ریسٹورنٹ)/i, response: "about" },
  { pattern: /\b(tell|bata|بتا).*(about|bare|بارے)/i, response: "about" },
  { pattern: /\b(who|kon|کون).*(you|tum|آپ)/i, response: "about" },
  // Open/close times
  { pattern: /\b(open|close|band|کھل|بند|kitne|کتنے).*(baje|بجے|time|ٹائم|hour)/i, response: "hours" },
  { pattern: /\b(kab|کب).*(khul|کھل|band|بند)/i, response: "hours" },
  // Best/popular/recommend
  { pattern: /\b(best|popular|recommend|mashoor|مشہور|behtareen|بہترین|special|سپیشل)/i, response: "menu" },
  { pattern: /\b(kya|کیا).*(khaye|کھائیں|order|آرڈر)/i, response: "menu" },
  // How to reach/go
  { pattern: /\b(how|kaise|کیسے).*(reach|go|pahunch|پہنچ|aye|آئے)/i, response: "location" },
  { pattern: /\b(where|kahan|kidhar|کدھر|کہاں)/i, response: "location" },
  // Ramadan related
  { pattern: /\b(ramadan|ramzan|رمضان|رمضن|roze|روزے)/i, response: "ramadan" },
  // Family/group dining
  { pattern: /\b(family|خاندان|group|گروپ|party|پارٹی)/i, response: "deal" },
  // Event/wedding/birthday
  { pattern: /\b(event|ایونٹ|wedding|شادی|birthday|سالگرہ|cater|کیٹر)/i, response: "event" },
  // Payment related
  { pattern: /\b(pay|ادائیگی|card|کارڈ|cash|کیش|payment)/i, response: "payment" },
  // Parking
  { pattern: /\b(park|پارک|گاڑی)/i, response: "parking" },
  // Kids/children
  { pattern: /\b(kid|بچ|child|بچے|baby|بیبی)/i, response: "kids" },
  // Delivery
  { pattern: /\b(deliver|ڈیلیور|foodpanda|فوڈ پانڈا|ghar|گھر)/i, response: "delivery" },
  // Social media
  { pattern: /\b(instagram|insta|انسٹا|facebook|فیس بک|tiktok|ٹک ٹاک|social|سوشل)/i, response: "social" },
  // Website
  { pattern: /\b(website|ویب سائٹ|site|سائٹ|online|آن لائن)/i, response: "website" },
  // Biryani
  { pattern: /\b(biryani|بریانی)/i, response: "menu" },
  // Chicken/mutton general
  { pattern: /\b(chicken|چکن|مرغ|murgh)/i, response: "menu" },
  { pattern: /\b(mutton|مٹن|گوشت|gosht)/i, response: "menu" },
  // Drinks
  { pattern: /\b(drink|مشروب|پینے|juice|جوس|mocktail|موکٹیل|lassi|لسی)/i, response: "coffee" },
  // Chinese food
  { pattern: /\b(chinese|چائنیز|chowmein|چاؤمین|manchurian|منچورین)/i, response: "menu" },
  // Rice
  { pattern: /\b(rice|چاول|رائس|pulao|پلاؤ)/i, response: "menu" },
  // Cheap/budget
  { pattern: /\b(cheap|سستا|budget|بجٹ|affordable)/i, response: "deal" },
  // Expensive/luxury
  { pattern: /\b(expensive|مہنگا|luxury|لگژری)/i, response: "platter" },
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

    // Common greetings (check first for natural feel)
    if (/^(hi|hey|hello|assalam|salam|aoa|hlo)\b/i.test(lower) || /^(السلام|سلام|ہیلو|ہائے)/.test(userMsg)) {
      return FAQ_RESPONSES.hello;
    }
    if (/\b(thank|shukriya|shukria|meherbani|mashkoor)\b/i.test(lower) || /شکریہ|مہربانی|مشکور/.test(userMsg)) {
      return FAQ_RESPONSES.thanks;
    }
    // Goodbye
    if (/\b(bye|goodbye|alvida|khuda hafiz|allah hafiz)\b/i.test(lower) || /الوداع|خدا حافظ|اللہ حافظ/.test(userMsg)) {
      return "اللہ حافظ! 😊 آپ سے بات کر کے خوشی ہوئی!\nGoodbye! It was great chatting with you!\n\nSevva میں آپ کا انتظار رہے گا! 🍽️\nWe look forward to seeing you at Sevva!\n\n📞 +92 315 177 3177";
    }

    // Check Urdu keywords
    for (const [urduKey, englishKey] of Object.entries(URDU_KEYWORDS)) {
      if (userMsg.includes(urduKey)) {
        return FAQ_RESPONSES[englishKey] || FAQ_RESPONSES.menu;
      }
    }

    // Check English keywords (exact FAQ keys)
    for (const [key, value] of Object.entries(FAQ_RESPONSES)) {
      if (lower.includes(key)) return value;
    }

    // Check extended regex patterns for general/contextual questions
    for (const { pattern, response } of KEYWORD_PATTERNS) {
      if (pattern.test(lower) || pattern.test(userMsg)) {
        return FAQ_RESPONSES[response] || FAQ_RESPONSES.menu;
      }
    }

    // Smart fallback — still helpful, never hallucinating
    return "😊 آپ کا سوال ملا! / Got your question!\n\nمیں Sevva Restaurant کا اسسٹنٹ ہوں اور صرف ریسٹورنٹ سے متعلق معلومات دے سکتا ہوں۔\nI'm Sevva's assistant and can help with restaurant-related info only.\n\n🔹 یہ پوچھ کر دیکھیں / Try asking:\n• 📋 \"menu\" یا \"مینو\" — مکمل مینو\n• 💰 \"price\" یا \"قیمت\" — قیمتیں\n• 🍽️ \"buffet\" یا \"بفے\" — بفے آپشنز\n• 🌙 \"iftar\" یا \"افطار\" — رمضان مینو\n• 🫖 \"hi-tea\" — ہائی ٹی بفے\n• 🍽️ \"deals\" یا \"ڈیلز\" — ڈیلز\n• 📍 \"location\" یا \"پتہ\" — ہمارا پتہ\n• 📞 \"reservation\" یا \"بکنگ\" — ٹیبل بکنگ\n• ☕ \"coffee\" یا \"کافی\" — مشروبات\n• 🥘 \"platter\" یا \"پلیٹر\" — پلیٹرز\n\nیا ہمیں کال کریں: 📞 +92 315 177 3177";
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
