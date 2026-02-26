import { Link } from "react-router-dom";
import { UtensilsCrossed, MapPin, Clock, Star, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-restaurant.jpg"
            alt="Elegant restaurant interior with warm candlelight ambiance"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
            Reserve the Moment.{" "}
            <span className="text-gold-gradient italic">Experience Sevva.</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Immerse yourself in the art of authentic Pakistani cuisine, where tradition meets elegance in every dish.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reservations"
              className="px-8 py-3.5 bg-gold-gradient text-primary-foreground font-body text-sm tracking-wider rounded hover:opacity-90 transition-opacity"
            >
              Book a Table
            </Link>
            <Link
              to="/menu"
              className="px-8 py-3.5 border border-primary/50 text-foreground font-body text-sm tracking-wider rounded hover:border-primary hover:text-primary transition-all"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] text-primary uppercase text-center mb-3">A Visual Journey</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Culinary Artistry</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden group max-w-5xl mx-auto">
              <img
                src="/images/feast-table.jpg"
                alt="Elegant dining table with traditional Pakistani dishes"
                className="w-full h-[400px] md:h-[550px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-xs tracking-widest text-primary uppercase mb-2">The Complete Experience</p>
                <h3 className="text-2xl font-heading font-bold text-foreground">A Traditional Pakistani Feast</h3>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="container mx-auto">
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] text-primary uppercase text-center mb-3">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-14">The Sevva Experience</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: UtensilsCrossed, title: "Authentic Cuisine", desc: "Traditional Pakistani & Turkish-inspired dishes prepared with desi ghee and premium ingredients" },
              { icon: MapPin, title: "Prime Location", desc: "Situated near Lake City, Raiwind Road — easily accessible with ample parking" },
              { icon: Clock, title: "Open Daily", desc: "Monday through Sunday, 12:00 PM to Midnight — perfect for lunch, dinner, or late-night dining" },
              { icon: Star, title: "Premium Ambience", desc: "Elegant family-friendly atmosphere ideal for celebrations, gatherings, and memorable evenings" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/30 hover:shadow-gold transition-all duration-500 h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] text-primary uppercase text-center mb-3">Guest Reviews</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-14">What Our Guests Say</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { text: "The best karahi in Lahore! The ambience is perfect for family dinners. Highly recommend the Nawabi Butter Handi.", name: "Ahmed Khan" },
              { text: "Absolutely stunning restaurant. The Sunday brunch buffet is incredible — over 50 items and everything was delicious.", name: "Fatima Malik" },
              { text: "Celebrated my anniversary here. The staff was attentive, the food was exceptional, and the private seating was wonderful.", name: "Hassan Ali" },
            ].map((review, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed mb-6">"{review.text}"</p>
                  <p className="text-sm font-heading font-semibold text-foreground">{review.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <p className="text-center text-muted-foreground text-sm mt-8">
              <span className="text-primary font-semibold">4.6</span> out of 5 based on 1000+ Google reviews
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/food-hero.jpg" alt="Signature dish" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <AnimatedSection className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">Reserve Your Table</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Experience <span className="text-gold-gradient italic">Sevva?</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-10 leading-relaxed">
            Whether it's a family gathering, business dinner, or a romantic evening, we're ready to make your visit unforgettable.
          </p>
          <Link
            to="/reservations"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-gradient text-primary-foreground font-body text-sm tracking-wider rounded hover:opacity-90 transition-opacity"
          >
            Book Your Table <ChevronRight size={16} />
          </Link>
        </AnimatedSection>
      </section>
    </main>
  );
};

export default Index;
