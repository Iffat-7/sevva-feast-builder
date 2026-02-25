import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", alt: "Signature BBQ platter with seekh kababs and tikka boti", category: "Food" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", alt: "Elegant restaurant interior with warm lighting", category: "Ambience" },
  { src: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80", alt: "Traditional chicken karahi served sizzling", category: "Food" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Fine dining table setting with candles", category: "Ambience" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80", alt: "Freshly baked naan bread from tandoor", category: "Food" },
  { src: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80", alt: "Lavish buffet spread with multiple dishes", category: "Events" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80", alt: "Creamy malai boti with mint garnish", category: "Food" },
  { src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80", alt: "Wedding celebration dinner at Sevva", category: "Events" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", alt: "Grilled meat platter with vegetables", category: "Food" },
  { src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80", alt: "Outdoor terrace dining under lights", category: "Ambience" },
  { src: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80", alt: "Rich mutton handi in clay pot", category: "Food" },
  { src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80", alt: "Corporate event catering setup", category: "Events" },
];

const categories = ["All", "Food", "Ambience", "Events"];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };
  const goPrev = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  return (
    <main id="main-content">
      <PageHeader
        subtitle="Visual Journey"
        title="Gallery"
        description="Experience the ambience, food, and celebrations at Sevva Restaurant."
      />

      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Category Filter */}
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((img, i) => (
              <AnimatedSection key={`${img.src}-${activeCategory}`} delay={i * 0.05}>
                <button
                  onClick={() => openLightbox(i)}
                  className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 cursor-pointer"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-all duration-500 flex items-end">
                    <div className="p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-xs tracking-widest text-primary uppercase">{img.category}</span>
                      <p className="text-sm text-foreground mt-1">{img.alt}</p>
                    </div>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 md:left-8 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 md:right-8 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          <div className="max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
            />
            <div className="text-center mt-4">
              <span className="text-xs tracking-widest text-primary uppercase">{filtered[lightboxIndex].category}</span>
              <p className="text-sm text-muted-foreground mt-1">{filtered[lightboxIndex].alt}</p>
              <p className="text-xs text-muted-foreground mt-2">{lightboxIndex + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default GalleryPage;
