import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <main id="main-content">
      <PageHeader subtitle="Get in Touch" title="Contact Us" description="Have questions or want to make a reservation? We'd love to hear from you." />

      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-card border border-border rounded-xl p-8 md:p-10 h-full">
                <h2 className="text-2xl font-heading font-bold mb-8">Visit Us</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0"><MapPin size={18} className="text-primary" /></div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm mb-1">Address</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">Adda Plot Roundabout, Raiwind Road,<br />opposite GO Pump, near Lake City,<br />Lahore, Punjab 54790, Pakistan</p>
                      <a href="https://maps.google.com/?q=Sevva+Restaurant+Lahore" target="_blank" rel="noopener noreferrer" className="text-primary text-xs mt-2 inline-flex items-center gap-1 hover:underline">Get Directions ↗</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0"><Phone size={18} className="text-primary" /></div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm mb-1">Phone / WhatsApp</h4>
                      <a href="tel:+923151773177" className="text-sm text-muted-foreground hover:text-primary transition-colors">+92 315 177 3177</a>
                      <p className="text-xs text-muted-foreground mt-1">Available for calls and WhatsApp messages</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0"><Mail size={18} className="text-primary" /></div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm mb-1">Email</h4>
                      <a href="mailto:buttcaterers786@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">buttcaterers786@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0"><Clock size={18} className="text-primary" /></div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm mb-1">Opening Hours</h4>
                      <p className="text-sm text-foreground">Monday – Sunday</p>
                      <p className="text-sm text-primary font-semibold">12:00 PM – 12:00 AM (Midnight)</p>
                      <p className="text-xs text-muted-foreground mt-1">Hours may vary on public holidays</p>
                    </div>
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-border text-center">
                  <h4 className="font-heading font-semibold mb-2">Ready to Book?</h4>
                  <p className="text-xs text-muted-foreground mb-4">Reserve your table online or call us directly</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/reservations" className="px-6 py-2.5 bg-gold-gradient text-primary-foreground text-sm tracking-wider rounded hover:opacity-90 transition-opacity">Book Online</Link>
                    <a href="tel:+923151773177" className="px-6 py-2.5 border border-primary text-primary text-sm tracking-wider rounded hover:bg-primary hover:text-primary-foreground transition-all">Call Now</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="rounded-xl overflow-hidden border border-border h-[500px] lg:h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.8!2d74.2325105!3d31.3689001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919ab499cd98c13%3A0x5428db0101be0aaa!2sRaiwind%20Rd%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000"
                  width="100%" height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Sevva Restaurant Location"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
