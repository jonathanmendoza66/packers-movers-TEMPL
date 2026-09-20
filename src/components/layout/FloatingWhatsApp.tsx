import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918826473158?text=Hi%20NorthArc!%20I%27d%20like%20a%20free%20moving%20estimate."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 animate-pulse-glow lg:bottom-6"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
