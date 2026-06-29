import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre Combat — DemoCrachi",
  description:
    "DemoCrachi combat la manipulation, la corruption et le mensonge. Découvrez nos 5 combats pour rendre le pouvoir au peuple.",
};

const COMBATS = [
  {
    num: "01",
    titre: "La Démocratie",
    image: "/combat-01-democratie.png",
    texte:
      "Le pouvoir appartient au peuple — pas à une caste qui se recycle de poste en poste depuis des décennies. Nos votes sont confisqués, nos voix ignorées. DemoCrachi exige une vraie démocratie, pas une façade.",
    couleur: "#CC0000",
  },
  {
    num: "02",
    titre: "Contre la Manipulation",
    image: "/combat-02-manipulation.png",
    texte:
      "BFM, CNews, LCI — les grands médias sont aux mains de milliardaires. Ils fabriquent la peur, la haine, la division pour mieux nous contrôler. On décortique leurs mensonges, un article à la fois.",
    couleur: "#CC0000",
  },
  {
    num: "03",
    titre: "Contre la Corruption",
    image: "/combat-03-corruption.png",
    texte:
      "Argent public détourné, pantouflage, copinage, marchés truqués. Pendant que les hôpitaux ferment et les retraites fondent, une élite s'engraisse. On expose tout, sans filtre.",
    couleur: "#CC0000",
  },
  {
    num: "04",
    titre: "L'Esprit Critique",
    image: "/combat-04-esprit.png",
    texte:
      "Pose des questions. Vérifie les sources. Ne crois pas aveuglément. Informe-toi. Penser par soi-même est révolutionnaire dans un monde conçu pour t'abrutir. DemoCrachi t'y aide.",
    couleur: "#CC0000",
  },
  {
    num: "05",
    titre: "Un Peuple Uni",
    image: "/combat-05-peuple-uni.png",
    texte:
      "Justice sociale, santé pour tous, éducation pour tous, liberté, égalité, fraternité. Ensemble on est plus forts. Le système nous divise pour mieux régner — on refuse.",
    couleur: "#CC0000",
  },
];

export default function NotreCombatPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#0a0a0a] border-b-4 border-[#CC0000] py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#CC0000] mb-4">
            DemoCrachi
          </p>
          <h1
            className="text-[38px] sm:text-[52px] md:text-[68px] font-black uppercase leading-[0.92] tracking-tight text-white mb-6 max-w-[820px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Notre combat
          </h1>
          <p className="text-[17px] md:text-[19px] text-white/60 leading-relaxed max-w-[620px]">
            Cinq fronts. Une seule guerre. Celle du peuple contre le système
            qui l'opprime, le manipule et le pille depuis trop longtemps.
          </p>
        </div>
      </section>

      {/* COMBATS */}
      <section className="bg-[#111]">
        {COMBATS.map(({ num, titre, image, texte }, i) => (
          <div
            key={num}
            className={`border-b border-white/10 ${i % 2 === 0 ? "bg-[#111]" : "bg-[#0d0d0d]"}`}
          >
            <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-14 md:py-20">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${
                  i % 2 !== 0 ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative aspect-square w-full max-w-[480px] mx-auto ${i % 2 !== 0 ? "md:[direction:ltr]" : ""}`}>
                  <Image
                    src={image}
                    alt={titre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                </div>

                {/* Texte */}
                <div className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}>
                  <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#CC0000] mb-3">
                    Combat n°{num}
                  </p>
                  <h2
                    className="text-[32px] md:text-[44px] font-black uppercase text-white leading-tight mb-6"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {titre}
                  </h2>
                  <p className="text-[15px] md:text-[17px] text-white/60 leading-relaxed">
                    {texte}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] border-t-4 border-[#CC0000] py-14 md:py-20">
        <div className="max-w-[860px] mx-auto px-4 md:px-8 text-center">
          <h2
            className="text-[28px] md:text-[40px] font-black uppercase text-white mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Rejoins le combat
          </h2>
          <p className="text-[15px] text-white/50 mb-8 max-w-[480px] mx-auto">
            Ce combat est le tien. Soutiens DemoCrachi pour qu'il continue à
            dire la vérité.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/soutenir"
              className="px-8 py-4 bg-[#CC0000] text-white text-[12px] font-black tracking-widest uppercase hover:bg-[#a80000] transition-colors"
            >
              ✊ Soutenir le combat
            </Link>
            <Link
              href="/actu"
              className="px-8 py-4 border-2 border-white/20 text-white text-[12px] font-black tracking-widest uppercase hover:border-white/60 transition-colors"
            >
              Lire les articles →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
