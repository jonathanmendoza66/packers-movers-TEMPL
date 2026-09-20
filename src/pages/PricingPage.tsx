import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { openWhatsApp } from "@/lib/whatsapp";
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";
import { packages, servicePricing, routePricing } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Check,
  Star,
  MessageCircle,
  Calculator,
  Info,
  Sparkles,
  BadgePercent,
  Phone,
  Package,
  MapPin,
  Building2,
  Truck,
  ArrowUpDown,
  CalendarDays,
  ShieldCheck,
  Weight,
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

/* ─── Price Estimator Matrix ─────────────────────────────────────────────── */

const priceMatrix: Record<string, Record<string, string>> = {
  "1 BHK": {
    "Local NCR": "₹3,499 – ₹5,999",
    "North India": "₹8,999 – ₹13,999",
    "West India": "₹18,999 – ₹24,999",
    "South India": "₹20,999 – ₹27,999",
    "East India": "₹19,999 – ₹26,999",
  },
  "2 BHK": {
    "Local NCR": "₹5,499 – ₹8,999",
    "North India": "₹10,999 – ₹16,999",
    "West India": "₹22,999 – ₹29,999",
    "South India": "₹24,999 – ₹32,999",
    "East India": "₹23,999 – ₹30,999",
  },
  "3 BHK": {
    "Local NCR": "₹7,499 – ₹12,999",
    "North India": "₹14,999 – ₹21,999",
    "West India": "₹28,999 – ₹38,999",
    "South India": "₹30,999 – ₹42,999",
    "East India": "₹29,999 – ₹39,999",
  },
  "4 BHK": {
    "Local NCR": "₹10,499 – ₹17,999",
    "North India": "₹19,999 – ₹28,999",
    "West India": "₹35,999 – ₹48,999",
    "South India": "₹38,999 – ₹52,999",
    "East India": "₹36,999 – ₹49,999",
  },
  Villa: {
    "Local NCR": "₹14,999 – ₹24,999",
    "North India": "₹25,999 – ₹38,999",
    "West India": "₹42,999 – ₹59,999",
    "South India": "₹45,999 – ₹64,999",
    "East India": "₹43,999 – ₹59,999",
  },
  Office: {
    "Local NCR": "₹6,999 – ₹14,999",
    "North India": "₹15,999 – ₹26,999",
    "West India": "₹30,999 – ₹44,999",
    "South India": "₹32,999 – ₹48,999",
    "East India": "₹31,999 – ₹45,999",
  },
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ─── PricingPage ────────────────────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════════════════ */

export default function PricingPage() {
  const { t } = useI18n();
  const [propertyType, setPropertyType] = useState("");
  const [destination, setDestination] = useState("");

  const estimatedRange =
    propertyType && destination
      ? priceMatrix[propertyType]?.[destination] ?? null
      : null;

  return (
    <main className="min-h-screen bg-background">
      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary-foreground md:text-5xl">
            {t("pricing.hero.title")}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
            {t("pricing.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ── 2. Package Comparison ────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <AnimatedSection className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("pricing.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("pricing.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl transition-shadow duration-300 hover:shadow-lg ${
                  pkg.popular
                    ? "ring-2 ring-primary shadow-lg md:scale-105"
                    : "border"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="gap-1 bg-primary text-primary-foreground shadow-md">
                      <Star className="h-3 w-3" />
                      {t("pricing.popular")}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-2 pt-8 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t("pricing.startingAt")}
                  </p>
                  <CardTitle className="mt-1 text-3xl font-extrabold text-foreground md:text-4xl">
                    {t(pkg.priceKey)}
                  </CardTitle>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {t(pkg.nameKey)}
                  </p>
                </CardHeader>

                <Separator className="mx-6" />

                <CardContent className="flex flex-1 flex-col gap-6 p-6">
                  <ul className="flex-1 space-y-3">
                    {pkg.features.map((featureKey) => (
                      <li key={featureKey} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span className="text-sm text-foreground">
                          {t(featureKey)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className="w-full gap-2"
                    variant={pkg.popular ? "default" : "outline"}
                    onClick={() =>
                      openWhatsApp(
                        `Hi NorthArc! I'm interested in the ${t(pkg.nameKey)} package (${t(pkg.priceKey)}). Please share details and a quote.`
                      )
                    }
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t("pricing.getQuote")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── 3. Service-Wise Pricing Table ────────────────────────────────── */}
      <section className="bg-muted/40 py-16 md:py-20">
        <AnimatedSection className="mx-auto max-w-4xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("pricing.serviceWise")}
            </h2>
          </div>

          <Card className="overflow-hidden rounded-2xl">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Service</TableHead>
                    <TableHead className="text-right font-semibold">
                      Starting Price
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servicePricing.map((item, idx) => (
                    <TableRow
                      key={item.service}
                      className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}
                    >
                      <TableCell className="font-medium">
                        {item.service}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        {item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </AnimatedSection>
      </section>

      {/* ── 4. Route-Wise Pricing Table ──────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <AnimatedSection className="mx-auto max-w-4xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("pricing.routeWise")}
            </h2>
          </div>

          <Card className="overflow-hidden rounded-2xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Route</TableHead>
                      <TableHead className="font-semibold">Move Type</TableHead>
                      <TableHead className="text-right font-semibold">
                        Starting Price
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routePricing.map((item, idx) => (
                      <TableRow
                        key={item.route + item.moveType}
                        className={
                          idx % 2 === 0 ? "bg-background" : "bg-muted/20"
                        }
                      >
                        <TableCell className="font-medium">
                          {item.route}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            {item.moveType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-primary">
                          {item.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </section>

      {/* ── 5. Quick Estimator ───────────────────────────────────────────── */}
      <section className="bg-muted/40 py-16 md:py-20">
        <AnimatedSection className="mx-auto max-w-3xl px-4">
          <Card className="rounded-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">
                {t("pricing.calculator")}
              </CardTitle>
              <p className="text-muted-foreground">
                {t("pricing.calculator.desc")}
              </p>
            </CardHeader>

            <CardContent className="space-y-6 px-6 pb-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Property Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Property Type
                  </label>
                  <NativeSelect
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full"
                  >
                    <NativeSelectOption value="">
                      {t("common.selectOption")}
                    </NativeSelectOption>
                    {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa", "Office"].map(
                      (opt) => (
                        <NativeSelectOption key={opt} value={opt}>
                          {opt}
                        </NativeSelectOption>
                      )
                    )}
                  </NativeSelect>
                </div>

                {/* Destination Region */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Destination Region
                  </label>
                  <NativeSelect
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full"
                  >
                    <NativeSelectOption value="">
                      {t("common.selectOption")}
                    </NativeSelectOption>
                    {[
                      "Local NCR",
                      "North India",
                      "West India",
                      "South India",
                      "East India",
                    ].map((opt) => (
                      <NativeSelectOption key={opt} value={opt}>
                        {opt}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>
              </div>

              {/* Estimated Range Display */}
              {estimatedRange && (
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Estimated Range
                  </p>
                  <p className="text-2xl font-extrabold text-primary md:text-3xl">
                    {estimatedRange}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    * Approximate range. Final price depends on actual inventory
                    and requirements.
                  </p>
                </div>
              )}

              {!estimatedRange && propertyType && destination && (
                <div className="rounded-xl bg-muted p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No estimate available for this combination. Contact us for a
                    custom quote.
                  </p>
                </div>
              )}

              <Button
                size="lg"
                className="w-full gap-2"
                onClick={() =>
                  openWhatsApp(
                    `Hi NorthArc! I'd like a detailed quote.\n\nProperty: ${propertyType || "Not selected"}\nDestination: ${destination || "Not selected"}\n${estimatedRange ? `Estimated range: ${estimatedRange}\n` : ""}\nPlease share a personalized estimate. Thank you!`
                  )
                }
              >
                <MessageCircle className="h-4 w-4" />
                Get Detailed Quote on WhatsApp
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>
      </section>

      {/* ── 6. Seasonal Offer ────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <AnimatedSection className="mx-auto max-w-4xl px-4">
          <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-8 md:p-10">
            {/* Decorative sparkles */}
            <Sparkles className="absolute right-4 top-4 h-8 w-8 text-amber-500/30" />
            <Sparkles className="absolute bottom-4 left-4 h-6 w-6 text-orange-500/20" />

            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                <BadgePercent className="h-8 w-8 text-amber-600" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground md:text-2xl">
                  {t("pricing.seasonalOffer")}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {t("pricing.seasonalOffer.desc")}
                </p>
              </div>

              <Button
                size="lg"
                className="shrink-0 gap-2 bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() =>
                  openWhatsApp(
                    "Hi NorthArc! I'd like to claim the seasonal offer — 10% off on packing services for weekday bookings. Please share details."
                  )
                }
              >
                <Sparkles className="h-4 w-4" />
                {t("offer.cta")}
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── 7. Pricing Notes ─────────────────────────────────────────────── */}
      <section className="bg-muted/40 py-16 md:py-20">
        <AnimatedSection className="mx-auto max-w-4xl px-4">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What Affects Your Final Price
            </h2>
          </div>

          <p className="mb-6 text-muted-foreground leading-relaxed">
            {t("pricing.note")}
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Weight, label: "Volume of goods" },
              { icon: MapPin, label: "Distance" },
              { icon: ArrowUpDown, label: "Floor & lift access" },
              { icon: Package, label: "Packing requirements" },
              { icon: Truck, label: "Vehicle type" },
              { icon: Building2, label: "Access restrictions" },
              { icon: ShieldCheck, label: "Additional services" },
              { icon: CalendarDays, label: "Seasonal demand" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border bg-background p-4 transition-colors hover:bg-muted/50"
              >
                <Icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── 8. CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-16 md:py-20">
        <AnimatedSection className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {t("pricing.cta")}
          </h2>
          <p className="mt-4 text-primary-foreground/80 md:text-lg">
            Share your requirements and get an accurate, no-obligation estimate
            tailored to your move.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 text-base"
              onClick={() =>
                openWhatsApp(
                  "Hi NorthArc! I'd like a personalized moving quote. Please share details."
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
                Call Us
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
