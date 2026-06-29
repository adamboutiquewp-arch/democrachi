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
              className="text-[20px] sm:text-[26px] md:text-[32px] font-black uppercase leading-[1.05] tracking-tight text-white mb-5 max-w-[860px]"
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
          NOTRE COMBAT — Section illustrée
      ══════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] border-y-4 border-[#CC0000] pt-14 md:pt-20 pb-14 md:pb-20">

          <div className="w-full flex flex-col items-center text-center px-4 mb-10">
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#CC0000] mb-3">Manifeste</p>
            <h2 className="text-[20px] md:text-[26px] font-black uppercase text-white tracking-tight leading-tight">
              Notre Combat
            </h2>
            <p className="text-[15px] text-white/50 mt-3 max-w-[600px]">
              Cinq raisons de se battre. Cinq vérités que le système préférerait que vous oubliiez.
            </p>
          </div>

          {/* Illustration pleine largeur */}
          <div className="w-full mb-12">
            <Image
              src="/notre-combat-v3.png"
              alt="Les 5 combats de DemoCrachi — illustrations"
              width={1536}
              height={1024}
              sizes="100vw"
              className="w-full h-auto block"
              priority={false}
            />
          </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          {/* 5 textes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                num: "01",
                titre: "La Démocratie",
                texte: "Le peuple est souverain — pas les lobbies, pas les élites déconnectées. Chaque loi devrait passer par vos mains. On se bat pour que votre bulletin de vote pèse autant que le chèque d'un milliardaire.",
              },
              {
                num: "02",
                titre: "Contre la Manipulation",
                texte: "Fake news, infox, médias aux ordres — la réalité qu'on vous sert est fabriquée. Vérifiez. Questionnez. Ne croyez pas tout. DemoCrachi est là pour décrypter ce qu'on vous cache.",
              },
              {
                num: "03",
                titre: "Contre la Corruption",
                texte: "Des passe-droits, de l'argent public détourné, des lois taillées pour ceux qui payent. La corruption n'est pas une exception — c'est le système. On les nomme. On les expose. Sans filtre.",
              },
              {
                num: "04",
                titre: "L'Esprit Critique",
                texte: "Qui ? Pourquoi ? Preuves ? Sources ? Ces questions dérangent ceux qui vivent du mensonge. Le vrai pouvoir du peuple, c'est de ne plus pouvoir être manipulé. Ça commence par refuser d'avaler sans réfléchir.",
              },
              {
                num: "05",
                titre: "Un Peuple Uni",
                texte: "Ils nous divisent pour mieux régner. Mais quand le peuple se rassemble, rien ne résiste. La vraie révolution ne viendra pas d'un parti — elle viendra de millions de citoyens qui reprennent leur pouvoir en main.",
              },
            ].map(({ num, titre, texte }) => (
              <div key={num} className="border-t-2 border-[#CC0000] pt-5">
                <span className="text-[11px] font-black tracking-widest text-[#CC0000] uppercase">{num}</span>
                <h3 className="text-[14px] font-black uppercase text-white mt-1 mb-3 tracking-wide">{titre}</h3>
                <p className="text-[12px] text-white/60 leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/notre-combat"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#CC0000] text-white text-[12px] font-black tracking-widest uppercase hover:bg-[#CC0000] transition-colors"
            >
              Notre manifeste complet →
            </Link>
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
              <div className="flex-shrink-0">
                <Image
                  src="/liberte-expression-opt.png"
                  alt="Soutenez la liberté d'expression — DemoCrachi"
                  width={420}
                  height={420}
                  className="w-[140px] md:w-[180px] h-auto rounded-sm"
                />
              </div>
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
                  href="/newsletter"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#CC0000] text-white text-[11px] font-black tracking-widest uppercase hover:bg-[#a80000] transition-colors"
                >
                  ♥ Soutenir le combat
                </Link>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 flex flex-col justify-center">
              <h3 className="text-[22px] md:text-[26px] font-black uppercase text-white text-center leading-tight mb-2">
                Mer · Ven · Dim
              </h3>
              <p className="text-[12px] font-bold tracking-widest uppercase text-[#CC0000] text-center mb-4">
                Une caricature trois fois par semaine
              </p>
              <NewsletterInline />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
