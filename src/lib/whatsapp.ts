const WHATSAPP_NUMBER = "918826473158";

export function openWhatsApp(message: string) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
}

export function getWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function buildQuoteMessage(data: {
  name?: string;
  phone?: string;
  pickup?: string;
  destination?: string;
  date?: string;
  propertyType?: string;
  services?: string[];
  vehicleType?: string;
  additionalInfo?: string;
}) {
  const lines = [
    "Hi NorthArc Relocations!",
    "",
    "I'd like to request a moving estimate:",
    "",
  ];

  if (data.name) lines.push(`Name: ${data.name}`);
  if (data.phone) lines.push(`Phone: ${data.phone}`);
  if (data.pickup) lines.push(`Pickup: ${data.pickup}`);
  if (data.destination) lines.push(`Destination: ${data.destination}`);
  if (data.date) lines.push(`Preferred Date: ${data.date}`);
  if (data.propertyType) lines.push(`Property Type: ${data.propertyType}`);
  if (data.services?.length) lines.push(`Services: ${data.services.join(", ")}`);
  if (data.vehicleType && data.vehicleType !== "Not Applicable") {
    lines.push(`Vehicle: ${data.vehicleType}`);
  }
  if (data.additionalInfo) lines.push(`Notes: ${data.additionalInfo}`);
  lines.push("", "Please share a quote. Thank you!");

  return lines.join("\n");
}
