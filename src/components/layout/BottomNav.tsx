import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, IndianRupee, MessageCircle, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const items = [
  { key: "nav.home", path: "/", icon: Home },
  { key: "nav.services", path: "/services", icon: Briefcase },
  { key: "nav.pricing", path: "/pricing", icon: IndianRupee },
  { key: "nav.contact", path: "/contact", icon: MessageCircle },
  { key: "nav.quote", path: "__whatsapp__", icon: Phone },
];

export function BottomNav() {
  const { t } = useI18n();
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden safe-area-bottom">
      <div className="flex h-16 items-center justify-around px-1">
        {items.map((item) => {
          const Icon = item.icon;
          if (item.path === "__whatsapp__") {
            return (
              <a
                key={item.key}
                href="https://wa.me/918826473158?text=Hi%20NorthArc!%20I%27d%20like%20a%20free%20moving%20estimate."
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-0.5 px-2 py-1"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-[10px] font-medium text-[#25D366]">{t(item.key)}</span>
              </a>
            );
          }
          const active = isActive(item.path);
          return (
            <Link
              key={item.key}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`} />
              <span className={`text-[10px] font-medium ${active ? "font-semibold" : ""}`}>
                {t(item.key)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
