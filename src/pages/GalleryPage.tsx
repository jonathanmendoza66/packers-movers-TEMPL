import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { galleryImages } from "@/lib/data";
import { openWhatsApp } from "@/lib/whatsapp";
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";

const CATEGORIES = [
  { key: "all", labelKey: "gallery.all" },
  { key: "packing", labelKey: "gallery.packing" },
  { key: "loading", labelKey: "gallery.loading" },
  { key: "transport", labelKey: "gallery.transport" },
  { key: "storage", labelKey: "gallery.storage" },
  { key: "vehicles", labelKey: "gallery.vehicles" },
];

export default function GalleryPage() {
  const { t, lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const heroAnim = useAnimateOnScroll();
  const gridAnim = useAnimateOnScroll();
  const ctaAnim = useAnimateOnScroll();

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const lightboxImage =
    lightboxIdx !== null ? filteredImages[lightboxIdx] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-primary bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 md:py-28">
        <div
          ref={heroAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 text-center transition-all duration-700 ${
            heroAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t("gallery.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            {t("gallery.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ─── Filter Tabs ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div
          ref={gridAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            gridAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATEGORIES.map(({ key, labelKey }) => (
              <Button
                key={key}
                variant={activeCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setActiveCategory(key);
                  setLightboxIdx(null);
                }}
              >
                {t(labelKey)}
              </Button>
            ))}
          </div>

          {/* ─── Image Grid ─────────────────────────────────────────── */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredImages.map((image, idx) => (
              <div
                key={image.src + image.category}
                className="break-inside-avoid rounded-lg overflow-hidden group cursor-pointer relative"
                onClick={() => setLightboxIdx(idx)}
              >
                <img
                  src={image.src}
                  alt={lang === "hi" ? image.altHi : image.altEn}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <p className="text-white text-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                    {lang === "hi" ? image.altHi : image.altEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Lightbox ─────────────────────────────────────────────────── */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx(null);
            }}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage.src}
            alt={lang === "hi" ? lightboxImage.altHi : lightboxImage.altEn}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div
          ref={ctaAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 text-center transition-all duration-700 ${
            ctaAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t("nav.getQuote")}
          </h2>
          <Button
            size="lg"
            onClick={() =>
              openWhatsApp(
                "Hi NorthArc! I'd like a free moving estimate. Please share details."
              )
            }
            className="gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            {t("nav.getQuote")}
          </Button>
        </div>
      </section>
    </div>
  );
}
