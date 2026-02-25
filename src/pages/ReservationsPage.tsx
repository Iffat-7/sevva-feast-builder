import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";
import InvitationCard from "@/components/InvitationCard";

const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/25980709/ucjc8a2/";

const generateReservationId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const part1 = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `SVA-${part1}-${part2}`;
};

const timeSlots = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
  "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
];

interface ConfirmedBooking {
  reservationId: string;
  name: string;
  date: string;
  time: string;
  guests: string;
  seating: string;
}

const ReservationsPage = () => {
  const { toast } = useToast();
  const [actionType, setActionType] = useState<"new" | "update" | "cancel">("new");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: "", time: "", guests: "",
    seating: "No preference", specialRequests: "", existingId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Error", description: "Please fill in required fields.", variant: "destructive" });
      return;
    }
    if (actionType === "new" && (!form.date || !form.time || !form.guests)) {
      toast({ title: "Error", description: "Please fill in date, time, and guest count.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    const reservationId = actionType === "new" ? generateReservationId() : form.existingId || generateReservationId();
    const now = new Date().toISOString();

    const payload = {
      reservation_id: reservationId, customer_name: form.name.trim(), phone: form.phone.trim(),
      email: form.email.trim() || "", reservation_date: form.date, reservation_time: form.time,
      guest_count: form.guests, seating_preference: form.seating,
      special_requests: form.specialRequests.trim(),
      status: actionType === "cancel" ? "cancelled" : actionType === "update" ? "updated" : "pending",
      action_source: "website", reservation_type: "dine-in",
      time_slot_key: form.time?.replace(/[: ]/g, "").toLowerCase() || "",
      capacity_used: parseInt(form.guests) || 0, table_assigned: "",
      confirmation_sent: false, confirmation_channel: "pending", handled_by: "website_form",
      change_reason: actionType !== "new" ? `${actionType} via website` : "",
      created_at: now, last_updated: now, customer_notes_internal: "", booking_confidence: "high",
    };

    try {
      await fetch(ZAPIER_WEBHOOK, { method: "POST", headers: { "Content-Type": "application/json" }, mode: "no-cors", body: JSON.stringify(payload) });

      if (actionType === "new") {
        setConfirmedBooking({
          reservationId, name: form.name.trim(), date: form.date,
          time: form.time, guests: form.guests, seating: form.seating,
        });
      }

      toast({
        title: actionType === "cancel" ? "Cancellation Sent" : "Reservation Submitted!",
        description: actionType === "cancel"
          ? "Your cancellation request has been sent."
          : `Reservation ID: ${reservationId}. We'll confirm via phone/WhatsApp.`,
      });

      setForm({ name: "", phone: "", email: "", date: "", time: "", guests: "", seating: "No preference", specialRequests: "", existingId: "" });
    } catch {
      toast({ title: "Error", description: "Failed to submit. Please try calling +92 315 177 3177.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main id="main-content">
      <PageHeader subtitle="Reservations" title="Book Your Table" description="Complete the form below to reserve your table at Sevva." />

      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          {/* Show invitation card if booking confirmed */}
          {confirmedBooking && (
            <div className="mb-12">
              <h3 className="text-2xl font-heading font-bold text-center mb-2">Your Invitation Card 🎉</h3>
              <p className="text-sm text-muted-foreground text-center mb-6">Download and share your beautiful invitation!</p>
              <InvitationCard
                reservationId={confirmedBooking.reservationId}
                customerName={confirmedBooking.name}
                date={confirmedBooking.date}
                time={confirmedBooking.time}
                guests={confirmedBooking.guests}
                seating={confirmedBooking.seating}
              />
              <div className="text-center mt-6">
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="text-sm text-primary hover:underline"
                >
                  Make Another Reservation
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          {!confirmedBooking && (
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 md:p-10">
              <div className="mb-8">
                <label className="block text-sm font-heading font-semibold mb-3">What would you like to do?</label>
                <div className="flex flex-wrap gap-4">
                  {([["new", "New Reservation"], ["update", "Update Existing"], ["cancel", "Cancel Reservation"]] as const).map(
                    ([value, label]) => (
                      <label key={value} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="actionType" checked={actionType === value} onChange={() => setActionType(value)} className="accent-[hsl(40,80%,50%)]" />
                        <span className="text-sm">{label}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <hr className="border-border mb-8" />

              {actionType !== "new" && (
                <div className="mb-6">
                  <label className="block text-sm text-primary font-medium mb-2">Reservation ID</label>
                  <input name="existingId" value={form.existingId} onChange={handleChange} placeholder="SVA-XXXXX-XXXX" className="w-full bg-muted text-foreground text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground" />
                </div>
              )}

              <h3 className="text-lg font-heading font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-primary font-medium mb-2">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required maxLength={100} className="w-full bg-muted text-foreground text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="block text-sm text-primary font-medium mb-2">Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 0000000" required maxLength={20} className="w-full bg-muted text-foreground text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground" />
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-sm text-primary font-medium mb-2">Email (Optional)</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" maxLength={255} className="w-full bg-muted text-foreground text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground" />
              </div>

              <hr className="border-border mb-8" />

              {actionType !== "cancel" && (
                <>
                  <h3 className="text-lg font-heading font-semibold mb-4">Reservation Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-primary font-medium mb-2">Reservation Date *</label>
                      <input name="date" type="date" value={form.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="w-full bg-muted text-foreground text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm text-primary font-medium mb-2">Reservation Time *</label>
                      <select name="time" value={form.time} onChange={handleChange} className="w-full bg-muted text-foreground text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-primary">
                        <option value="">Select time</option>
                        {timeSlots.map((t) => (<option key={t} value={t}>{t}</option>))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-primary font-medium mb-2">Number of Guests *</label>
                      <select name="guests" value={form.guests} onChange={handleChange} className="w-full bg-muted text-foreground text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-primary">
                        <option value="">Select guests</option>
                        {[1,2,3,4,5,6,7,8,9].map((n) => (<option key={n} value={String(n)}>{n} Guest{n > 1 ? "s" : ""}</option>))}
                        <option value="10+">10+ Guests</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-primary font-medium mb-2">Seating Preference</label>
                      <select name="seating" value={form.seating} onChange={handleChange} className="w-full bg-muted text-foreground text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-primary">
                        <option>No preference</option>
                        <option>Indoor</option>
                        <option>Outdoor</option>
                        <option>Private</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-8">
                    <label className="block text-sm text-primary font-medium mb-2">Special Requests (Optional)</label>
                    <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows={3} maxLength={1000} placeholder="Any special requirements..." className="w-full bg-muted text-foreground text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground resize-none" />
                  </div>
                </>
              )}

              <button type="submit" disabled={isLoading} className="w-full py-3.5 bg-gold-gradient text-primary-foreground font-body text-sm tracking-wider rounded hover:opacity-90 transition-opacity disabled:opacity-50">
                {isLoading ? "Submitting..." : actionType === "cancel" ? "Cancel Reservation" : actionType === "update" ? "Update Reservation" : "Confirm Reservation"}
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                This form submits a reservation request. Final confirmation will be provided by our team via phone or WhatsApp.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default ReservationsPage;
