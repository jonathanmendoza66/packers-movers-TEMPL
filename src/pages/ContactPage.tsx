import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/lib/i18n";
import { openWhatsApp, buildQuoteMessage } from "@/lib/whatsapp";
import { propertyTypes, serviceOptions, vehicleTypes } from "@/lib/data";
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useAnimateOnScroll();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <div>
      <section className="bg-primary px-4 py-20 text-center lg:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-5xl">
            {t("contact.hero.title")}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            {t("contact.hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <AnimatedSection>
            <div className="mb-12 flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => (window.location.href = "tel:+911141872634")} className="gap-2">
                <Phone className="h-5 w-5" />
                {t("contact.callUs")}
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white" onClick={() => openWhatsApp("Hi NorthArc! I need help with my move.")}>
                <MessageCircle className="h-5 w-5" />
                {t("contact.whatsapp")}
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={() => (window.location.href = "mailto:hello@northarcrelocations.in")}>
                <Mail className="h-5 w-5" />
                {t("contact.emailUs")}
              </Button>
            </div>
          </AnimatedSection>

          <div className="grid gap-8 lg:grid-cols-2">
            <AnimatedSection>
              <div className="space-y-6">
                <ContactCard
                  title={t("contact.headOffice")}
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  lines={["3rd Floor, Meridian House", "18 Community Centre, Saket", "New Delhi, Delhi 110017"]}
                />
                <ContactCard
                  title={t("contact.opsOffice")}
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  lines={["Unit 14, DLF Industrial Area", "Moti Nagar, New Delhi, Delhi 110015"]}
                />
                <ContactCard
                  title={t("contact.corporateDesk")}
                  icon={<Phone className="h-5 w-5 text-primary" />}
                  lines={["+91 88264 73158", "corporate@northarcrelocations.in", "Account Manager: Mihira Vaid"]}
                />
                <ContactCard
                  title={t("contact.workingHours")}
                  icon={<Clock className="h-5 w-5 text-primary" />}
                  lines={[t("contact.monSat"), t("contact.sun"), t("contact.support")]}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <QuoteForm t={t} />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-6">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">{t("footer.followUs")}</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {["Instagram", "Facebook", "LinkedIn", "YouTube"].map((name) => (
              <a
                key={name}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-card px-6 py-3 text-sm font-medium text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                @northarcrelocations ({name})
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({ title, icon, lines }: { title: string; icon: React.ReactNode; lines: string[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {lines.map((line, i) => (
          <p key={i} className="text-sm text-muted-foreground">{line}</p>
        ))}
      </CardContent>
    </Card>
  );
}

function QuoteForm({ t }: { t: (k: string) => string }) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", pickup: "", destination: "", date: "",
    propertyType: "", services: [] as string[], vehicleType: "", additionalInfo: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const toggleService = (svc: string) => {
    setForm((p) => ({
      ...p,
      services: p.services.includes(svc) ? p.services.filter((s) => s !== svc) : [...p.services, svc],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = buildQuoteMessage(form);
    openWhatsApp(msg);
  };

  const inputCls = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("contact.form.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input className={inputCls} placeholder={t("contact.form.name")} value={form.name} onChange={(e) => update("name", e.target.value)} required />
            <input className={inputCls} type="tel" placeholder={t("contact.form.phone")} value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
          </div>
          <input className={inputCls} type="email" placeholder={t("contact.form.email")} value={form.email} onChange={(e) => update("email", e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <input className={inputCls} placeholder={t("contact.form.pickup")} value={form.pickup} onChange={(e) => update("pickup", e.target.value)} required />
            <input className={inputCls} placeholder={t("contact.form.destination")} value={form.destination} onChange={(e) => update("destination", e.target.value)} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input className={inputCls} type="date" placeholder={t("contact.form.date")} value={form.date} onChange={(e) => update("date", e.target.value)} />
            <select className={inputCls} value={form.propertyType} onChange={(e) => update("propertyType", e.target.value)}>
              <option value="">{t("contact.form.propertyType")}</option>
              {propertyTypes.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-foreground">{t("contact.form.services")}</p>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((svc) => (
                <button
                  key={svc}
                  type="button"
                  onClick={() => toggleService(svc)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    form.services.includes(svc)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {svc}
                </button>
              ))}
            </div>
          </div>

          <select className={inputCls} value={form.vehicleType} onChange={(e) => update("vehicleType", e.target.value)}>
            <option value="">{t("contact.form.vehicleType")}</option>
            {vehicleTypes.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>

          <textarea className={`${inputCls} min-h-[80px] resize-none`} placeholder={t("contact.form.additionalInfo")} value={form.additionalInfo} onChange={(e) => update("additionalInfo", e.target.value)} />

          <Separator />

          <Button type="submit" size="lg" className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#20BD5A]">
            <MessageCircle className="h-5 w-5" />
            {t("contact.form.submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
