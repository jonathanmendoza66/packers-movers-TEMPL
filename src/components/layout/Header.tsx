import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/components/theme-provider";
import { openWhatsApp } from "@/lib/whatsapp";

const navLinks = [
  { key: "nav.home", path: "/" },
  { key: "nav.services", path: "/services" },
  { key: "nav.pricing", path: "/pricing" },
  { key: "nav.about", path: "/about" },
  { key: "nav.locations", path: "/locations" },
  { key: "nav.gallery", path: "/gallery" },
  { key: "nav.faq", path: "/faq" },
  { key: "nav.contact", path: "/contact" },
];

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { setTheme, theme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.webp" alt="NorthArc" className="h-9 w-9" />
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground leading-tight">
              NorthArc
            </span>
            <span className="text-[10px] font-medium text-muted-foreground leading-none">
              Relocations
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
          >
            <Globe className="h-4 w-4" />
            {lang === "en" ? "हिंदी" : "English"}
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => openWhatsApp("Hi NorthArc! I'd like a free moving estimate.")}
          >
            {t("nav.getQuote")}
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm p-1.5 text-foreground shadow-sm active:scale-95 transition-all"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </button>
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1 rounded-full border border-border bg-background/80 backdrop-blur-sm px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-sm active:scale-95 transition-all"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "en" ? "हिंदी" : "EN"}
          </button>
          <a
            href="tel:+911141872634"
            className="flex items-center justify-center rounded-full border border-border bg-primary/90 backdrop-blur-sm p-1.5 text-primary-foreground shadow-sm active:scale-95 transition-all"
          >
            <Phone className="h-3.5 w-3.5" />
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="rounded-md p-2 text-foreground hover:bg-muted transition-colors">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-12">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3 px-4">
                <button
                  onClick={() => {
                    setLang(lang === "en" ? "hi" : "en");
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  {lang === "en" ? "हिंदी में देखें" : "Switch to English"}
                </button>
                <Button
                  className="w-full bg-primary text-primary-foreground"
                  onClick={() => {
                    setOpen(false);
                    openWhatsApp("Hi NorthArc! I'd like a free moving estimate.");
                  }}
                >
                  {t("nav.getQuote")}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    window.location.href = "tel:+911141872634";
                  }}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {t("contact.callUs")}
                </Button>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted text-left"
                >
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
