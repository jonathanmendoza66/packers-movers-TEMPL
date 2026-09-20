import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Clock,
  Headphones,
  IndianRupee,
  MapPin,
  Package,
  Phone,
  Mail,
  Shield,
  Star,
  Trophy,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import {
  useAnimateOnScroll,
  useCountUp,
} from "@/hooks/use-animate-on-scroll";
import {
  heroImages,
  services,
  packages,
  routePricing,
  reviews,
  stats,
  corporateClients,
  awards,
  galleryImages,
  faqData,
  faqDataHi,
} from "@/lib/data";
import { openWhatsApp, buildQuoteMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/* ═══════════════════════════════════════════════════════════════════════════
   1. HERO SECTION — Full-screen image carousel with Ken Burns zoom
   ═══════════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((prev) => (prev + 1) % heroImages.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Background images with cross-fade + Ken Burns */}
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover"
            style={{
              transform: i === current ? "scale(1.08)" : "scale(1)",
              transition: "transform 4s ease-in-out",
            }}
          />
        </div>
      ))}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <Badge
          variant="secondary"
          className="mb-6 bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
        >
          {t("hero.tagline")}
        </Badge>

        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl text-balance animate-fade-in-up">
          {t("hero.headline")}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl animate-fade-in-up">
          {t("hero.sub")}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90 animate-pulse-glow text-base px-8"
            onClick={() => openWhatsApp("Hi! I'd like a free moving estimate.")}
          >
            {t("hero.cta1")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 text-base px-8"
            asChild
          >
            <a href="tel:+911141872634">
              <Phone className="mr-2 h-4 w-4" />
              {t("hero.cta2")}
            </a>
          </Button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. MARQUEE TRUST STRIP
   ═══════════════════════════════════════════════════════════════════════════ */

function MarqueeTrustStrip() {
  const { t } = useI18n();
  const items = [
    t("marquee.homes"),
    t("marquee.cities"),
    t("marquee.satisfaction"),
    t("marquee.experience"),
    t("marquee.fleet"),
    t("marquee.corporate"),
    t("marquee.vehicles"),
  ];

  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-4 whitespace-nowrap">
      <span className="text-brand-accent">◆</span>
      <span>{item}</span>
    </span>
  ));

  return (
    <section className="overflow-hidden bg-primary py-3">
      <div className="flex animate-marquee">
        <div className="flex min-w-full shrink-0 items-center gap-4 px-4 text-sm font-medium text-primary-foreground">
          {content}
        </div>
        <div className="flex min-w-full shrink-0 items-center gap-4 px-4 text-sm font-medium text-primary-foreground">
          {content}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. QUICK QUOTE MINI-FORM
   ═══════════════════════════════════════════════════════════════════════════ */

function QuickQuoteSection() {
  const { t } = useI18n();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    propertyType: "",
    date: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = buildQuoteMessage({
      name: form.name,
      phone: form.phone,
      pickup: form.pickup,
      destination: form.destination,
      propertyType: form.propertyType,
      date: form.date,
    });
    openWhatsApp(msg);
  };

  const inputCls =
    "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <Card className="mx-auto max-w-4xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl font-bold">
              {t("quickQuote.title")}
            </CardTitle>
            <CardDescription>
              {t("quickQuote.pickup")} → {t("quickQuote.destination")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <input
                type="text"
                placeholder={t("quickQuote.name")}
                className={inputCls}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder={t("quickQuote.phone")}
                className={inputCls}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
              />
              <input
                type="text"
                placeholder={t("quickQuote.pickup")}
                className={inputCls}
                value={form.pickup}
                onChange={(e) => update("pickup", e.target.value)}
                required
              />
              <input
                type="text"
                placeholder={t("quickQuote.destination")}
                className={inputCls}
                value={form.destination}
                onChange={(e) => update("destination", e.target.value)}
                required
              />
              <select
                className={inputCls}
                value={form.propertyType}
                onChange={(e) => update("propertyType", e.target.value)}
                required
              >
                <option value="">{t("quickQuote.propertyType")}</option>
                {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa", "Office"].map(
                  (opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  )
                )}
              </select>
              <input
                type="date"
                placeholder={t("quickQuote.date")}
                className={inputCls}
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                required
              />
              <div className="sm:col-span-2 lg:col-span-3">
                <Button type="submit" size="lg" className="w-full text-base">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("quickQuote.submit")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. OUR SERVICES OVERVIEW
   ═══════════════════════════════════════════════════════════════════════════ */

function ServicesOverview() {
  const { t } = useI18n();
  const { ref, isInView } = useAnimateOnScroll();

  return (
    <section className="py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("services.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("services.subtitle")}
          </p>
        </div>

        <div
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {services
            .filter((s) => s.id !== "corporate")
            .slice(0, 6)
            .map((service) => (
            <Card
              key={service.id}
              className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={t(service.nameKey)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  {t(service.nameKey)}
                </Badge>
              </div>
              <CardContent className="pt-4">
                <h3 className="text-lg font-semibold">{t(service.nameKey)}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                  {t(service.descKey)}
                </p>
                <Link
                  to="/services"
                  className="mt-3 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  {t("services.learnMore")}
                  <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/services">
              {t("services.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. HOW IT WORKS — 10-Step Timeline
   ═══════════════════════════════════════════════════════════════════════════ */

function HowItWorks() {
  const { t } = useI18n();
  const { ref, isInView } = useAnimateOnScroll();
  const stepNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div ref={ref} className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("howItWorks.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        {/* Desktop: 2-row grid, 5 columns */}
        <div
          className={`hidden md:grid md:grid-cols-5 gap-6 transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {stepNumbers.map((n) => (
            <div key={n} className="relative flex flex-col items-center text-center">
              {/* Connector line */}
              {n !== 5 && n !== 10 && (
                <div className="absolute top-5 left-[calc(50%+20px)] h-0.5 w-[calc(100%-40px)] bg-border hidden md:block" />
              )}
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {n}
              </div>
              <h3 className="mt-3 text-sm font-semibold">{t(`step.${n}`)}</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {t(`step.${n}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical timeline */}
        <div
          className={`md:hidden space-y-0 transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {stepNumbers.map((n) => (
            <div key={n} className="relative flex gap-4 pb-8 last:pb-0">
              {/* Vertical line */}
              {n < 10 && (
                <div className="absolute left-5 top-10 h-[calc(100%-24px)] w-0.5 bg-border" />
              )}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {n}
              </div>
              <div className="pt-1.5">
                <h3 className="text-sm font-semibold">{t(`step.${n}`)}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t(`step.${n}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/services">
              {t("howItWorks.viewProcess")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. PRICING SNAPSHOT — 3 Package Cards
   ═══════════════════════════════════════════════════════════════════════════ */

function PricingSnapshot() {
  const { t } = useI18n();
  const { ref, isInView } = useAnimateOnScroll();

  return (
    <section className="py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("pricing.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div
          className={`grid gap-6 md:grid-cols-3 transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {packages.map((pkg) => {
            // Map data keys (packages.X.Y) → i18n keys (pricing.X.Y)
            const nameKey = `pricing.${pkg.id}.name`;
            const priceKey = `pricing.${pkg.id}.price`;
            // i18n has: essential f1-f4, protected f1-f4, complete f1-f5
            const featureCounts: Record<string, number> = {
              essential: 4,
              protected: 4,
              complete: 5,
            };
            const count = featureCounts[pkg.id] ?? pkg.features.length;
            const featureKeys = Array.from(
              { length: count },
              (_, i) => `pricing.${pkg.id}.f${i + 1}`
            );

            return (
              <Card
                key={pkg.id}
                className={`relative flex flex-col transition-shadow duration-300 hover:shadow-lg ${
                  pkg.popular
                    ? "border-primary shadow-md ring-2 ring-primary/20 md:-translate-y-2"
                    : ""
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-accent text-brand-accent-foreground px-3">
                    {t("pricing.popular")}
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{t(nameKey)}</CardTitle>
                  <div className="mt-2">
                    <span className="text-xs text-muted-foreground">
                      {t("pricing.startingAt")}
                    </span>
                    <span className="block text-3xl font-extrabold text-primary">
                      {t(priceKey)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex-1 space-y-2.5">
                    {featureKeys.map((fKey) => (
                      <li
                        key={fKey}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{t(fKey)}</span>
                      </li>
                    ))}
                  </ul>
                  <Separator className="my-4" />
                  <Button
                    className={`w-full ${
                      pkg.popular
                        ? "bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90"
                        : ""
                    }`}
                    onClick={() =>
                      openWhatsApp(
                        `Hi! I'm interested in the ${t(nameKey)} package.`
                      )
                    }
                  >
                    {t("pricing.getQuote")}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
          {t("pricing.note")}
        </p>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/pricing">
              {t("pricing.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. POPULAR ROUTES
   ═══════════════════════════════════════════════════════════════════════════ */

function PopularRoutes() {
  const { t } = useI18n();
  const { ref, isInView } = useAnimateOnScroll();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div ref={ref} className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("routes.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("routes.subtitle")}
          </p>
        </div>

        <div
          className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {routePricing.slice(0, 8).map((route, i) => (
            <Card
              key={i}
              className="transition-shadow duration-300 hover:shadow-md"
            >
              <CardContent className="flex flex-col gap-3 pt-5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{route.route}</span>
                  <Badge variant="secondary" className="text-xs">
                    {route.moveType}
                  </Badge>
                </div>
                <span className="text-xl font-bold text-primary">
                  {route.price}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    openWhatsApp(
                      `Hi! I need a quote for ${route.route} (${route.moveType}).`
                    )
                  }
                >
                  {t("routes.bookNow")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/pricing">
              {t("routes.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. SERVICE AREAS
   ═══════════════════════════════════════════════════════════════════════════ */

const serviceAreas = [
  { city: "Delhi", count: 28, type: "localities" as const },
  { city: "Gurugram", count: 15, type: "sectors" as const },
  { city: "Noida", count: 14, type: "sectors" as const },
  { city: "Ghaziabad", count: 8, type: "localities" as const },
  { city: "Faridabad", count: 8, type: "sectors" as const },
];

function ServiceAreas() {
  const { t } = useI18n();
  const { ref, isInView } = useAnimateOnScroll();

  return (
    <section className="py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("areas.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("areas.subtitle")}
          </p>
        </div>

        <div
          className={`grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {serviceAreas.map((area) => (
            <Card
              key={area.city}
              className="text-center transition-shadow duration-300 hover:shadow-md"
            >
              <CardContent className="flex flex-col items-center gap-2 pt-6 pb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold">{area.city}</h3>
                <p className="text-sm text-muted-foreground">
                  {area.count}{" "}
                  {area.type === "localities"
                    ? t("areas.localities")
                    : t("areas.sectors")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/locations">
              {t("areas.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   9. CUSTOMER REVIEWS CAROUSEL
   ═══════════════════════════════════════════════════════════════════════════ */

function ReviewsCarousel() {
  const { t } = useI18n();
  const { ref, isInView } = useAnimateOnScroll();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div ref={ref} className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("reviews.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("reviews.subtitle")}
          </p>
        </div>

        <div
          className={`flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ scrollbarWidth: "none" }}
        >
          {reviews.map((review, i) => (
            <Card
              key={i}
              className="min-w-[300px] w-[300px] md:min-w-[360px] md:w-[360px] shrink-0 snap-start"
            >
              <CardContent className="flex flex-col gap-3 pt-6">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${
                        s < Math.floor(review.rating)
                          ? "fill-brand-accent text-brand-accent"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  "{review.review}"
                </p>
                <div className="mt-auto pt-3 border-t border-border">
                  <p className="font-semibold text-sm">{review.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/about">
              {t("reviews.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   10. WHY CHOOSE NORTHARC + Stats Counters
   ═══════════════════════════════════════════════════════════════════════════ */

const whyFeatures = [
  { key: "gps", icon: MapPin },
  { key: "packing", icon: Package },
  { key: "support", icon: Clock },
  { key: "dedicated", icon: Headphones },
  { key: "transparent", icon: IndianRupee },
  { key: "insured", icon: Shield },
] as const;

function StatCounter({
  stat,
  enabled,
  lang,
}: {
  stat: (typeof stats)[0];
  enabled: boolean;
  lang: string;
}) {
  const count = useCountUp({ end: stat.value, enabled });
  return (
    <div className="text-center">
      <span className="block text-3xl font-extrabold text-primary lg:text-4xl">
        {count.toLocaleString()}+
      </span>
      <span className="mt-1 text-sm text-muted-foreground">
        {lang === "hi" ? stat.labelHi : stat.labelEn}
      </span>
    </div>
  );
}

function WhyChooseSection() {
  const { t, lang } = useI18n();
  const { ref, isInView } = useAnimateOnScroll();
  const { ref: statsRef, isInView: statsVisible } = useAnimateOnScroll();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("whyChoose.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("whyChoose.subtitle")}
          </p>
        </div>

        {/* Feature cards */}
        <div
          ref={ref}
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {whyFeatures.map(({ key, icon: Icon }) => (
            <Card key={key} className="transition-shadow hover:shadow-md">
              <CardContent className="flex gap-4 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t(`whyChoose.${key}`)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`whyChoose.${key}.desc`)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Animated Stats counters */}
        <div
          ref={statsRef}
          className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {stats.slice(0, 4).map((stat, i) => (
            <StatCounter key={i} stat={stat} enabled={statsVisible} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   11. CORPORATE CLIENTS MARQUEE
   ═══════════════════════════════════════════════════════════════════════════ */

function CorporateClientsSection() {
  const { t } = useI18n();

  const badgeList = corporateClients.map((name, i) => (
    <Badge
      key={i}
      variant="secondary"
      className="whitespace-nowrap px-4 py-2 text-sm"
    >
      {name}
    </Badge>
  ));

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("corporate.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("corporate.subtitle")}
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="flex animate-marquee">
            <div className="flex min-w-full shrink-0 items-center justify-around gap-4 px-4">
              {badgeList}
            </div>
            <div className="flex min-w-full shrink-0 items-center justify-around gap-4 px-4">
              {badgeList}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/about">
              {t("corporate.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   12. AWARDS SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

function AwardsSection() {
  const { t, lang } = useI18n();
  const { ref, isInView } = useAnimateOnScroll();

  return (
    <section className="py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("awards.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("awards.subtitle")}
          </p>
        </div>

        <div
          className={`grid gap-6 md:grid-cols-3 transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {awards.map((award) => (
            <Card key={award.year} className="text-center">
              <CardContent className="flex flex-col items-center gap-3 pt-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent/15">
                  <Trophy className="h-6 w-6 text-brand-accent" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {award.year}
                </Badge>
                <p className="font-semibold text-sm leading-snug">
                  {lang === "hi" ? award.titleHi : award.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   13. GALLERY PREVIEW
   ═══════════════════════════════════════════════════════════════════════════ */

function GalleryPreview() {
  const { t, lang } = useI18n();
  const { ref, isInView } = useAnimateOnScroll();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div ref={ref} className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("gallery.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("gallery.subtitle")}
          </p>
        </div>

        <div
          className={`grid gap-4 grid-cols-2 md:grid-cols-3 transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {galleryImages.slice(0, 6).map((img, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <img
                src={img.src}
                alt={lang === "hi" ? img.altHi : img.altEn}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="p-3 text-sm font-medium text-white">
                  {lang === "hi" ? img.altHi : img.altEn}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/gallery">
              {t("gallery.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   14. SEASONAL OFFER BANNER
   ═══════════════════════════════════════════════════════════════════════════ */

function SeasonalOfferBanner() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-6 py-12 text-center text-primary-foreground md:px-16 md:py-16">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5" />

          <div className="relative z-10">
            <Badge className="mb-4 bg-brand-accent text-brand-accent-foreground">
              🎉 {t("offer.title")}
            </Badge>
            <h2 className="text-2xl font-bold md:text-4xl">
              {t("offer.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85 md:text-lg">
              {t("offer.desc")}
            </p>
            <Button
              size="lg"
              className="mt-8 bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90 text-base px-8"
              onClick={() =>
                openWhatsApp(
                  "I'd like to know about the weekday packing discount."
                )
              }
            >
              {t("offer.cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   15. FAQ PREVIEW
   ═══════════════════════════════════════════════════════════════════════════ */

function FaqPreview() {
  const { t, lang } = useI18n();
  const faqs = lang === "hi" ? faqDataHi : faqData;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("faq.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible>
            {faqs.slice(0, 5).map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/faq">
              {t("faq.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   16. CONTACT SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

function ContactSection() {
  const { t } = useI18n();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    date: "",
    propertyType: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = buildQuoteMessage({
      name: form.name,
      phone: form.phone,
      pickup: form.pickup,
      destination: form.destination,
      date: form.date,
      propertyType: form.propertyType,
    });
    openWhatsApp(msg);
  };

  const inputCls =
    "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("contact.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Contact info */}
          <div className="space-y-4">
            <Card>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    {t("contact.headOffice")}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    New Delhi, India
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{t("contact.callUs")}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    +91 11 4187 2634
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    {t("contact.emailUs")}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    info@northarc.in
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    {t("contact.workingHours")}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {t("contact.monSat")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("contact.sun")}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild>
                <a href="tel:+911141872634">
                  <Phone className="mr-2 h-4 w-4" />
                  {t("contact.callUs")}
                </a>
              </Button>
              <Button
                className="bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90"
                onClick={() => openWhatsApp("Hi! I have a question.")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {t("contact.whatsapp")}
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:info@northarc.in">
                  <Mail className="mr-2 h-4 w-4" />
                  {t("contact.emailUs")}
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Compact quote form */}
          <Card>
            <CardHeader>
              <CardTitle>{t("contact.form.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder={t("contact.form.name")}
                  className={inputCls}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder={t("contact.form.phone")}
                  className={inputCls}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  required
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder={t("contact.form.pickup")}
                    className={inputCls}
                    value={form.pickup}
                    onChange={(e) => update("pickup", e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder={t("contact.form.destination")}
                    className={inputCls}
                    value={form.destination}
                    onChange={(e) => update("destination", e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    className={inputCls}
                    value={form.propertyType}
                    onChange={(e) => update("propertyType", e.target.value)}
                    required
                  >
                    <option value="">
                      {t("contact.form.propertyType")}
                    </option>
                    {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa", "Office"].map(
                      (opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      )
                    )}
                  </select>
                  <input
                    type="date"
                    placeholder={t("contact.form.date")}
                    className={inputCls}
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full text-base">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("contact.form.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeTrustStrip />
      <QuickQuoteSection />
      <ServicesOverview />
      <HowItWorks />
      <PricingSnapshot />
      <PopularRoutes />
      <ServiceAreas />
      <ReviewsCarousel />
      <WhyChooseSection />
      <CorporateClientsSection />
      <AwardsSection />
      <GalleryPreview />
      <SeasonalOfferBanner />
      <FaqPreview />
      <ContactSection />
    </>
  );
}
