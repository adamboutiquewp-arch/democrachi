import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos — DemoCrachi",
  description:
    "DemoCrachi est né d'un ras-le-bol. Celui des médias aux ordres, des politiciens corrompus, des mensonges en boucle. La caricature est notre arme, la vérité notre combat.",
};

export default function AProposPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#0a0a0a] border-b-4 border-[#CC0000] py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#CC0000] mb-4">
            Notre histoire
          </p>
          <h1
            className="text-[38px] sm:text-[52px] md:text-[68px] font-black uppercase leading-[0.92] tracking-tight text-white mb-6 max-w-[820px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            On en avait marre.<br />
            <span className="text-[#CC0000]">Alors on a créé DemoCrachi.</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-white/60 leading-relaxed max-w-[640px]">
            Marre des médias aux ordres. Marre des politiciens qui mentent sans
            conséquences. Marre du système qui se protège lui-même. Alors on a
            pris notre arme : la caricature.
          </p>
        </div>
      </section>

      {/* QUI SOMMES-NOUS */}
      <section className="bg-[#111] py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#CC0000] mb-4">
                Ce qu'on est
              </p>
              <h2
                className="text-[28px] md:text-[36px] font-black uppercase text-white leading-tight mb-6"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Un média libre.<br />Sans patron.<br />Sans censure.
              </h2>
              <div className="space-y-4 text-[15px] text-white/60 leading-relaxed">
                <p>
                  <strong className="text-white">DemoCrachi</strong>, c'est un média de caricatures politiques qui démonte
                  l'hypocrisie du système. Un article tous les deux jours pour
                  ouvrir les yeux de ceux qui veulent voir.
                </p>
                <p>
                  Ici, pas d'actionnaire à ménager. Pas de pub à ne pas froisser.
                  Pas de ligne éditoriale dictée par le pouvoir. On dit ce qu'on
                  pense, on montre ce qui se passe, et on vous fait confiance pour
                  vous forger votre propre opinion.
                </p>
                <p>
                  La caricature a toujours été l'arme des peuples contre les
                  puissants. On continue cette tradition.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { chiffre: "1/2", label: "Article tous les deux jours" },
                { chiffre: "100%", label: "Indépendant" },
                { chiffre: "0", label: "Publicité, 0 subvention" },
                { chiffre: "∞", label: "Liberté d'expression" },
              ].map(({ chiffre, label }) => (
                <div
                  key={label}
                  className="bg-[#0a0a0a] border border-white/10 p-6 flex flex-col items-center text-center"
                >
                  <div className="text-[36px] font-black text-[#CC0000] mb-2">
                    {chiffre}
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NOTRE COMBAT */}
      <section className="bg-[#f0e6c8] border-y-4 border-[#d4c49a] py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#CC0000] mb-4 text-center">
            Ce pour quoi on se bat
          </p>
          <h2
            className="text-[28px] md:text-[36px] font-black uppercase text-center text-[#111] tracking-tight mb-12"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Notre combat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🗳️",
                titre: "La vraie démocratie",
                texte:
                  "Le pouvoir appartient au peuple, pas à une élite déconnectée qui se recycle d'un poste à l'autre.",
              },
              {
                icon: "🐑",
                titre: "Contre la manipulation",
                texte:
                  "Médias aux ordres, mensonges en boucle, propagande déguisée en info. On décortique tout.",
              },
              {
                icon: "💰",
                titre: "Contre la corruption",
                texte:
                  "Politiciens vendus, lobbyistes tout-puissants, conflits d'intérêts assumés. On expose tout.",
              },
              {
                icon: "📺",
                titre: "L'esprit critique",
                texte:
                  "Rire, caricaturer, provoquer pour faire réfléchir. La satire est le miroir que le pouvoir déteste.",
              },
              {
                icon: "✊",
                titre: "Un peuple uni",
                texte:
                  "Ensemble, informés, conscients. Pour reprendre notre pouvoir en main face au système.",
              },
              {
                icon: "🔓",
                titre: "La liberté d'expression",
                texte:
                  "Dire ce que d'autres n'osent pas dire. C'est notre droit. C'est notre devoir.",
              },
            ].map(({ icon, titre, texte }) => (
              <div
                key={titre}
                className="bg-white/60 border border-[#d4c49a] p-6"
              >
                <div className="text-[40px] mb-3">{icon}</div>
                <h3 className="text-[13px] font-black uppercase tracking-wider text-[#111] mb-2">
                  {titre}
                </h3>
                <p className="text-[13px] text-[#555] leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI LA CARICATURE */}
      <section className="bg-[#0a0a0a] py-14 md:py-20">
        <div className="max-w-[860px] mx-auto px-4 md:px-8 text-center">
          <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#CC0000] mb-4">
            Notre arme
          </p>
          <h2
            className="text-[28px] md:text-[40px] font-black uppercase text-white leading-tight mb-8"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Pourquoi la caricature ?
          </h2>
          <blockquote className="text-[18px] md:text-[22px] text-white/70 leading-relaxed italic mb-8 border-l-4 border-[#CC0000] pl-6 text-left">
            "La caricature est l'art de dire la vérité en faisant rire ceux
            qui ne voulaient pas l'entendre."
          </blockquote>
          <p className="text-[15px] text-white/50 leading-relaxed">
            Depuis des siècles, la caricature a fait tomber des rois, exposé
            des tyrans, et réveillé des peuples endormis. Elle contourne la
            censure, déjoue la propagande, et dit en une image ce que mille
            mots n'oseraient pas dire. C'est pour ça qu'on l'a choisie. Et
            c'est pour ça que le système la déteste.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111] border-t-4 border-[#CC0000] py-14 md:py-20">
        <div className="max-w-[860px] mx-auto px-4 md:px-8 text-center">
          <h2
            className="text-[28px] md:text-[36px] font-black uppercase text-white mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Rejoins le combat
          </h2>
          <p className="text-[15px] text-white/50 mb-8 max-w-[480px] mx-auto">
            DemoCrachi vit grâce à ses lecteurs. Partage, commente, soutiens.
            Sans vous, pas de combat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/soutenir"
              className="px-8 py-4 bg-[#CC0000] text-white text-[12px] font-black tracking-widest uppercase hover:bg-[#a80000] transition-colors"
            >
              ✊ Soutenir DemoCrachi
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
