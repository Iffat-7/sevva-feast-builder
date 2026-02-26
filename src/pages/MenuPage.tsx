import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";

// ─── A La Carte Data ────────────────────────────────────────

interface MenuItem { name: string; price: string; desc?: string }
interface MenuSection { title: string; items: MenuItem[] }

const alaCarteSections: MenuSection[] = [
  {
    title: "Signature Dishes",
    items: [
      { name: "Plate Malai Boti", price: "1,699", desc: "Rich, creamy grilled chicken bites" },
      { name: "Full Arabic Shawaya Chicken", price: "2,490", desc: "Whole roasted shawaya chicken" },
      { name: "Sevva's Mutton Joints (2)", price: "2,995" },
      { name: "Sevva Kuna Pot", price: "2,995" },
    ],
  },
  {
    title: "Sevva's Tawa Special",
    items: [
      { name: "Tawa Chicken", price: "950" },
      { name: "Champ Qeema (4 champs)", price: "3,299" },
      { name: "Taka Tak", price: "1,999" },
      { name: "Shehzadi Raan Qeema", price: "2,495" },
      { name: "Sevva's Brain Masala", price: "1,599" },
    ],
  },
  {
    title: "Desi Handi Section",
    items: [
      { name: "Murgh Mughal e Azam", price: "2,245" },
      { name: "Murgh Patyala", price: "2,245" },
      { name: "Murgh Green Chilli Lemon", price: "2,095" },
      { name: "Murgh Madrasi", price: "1,995" },
      { name: "Murgh Rajhistani", price: "1,995" },
      { name: "Murgh Hyderabadi", price: "1,995" },
      { name: "Murgh Achari", price: "1,995" },
      { name: "Murgh Jalfrezi", price: "1,995" },
      { name: "Murgh Hari Mirch", price: "1,995" },
      { name: "Murgh Ginger", price: "1,995" },
      { name: "Murgh Handi", price: "1,895" },
      { name: "Nawabi Butter Handi", price: "2,100" },
      { name: "Mughlai Handi", price: "2,500" },
      { name: "Chicken Jalfrezi Handi", price: "2,100" },
      { name: "Achari Handi", price: "2,100" },
    ],
  },
  {
    title: "Karahi Section",
    items: [
      { name: "Half Chicken Karahi (½ kg)", price: "1,300" },
      { name: "Full Chicken Karahi", price: "2,500" },
      { name: "Mutton Karahi", price: "2,500" },
      { name: "Boneless Karahi", price: "2,500" },
    ],
  },
  {
    title: "Sevva's Special Sajji",
    items: [
      { name: "Chicken Sajji", price: "1,800", desc: "Slow-roasted whole chicken" },
      { name: "Lamb Sajji", price: "3,500", desc: "Slow-roasted whole lamb leg" },
    ],
  },
  {
    title: "Sevva Mutton Section",
    items: [
      { name: "Desi Chicken Shorba (Quarter)", price: "1,799" },
      { name: "Mutton Palak", price: "1,995" },
      { name: "Mutton Royal Qorma", price: "2,499" },
    ],
  },
  {
    title: "Sevva's Special BBQ",
    items: [
      { name: "Tikka Boti (12 pcs)", price: "1,300" },
      { name: "Chicken Seekh Kabab (4 pcs)", price: "1,250" },
      { name: "Beef Seekh Kabab (4 pcs)", price: "1,399" },
      { name: "Mutton Kabab (4 pcs)", price: "1,999" },
      { name: "Malai Boti (12 pcs)", price: "1,699" },
      { name: "Classic Charcoal Chicken", price: "599" },
      { name: "Mutton Chops (6 pcs)", price: "2,999" },
      { name: "Bosphorus Fish Tikka", price: "2,499" },
    ],
  },
  {
    title: "Tandoor",
    items: [
      { name: "Khameeri Roti", price: "50" },
      { name: "Kalonji Naan", price: "199" },
      { name: "Garlic Naan", price: "199" },
      { name: "Roghni Naan", price: "199" },
      { name: "Choopri Roti", price: "120" },
      { name: "Chicken Naan", price: "749" },
      { name: "Beef Qeema Naan", price: "849" },
      { name: "Mutton Qeema Naan", price: "1,200" },
    ],
  },
  {
    title: "Appetizers",
    items: [
      { name: "Prawns Tempura (6 pcs)", price: "2,158" },
      { name: "Dynamite Chicken (6 pcs)", price: "1,149" },
      { name: "Finger Fish (6 pcs)", price: "1,799" },
    ],
  },
  {
    title: "Oriental Soup Delight",
    items: [
      { name: "Sevva's Special Soup (Half / Full)", price: "945 / 1,645" },
      { name: "19B Soup (Half / Full)", price: "945 / 1,645" },
      { name: "Szechuan Soup (Half / Full)", price: "845 / 1,445" },
      { name: "Hot & Sour Soup (Half / Full)", price: "795 / 1,395" },
      { name: "Chicken Corn Soup (Half / Full)", price: "795 / 1,395" },
    ],
  },
  {
    title: "Rice",
    items: [{ name: "Mutton Pulao", price: "1,995" }],
  },
  {
    title: "Signature Platters",
    items: [
      { name: "Platter for 2", price: "3,358" },
      { name: "Platter for 4", price: "6,000" },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Hot Gulab Jamun (3 pcs)", price: "350" },
      { name: "Sheherzadi Shahi Kheer", price: "450" },
      { name: "Gajar Ka Halwa (250g)", price: "500" },
    ],
  },
  {
    title: "Sides & Salads",
    items: [
      { name: "Salad Bar", price: "950" },
      { name: "Kachumber Salad", price: "290" },
      { name: "Garden Fresh Salad", price: "290" },
      { name: "Mint Raita", price: "220" },
      { name: "Zeera Raita", price: "220" },
    ],
  },
  {
    title: "Cold Coffee",
    items: [
      { name: "Mocha Honey Bunny", price: "495" },
      { name: "Caramel Macchiato / Vanilla Latte / Hazelnut Latte", price: "445" },
      { name: "Chocolate Macchiato / Classic Cold / Irish Cream", price: "315" },
    ],
  },
  {
    title: "Hot Beverages",
    items: [
      { name: "Hot Chocolate / Hot Caramel / Hazelnut / French Vanilla", price: "495" },
      { name: "Cappuccino / Butter Scotch / French Vanilla / Irish Cream", price: "445" },
      { name: "Latte", price: "415" },
      { name: "Mint Margarita", price: "250" },
      { name: "Signature Mocktails", price: "300–600" },
      { name: "Turkish Kehwa", price: "210" },
      { name: "Green Tea", price: "195" },
      { name: "Guava Tea", price: "190" },
      { name: "Karak Tea", price: "145" },
    ],
  },
];

// ─── Specialty Platters ─────────────────────────────────────

const specialtyPlatters = [
  { name: "Full Laham Mandi (Large)", serves: "Large party", price: "49,995", note: "Order 8 hrs early" },
  { name: "Laham Mandi III", serves: "8–10", price: "24,445" },
  { name: "Ala Sufra Platter", serves: "9–10", price: "21,995" },
  { name: "Laham Mandi II", serves: "4–5", price: "10,495" },
  { name: "Laham Mandi I", serves: "3–4", price: "8,495" },
  { name: "Shola Platter", serves: "3–4", price: "6,995" },
  { name: "Dujaj Ul Faham", serves: "4–5", price: "5,995" },
  { name: "Mandi Platter", serves: "2–3", price: "5,445" },
  { name: "Ribs Platter", serves: "2–3", price: "5,445" },
  { name: "1 Meter Turkish Kebab", serves: "—", price: "4,495" },
  { name: "Arabic Shawaya Platter", serves: "3–4", price: "2,395" },
];

// ─── Lunch & Dinner Deals ───────────────────────────────────

const deals = [
  { name: "Deal 1 (2–3 Persons)", price: "3,445", desc: "Handi, Tandoori Boti (4), Chicken Kebab (2), Roghni Naan (2), Roti (2), Fresh Salad, Raita" },
  { name: "Deal 5 (2 Persons)", price: "3,445", desc: "Leg/Chest Piece, Reshmi Kebab (2), Labenese Boti (4), Arabic Rice, Naan (2), Roti (2), Raita" },
  { name: "Deal 3 (2–3 Persons)", price: "3,345", desc: "Egg Fried Rice, Any Chinese Gravy, Finger Chicken (8), Chicken Veg Samosa (3)" },
  { name: "Deal 2 (2 Persons)", price: "1,795", desc: "Chicken Biryani, Turkish Kebab (2), Kachumar Salad, Mint Raita" },
  { name: "Deal 4 (2 Persons)", price: "1,545", desc: "Chicken Karahi, Roti (3), Roghni Naan (1), Raita, Salad" },
];

// ─── Components ─────────────────────────────────────────────

const SectionCard = ({ section, index }: { section: MenuSection; index: number }) => (
  <AnimatedSection delay={index % 2 === 0 ? 0 : 0.1}>
    <div className="bg-card border border-border rounded-xl p-8 h-full">
      <h3 className="text-xl font-heading text-primary font-semibold mb-1">{section.title}</h3>
      <div className="w-12 h-0.5 bg-primary/30 mb-6" />
      <div className="space-y-4">
        {section.items.map((item, j) => (
          <div key={j}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm text-foreground">{item.name}</span>
              <span className="text-sm text-primary font-semibold whitespace-nowrap">PKR {item.price}</span>
            </div>
            {item.desc && <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>}
          </div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

// ─── Buffet Column Component ────────────────────────────────

const BuffetColumn = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h4 className="text-primary font-heading font-semibold mb-3">{title}</h4>
    <ul className="space-y-1 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

// ─── Main Page ──────────────────────────────────────────────

const MenuPage = () => {
  return (
    <main id="main-content">
      <PageHeader
        subtitle="Our Offerings"
        title="The Menu"
        description="Authentic Pakistani cuisine crafted with premium ingredients and traditional recipes passed down through generations."
      />

      {/* A La Carte Menu */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] text-primary uppercase text-center mb-3">À La Carte</p>
            <h2 className="text-3xl font-heading font-bold text-center mb-12">Main Menu</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {alaCarteSections.map((section, i) => (
              <SectionCard key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Lunch & Dinner Deals */}
      <section className="py-16 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] text-primary uppercase text-center mb-3">Value</p>
            <h2 className="text-3xl font-heading font-bold text-center mb-12">🍽️ Lunch & Dinner Deals</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deals.map((deal, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="bg-card border border-primary/20 rounded-xl p-6 h-full">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-heading font-semibold">{deal.name}</h3>
                    <span className="text-primary font-heading font-bold whitespace-nowrap">PKR {deal.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{deal.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Platters */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] text-primary uppercase text-center mb-3">Premium</p>
            <h2 className="text-3xl font-heading font-bold text-center mb-12">🥘 Turkish & Arabic Platters</h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-card border border-primary/20 rounded-2xl p-8 md:p-10 shadow-gold overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-primary font-heading">Platter</th>
                    <th className="text-center py-3 text-primary font-heading">Serves</th>
                    <th className="text-right py-3 text-primary font-heading">Price (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {specialtyPlatters.map((p, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 text-foreground">
                        {p.name}
                        {p.note && <span className="text-xs text-muted-foreground ml-2">({p.note})</span>}
                      </td>
                      <td className="py-3 text-center text-muted-foreground">{p.serves}</td>
                      <td className="py-3 text-right text-primary font-semibold">{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Hi-Tea Buffet */}
      <section className="py-16 px-6 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="bg-card border border-primary/20 rounded-2xl p-8 md:p-12 shadow-gold">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-heading font-bold mb-2">🫖 Hi-Tea Buffet</h2>
                <p className="text-sm text-muted-foreground mb-4">Enjoy 50+ Dishes | All Week Hi-Tea Buffets</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                  <div>
                    <p className="text-xl text-primary font-heading font-bold">Rs. 1,875 + Tax</p>
                    <p className="text-xs text-muted-foreground">Mon–Thu (25% OFF)</p>
                  </div>
                  <div className="hidden sm:block w-px bg-border" />
                  <div>
                    <p className="text-xl text-primary font-heading font-bold">Rs. 2,000 + Tax</p>
                    <p className="text-xs text-muted-foreground">Fri–Sun & Holidays (20% OFF)</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Standard: Rs. 2,499 + Tax | Slots: 3:00–4:30 PM & 5:00–6:30 PM</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <BuffetColumn title="Drinks & Soups" items={[
                  "Mint Margarita, Lemon Margarita, 3 Juices",
                  "Hot & Sour Soup, Chicken Corn Soup",
                ]} />
                <BuffetColumn title="Appetizers & Snacks" items={[
                  "Crispy Finger Fish, Buffalo Wings",
                  "Chicken Samosas, Cheese Samosa, Nutella Samosa",
                  "Cold & Chicken Sandwiches, Pizza Bites",
                  "Sesame Chicken, Chicken Finger, French Fries",
                  "Chicken Patties, Variety of Sandwiches",
                ]} />
                <BuffetColumn title="Charcoal Grill" items={[
                  "Tandoori Boti, Chicken Cheese Gola Kabab",
                  "Chicken Hara Bhara, Chicken Irani Boti",
                  "Sevva's Special Kabab (Signature)",
                ]} />
                <BuffetColumn title="Traditional Desi" items={[
                  "Chicken Shinwari Karahi, Chicken Madrasi Karahi",
                  "Kabab Masala, Bombay Tikka Masala",
                  "Tawa Qeema, Palak Chicken, Mix Vegetable",
                  "Shahi Daal, Chicken Daal",
                ]} />
                <BuffetColumn title="Chinese" items={[
                  "Chicken Chilli Dry, Chicken Black Pepper",
                  "Chicken Chowmein, Vegetable Chowmein",
                  "Chicken Manchurian, Chicken Shashlik",
                ]} />
                <BuffetColumn title="Rice" items={[
                  "Chicken Sindhi Biryani, Chicken Yakhni Pulao",
                  "Egg Fried Rice, Angoori Rice",
                ]} />
                <BuffetColumn title="Salad Bar" items={[
                  "Hummus & Kubus, Gol Gappy / Pani Puri",
                  "Papri Chaat, Fruit Chaat, Dahi Phulki",
                  "Fattoush, Kachumar, Fresh Garden, Apple Cabbage",
                  "German Potatoes, Chicken Pineapple",
                ]} />
                <BuffetColumn title="Naan Shop" items={[
                  "Roghni, Kalwangi, Garlic, Achari",
                  "Sada, Kandhari Naan, Sada Roti",
                ]} />
                <BuffetColumn title="Dessert Bar" items={[
                  "Chocolate Fountain, 3 Milk Cake, Basbousa",
                  "Bread & Egg Pudding, Cream Puff, Brownies",
                  "Cream Shooters, Short Pastries, Mousse, Eclairs",
                  "Kheer, Gulab Jamun, Custard, Jelly",
                ]} />
              </div>

              <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground space-y-1">
                <p>• Kids Under 7: Half Price | Infants in baby chair: No charge</p>
                <p>• Mint Margarita served once | Mineral water & cold drinks charged separately</p>
                <p>• GST applied as per PRA regulations</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Iftar Chicken Menu */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="bg-card border border-primary/20 rounded-2xl p-8 md:p-12 shadow-gold">
              <div className="text-center mb-10">
                <p className="text-xs tracking-widest text-primary uppercase mb-2">Ramadan Kareem</p>
                <h2 className="text-3xl font-heading font-bold mb-2">🍽️ Iftar Dinner — Chicken Menu</h2>
                <p className="text-2xl text-primary font-heading font-bold">PKR 2,495/- Per Head + Tax</p>
                <p className="text-sm text-muted-foreground mt-2">From Maghreb for two hours</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <BuffetColumn title="Starters" items={[
                  "Rooh Afza, Lemon Water, Creamy Khajoor",
                  "Papri Chaat, Dahi Bhally, Fruit Chaat",
                  "Apple Cabbage, Fresh Chopped Salad, Noodle Salad",
                  "Vegetable Pakora, Chicken Samosa",
                  "Lahori Aloo Ticky, Chicken Patties",
                  "Chicken Veg Samosa, Chicken Cold Sandwich",
                ]} />
                <BuffetColumn title="Main Entry" items={[
                  "Chicken Biryani, Chicken Palak",
                  "Kabab Masala, Chicken Karahi",
                ]} />
                <BuffetColumn title="BBQ Section" items={[
                  "Chicken Cheese Boti, Tandoori Boti",
                  "Tikka Boti, Gola Kabab",
                  "Reshmi Boti, Irani Boti",
                ]} />
                <BuffetColumn title="Pan-Asian" items={[
                  "Dhaka Chicken, Honey Wings",
                  "Chicken Manchurian, Chowmein",
                  "Egg Fried Rice, Penny Pasta, French Fries",
                ]} />
                <BuffetColumn title="Platters & Tandoor" items={[
                  "Turkish Platter, Arabic Platter",
                  "Roghni Naan, Kalwanji Naan, Garlic Naan",
                  "Pizza Plain Naan, Hara Spicy Naan",
                ]} />
                <BuffetColumn title="Desserts" items={[
                  "Shahi Kheer, Gulab Jamun, Shahi Tukra",
                  "Short Pasta, Mousse, Eclairs, Tea Cake",
                  "Custard, Jelly, Pudding, Panna Cotta",
                  "Hot Egg Pudding, Basbussa",
                  "Chocolate Fountain, Three Milk Cake",
                  "Burfi, Rasgulla, Cafe Latte",
                ]} />
              </div>

              <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
                <p>Dressings: Dynamite, Garlic, Mayo, Salsa, Mango Chutni, Aloo Bukhara, Imli, Khubani, Ketchup, Ranch</p>
                <p>Hot Beverages: Green Tea, Karak Tea</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Iftar Mutton Menu */}
      <section className="py-16 px-6 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="bg-card border border-primary/20 rounded-2xl p-8 md:p-12 shadow-gold">
              <div className="text-center mb-10">
                <p className="text-xs tracking-widest text-primary uppercase mb-2">Ramadan Kareem</p>
                <h2 className="text-3xl font-heading font-bold mb-2">🍽️ Iftar Dinner — Mutton Menu</h2>
                <p className="text-2xl text-primary font-heading font-bold">PKR 3,495/- Per Head + Tax</p>
                <p className="text-sm text-muted-foreground mt-2">From Maghreb for two hours</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <BuffetColumn title="Starters" items={[
                  "Rooh Afza, Lemon Water, Creamy Khajoor",
                  "Papri Chaat, Dahi Bhally, Fruit Chaat",
                  "Apple Cabbage, Fresh Chopped Salad, Noodle Salad",
                  "Vegetable Pakora, Chicken Samosa",
                  "Lahori Aloo Ticky, Chicken Patties",
                  "Chicken Veg Samosa, Chicken Cold Sandwich",
                ]} />
                <BuffetColumn title="Main Entry" items={[
                  "Mutton Daigi Qorma",
                  "Shehzadi Raan Qeema",
                  "Mutton Yakhni Pulao",
                  "Mutton Palak Gosht",
                  "Mutton Kabab (BBQ)",
                  "Murgh Madrasi",
                ]} />
                <BuffetColumn title="BBQ Section" items={[
                  "Chicken Cheese Boti, Tandoori Boti",
                  "Tikka Boti, Gola Kabab",
                  "Reshmi Boti, Irani Boti",
                ]} />
                <BuffetColumn title="Pan-Asian" items={[
                  "Dhaka Chicken, Honey Wings",
                  "Chicken Manchurian, Chowmein",
                  "Egg Fried Rice, Penny Pasta, French Fries",
                ]} />
                <BuffetColumn title="Platters & Tandoor" items={[
                  "Turkish Platter, Arabic Platter",
                  "Roghni Naan, Kalwanji Naan, Garlic Naan",
                  "Pizza Plain Naan, Hara Spicy Naan",
                ]} />
                <BuffetColumn title="Desserts" items={[
                  "Shahi Kheer, Gulab Jamun, Shahi Tukra",
                  "Short Pasta, Mousse, Eclairs, Tea Cake",
                  "Custard, Jelly, Pudding, Panna Cotta",
                  "Hot Egg Pudding, Basbussa",
                  "Chocolate Fountain, Three Milk Cake",
                  "Burfi, Rasgulla, Cafe Latte",
                ]} />
              </div>

              <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
                <p>Dressings: Dynamite, Garlic, Mayo, Salsa, Mango Chutni, Aloo Bukhara, Imli, Khubani, Ketchup, Ranch</p>
                <p>Hot Beverages: Green Tea, Karak Tea</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Suhoor Buffet */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="bg-card border border-primary/20 rounded-2xl p-8 md:p-12 shadow-gold">
              <div className="text-center mb-10">
                <p className="text-xs tracking-widest text-primary uppercase mb-2">Ramadan Kareem</p>
                <h2 className="text-3xl font-heading font-bold mb-2">🌙 Suhoor (Sehri) Buffet</h2>
                <p className="text-2xl text-primary font-heading font-bold">PKR 2,495/- Per Head + Tax</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Slot 1: 1:00 AM – 2:45 AM &nbsp;|&nbsp; Slot 2: 3:15 AM – End of Suhoor
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <BuffetColumn title="Welcome & Appetizers" items={[
                  "Welcome Drink: Sweet Lassi",
                  "Chicken Cold Sandwich, Chicken Patties",
                  "Shami Burger, Dhaka Chicken",
                ]} />
                <BuffetColumn title="Main Course" items={[
                  "Mutton Paye, Desi Murg Shorba",
                  "Shehzadi Raan Qeema, Chicken Haleem",
                  "Chicken Palak, Tarka Daal",
                  "Chicken Kabab Masala, Lahori Chanay",
                ]} />
                <BuffetColumn title="BBQ & Continental" items={[
                  "Tandoori Boti, Chicken Tikka, Gola Kabab",
                  "Penny Pasta, Chicken Biryani",
                ]} />
                <BuffetColumn title="Egg & Puri Station" items={[
                  "French Toast, Aloo Anda Bhujia",
                  "Cheese Omelette, Half Fry",
                  "Puri, Pathory, Suji Halwa",
                ]} />
                <BuffetColumn title="Naan / Roti & Condiments" items={[
                  "Roghni, Kalwanji, Garlic, Plain Naan",
                  "Khameeri Roti, Hara Spicy Naan, Podina Paratha",
                  "Butter, Jam",
                ]} />
                <BuffetColumn title="Salad & Beverages" items={[
                  "Fresh Green Salad, Kachumar Salad, Mint Raita",
                  "Green Tea, Karak Tea",
                ]} />
                <BuffetColumn title="Desserts" items={[
                  "Burfi, Rasgulla, Three Milk Cake",
                  "Shahi Kheer, Gulab Jamun, Shahi Tukra",
                  "Mousse, Eclairs, Tea Cake, Custard, Jelly",
                  "Pudding, Panna Cotta, Hot Egg Pudding",
                  "Basbussa, Chocolate Fountain, Cafe Latte",
                ]} />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection>
        <div className="text-center py-16">
          <p className="text-xs text-muted-foreground mb-6">* Prices are subject to change. Please confirm when booking. Reservations: 0315 1773177</p>
          <Link
            to="/reservations"
            className="inline-block px-8 py-3.5 bg-gold-gradient text-primary-foreground font-body text-sm tracking-wider rounded hover:opacity-90 transition-opacity"
          >
            Book Now
          </Link>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default MenuPage;
