import { NextResponse } from "next/server";
import  { prisma } from "@/lib/prisma";

type Ctx = { params: { id: string } };

export async function GET(_req: Request, { params }: Ctx) {
  const item = await prisma.gameSession.findUnique({ where: { id: params.id } });
  return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: Request, { params }: Ctx) {
  const body = await req.json();
  try {
    const updated = await prisma.gameSession.update({ where: { id: params.id }, data: body });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  try {
    await prisma.gameSession.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
