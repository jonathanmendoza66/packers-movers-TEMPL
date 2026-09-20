import { useI18n } from "@/lib/i18n";
import { teamMembers, corporateClients, awards, stats } from "@/lib/data";
import { useAnimateOnScroll, useCountUp } from "@/hooks/use-animate-on-scroll";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Truck,
  Shield,
  Bug,
  Flame,
  Boxes,
  MapPin,
  Building2,
  FileText,
  Calendar,
  Cctv,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────── */
/*  Stat counter – one per stat item                                        */
/* ────────────────────────────────────────────────────────────────────────── */

function StatCounter({
  stat,
  lang,
}: {
  stat: (typeof stats)[number];
  lang: string;
}) {
  const { ref, isInView } = useAnimateOnScroll({ threshold: 0.3 });
  const count = useCountUp({ end: stat.value, enabled: isInView });

  const display = stat.value === 96 ? `${count}%` : `${count.toLocaleString()}+`;

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <p className="text-3xl md:text-4xl font-bold text-primary">{display}</p>
      <p className="text-sm text-muted-foreground mt-1">
        {lang === "hi" ? stat.labelHi : stat.labelEn}
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  About Page                                                              */
/* ────────────────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  const { t, lang } = useI18n();

  const heroAnim = useAnimateOnScroll();
  const storyAnim = useAnimateOnScroll();
  const teamAnim = useAnimateOnScroll();
  const fleetAnim = useAnimateOnScroll();
  const warehouseAnim = useAnimateOnScroll();
  const awardsAnim = useAnimateOnScroll();
  const corporateAnim = useAnimateOnScroll();
  const credentialsAnim = useAnimateOnScroll();

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
            {t("about.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            {t("about.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ─── Our Story ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div
          ref={storyAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            storyAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t("about.story.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("about.story.p1")}</p>
              <p>{t("about.story.p2")}</p>
              <p>{t("about.story.p3")}</p>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src="/about-team.webp"
                alt="NorthArc Team"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* ─── Stats Counter ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StatCounter key={i} stat={stat} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Meet the Team ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div
          ref={teamAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            teamAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t("about.team.title")}
          </h2>
          <p className="text-muted-foreground mb-10">
            {t("about.team.subtitle")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {teamMembers.map((member) => {
              const nameParts = member.name.split(" ");
              const initials =
                (nameParts[0]?.[0] ?? "") + (nameParts[1]?.[0] ?? "");

              return (
                <Card
                  key={member.name}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6 pb-4 px-3">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-primary">
                        {initials}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {member.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {lang === "hi" ? member.roleHi : member.role}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {member.location}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* ─── Our Fleet ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div
          ref={fleetAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            fleetAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t("about.fleet.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-xl overflow-hidden">
              <img
                src="/fleet.webp"
                alt="NorthArc Fleet"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t("about.fleet.desc")}
              </p>
              <ul className="space-y-3">
                {[
                  { icon: Truck, text: "42 GPS-enabled vehicles" },
                  { icon: Boxes, text: "Mini trucks to container carriers" },
                  { icon: Shield, text: "Moving blankets & load-securing" },
                  { icon: MapPin, text: "Driver contact details provided" },
                ].map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* ─── Warehouse ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div
          ref={warehouseAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            warehouseAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t("about.warehouse.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t("about.warehouse.desc")}
              </p>
              <ul className="space-y-3">
                {[
                  { icon: Cctv, text: "CCTV Monitoring" },
                  { icon: Shield, text: "Controlled Access" },
                  { icon: Bug, text: "Pest Control" },
                  { icon: Flame, text: "Fire Safety Systems" },
                  { icon: Boxes, text: "Segregated Storage Zones" },
                ].map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src="/service-storage.webp"
                alt="NorthArc Warehouse"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Awards ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div
          ref={awardsAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            awardsAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t("about.awards.title")}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {awards.map((award) => (
              <Card
                key={award.year}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Trophy className="w-7 h-7 text-primary" />
                  </div>
                  <Badge variant="secondary" className="mb-3">
                    {award.year}
                  </Badge>
                  <p className="font-medium text-foreground text-sm">
                    {lang === "hi" ? award.titleHi : award.title}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* ─── Corporate Clients ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div
          ref={corporateAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            corporateAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t("about.corporate.title")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {corporateClients.map((client) => (
              <Card key={client} className="hover:shadow-md transition-shadow">
                <CardContent className="py-3 px-5 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">
                    {client}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Credentials ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div
          ref={credentialsAnim.ref}
          className={`max-w-7xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            credentialsAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t("about.credentials.title")}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: FileText,
                label: "GSTIN",
                value: "07AAXFN4827K1ZQ",
              },
              {
                icon: FileText,
                label: "PAN",
                value: "AAXFN4827K",
              },
              {
                icon: Building2,
                label: "Company Type",
                value: "Private Limited Company",
              },
              {
                icon: Calendar,
                label: "Operating Since",
                value: "2014",
              },
            ].map((item) => (
              <Card key={item.label}>
                <CardContent className="pt-6 text-center">
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {item.label}
                  </p>
                  <p className="font-semibold text-foreground text-sm">
                    {item.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
