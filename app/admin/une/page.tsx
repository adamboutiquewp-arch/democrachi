import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import UneGestionCard from "@/components/admin/UneGestionCard";

export const metadata: Metadata = { title: "Article à la une" };
export const dynamic = "force-dynamic";

export default async function UnePage() {
  const uneGlobale = await prisma.article.findFirst({
    where: { statut: "PUBLISHED", featured: true },
    select: { id: true, titre: true, chapo: true, imageUrl: true, slug: true },
  });

  const allPublished = await prisma.article.findMany({
    where: { statut: "PUBLISHED" },
    select: {
      id: true,
      titre: true,
      featured: true,
      imageUrl: true,
      chapo: true,
      slug: true,
    },
    orderBy: { datePublication: "desc" },
    take: 50,
  });

  return (
    <div className="max-w-[680px]">
      <div className="mb-8">
        <h1 className="text-[22px] font-black text-[#111]">Article à la une</h1>
        <p className="text-[13px] text-[#999] mt-0.5">
          L&apos;article affiché en grand sur la page d&apos;accueil
        </p>
      </div>

      {allPublished.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-12 text-center">
          <p className="text-[14px] text-[#bbb]">Aucun article publié pour l&apos;instant.</p>
          <p className="text-[12px] text-[#ccc] mt-1">Crée et publie un article pour le mettre à la une.</p>
        </div>
      ) : (
        <UneGestionCard
          type="global"
          couleur="#E53935"
          nomCategorie="Page d'accueil"
          uneArticle={
            uneGlobale
              ? {
                  id: uneGlobale.id,
                  titre: uneGlobale.titre,
                  imageUrl: uneGlobale.imageUrl,
                  chapo: uneGlobale.chapo || "",
                  slug: uneGlobale.slug,
                  featuredCategorie: true,
                }
              : null
          }
          articles={allPublished.map((a) => ({
            id: a.id,
            titre: a.titre,
            imageUrl: a.imageUrl,
            chapo: a.chapo,
            slug: a.slug,
            featuredCategorie: a.featured,
          }))}
          categorieId={null}
        />
      )}
    </div>
  );
}
