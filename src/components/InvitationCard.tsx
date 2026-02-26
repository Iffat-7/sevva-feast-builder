import { useRef } from "react";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";

interface InvitationCardProps {
  reservationId: string;
  customerName: string;
  date: string;
  time: string;
  guests: string;
  seating: string;
}

const InvitationCard = ({ reservationId, customerName, date, time, guests, seating }: InvitationCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: "#1a1510" });
      const link = document.createElement("a");
      link.download = `sevva-invitation-${reservationId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    }
  };

  const formattedDate = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <div className="space-y-4">
      {/* Card Preview */}
      <div
        ref={cardRef}
        className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(135deg, hsl(30, 20%, 10%) 0%, hsl(35, 25%, 8%) 50%, hsl(30, 20%, 10%) 100%)",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {/* Islamic geometric border pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, hsl(40, 80%, 50%) 20px, hsl(40, 80%, 50%) 21px),
              repeating-linear-gradient(-45deg, transparent, transparent 20px, hsl(40, 80%, 50%) 20px, hsl(40, 80%, 50%) 21px)`,
          }}
        />

        {/* Gold corner ornaments */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: "hsl(40, 80%, 50%)" }} />
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 rounded-tr-2xl" style={{ borderColor: "hsl(40, 80%, 50%)" }} />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 rounded-bl-2xl" style={{ borderColor: "hsl(40, 80%, 50%)" }} />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: "hsl(40, 80%, 50%)" }} />

        <div className="relative z-10 p-8 text-center">
          {/* Bismillah */}
          <p className="text-lg mb-1" style={{ color: "hsl(40, 80%, 50%)", fontFamily: "'Playfair Display', serif" }}>
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, hsl(40, 80%, 50%))" }} />
            <span style={{ color: "hsl(40, 80%, 50%)" }}>✦</span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, hsl(40, 80%, 50%))" }} />
          </div>

          {/* Restaurant name */}
          <h2 className="text-3xl tracking-[0.3em] font-bold mb-1" style={{ color: "hsl(40, 80%, 50%)" }}>
            SEVVA
          </h2>
          <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "hsl(40, 60%, 60%)" }}>
            Restaurant & Fine Dining
          </p>

          {/* Invitation text */}
          <p className="text-sm mb-1" style={{ color: "hsl(40, 30%, 75%)" }}>
            You are cordially invited
          </p>
          <p className="text-xs mb-6" style={{ color: "hsl(40, 20%, 55%)" }}>
            آپ کو دعوت دی جاتی ہے
          </p>

          {/* Guest Name */}
          <p className="text-2xl italic font-bold mb-6" style={{ color: "hsl(0, 0%, 95%)" }}>
            {customerName || "Honored Guest"}
          </p>

          {/* Details */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center px-4 py-2 rounded-lg" style={{ background: "hsla(40, 80%, 50%, 0.08)" }}>
              <span className="text-xs uppercase tracking-wider" style={{ color: "hsl(40, 60%, 60%)" }}>Date</span>
              <span className="text-sm font-semibold" style={{ color: "hsl(0, 0%, 90%)" }}>{formattedDate || "—"}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2 rounded-lg" style={{ background: "hsla(40, 80%, 50%, 0.08)" }}>
              <span className="text-xs uppercase tracking-wider" style={{ color: "hsl(40, 60%, 60%)" }}>Time</span>
              <span className="text-sm font-semibold" style={{ color: "hsl(0, 0%, 90%)" }}>{time || "—"}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2 rounded-lg" style={{ background: "hsla(40, 80%, 50%, 0.08)" }}>
              <span className="text-xs uppercase tracking-wider" style={{ color: "hsl(40, 60%, 60%)" }}>Guests</span>
              <span className="text-sm font-semibold" style={{ color: "hsl(0, 0%, 90%)" }}>{guests || "—"}</span>
            </div>
            {seating !== "No preference" && (
              <div className="flex justify-between items-center px-4 py-2 rounded-lg" style={{ background: "hsla(40, 80%, 50%, 0.08)" }}>
                <span className="text-xs uppercase tracking-wider" style={{ color: "hsl(40, 60%, 60%)" }}>Seating</span>
                <span className="text-sm font-semibold" style={{ color: "hsl(0, 0%, 90%)" }}>{seating}</span>
              </div>
            )}
          </div>

          {/* Reservation ID */}
          <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ border: "1px solid hsl(40, 80%, 50%, 0.3)", background: "hsla(40, 80%, 50%, 0.05)" }}>
            <p className="text-xs tracking-wider" style={{ color: "hsl(40, 80%, 50%)" }}>
              Reservation ID: {reservationId}
            </p>
          </div>

          {/* Address */}
          <p className="text-xs leading-relaxed mb-4" style={{ color: "hsl(40, 20%, 55%)" }}>
            Adda Plot Roundabout, Raiwind Road,<br />
            near Lake City, Lahore, Pakistan<br />
            📞 +92 315 177 3177
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, hsl(40, 80%, 50%, 0.4))" }} />
            <span className="text-xs" style={{ color: "hsl(40, 60%, 50%)" }}>✦</span>
            <div className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, hsl(40, 80%, 50%, 0.4))" }} />
          </div>

          {/* Branding */}
          <p className="text-[10px] tracking-wider" style={{ color: "hsl(40, 20%, 40%)" }}>
            Powered by <span style={{ color: "hsl(40, 60%, 55%)" }}>Lumina Digital Agency</span>
          </p>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="w-full max-w-md mx-auto flex items-center justify-center gap-2 px-6 py-3 bg-gold-gradient text-primary-foreground text-sm tracking-wider rounded-lg hover:opacity-90 transition-opacity"
      >
        <Download size={16} />
        Download Invitation Card
      </button>
    </div>
  );
};

export default InvitationCard;
