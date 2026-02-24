import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading tracking-[0.3em] text-primary mb-4">SEVVA</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Authentic Pakistani cuisine where tradition meets elegance. Experience fine dining in Lahore.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/sevvarestaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/sevvarestaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm tracking-widest text-primary mb-6 font-body font-bold">QUICK LINKS</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Home", path: "/" },
                { label: "Menu", path: "/menu" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
                { label: "Reservations", path: "/reservations" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-widest text-primary mb-6 font-body font-bold">CONTACT</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-1 shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Adda Plot Roundabout, Raiwind Road, near Lake City, Lahore, Punjab, Pakistan
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:+923151773177" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +92 315 177 3177
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:buttcaterers786@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  buttcaterers786@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm tracking-widest text-primary mb-6 font-body font-bold">OPENING HOURS</h4>
            <div className="flex items-start gap-3">
              <Clock size={16} className="text-primary mt-1 shrink-0" />
              <div>
                <p className="text-sm text-foreground">Monday – Sunday</p>
                <p className="text-sm text-primary font-semibold">12:00 PM – 12:00 AM</p>
                <p className="text-xs text-muted-foreground mt-1">Hours may vary on public holidays</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sevva Restaurant. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Powered by <span className="text-primary font-semibold">Effat</span></span>
            <span className="mx-2">|</span>
            <span className="text-primary font-semibold">Lumina Digital Agency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
