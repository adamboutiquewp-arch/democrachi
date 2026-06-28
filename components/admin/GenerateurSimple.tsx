"use client";

import { useState, useRef } from "react";
import Link from "next/link";

type Status = "idle" | "uploading" | "generating" | "ok" | "error";

export default function GenerateurSimple() {
  const [sujet, setSujet] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ articleId: string; titre: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoPreview(URL.createObjectURL(file));
    setImageUrl(null);
    setStatus("uploading");
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Erreur upload");
      setImageUrl(data.url);
      setStatus("idle");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur upload");
      setStatus("error");
    }
  };

  const generate = async () => {
    if (!sujet.trim() || !imageUrl || status !== "idle") return;
    setStatus("generating");
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/admin/generate-custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sujet: sujet.trim(), imageUrl, useWebSearch: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur génération");
      setResult(data);
      setStatus("ok");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
      setStatus("error");
    }
  };

  const reset = () => {
    setSujet("");
    setPhotoPreview(null);
    setImageUrl(null);
    setStatus("idle");
    setError("");
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const canGenerate = sujet.trim().length > 0 && imageUrl !== null;

  if (status === "ok" && result) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-[18px] font-black text-green-800 mb-1">Article généré !</p>
        <p className="text-[14px] text-green-700 mb-6 line-clamp-2">{result.titre}</p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href={`/admin/articles/${result.articleId}`}
            className="px-6 py-3 bg-green-700 text-white text-[13px] font-bold rounded-lg hover:bg-green-800 transition-colors"
          >
            Voir et publier →
          </Link>
          <button
            onClick={reset}
            className="px-6 py-3 bg-white border border-green-200 text-green-700 text-[13px] font-bold rounded-lg hover:bg-green-50 transition-colors"
          >
            Nouvel article
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* Photo */}
      <div>
        <label className="block text-[11px] font-bold tracking-wider uppercase text-[#999] mb-2">
          Photo / Caricature *
        </label>
        {photoPreview ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoPreview} alt="" className="w-full h-56 object-cover rounded-xl border border-[#E8E8E8]" />
            {status === "uploading" && (
              <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center gap-2 text-[13px] font-bold text-[#111]">
                <Spinner /> Upload en cours…
              </div>
            )}
            {imageUrl && (
              <span className="absolute top-3 right-3 bg-green-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                ✓ Prête
              </span>
            )}
            <button
              onClick={() => { setPhotoPreview(null); setImageUrl(null); if (fileRef.current) fileRef.current.value = ""; }}
              className="mt-2 text-[12px] text-[#999] hover:text-[#E53935] transition-colors"
            >
              Changer la photo
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-[#E8E8E8] rounded-xl p-12 text-center cursor-pointer hover:border-[#E53935] hover:bg-[#FFF5F5] transition-all"
          >
            <svg className="w-10 h-10 text-[#ccc] mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p className="text-[14px] font-bold text-[#666]">Clique pour ajouter la photo</p>
            <p className="text-[12px] text-[#bbb] mt-1">JPG, PNG, WebP</p>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
      </div>

      {/* Sujet */}
      <div>
        <label className="block text-[11px] font-bold tracking-wider uppercase text-[#999] mb-2">
          Sujet de l&apos;article *
        </label>
        <textarea
          value={sujet}
          onChange={(e) => setSujet(e.target.value)}
          placeholder="Ex : Macron ment sur les retraites pendant que les élites s'enrichissent…"
          rows={4}
          disabled={status === "generating"}
          className="w-full px-4 py-3 border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#111] transition-colors resize-none disabled:opacity-50 disabled:bg-[#F9F9F9]"
        />
      </div>

      {/* Erreur */}
      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <svg className="w-5 h-5 text-[#E53935] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-[13px] text-red-700 font-medium">{error}</p>
          <button onClick={() => setStatus("idle")} className="ml-auto text-[12px] text-[#E53935] font-bold hover:underline">
            Réessayer
          </button>
        </div>
      )}

      {/* Bouton générer */}
      <button
        onClick={generate}
        disabled={!canGenerate || status === "generating" || status === "uploading"}
        className={`w-full py-4 rounded-xl text-[14px] font-black tracking-wide uppercase transition-all flex items-center justify-center gap-3 ${
          status === "generating"
            ? "bg-[#F5F5F5] text-[#999] cursor-wait"
            : !canGenerate || status === "uploading"
            ? "bg-[#F5F5F5] text-[#ccc] cursor-not-allowed"
            : "bg-[#E53935] text-white hover:bg-[#c62828] shadow-lg hover:shadow-xl"
        }`}
      >
        {status === "generating" ? (
          <><Spinner /> Claude rédige l&apos;article… (20–40 sec)</>
        ) : status === "uploading" ? (
          <><Spinner /> Upload de la photo…</>
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Générer l&apos;article
          </>
        )}
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}
