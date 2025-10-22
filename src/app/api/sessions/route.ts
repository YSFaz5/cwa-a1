import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const list = await prisma.gameSession.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const { type, stage, seconds } = await req.json();

  if (!type || typeof stage !== "number" || typeof seconds !== "number") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const start = Date.now();
  const created = await prisma.gameSession.create({
    data: { type, stage, seconds },
  });
  const end = Date.now();
  console.log(`POST /api/sessions took ${end - start} ms`);

  return NextResponse.json(created, { status: 201 });
}

