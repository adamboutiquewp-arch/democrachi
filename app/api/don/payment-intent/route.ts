import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
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
}
