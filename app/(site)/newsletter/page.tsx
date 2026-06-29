import type { Metadata } from "next";
import DonForm from "@/components/don/DonForm";

export const metadata: Metadata = {
  title: "Soutenir DemoCrachi — Faites vivre la liberté d'expression",
  description: "DemoCrachi est un média indépendant qui vit grâce à ses lecteurs. Soutenez le combat avec un don libre à partir de 1€.",
};

export default function DonPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#0a0a0a] border-b-4 border-[#CC0000] py-14 md:py-20">
        <div className="max-w-[860px] mx-auto px-4 md:px-8 text-center">
          <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#CC0000] mb-4">
            Média indépendant
          </p>
          <h1
            className="text-[38px] sm:text-[52px] md:text-[64px] font-black uppercase leading-[0.95] tracking-tight text-white mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Soutenez le combat
          </h1>
          <p className="text-[17px] md:text-[19px] text-white/60 leading-relaxed max-w-[560px] mx-auto">
            DemoCrachi vit grâce à vous. Pas de pub, pas de subvention, pas de
            patron. Seulement vos dons pour continuer à dire la vérité.
          </p>
        </div>
      </section>

      {/* ARGUMENTS */}
      <section className="bg-[#111] py-12">
        <div className="max-w-[860px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              { icon: "🔓", titre: "100% indépendant", texte: "Aucun actionnaire, aucune pression, aucune censure." },
              { icon: "✊", titre: "Chaque euro compte", texte: "Un don de 5€ finance un article entier." },
              { icon: "🔒", titre: "Paiement sécurisé", texte: "Traité par Stripe, le standard mondial du paiement en ligne." },
            ].map(({ icon, titre, texte }) => (
              <div key={titre} className="flex flex-col items-center text-center p-6 border border-white/10">
                <div className="text-[40px] mb-3">{icon}</div>
                <h3 className="text-[12px] font-black uppercase tracking-wider text-white mb-2">{titre}</h3>
                <p className="text-[12px] text-white/40 leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>

          {/* FORMULAIRE */}
          <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12">
            <h2 className="text-[20px] font-black uppercase text-white text-center mb-8 tracking-tight">
              Choisissez votre montant
            </h2>
            <DonForm />
          </div>

          <p className="text-center text-[11px] text-white/20 mt-6 tracking-wide">
            Paiement sécurisé par Stripe · Aucun abonnement · À partir de 1€
          </p>
        </div>
      </section>
    </>
  );
}
