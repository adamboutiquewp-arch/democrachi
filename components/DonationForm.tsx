"use client";

import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const AMOUNTS = [5, 10, 20, 50];

function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Une erreur est survenue");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/stripe/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const { clientSecret, error: apiError } = await res.json();
    if (apiError) {
      setError(apiError);
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: { return_url: window.location.origin + "/soutenir?success=1" },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "Paiement refusé");
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-[64px] mb-4">✊</div>
        <h3 className="text-[22px] font-black uppercase text-white mb-2">
          Merci pour ton soutien&nbsp;!
        </h3>
        <p className="text-[#777] text-[14px]">
          Tu fais partie du combat. DemoCrachi continue grâce à toi.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />
      {error && (
        <p className="text-[#CC0000] text-[13px]">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full py-4 bg-[#CC0000] text-white font-black uppercase tracking-widest text-[13px] hover:bg-[#a80000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Traitement..." : `Donner ${amount} €`}
      </button>
    </form>
  );
}

export default function DonationForm() {
  const [amount, setAmount] = useState(10);
  const [custom, setCustom] = useState("");
  const [step, setStep] = useState<"choose" | "pay">("choose");

  const finalAmount = custom ? parseFloat(custom) : amount;

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {step === "choose" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-3">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => { setAmount(a); setCustom(""); }}
                className={`py-3 font-black text-[15px] border-2 transition-colors ${
                  amount === a && !custom
                    ? "bg-[#CC0000] border-[#CC0000] text-white"
                    : "border-white/20 text-white hover:border-[#CC0000]"
                }`}
              >
                {a}&nbsp;€
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              placeholder="Autre montant"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); }}
              className="flex-1 bg-transparent border-b-2 border-white/20 text-white py-2 px-1 text-[15px] outline-none focus:border-[#CC0000] placeholder:text-white/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-white/50 text-[15px]">€</span>
          </div>

          <button
            onClick={() => finalAmount >= 1 && setStep("pay")}
            disabled={finalAmount < 1 || isNaN(finalAmount)}
            className="w-full py-4 bg-[#CC0000] text-white font-black uppercase tracking-widest text-[13px] hover:bg-[#a80000] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Soutenir avec {isNaN(finalAmount) ? "..." : finalAmount}&nbsp;€ →
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <button
            onClick={() => setStep("choose")}
            className="text-[#777] text-[12px] uppercase tracking-widest hover:text-white transition-colors"
          >
            ← Changer le montant ({finalAmount}&nbsp;€)
          </button>
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: Math.round(finalAmount * 100),
              currency: "eur",
              appearance: {
                theme: "night",
                variables: {
                  colorPrimary: "#CC0000",
                  colorBackground: "#0a0a0a",
                  colorText: "#ffffff",
                  borderRadius: "0px",
                },
              },
            }}
          >
            <CheckoutForm amount={finalAmount} />
          </Elements>
        </div>
      )}
    </div>
  );
}
