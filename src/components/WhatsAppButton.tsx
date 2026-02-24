import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/923151773177?text=Hi!%20I%27d%20like%20to%20make%20a%20reservation%20at%20Sevva%20Restaurant."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} className="text-[hsl(0,0%,100%)]" />
    </a>
  );
};

export default WhatsAppButton;
