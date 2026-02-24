import PageHeader from "@/components/PageHeader";

interface MenuItem {
  name: string;
  price: string;
  desc?: string;
}

interface MenuSection {
  title: string;
  emoji?: string;
  items: MenuItem[];
  highlight?: boolean;
  note?: string;
}

const menuSections: MenuSection[] = [
  {
    title: "Sevva's Tawa Special",
    items: [
      { name: "Tawa Chicken", price: "PKR 950" },
      { name: "Champ Qeema (4 champs)", price: "PKR 3,299" },
      { name: "Taka Tak", price: "PKR 1,999" },
      { name: "Shehzadi Raan Qeema", price: "PKR 2,495" },
      { name: "Sevvas Brain Masala", price: "PKR 1,599" },
    ],
  },
  {
    title: "Boneless Handi Section",
    items: [
      { name: "Nawabi Butter Handi", price: "PKR 2,100" },
      { name: "Mughlai Handi", price: "PKR 2,500" },
      { name: "Chicken Jalfrezi Handi", price: "PKR 2,100" },
      { name: "Achari Handi", price: "PKR 2,100" },
    ],
  },
  {
    title: "Karahi Section",
    items: [
      { name: "Half Karahi", price: "PKR 1,300" },
      { name: "Full Karahi", price: "PKR 2,500" },
    ],
  },
  {
    title: "Tandoor",
    items: [
      { name: "Khameeri Roti", price: "PKR 50" },
      { name: "Kalonji Naan", price: "PKR 199" },
      { name: "Garlic Naan", price: "PKR 199" },
      { name: "Roghni Naan", price: "PKR 199" },
      { name: "Choopri Roti", price: "PKR 120" },
      { name: "Chicken Naan", price: "PKR 749" },
      { name: "Beef Qeema Naan", price: "PKR 849" },
      { name: "Mutton Qeema Naan", price: "PKR 1,200" },
    ],
  },
  {
    title: "Sevva Mutton Section",
    items: [
      { name: "Desi Chicken Shorba (Quarter)", price: "PKR 1,799" },
      { name: "Mutton Palak", price: "PKR 1,995" },
      { name: "Mutton Royal Qorma", price: "PKR 2,499" },
    ],
  },
  {
    title: "Appetizers",
    items: [
      { name: "Prawns Tempura (6 pcs)", price: "PKR 2,158" },
      { name: "Dynamite Chicken (6 pcs)", price: "PKR 1,149" },
      { name: "Finger Fish (6 pcs)", price: "PKR 1,799" },
    ],
  },
  {
    title: "Rice",
    items: [{ name: "Mutton Pulao", price: "PKR 1,995" }],
  },
  {
    title: "Sevva's Special BBQ",
    items: [
      { name: "Tikka Boti (12 pcs)", price: "PKR 1,300" },
      { name: "Chicken Seekh Kabab (4 pcs)", price: "PKR 1,250" },
      { name: "Beef Seekh Kabab (4 pcs)", price: "PKR 1,399" },
      { name: "Mutton Kabab (4 pcs)", price: "PKR 1,999" },
      { name: "Malai Boti (12 pcs)", price: "PKR 1,699" },
      { name: "Classic Charcoal Chicken", price: "PKR 599" },
      { name: "Mutton Chops (6 pcs)", price: "PKR 2,999" },
      { name: "Bosphorus Fish Tikka", price: "PKR 2,499" },
    ],
  },
  {
    title: "Signature Platters",
    items: [
      { name: "Platter for 2", price: "PKR 3,358" },
      { name: "Platter for 4", price: "PKR 6,000" },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Hot Gulab Jamun (3 pcs)", price: "PKR 350" },
      { name: "Sheherzadi Shahi Kheer", price: "PKR 450" },
      { name: "Gajar Ka Halwa (250g)", price: "PKR 500" },
    ],
  },
  {
    title: "Sides",
    items: [
      { name: "Salad Bar", price: "PKR 950" },
      { name: "Kachumber Salad", price: "PKR 290" },
      { name: "Garden Fresh Salad", price: "PKR 290" },
      { name: "Mint Raita", price: "PKR 220" },
      { name: "Zeera Raita", price: "PKR 220" },
    ],
  },
  {
    title: "Sevva's Signature Dishes",
    items: [
      { name: "Sevvas Mutton Joints (2 joints)", price: "PKR 2,995" },
      { name: "Sevva Kuna Pot", price: "PKR 2,995" },
    ],
  },
];

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {menuSections.map((section, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-heading text-primary font-semibold mb-1">{section.title}</h3>
                <div className="w-12 h-0.5 bg-primary/30 mb-6" />
                <div className="space-y-4">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex items-baseline justify-between gap-4">
                      <span className="text-sm text-foreground">{item.name}</span>
                      <span className="text-sm text-primary font-semibold whitespace-nowrap">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Iftar Buffet */}
      <section className="py-16 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card border border-primary/20 rounded-2xl p-8 md:p-12 shadow-gold">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold mb-2">🍽️ Iftar Dinner Buffet</h2>
              <p className="text-2xl text-primary font-heading font-bold">PKR 3,495/- Per Head + Tax</p>
              <p className="text-sm text-muted-foreground mt-2">Timing: From Maghreb for two hours</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-primary font-heading font-semibold mb-3">Starter & Salads</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="text-foreground font-medium">Drinks:</span> Rooh Afza, Lemon Water</p>
                  <p><span className="text-foreground font-medium">Traditional:</span> Creamy Khajoor, Papri Chaat, Dahi Bhally, Fruit Chaat</p>
                  <p><span className="text-foreground font-medium">Salads:</span> Apple Cabbage, Fresh Chopped Salad, Noodle Salad</p>
                  <p><span className="text-foreground font-medium">Fried/Savory:</span> Vegetable Pakora, Chicken Samosa, Lahori Aloo Tikky, Chicken Patties</p>
                </div>
              </div>
              <div>
                <h4 className="text-primary font-heading font-semibold mb-3">Main Courses</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="text-foreground font-medium">Main:</span> Mutton Daigi Qorma, Shehzadi Raan Qeema, Mutton Yakhni Pulao, Murgh Madrasi</p>
                  <p><span className="text-foreground font-medium">BBQ:</span> Chicken Cheese Boti, Tandoori Boti, Tikka Boti, Gola Kabab, Reshmi Boti</p>
                  <p><span className="text-foreground font-medium">Pan-Asian:</span> Dhaka Chicken, Honey Wings, Chicken Manchurian, Chowmein</p>
                </div>
              </div>
              <div>
                <h4 className="text-primary font-heading font-semibold mb-3">Platters & Tandoor</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="text-foreground font-medium">Platters:</span> Turkish Platter, Arabic Platter</p>
                  <p><span className="text-foreground font-medium">Tandoor:</span> Roghni Naan, Kalwanji Naan, Garlic Naan, Pizza Plain Naan, Hara Spicy Naan</p>
                  <p><span className="text-foreground font-medium">Dressings:</span> Dynamite, Garlic, Mayo, Salsa, Mango Chutni, Ranch</p>
                </div>
              </div>
              <div>
                <h4 className="text-primary font-heading font-semibold mb-3">Desserts</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Shahi Kheer, Gulab Jamun, Shahi Tukra, Basboussa, Burfi, Rasgulla, and more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suhoor Buffet */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card border border-primary/20 rounded-2xl p-8 md:p-12 shadow-gold">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold mb-2">🌙 Suhoor (Sehri) Buffet</h2>
              <p className="text-2xl text-primary font-heading font-bold">PKR 2,495/- Per Head + Tax</p>
              <p className="text-sm text-muted-foreground mt-2">
                Slot One: 1:00 AM – 2:45 AM | Slot Two: 3:15 AM – End of Suhoor
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-primary font-heading font-semibold mb-3">Appetizers & Main Course</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="text-foreground font-medium">Welcome Drink:</span> Sweet Lassi</p>
                  <p><span className="text-foreground font-medium">Appetizers:</span> Chicken Cold Sandwich, Chicken Patties, Shami Burger, Dhaka Chicken</p>
                  <p><span className="text-foreground font-medium">Main Course:</span> Mutton Paye, Desi Murg Shorba, Chicken Haleem, Tarka Daal, Lahori Chanay</p>
                </div>
              </div>
              <div>
                <h4 className="text-primary font-heading font-semibold mb-3">Live Stations</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="text-foreground font-medium">Egg Station:</span> French Toast, Aloo Anda Bhujia, Cheese Omelette, Half Fry</p>
                  <p><span className="text-foreground font-medium">Puri Station:</span> Puri, Pathory, Suji Halwa</p>
                  <p><span className="text-foreground font-medium">BBQ:</span> Tandoori Boti, Chicken Tikka, Gola Kabab</p>
                </div>
              </div>
              <div>
                <h4 className="text-primary font-heading font-semibold mb-3">Desserts & Beverages</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="text-foreground font-medium">Sweets:</span> Shahi Kheer, Gulab Jamun, Shahi Tukra, Burfi, Rasgulla</p>
                  <p><span className="text-foreground font-medium">Cakes:</span> Mousse, Eclairs, Tea Cake, Three Milk Cake</p>
                  <p><span className="text-foreground font-medium">Special:</span> Chocolate Fountain</p>
                  <p><span className="text-foreground font-medium">Hot Beverages:</span> Green Tea, Karak Tea, Cafe Latte</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center pb-16">
        <p className="text-xs text-muted-foreground mb-6">* Prices are subject to change. Please confirm when booking. Reservations: 0315 1773177</p>
        <a
          href="/reservations"
          className="inline-block px-8 py-3.5 bg-gold-gradient text-primary-foreground font-body text-sm tracking-wider rounded hover:opacity-90 transition-opacity"
        >
          Book Now
        </a>
      </div>
    </main>
  );
};

export default MenuPage;
