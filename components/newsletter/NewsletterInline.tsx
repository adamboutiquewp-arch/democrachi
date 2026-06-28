"use client";

import { useState } from "react";

export default function NewsletterInline() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) { setStatus("ok"); setEmail(""); }
      else { setStatus("error"); setMsg(data.error || "Erreur"); }
    } catch {
      setStatus("error");
      setMsg("Une erreur est survenue");
    }
  };

  if (status === "ok") {
    return (
      <div className="text-center py-4">
        <p className="text-white font-bold text-[15px]">Tu es inscrit(e) !</p>
        <p className="text-[#777] text-[12px] mt-1">Bienvenue dans la résistance.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre email"
        required
        className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white placeholder-[#555] focus:outline-none focus:border-[#CC0000] text-[13px] transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 bg-[#CC0000] text-white text-[12px] font-black tracking-widest uppercase hover:bg-[#a80000] transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Je m'abonne"}
      </button>
      {status === "error" && <p className="text-[11px] text-red-400">{msg}</p>}
      <p className="text-[10px] text-[#444] text-center">Aucun spam. Jamais.</p>
    </form>
  );
}
