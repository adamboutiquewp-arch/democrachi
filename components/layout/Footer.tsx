import Link from "next/link";
import { prisma } from "@/lib/prisma";

const LEGAL = [
  { label: "Mentions légales", href: "/cgu" },
  { label: "Confidentialité",  href: "/confidentialite" },
  { label: "CGU",              href: "/cgu" },
];

export default async function Footer() {
  const year = new Date().getFullYear();

  let configs: { cle: string; valeur: string }[] = [];
  try {
    configs = await prisma.siteConfig.findMany({
      where: { cle: { startsWith: "social_" } },
    });
  } catch {}
  const get = (cle: string) => configs.find((c) => c.cle === cle)?.valeur || "";

  const socials = [
    { label: "X",         href: get("social_x"),         icon: <XIcon /> },
    { label: "Telegram",  href: get("social_telegram"),  icon: <TelegramIcon /> },
    { label: "Instagram", href: get("social_instagram"), icon: <InstagramIcon /> },
    { label: "Facebook",  href: get("social_facebook"),  icon: <FacebookIcon /> },
  ].filter((s) => s.href);

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/">
            <div className="text-[20px] font-black text-white uppercase leading-none">
              DEMOCRACHI<span className="text-[#CC0000]">.COM</span>
            </div>
            <div className="text-[8px] text-[#555] tracking-[0.18em] uppercase mt-1">
              La caricature est notre arme, la vérité notre combat
            </div>
          </Link>

          {/* Liens légaux */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LEGAL.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[11px] font-bold tracking-widest uppercase text-[#555] hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-5">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#555] hover:text-white transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-[11px] text-[#333]">
            © {year} DemoCrachi.com — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
