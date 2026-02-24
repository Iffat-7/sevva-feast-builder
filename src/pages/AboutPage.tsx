import PageHeader from "@/components/PageHeader";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <main id="main-content">
      <PageHeader subtitle="Our Story" title="About Sevva" />

      {/* Story Section */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">
                Where Tradition Meets <span className="text-gold-gradient italic">Elegance</span>
              </h2>
              <div className="space-y-5 mt-6 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Nestled in the heart of Lahore near Lake City, Sevva Restaurant brings together the rich
                  culinary heritage of Pakistan with an atmosphere of refined elegance. Our journey began with a
                  simple vision: to create a space where families and friends could gather over exceptional food,
                  creating memories that last a lifetime.
                </p>
                <p>
                  Every dish at Sevva tells a story — from our aromatic karahis cooked to perfection in
                  traditional style, to our signature BBQ platters that showcase the mastery of charcoal
                  grilling. We believe in using only the finest ingredients, including authentic desi ghee and
                  premium meats, to honor the recipes passed down through generations.
                </p>
                <p>
                  Whether you're celebrating a special occasion, hosting a business dinner, or simply enjoying a
                  family meal, Sevva provides the perfect setting. Our warm hospitality and attention to detail
                  ensure that every visit is an experience to remember.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/chef.jpg"
                alt="Head Chef at Sevva Restaurant"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl px-6 py-4 shadow-gold">
                <p className="text-primary font-heading font-semibold text-sm">Our Head Chef</p>
                <p className="text-xs text-muted-foreground">Bringing over 15 years of culinary expertise to every dish</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authenticity",
                desc: "Traditional recipes prepared with genuine techniques and premium ingredients that honor our culinary heritage.",
              },
              {
                title: "Hospitality",
                desc: "Every guest is family. We take pride in creating warm, memorable experiences for each person who walks through our doors.",
              },
              {
                title: "Excellence",
                desc: "From ingredients to presentation to service, we pursue excellence in every detail of your dining experience.",
              },
            ].map((value, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/30 transition-all duration-300">
                <h3 className="text-lg font-heading font-semibold text-primary mb-4">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setting */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">The Perfect Setting</h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto mb-10">
            Sevva offers a family-friendly environment that's equally suited for intimate dinners, grand
            celebrations, and corporate gatherings. Our elegant interiors, comfortable seating options —
            including private areas — and attentive service create the ideal backdrop for any occasion.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Family Gatherings", "Business Dinners", "Celebrations", "Private Events"].map((tag) => (
              <span key={tag} className="px-5 py-2 bg-card border border-border rounded-full text-xs tracking-wider text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
          <Link
            to="/reservations"
            className="inline-block px-8 py-3.5 bg-gold-gradient text-primary-foreground font-body text-sm tracking-wider rounded hover:opacity-90 transition-opacity"
          >
            Book Now
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
