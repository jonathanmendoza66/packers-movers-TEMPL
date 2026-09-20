import { useI18n } from "@/lib/i18n";
import { faqData, faqDataHi } from "@/lib/data";
import { openWhatsApp } from "@/lib/whatsapp";
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  Mail,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export default function FAQPage() {
  const { t, lang } = useI18n();

  const heroAnim = useAnimateOnScroll();
  const faqAnim = useAnimateOnScroll();
  const stillAnim = useAnimateOnScroll();
  const linksAnim = useAnimateOnScroll();

  const faqs = lang === "hi" ? faqDataHi : faqData;

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
            {t("faq.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            {t("faq.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ─── FAQ Accordion ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div
          ref={faqAnim.ref}
          className={`max-w-3xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            faqAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("faq.title")}
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Separator className="max-w-3xl mx-auto" />

      {/* ─── Still Have Questions ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div
          ref={stillAnim.ref}
          className={`max-w-3xl mx-auto px-4 lg:px-6 text-center transition-all duration-700 ${
            stillAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t("faq.stillQuestions")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {t("faq.stillQuestions.desc")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="outline" className="gap-2 w-full sm:w-auto">
              <a href="tel:+911141872634">
                <Phone className="w-4 h-4" />
                {t("contact.callUs")}
              </a>
            </Button>

            <Button
              className="gap-2 w-full sm:w-auto"
              onClick={() =>
                openWhatsApp(
                  "Hi NorthArc! I have a question about your services."
                )
              }
            >
              <MessageCircle className="w-4 h-4" />
              {t("contact.whatsapp")}
            </Button>

            <Button asChild variant="outline" className="gap-2 w-full sm:w-auto">
              <a href="mailto:hello@northarcrelocations.in">
                <Mail className="w-4 h-4" />
                {t("contact.emailUs")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Quick Links ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div
          ref={linksAnim.ref}
          className={`max-w-3xl mx-auto px-4 lg:px-6 transition-all duration-700 ${
            linksAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {t("footer.quickLinks")}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { to: "/pricing", label: t("nav.pricing") },
              { to: "/services", label: t("nav.services") },
              { to: "/contact", label: t("nav.contact") },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-foreground hover:bg-muted transition-colors group"
              >
                <span className="font-medium text-sm">{link.label}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
