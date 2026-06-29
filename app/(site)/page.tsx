import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import NewsletterInline from "@/components/newsletter/NewsletterInline";

export const metadata: Metadata = {
  title: "DemoCrachi — Des caricatures contre le système",
  description:
    "DemoCrachi.com, c'est un média de caricatures qui démonte l'hypocrisie, la corruption et la manipulation du système. Un article un jour sur deux pour ouvrir les yeux.",
};

export const dynamic = "force-dynamic";

async function getHomeData() {
  const article =
    (await prisma.article.findFirst({
      where: { statut: "PUBLISHED", featured: true },
      include: { categorie: true },
      orderBy: { datePublication: "desc" },
    })) ??
    (await prisma.article.findFirst({
      where: { statut: "PUBLISHED" },
      include: { categorie: true },
      orderBy: { datePublication: "desc" },
    }));
  return { article };
}

export default async function HomePage() {
  const { article } = await getHomeData();

  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO — Image plein écran, aucun texte dessus
      ══════════════════════════════════════════════ */}
      <section className="w-full bg-black">
        {article?.imageUrl ? (
          /* Image en taille naturelle — pleine largeur, hauteur automatique */
          <Image
            src={article.imageUrl}
            alt={article.imageAlt || article.titre}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto block"
            style={{ maxHeight: "100svh", objectFit: "contain", objectPosition: "center" }}
            priority
          />
        ) : (
          <div className="relative w-full" style={{ height: "100svh" }}>
            <Image
              src="/hero-illustration.png"
              alt="DemoCrachi"
              fill
              className="object-contain object-center"
              priority
              sizes="100vw"
            />
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════
          TITRE DE L'ARTICLE — Bande noire sous l'image
      ══════════════════════════════════════════════ */}
      {article && (
        <section className="bg-[#0a0a0a] border-b-4 border-[#CC0000] py-10 md:py-14">
          <div className="max-w-[1100px] mx-auto px-4 md:px-8">
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#CC0000] mb-4">
              À la une
            </p>
            <h1
              className="text-[36px] sm:text-[50px] md:text-[64px] font-black uppercase leading-[0.95] tracking-tight text-white mb-5 max-w-[860px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {article.titre}
            </h1>
            <p className="text-[16px] md:text-[19px] text-white/70 leading-relaxed mb-8 max-w-[700px]">
              {article.chapo}
            </p>
            <Link
              href={`/${article.categorie.slug}/${article.slug}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#CC0000] text-white text-[13px] font-black tracking-widest uppercase hover:bg-[#a80000] transition-colors"
            >
              Lire l&apos;article →
            </Link>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          NOTRE COMBAT — Fond parchemin
      ══════════════════════════════════════════════ */}
      <section className="bg-[#f0e6c8] border-y-4 border-[#d4c49a] py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <h2 className="text-[28px] md:text-[36px] font-black uppercase text-center text-[#111] tracking-tight mb-10">
            Notre combat
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
            {[
              { icon: "🗳️", titre: "La démocratie",          texte: "Le pouvoir au peuple, pas à une élite déconnectée." },
              { icon: "🐑", titre: "Contre la manipulation",  texte: "Médias aux ordres, mensonges en boucle, on dit stop." },
              { icon: "💰", titre: "Contre la corruption",    texte: "Politiciens vendus, lobbyistes tout-puissants, on expose tout." },
              { icon: "📺", titre: "L'esprit critique",       texte: "Rire, caricaturer, provoquer pour faire réfléchir." },
              { icon: "✊", titre: "Un peuple uni",            texte: "Ensemble pour reprendre notre pouvoir en main." },
            ].map(({ icon, titre, texte }) => (
              <div key={titre} className="flex flex-col items-center text-center col-span-1">
                <div className="text-[42px] mb-3">{icon}</div>
                <h3 className="text-[12px] font-black uppercase tracking-wider text-[#111] mb-2">{titre}</h3>
                <p className="text-[12px] text-[#555] leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NEWSLETTER + SOUTIEN
      ══════════════════════════════════════════════ */}
      <section className="bg-[#111] py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-[72px] flex-shrink-0">😈</div>
              <div>
                <h2 className="text-[24px] md:text-[28px] font-black uppercase text-white leading-tight mb-1">
                  Soutenez la liberté d&apos;expression
                </h2>
                <p className="text-[16px] font-bold text-[#CC0000] uppercase mb-3">
                  Sans vous, pas de DemoCrachi&nbsp;!
                </p>
                <p className="text-[13px] text-[#777] leading-relaxed max-w-[420px]">
                  Ce média indépendant vit grâce à ses lecteurs. Soutenez, partagez, diffusez la vérité.
                </p>
                <Link
                  href="/soutenir"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#CC0000] text-white text-[11px] font-black tracking-widest uppercase hover:bg-[#a80000] transition-colors"
                >
                  ♥ Soutenir le combat
                </Link>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 flex flex-col justify-center">
              <div className="text-[40px] mb-4 text-center">📅</div>
              <h3 className="text-[22px] md:text-[26px] font-black uppercase text-white text-center leading-tight mb-2">
                Lun · Mer · Ven · Dim
              </h3>
              <p className="text-[12px] font-bold tracking-widest uppercase text-[#CC0000] text-center mb-4">
                Un article tous les deux jours
              </p>
              <NewsletterInline />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
