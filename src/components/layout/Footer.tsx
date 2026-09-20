import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const SocialIcon = ({ d }: { d: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
);

const socialLinks = [
  { href: "https://instagram.com/northarcrelocations", label: "Instagram", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { href: "https://facebook.com/northarcrelocations", label: "Facebook", d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { href: "https://linkedin.com/company/northarcrelocations", label: "LinkedIn", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { href: "https://youtube.com/@northarcrelocations", label: "YouTube", d: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
];
import { useI18n } from "@/lib/i18n";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-card pb-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.webp" alt="NorthArc" className="h-10 w-10" />
              <div>
                <span className="text-lg font-bold text-foreground">NorthArc</span>
                <p className="text-xs text-muted-foreground">Relocations & Logistics</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("footer.desc")}</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="rounded-full bg-muted p-2.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"><SocialIcon d={s.d} /></a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t("footer.quickLinks")}</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { key: "nav.home", path: "/" },
                { key: "nav.services", path: "/services" },
                { key: "nav.pricing", path: "/pricing" },
                { key: "nav.about", path: "/about" },
                { key: "nav.locations", path: "/locations" },
                { key: "nav.gallery", path: "/gallery" },
                { key: "nav.faq", path: "/faq" },
                { key: "nav.contact", path: "/contact" },
              ].map((l) => (
                <Link key={l.path} to={l.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t(l.key)}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t("footer.services")}</h3>
            <div className="flex flex-col gap-2.5">
              {[
                "services.household.name",
                "services.local.name",
                "services.intercity.name",
                "services.office.name",
                "services.vehicle.name",
                "services.packing.name",
                "services.storage.name",
                "services.furniture.name",
              ].map((key) => (
                <Link key={key} to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t(key)}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t("footer.contactInfo")}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">3rd Floor, Meridian House, 18 Community Centre, Saket, New Delhi 110017</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <div className="text-sm text-muted-foreground">
                  <a href="tel:+911141872634" className="hover:text-primary transition-colors">+91 11 4187 2634</a>
                  <br />
                  <a href="tel:+918826473158" className="hover:text-primary transition-colors">+91 88264 73158</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:hello@northarcrelocations.in" className="text-sm text-muted-foreground hover:text-primary transition-colors">hello@northarcrelocations.in</a>
              </div>
            </div>
            <Separator />
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p>{t("footer.gstin")}: 07AAXFN4827K1ZQ</p>
              <p>{t("footer.pan")}: AAXFN4827K</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} NorthArc Relocations & Logistics Pvt. Ltd. {t("footer.rights")}
          </p>
          <p className="text-xs text-muted-foreground">{t("contact.monSat")} | {t("contact.sun")}</p>
        </div>
      </div>
    </footer>
  );
}
