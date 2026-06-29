import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "DemoCrachi n'est d'aucun parti. On pense que tous les politiques sont dans le même sac et que seul le peuple peut remettre la France sur les rails. Notre combat, c'est la démocratie directe.",
};

const SECTIONS = [
  {
    num: "01",
    img: "/apropos-01-sac-opt.png",
    imgW: 1200, imgH: 941,
    alt: "Tous dans le même sac — politiciens, banquiers, médias, lobbies",
    titre: "Tous dans le même sac",
    accroche: "Gauche, droite, centre — même combat, mêmes résultats",
    reversed: false,
    texte: [
      "Politiciens, banquiers, médias, lobbies, grands patrons, macronistes — ils sont tous dans le même sac. La rédaction de DemoCrachi n'est affiliée à aucun parti politique, aucun mouvement, aucune chapelle idéologique.",
      "La gauche, la droite, le centre et tous ceux qui se trouvent entre les deux jouent le même jeu, servent les mêmes intérêts, et produisent les mêmes résultats pour les Français ordinaires.",
      "Les visages changent, les discours changent, les promesses changent. Mais le quotidien du peuple, lui, ne change pas. Le pouvoir d'achat s'érode, les services publics reculent, les inégalités se creusent — pendant que les mêmes élites se passent le pouvoir de main en main.",
    ],
  },
  {
    num: "02",
    img: "/apropos-02-travail-opt.png",
    imgW: 1200, imgH: 833,
    alt: "Comment on travaille — vous bossez, nous encaissons",
    titre: "Comment on travaille",
    accroche: "Vous bossez. Ils encaissent. Le système est conçu pour ça.",
    reversed: true,
    texte: [
      "Salaires bas. Prix qui montent. Dividendes qui explosent. Le système ne dysfonctionne pas — il fonctionne exactement comme prévu. Pour eux.",
      "DemoCrachi utilise l'intelligence artificielle pour collecter et synthétiser l'information en temps réel, à partir de sources françaises et internationales vérifiées. Chaque article est généré à partir de faits réels, de sources identifiées, et relu avant publication.",
      "Un article tous les deux jours — lundi, mercredi, vendredi, dimanche. Pas de flood, pas de bruit : seulement ce qui vaut la peine d'être dit, avec le trait acéré de la caricature quand les mots seuls ne suffisent pas.",
    ],
  },
  {
    num: "03",
    img: "/apropos-03-peuple-opt.png",
    imgW: 1200, imgH: 924,
    alt: "Le peuple, pas les partis — tous les partis sont des marionnettes",
    titre: "Le peuple, pas les partis",
    accroche: "Pas de droite. Pas de gauche. Le peuple d'abord.",
    reversed: false,
    texte: [
      "Les Républicains, le PS, Renaissance, le RN, la France Insoumise — tous marionnettes d'un même système. On croit que peu importe le parti élu, la situation des Français ordinaires ne changera pas.",
      "On croit au référendum d'initiative citoyenne. On croit que le peuple doit avoir le droit de proposer, de voter, de décider directement des lois qui le gouvernent — sans passer par des intermédiaires qui ont intérêt à conserver leur pouvoir.",
      "Le changement ne viendra pas d'en haut. Il viendra du peuple — informé, lucide, organisé, et décidé à reprendre ce qui lui appartient. Par le vote. Par le référendum. Ensemble.",
    ],
  },
  {
    num: "04",
    img: "/apropos-04-france-opt.png",
    imgW: 1200, imgH: 839,
    alt: "Pour une France où il fait bon vivre — profits, privilèges, inégalités",
    titre: "Pour une France où il fait bon vivre",
    accroche: "Notre vision — et pourquoi on se bat chaque semaine",
    reversed: true,
    texte: [
      "On veut que la France redevienne un pays où il fait bon vivre. Un pays où travailler permet de bien vivre. Où les enfants ont accès à une éducation de qualité, où les malades sont soignés dignement, où les anciens ne choisissent pas entre manger et se chauffer.",
      "Ce n'est pas un rêve utopique. C'est ce que la France a déjà été — et ce qu'elle peut redevenir. Mais pas en élisant un nouveau sauveur tous les cinq ans pour constater, une fois de plus, que rien ne change. Pas avec des profits, des privilèges et des inégalités qui se creusent.",
      "DemoCrachi est là pour dire ce que beaucoup pensent tout bas, pour exposer ce que les grands médias taisent, et pour rappeler chaque semaine que la démocratie n'est pas une case à cocher — c'est un combat de tous les jours.",
    ],
  },
];

export default function AProposPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="bg-black border-b-4 border-[#CC0000] py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#CC0000] font-black mb-3">
            Qui sommes-nous
          </p>
          <h1
            className="text-[24px] sm:text-[30px] md:text-[38px] font-black uppercase leading-[1] tracking-tight text-white mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Aucun parti.<br />
            <span className="text-[#CC0000]">Un seul camp.</span>
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/55 leading-relaxed max-w-[620px] mb-10">
            On ne vote pas pour la gauche. On ne vote pas pour la droite.
            On ne vote pas pour le centre. Chez DemoCrachi, on pense
            que peu importe le parti — la situation des Français ne changera pas.
            Seul le peuple peut remettre la France sur les rails.
          </p>
          {/* Ancres */}
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a
                key={s.num}
                href={`#s${s.num}`}
                className="flex items-center gap-2 px-3 py-1.5 border border-white/15 text-white/50 text-[10px] font-bold tracking-widest uppercase hover:border-[#CC0000] hover:text-white transition-all"
              >
                <span className="text-[#CC0000]">{s.num}</span>
                {s.titre}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 sections éditoriales ── */}
      {SECTIONS.map((s, i) => (
        <section
          key={s.num}
          id={`s${s.num}`}
          className={`border-b border-[#EBEBEB] ${i % 2 === 1 ? "bg-[#F7F7F7]" : "bg-white"}`}
        >
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-20">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">

              {/* ── Image (paysage) ── */}
              <div className={`w-full lg:w-[55%] lg:shrink-0 ${s.reversed ? "lg:order-2" : "lg:order-1"}`}>
                <div className="overflow-hidden rounded-sm shadow-2xl group">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    width={s.imgW}
                    height={s.imgH}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* ── Texte ── */}
              <div className={`flex-1 min-w-0 ${s.reversed ? "lg:order-1" : "lg:order-2"}`}>
                <p className="text-[10px] font-black tracking-[0.35em] uppercase text-[#CC0000] mb-2">
                  {s.num} / 04
                </p>
                <h2
                  className="text-[18px] sm:text-[22px] font-black uppercase text-[#111] leading-[1.1] tracking-tight mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {s.titre}
                </h2>
                <p className="text-[12px] font-bold tracking-widest uppercase text-[#999] border-b border-[#E8E8E8] pb-5 mb-6">
                  {s.accroche}
                </p>
                <div className="space-y-4">
                  {s.texte.map((para, j) => (
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
      ))}

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
              href="/notre-combat"
              className="w-full sm:w-auto px-10 py-4 bg-[#CC0000] text-white text-[11px] font-black tracking-widest uppercase hover:bg-[#a80000] transition-colors text-center"
            >
              Notre manifeste →
            </Link>
            <Link
              href="/newsletter"
              className="w-full sm:w-auto px-10 py-4 border border-white/20 text-white text-[11px] font-black tracking-widest uppercase hover:border-white transition-colors text-center"
            >
              ♥ Soutenir le combat
            </Link>
            <Link
              href="/actu"
              className="w-full sm:w-auto px-10 py-4 border border-white/10 text-white/50 text-[11px] font-black tracking-widest uppercase hover:border-white/30 hover:text-white transition-colors text-center"
            >
              Lire les articles
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
