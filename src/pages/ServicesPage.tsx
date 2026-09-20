import { useI18n } from "@/lib/i18n";
import { openWhatsApp } from "@/lib/whatsapp";
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  MapPin,
  Package,
  Truck,
  Warehouse,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Phone,
  Shield,
  Clock,
  Cctv,
  Lock,
  Bug,
  Flame,
  Thermometer,
  Box,
} from "lucide-react";
import type { ReactNode } from "react";

/* ─── Animated Section Wrapper ───────────────────────────────────────────── */

function AnimatedSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, isInView } = useAnimateOnScroll();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Service Section (alternating image/content) ────────────────────────── */

interface ServiceSectionProps {
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  title: string;
  description: string;
  children: ReactNode;
  onBook: () => void;
  bookLabel: string;
  bgClass?: string;
}

function ServiceSection({
  image,
  imageAlt,
  imagePosition,
  title,
  description,
  children,
  onBook,
  bookLabel,
  bgClass = "",
}: ServiceSectionProps) {
  const { ref, isInView } = useAnimateOnScroll();

  const imageBlock = (
    <div className="overflow-hidden rounded-2xl">
      <img
        src={image}
        alt={imageAlt}
        className="h-full w-full object-cover aspect-[4/3]"
        loading="lazy"
      />
    </div>
  );

  const contentBlock = (
    <div className="flex flex-col justify-center gap-5">
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      {children}
      <div>
        <Button size="lg" onClick={onBook} className="gap-2">
          <MessageCircle className="h-4 w-4" />
          {bookLabel}
        </Button>
      </div>
    </div>
  );

  return (
    <section className={bgClass}>
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 py-16 md:py-20 transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {imagePosition === "left" ? (
            <>
              {imageBlock}
              {contentBlock}
            </>
          ) : (
            <>
              {contentBlock}
              {imageBlock}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Checklist Item ─────────────────────────────────────────────────────── */

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <span className="text-sm text-foreground">{text}</span>
    </li>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ─── ServicesPage ────────────────────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════════════════ */

export default function ServicesPage() {
  const { t } = useI18n();

  const bookService = (serviceName: string) =>
    openWhatsApp(
      `Hi NorthArc! I'm interested in your ${serviceName} service. Please share details and a quote.`
    );

  return (
    <main className="min-h-screen bg-background">
      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary-foreground md:text-5xl">
            {t("services.hero.title")}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
            {t("services.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ── 2. Household Shifting ────────────────────────────────────────── */}
      <ServiceSection
        image="/service-packing.webp"
        imageAlt="Household shifting service"
        imagePosition="left"
        title={t("services.household.name")}
        description={t("services.household.desc")}
        onBook={() => bookService("Household Shifting")}
        bookLabel={t("services.bookNow")}
      >
        <ul className="grid grid-cols-2 gap-2">
          {[
            "1 BHK",
            "1.5 BHK",
            "2 BHK",
            "2.5 BHK",
            "3 BHK",
            "3.5 BHK",
            "4 BHK",
            "4+ BHK",
            "Villa / Independent House",
            "Duplex / Penthouse",
          ].map((item) => (
            <CheckItem key={item} text={item} />
          ))}
        </ul>
      </ServiceSection>

      {/* ── 3. Local Shifting ────────────────────────────────────────────── */}
      <ServiceSection
        image="/service-household.webp"
        imageAlt="Local shifting within Delhi NCR"
        imagePosition="right"
        title={t("services.local.name")}
        description={t("services.local.desc")}
        onBook={() => bookService("Local Shifting")}
        bookLabel={t("services.bookNow")}
        bgClass="bg-muted/40"
      >
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            "Within same locality",
            "Across Delhi zones",
            "Delhi to Gurugram",
            "Delhi to Noida",
            "Delhi to Ghaziabad",
            "Delhi to Faridabad",
            "Gurugram to Noida",
            "Noida to Ghaziabad",
          ].map((item) => (
            <CheckItem key={item} text={item} />
          ))}
        </ul>
      </ServiceSection>

      {/* ── 4. Intercity Relocation ──────────────────────────────────────── */}
      <ServiceSection
        image="/hero-truck.webp"
        imageAlt="Intercity relocation truck"
        imagePosition="left"
        title={t("services.intercity.name")}
        description={t("services.intercity.desc")}
        onBook={() => bookService("Intercity Relocation")}
        bookLabel={t("services.bookNow")}
      >
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {[
              "Delhi → Jaipur",
              "Delhi → Chandigarh",
              "Delhi → Lucknow",
              "Delhi → Dehradun",
              "Delhi → Mumbai",
              "Delhi → Pune",
              "Delhi → Bengaluru",
              "Delhi → Hyderabad",
              "Delhi → Chennai",
              "Delhi → Kolkata",
              "Delhi → Ahmedabad",
              "Delhi → Indore",
            ].map((route) => (
              <Badge key={route} variant="secondary" className="text-xs">
                {route}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Complete door-to-door service — packing at origin, safe
            transportation, and unpacking at destination.
          </p>
        </div>
      </ServiceSection>

      {/* ── 5. Office Relocation ─────────────────────────────────────────── */}
      <ServiceSection
        image="/service-office.webp"
        imageAlt="Office relocation"
        imagePosition="right"
        title={t("services.office.name")}
        description={t("services.office.desc")}
        onBook={() => bookService("Office Relocation")}
        bookLabel={t("services.bookNow")}
        bgClass="bg-muted/40"
      >
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            "Startups & Co-working",
            "Corporate Offices",
            "Retail Stores",
            "Clinics & Labs",
            "Studios & Agencies",
            "Educational Institutes",
          ].map((item) => (
            <CheckItem key={item} text={item} />
          ))}
        </ul>
      </ServiceSection>

      {/* ── 6. Vehicle Transportation ────────────────────────────────────── */}
      <ServiceSection
        image="/service-vehicle.webp"
        imageAlt="Vehicle transportation"
        imagePosition="left"
        title={t("services.vehicle.name")}
        description={t("services.vehicle.desc")}
        onBook={() => bookService("Vehicle Transportation")}
        bookLabel={t("services.bookNow")}
      >
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            "Sedan / Hatchback",
            "SUV / MUV",
            "Luxury Cars",
            "Motorcycles",
            "Scooters / Mopeds",
            "Vintage / Classic Vehicles",
          ].map((item) => (
            <CheckItem key={item} text={item} />
          ))}
        </ul>
      </ServiceSection>

      {/* ── 7. Professional Packing ──────────────────────────────────────── */}
      <section className="bg-muted/40">
        <AnimatedSection className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("services.packing.name")}
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">
              {t("services.packing.desc")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Standard Materials */}
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  Standard Materials
                </h3>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    "5-ply cartons",
                    "Corrugated sheets",
                    "Bubble wrap",
                    "Stretch film",
                    "Foam sheets",
                    "Thermocol",
                    "Furniture blankets",
                    "Plastic crates",
                    "Sealing tape",
                    "Edge protectors",
                    "Mattress covers",
                    "Sofa covers",
                    "TV boxes",
                  ].map((item) => (
                    <CheckItem key={item} text={item} />
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Specialized Materials */}
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  Specialized Materials
                </h3>
                <ul className="grid grid-cols-1 gap-2">
                  {[
                    "Dish-pack cartons",
                    "Glass cell kits",
                    "Wardrobe cartons",
                    "Mirror protection boxes",
                    "LED TV cartons",
                    "Appliance protection wraps",
                    "Custom wooden crates",
                  ].map((item) => (
                    <CheckItem key={item} text={item} />
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Button
              size="lg"
              onClick={() => bookService("Professional Packing")}
              className="gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              {t("services.bookNow")}
            </Button>
          </div>
        </AnimatedSection>
      </section>

      {/* ── 8. Loading & Unloading ───────────────────────────────────────── */}
      <ServiceSection
        image="/service-loading.webp"
        imageAlt="Loading and unloading team"
        imagePosition="left"
        title={t("services.loading.name")}
        description={t("services.loading.desc")}
        onBook={() => bookService("Loading & Unloading")}
        bookLabel={t("services.bookNow")}
      >
        <ul className="grid grid-cols-1 gap-2">
          {[
            "Trained 4–8 member crews",
            "Floor protection during moves",
            "Heavy item handling (200+ kg)",
            "Narrow staircase navigation",
            "Lift coordination for high-rises",
            "Same-day & next-day availability",
          ].map((item) => (
            <CheckItem key={item} text={item} />
          ))}
        </ul>
      </ServiceSection>

      {/* ── 9. Storage ───────────────────────────────────────────────────── */}
      <ServiceSection
        image="/service-storage.webp"
        imageAlt="Secure storage facility"
        imagePosition="right"
        title={t("services.storage.name")}
        description={t("services.storage.desc")}
        onBook={() => bookService("Storage")}
        bookLabel={t("services.bookNow")}
        bgClass="bg-muted/40"
      >
        <div className="space-y-4">
          {/* Warehouse features grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { icon: Warehouse, label: "18,000 sq ft facility" },
              { icon: Cctv, label: "24/7 CCTV monitoring" },
              { icon: Lock, label: "Controlled access" },
              { icon: Bug, label: "Regular pest control" },
              { icon: Flame, label: "Fire safety systems" },
              { icon: Thermometer, label: "Climate considerations" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-lg bg-background p-2"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs text-foreground">{label}</span>
              </div>
            ))}
          </div>

          <Separator />

          {/* Storage options */}
          <ul className="space-y-1">
            {[
              "Short-term (1–3 months)",
              "Long-term (3+ months)",
              "Per-item billing available",
            ].map((item) => (
              <CheckItem key={item} text={item} />
            ))}
          </ul>
        </div>
      </ServiceSection>

      {/* ── 10. Furniture Handling ────────────────────────────────────────── */}
      <ServiceSection
        image="/service-furniture.webp"
        imageAlt="Furniture handling and assembly"
        imagePosition="left"
        title={t("services.furniture.name")}
        description={t("services.furniture.desc")}
        onBook={() => bookService("Furniture Handling")}
        bookLabel={t("services.bookNow")}
      >
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            "Beds & Cots",
            "Wardrobes & Almirahs",
            "Dining Tables & Chairs",
            "Study / Office Desks",
            "Bookshelves & Display Units",
            "Modular Kitchen Units",
            "Sofa Sets",
            "TV Units & Entertainment Centers",
          ].map((item) => (
            <CheckItem key={item} text={item} />
          ))}
        </ul>
      </ServiceSection>

      {/* ── 11. 10-Step Process ──────────────────────────────────────────── */}
      <section className="bg-muted/40">
        <AnimatedSection className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("howItWorks.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("howItWorks.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: 10 }, (_, i) => {
              const step = i + 1;
              const icons = [
                MessageCircle,
                CheckCircle,
                ArrowRight,
                Clock,
                Package,
                Truck,
                MapPin,
                Box,
                Home,
                Shield,
              ];
              const StepIcon = icons[i];
              return (
                <div
                  key={step}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Connector line (hidden on first of each row) */}
                  {i > 0 && (
                    <div className="absolute -left-3 top-6 hidden h-0.5 w-6 bg-primary/20 lg:block" />
                  )}

                  {/* Step number circle */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-md">
                    {step}
                  </div>

                  {/* Step icon */}
                  <StepIcon className="mt-3 h-5 w-5 text-primary/70" />

                  {/* Step name */}
                  <h3 className="mt-2 text-sm font-semibold text-foreground">
                    {t(`step.${step}`)}
                  </h3>

                  {/* Step description */}
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {t(`step.${step}.desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </section>

      {/* ── 12. CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-16 md:py-20">
        <AnimatedSection className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Ready to Move?
          </h2>
          <p className="mt-4 text-primary-foreground/80 md:text-lg">
            Let us handle the heavy lifting. Get a free, no-obligation estimate
            for your upcoming relocation.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 text-base"
              onClick={() =>
                openWhatsApp(
                  "Hi NorthArc! I'd like to book a relocation service. Please share details."
                )
              }
            >
              <MessageCircle className="h-5 w-5" />
              {t("common.whatsappNow")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base"
              asChild
            >
              <a href="tel:+918826473158">
                <Phone className="h-5 w-5" />
                Talk to an Expert
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
