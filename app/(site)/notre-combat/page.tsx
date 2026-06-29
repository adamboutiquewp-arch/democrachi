import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre Combat",
  description:
    "Cinq combats, une seule conviction : seul le peuple peut remettre la France sur les rails. DemoCrachi expose la corruption, la manipulation et l'imposture d'un système qui se perpétue au détriment du peuple.",
};

const COMBATS = [
  {
    num: "01",
    img: "/combat-01-democratie-opt.png",
    w: 900, h: 900,
    alt: "La Démocratie — votre voix ne sert à rien",
    titre: "La Démocratie",
    accroche: "Le pouvoir au peuple — pas aux élites",
    texte: [
      "Le peuple est souverain. Cette phrase devrait être gravée dans chaque institution, exigée à chaque loi. Pourtant, les décisions se prennent dans des bureaux feutrés, entre lobbyistes et technocrates, loin des citoyens.",
      "On se bat pour le référendum d'initiative citoyenne — le droit pour le peuple de proposer, de voter, de décider directement des lois qui le gouvernent. Pas une fois tous les cinq ans dans l'isoloir, mais en continu, sur les sujets qui changent des vies.",
      "Votre bulletin de vote doit peser autant que le chèque d'un milliardaire. Tant que ce n'est pas le cas, la démocratie reste un mot creux qu'on agite pour calmer les foules.",
    ],
  },
  {
    num: "02",
    img: "/combat-02-manipulation-opt.png",
    w: 900, h: 900,
    alt: "Contre la Manipulation — BFM, CNews, LCI, peur haine division",
    titre: "Contre la Manipulation",
    accroche: "Informons-nous. Vérifions. Réfléchissons.",
    texte: [
      "Fake news. Infox. BFM TV. CNews. LCI. Les grandes chaînes et les journaux aux ordres vous servent chaque jour une réalité fabriquée — taillée pour servir ceux qui les financent, pas pour vous informer.",
      "TikTok, les réseaux sociaux, les algorithmes : votre cerveau est leur produit. Chaque scroll, chaque like, chaque partage est calculé pour vous maintenir dans la peur, la division, la haine.",
      "DemoCrachi est là pour décrypter, vérifier, démystifier. Pas pour vous dire quoi penser — mais pour vous donner les outils de penser par vous-même. Informez-vous. Vérifiez. Réfléchissez.",
    ],
  },
  {
    num: "03",
    img: "/combat-03-corruption-opt.png",
    w: 900, h: 900,
    alt: "Contre la Corruption — République Française S.A., argent public pillé",
    titre: "Contre la Corruption",
    accroche: "La loi pour tous — pas de privilèges",
    texte: [
      "République Française S.A. : vos impôts, leurs champagnes. Des marchés publics truqués, des passe-droits en série, des lois taillées pour ceux qui ont les moyens de les commander.",
      "Les mêmes qui prêchent la rigueur budgétaire pour les classes populaires s'accordent des indemnités indécentes, des retraites hors-sol et des impunités judiciaires. Pendant ce temps, le peuple se serre la ceinture.",
      "On les nomme. On les expose. On publie les faits, les chiffres, les connexions. Sans langue de bois, sans peur des représailles. Assez.",
    ],
  },
  {
    num: "04",
    img: "/combat-04-esprit-opt.png",
    w: 900, h: 900,
    alt: "L'Esprit Critique — pose des questions, vérifie les sources, doute",
    titre: "L'Esprit Critique",
    accroche: "Questionner. Analyser. Comprendre. Réfléchir.",
    texte: [
      "Réveille-toi. Qui profite ? Pourquoi ? Vérifie les sources. Ces questions dérangent profondément ceux qui vivent du mensonge. Posez-les systématiquement — face à un discours officiel, face à une une de journal.",
      "Les médias ne sont pas neutres. L'histoire est cachée. Ne crois rien, vérifie tout. Faits. Preuves. Analyse. Ce sont les armes du citoyen libre contre un système qui mise sur votre ignorance.",
      "Penser par soi-même n'est pas un luxe — c'est une nécessité. Le vrai pouvoir du peuple, c'est de ne plus pouvoir être manipulé. Et ça commence par refuser d'avaler sans mâcher.",
    ],
  },
  {
    num: "05",
    img: "/combat-05-peuple-uni-opt.png",
    w: 900, h: 900,
    alt: "Un Peuple Uni — ensemble on est plus forts, justice sociale, liberté",
    titre: "Un Peuple Uni",
    accroche: "Pas de droite. Pas de gauche. Le peuple d'abord.",
    texte: [
      "Ensemble on est plus fort qu'eux. Solidarité. Justice sociale. Ils nous divisent pour mieux régner — par l'origine, la religion, la classe sociale. Chaque fracture qu'ils creusent entre nous est un bénéfice pour eux.",
      "Pas de droite. Pas de gauche. Le peuple d'abord. Chez DemoCrachi, on ne soutient aucun parti — on pense que tous sont dans le même sac. Le changement ne viendra pas d'eux.",
      "Il viendra d'un peuple uni, informé, décidé à reprendre son pouvoir. Par le vote. Par le référendum. Par la rue si nécessaire. Ensemble, nous sommes plus forts qu'eux.",
    ],
  },
];

export default function NotreCombatPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="bg-black border-b-4 border-[#CC0000] py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#CC0000] font-black mb-3">
            Manifeste · DemoCrachi
          </p>
          <h1
            className="text-[28px] sm:text-[36px] md:text-[48px] font-black uppercase leading-[0.92] tracking-tight text-white mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Notre<br />
            <span className="text-[#CC0000]">Combat</span>
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/55 leading-relaxed max-w-[600px] mx-auto mb-10">
            Cinq combats. Une seule conviction&nbsp;: aucun parti ne changera
            quoi que ce soit. Seul le peuple, uni et informé, peut remettre
            la France sur les rails.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {COMBATS.map((c) => (
              <a
                key={c.num}
                href={`#c${c.num}`}
                className="flex items-center gap-2 px-3 py-1.5 border border-white/15 text-white/50 text-[10px] font-bold tracking-widest uppercase hover:border-[#CC0000] hover:text-white transition-all"
              >
                <span className="text-[#CC0000]">{c.num}</span>
                {c.titre}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 sections éditoriales ── */}
      {COMBATS.map((c, i) => {
        const reversed = i % 2 === 1;
        return (
          <section
            key={c.num}
            id={`c${c.num}`}
            className={`border-b border-[#EBEBEB] ${i % 2 === 1 ? "bg-[#F7F7F7]" : "bg-white"}`}
          >
            <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-20">
              <div className={`flex flex-col lg:flex-row gap-8 lg:gap-14 items-center ${reversed ? "lg:flex-row-reverse" : ""}`}>

                {/* ── Image ── */}
                <div className="w-full lg:w-[48%] lg:shrink-0">
                  <div className="overflow-hidden rounded-sm shadow-2xl group">
                    <Image
                      src={c.img}
                      alt={c.alt}
                      width={c.w}
                      height={c.h}
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                {/* ── Texte ── */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black tracking-[0.35em] uppercase text-[#CC0000] mb-2">
                    Combat {c.num} sur 5
                  </p>
                  <h2
                    className="text-[20px] sm:text-[26px] font-black uppercase text-[#111] leading-[1] tracking-tight mb-3"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {c.titre}
                  </h2>
                  <p className="text-[12px] font-bold tracking-widest uppercase text-[#999] border-b border-[#E8E8E8] pb-5 mb-6">
                    {c.accroche}
                  </p>
                  <div className="space-y-4">
                    {c.texte.map((para, j) => (
                      <p key={j} className="text-[15px] md:text-[16px] text-[#444] leading-[1.8]">
                        {para}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-8">
                    <div className="w-8 h-[3px] bg-[#CC0000]" />
                    <span className="text-[10px] font-black tracking-[0.35em] uppercase text-[#CCC]">
                      DemoCrachi
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA final ── */}
      <section className="bg-[#0a0a0a] border-t-4 border-[#CC0000] py-20">
        <div className="max-w-[780px] mx-auto px-4 md:px-8 text-center">
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#CC0000] mb-4">
            Rejoignez le combat
          </p>
          <h2
            className="text-[22px] md:text-[30px] font-black uppercase text-white leading-[1.05] tracking-tight mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Sans vous,<br />
            <span className="text-[#CC0000]">pas de DemoCrachi.</span>
          </h2>
          <p className="text-[15px] text-white/45 mb-10 max-w-[480px] mx-auto leading-relaxed">
            Ce média indépendant vit grâce à ses lecteurs. Soutenez, partagez,
            diffusez. La vérité n&apos;a pas de sponsor — elle a des lecteurs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/newsletter"
              className="w-full sm:w-auto px-10 py-4 bg-[#CC0000] text-white text-[11px] font-black tracking-widest uppercase hover:bg-[#a80000] transition-colors text-center"
            >
              ♥ Soutenir le combat
            </Link>
            <Link
              href="/actu"
              className="w-full sm:w-auto px-10 py-4 border border-white/20 text-white text-[11px] font-black tracking-widest uppercase hover:border-white transition-colors text-center"
            >
              Lire les articles →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
