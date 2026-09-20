import { useI18n } from "@/lib/i18n";
import {
  locationData,
  intercityDestinations,
  operatingHubs,
  routePricing,
} from "@/lib/data";
import { openWhatsApp } from "@/lib/whatsapp";
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Building2, MapPin, ArrowRight } from "lucide-react";

const TAB_KEYS: { key: string; label: string }[] = [
  { key: "delhi", label: "Delhi" },
  { key: "gurugram", label: "Gurugram" },
  { key: "noida", label: "Noida" },
  { key: "ghaziabad", label: "Ghaziabad" },
  { key: "faridabad", label: "Faridabad" },
];

const REGION_KEYS: { key: string; labelKey: string }[] = [
  { key: "north", labelKey: "locations.northIndia" },
  { key: "west", labelKey: "locations.westIndia" },
  { key: "south", labelKey: "locations.southIndia" },
  { key: "east", labelKey: "locations.eastIndia" },
];

export default function LocationsPage() {
  const { t } = useI18n();

  const heroAnim = useAnimateOnScroll();
  const ncrAnim = useAnimateOnScroll();
  const intercityAnim = useAnimateOnScroll();
  const hubsAnim = useAnimateOnScroll();
  const routesAnim = useAnimateOnScroll();

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
            {t("locations.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            {t("locations.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ─── Delhi NCR Tabs ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div
          ref={ncrAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            ncrAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t("locations.ncr.title")}
          </h2>

          <Tabs defaultValue="delhi" className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
              {TAB_KEYS.map(({ key, label }) => (
                <TabsTrigger key={key} value={key} className="text-sm">
                  {label}{" "}
                  <span className="ml-1 text-xs opacity-70">
                    ({locationData[key]?.length ?? 0})
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {TAB_KEYS.map(({ key }) => (
              <TabsContent key={key} value={key}>
                <div className="flex flex-wrap gap-2">
                  {(locationData[key] ?? []).map((locality) => (
                    <Badge key={locality} variant="secondary">
                      <MapPin className="w-3 h-3 mr-1" />
                      {locality}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* ─── Intercity Destinations ───────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div
          ref={intercityAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            intercityAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
            {t("locations.intercity.title")}
          </h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {REGION_KEYS.map(({ key, labelKey }) => (
              <div key={key}>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t(labelKey)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(intercityDestinations[key] ?? []).map((city) => (
                    <Badge key={city} variant="outline">
                      {city}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* ─── Operating Hubs ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div
          ref={hubsAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            hubsAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t("locations.hubs.title")}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {operatingHubs.map((hub) => (
              <Card
                key={hub.city}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">
                    {hub.city}
                  </h3>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {hub.role}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* ─── Popular Routes with Pricing ──────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div
          ref={routesAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            routesAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t("locations.popularRoutes")}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {routePricing.map((route, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    {route.route}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {route.moveType}
                    </Badge>
                    <span className="text-lg font-bold text-primary">
                      {route.price}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      openWhatsApp(
                        `Hi NorthArc! I'd like to book a ${route.moveType} move on the ${route.route} route (listed at ${route.price}). Please share details.`
                      )
                    }
                  >
                    {t("routes.bookNow")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
