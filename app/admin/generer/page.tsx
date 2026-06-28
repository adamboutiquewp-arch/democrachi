import type { Metadata } from "next";
import GenerateurSimple from "@/components/admin/GenerateurSimple";

export const metadata: Metadata = { title: "Générer un article" };

export default function GenererPage() {
  return (
    <div className="max-w-[680px]">
      <div className="mb-8">
        <h1 className="text-[22px] font-black text-[#111]">Créer un article</h1>
        <p className="text-[13px] text-[#999] mt-0.5">
          Ajoute une photo et un sujet — Claude rédige l&apos;article automatiquement
        </p>
      </div>
      <GenerateurSimple />
    </div>
  );
}
