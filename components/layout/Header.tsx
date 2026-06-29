"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchModal from "./SearchModal";

const NAV_ITEMS = [
  { label: "Accueil",           href: "/" },
  { label: "Derniers articles", href: "/actu" },
  { label: "À propos",          href: "/a-propos" },
  { label: "Contact",           href: "/contact" },
];

interface SocialLink { label: string; href: string; }

export default function Header({ socialLinks = [] }: { socialLinks?: SocialLink[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-black transition-shadow duration-200 ${
          scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.8)]" : ""
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Mobile : hamburger */}
            <button
              className="md:hidden p-2 -ml-2 text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <div className="flex flex-col gap-[5px]">
                <span className={`block w-6 h-[2px] bg-white transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`block w-6 h-[2px] bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-6 h-[2px] bg-white transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </div>
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex flex-col leading-none">
                <div className="text-[22px] md:text-[28px] font-black tracking-tight text-white uppercase">
                  DEMOCRACHI<span className="text-[#CC0000]">.COM</span>
                </div>
                <span className="hidden md:block text-[8px] tracking-[0.18em] uppercase text-[#888] mt-0.5">
                  La caricature est notre arme, la vérité notre combat
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_ITEMS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-[12px] font-bold tracking-widest uppercase transition-colors pb-0.5 border-b-2 ${
                    isActive(href)
                      ? "text-white border-[#CC0000]"
                      : "text-[#aaa] border-transparent hover:text-white hover:border-[#CC0000]"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Droite */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Rechercher"
                className="p-2 text-[#888] hover:text-white transition-colors"
              >
                <SearchIcon size={18} />
              </button>
              <Link
                href="/soutenir"
                className="hidden md:inline-flex items-center px-4 py-2 bg-[#CC0000] text-white text-[11px] font-black tracking-widest uppercase hover:bg-[#a80000] transition-colors"
              >
                Soutenir la liberté
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile: catégories scrollables */}
        <div className="md:hidden border-t border-white/10 overflow-x-auto scrollbar-hide bg-[#111]">
          <div className="flex items-center gap-2 px-4 py-2 min-w-max">
            {NAV_ITEMS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex-shrink-0 px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase whitespace-nowrap transition-all border ${
                    active
                      ? "border-[#CC0000] text-white bg-[#CC0000]"
                      : "border-white/20 text-[#888] hover:text-white hover:border-white/40"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Mobile menu latéral */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/70 md:hidden" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-0 left-0 z-50 h-full w-72 bg-[#0d0d0d] border-r border-white/10 md:hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div>
                <div className="text-[20px] font-black text-white uppercase">
                  DEMOCRACHI<span className="text-[#CC0000]">.COM</span>
                </div>
                <div className="text-[8px] text-[#555] tracking-widest uppercase mt-0.5">
                  La caricature est notre arme
                </div>
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-[#888] hover:text-white" aria-label="Fermer">
                <CloseIcon size={20} />
              </button>
            </div>
            <nav className="flex-1 py-4 overflow-y-auto">
              {NAV_ITEMS.map(({ label, href }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-6 py-4 text-[16px] font-bold uppercase tracking-wide transition-all border-l-4 ${
                      active
                        ? "border-[#CC0000] text-white bg-white/5"
                        : "border-transparent text-[#888] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#CC0000]" />}
                    {label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-5 border-t border-white/10">
              {socialLinks.length > 0 && (
                <div className="flex gap-4 mb-4">
                  {socialLinks.map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-[#555] hover:text-white transition-colors">
                      <SocialDot />
                    </a>
                  ))}
                </div>
              )}
              <Link
                href="/soutenir"
                className="block text-center py-3 bg-[#CC0000] text-white text-[11px] font-black tracking-widest uppercase hover:bg-[#a80000] transition-colors"
              >
                Soutenir la liberté
              </Link>
            </div>
          </div>
        </>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function SearchIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function SocialDot() {
  return <span className="w-2 h-2 rounded-full bg-[#555] inline-block" />;
}
