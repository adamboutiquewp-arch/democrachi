import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!.trim(), {
      apiVersion: "2026-06-24.dahlia",
    });

    const { amount } = await req.json();

    if (!amount || typeof amount !== "number" || amount < 100) {
      return NextResponse.json({ error: "Montant minimum : 1€" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      description: "Don à DemoCrachi",
      metadata: { source: "page-don" },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("[don/payment-intent]", err);
    return NextResponse.json(
      { error: "Erreur serveur. Réessayez." },
      { status: 500 }
    );
  }
}
