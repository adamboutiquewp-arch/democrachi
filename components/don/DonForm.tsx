"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const MONTANTS = [5, 10, 20, 50];

const APPEARANCE = {
  theme: "night" as const,
  variables: {
    colorPrimary: "#CC0000",
    colorBackground: "#0a0a0a",
    colorText: "#ffffff",
    colorDanger: "#CC0000",
    borderRadius: "0px",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  rules: {
    ".Input": { border: "1px solid rgba(255,255,255,0.15)", boxShadow: "none" },
    ".Input:focus": { border: "1px solid #CC0000", boxShadow: "none" },
    ".Label": { fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase" as const },
  },
};

function FormulaireCheckout({ montant, onRetour, onSucces }: {
  montant: number;
  onRetour: () => void;
  onSucces: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || loading) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Une erreur est survenue");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/don/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(montant * 100) }),
    });

    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret: data.clientSecret,
      confirmParams: { return_url: window.location.origin + "/newsletter?success=1" },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "Paiement refusé");
      setLoading(false);
    } else {
      onSucces();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center pb-5 border-b border-white/10">
        <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#CC0000] mb-1">
          Votre don
        </p>
        <p className="text-[42px] font-black text-white leading-none">{montant} €</p>
      </div>

      <PaymentElement />

      {error && <p className="text-[#CC0000] text-[13px]">{error}</p>}

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full py-4 bg-[#CC0000] text-white font-black uppercase tracking-widest text-[13px] hover:bg-[#a80000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Traitement..." : `Donner ${montant} €`}
      </button>

      <button
        type="button"
        onClick={onRetour}
        className="w-full text-center text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-widest uppercase"
      >
        ← Changer le montant
      </button>
    </form>
  );
}

export default function DonForm() {
  const [montant, setMontant] = useState(10);
  const [montantLibre, setMontantLibre] = useState("");
  const [etape, setEtape] = useState<"choix" | "paiement" | "succes">("choix");

  const montantFinal = montantLibre ? parseFloat(montantLibre) : montant;
  const montantValide = !isNaN(montantFinal) && montantFinal >= 1;

  if (etape === "succes") {
    return (
      <div className="text-center py-10">
        <div className="text-[64px] mb-4">✊</div>
        <h3 className="text-[22px] font-black uppercase text-white mb-3 tracking-tight">
          Merci pour ton soutien !
        </h3>
        <p className="text-[14px] text-white/50 leading-relaxed">
          Tu fais partie du combat.<br />DemoCrachi continue grâce à toi.
        </p>
      </div>
    );
  }

  if (etape === "paiement") {
    return (
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: Math.round(montantFinal * 100),
          currency: "eur",
          appearance: APPEARANCE,
        }}
      >
        <FormulaireCheckout
          montant={montantFinal}
          onRetour={() => setEtape("choix")}
          onSucces={() => setEtape("succes")}
        />
      </Elements>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-3">
        {MONTANTS.map((m) => (
          <button
            key={m}
            onClick={() => { setMontant(m); setMontantLibre(""); }}
            className={`py-3 font-black text-[15px] border-2 transition-colors ${
              montant === m && !montantLibre
                ? "bg-[#CC0000] border-[#CC0000] text-white"
                : "border-white/20 text-white hover:border-[#CC0000]"
            }`}
          >
            {m} €
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          placeholder="Autre montant"
          value={montantLibre}
          onChange={(e) => setMontantLibre(e.target.value)}
          className="flex-1 bg-transparent border-b-2 border-white/20 text-white py-2 px-1 text-[15px] outline-none focus:border-[#CC0000] placeholder:text-white/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-white/40 text-[15px]">€</span>
      </div>

      <button
        onClick={() => montantValide && setEtape("paiement")}
        disabled={!montantValide}
        className="w-full py-4 bg-[#CC0000] text-white font-black uppercase tracking-widest text-[13px] hover:bg-[#a80000] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Soutenir avec {montantValide ? montantFinal : "..."} € →
      </button>
    </div>
  );
}
