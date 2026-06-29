import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { amount } = await req.json();

  if (!amount || amount < 1) {
    return NextResponse.json({ error: "Montant invalide" }, { status: 400 });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: "eur",
    description: "Soutien à DemoCrachi",
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
