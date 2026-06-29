import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();
    if (!amount || typeof amount !== "number" || amount < 100) {
      return NextResponse.json({ error: "Montant invalide" }, { status: 400 });
    }
    await prisma.don.create({ data: { montant: amount } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[don/confirm]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
