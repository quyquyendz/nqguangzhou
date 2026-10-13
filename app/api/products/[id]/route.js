import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { updateProduct, deleteProduct } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PUT(request, { params }) {
  if (!isLoggedIn()) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }
  const body = await request.json();
  const product = await updateProduct(Number(params.id), {
    code: body.code,
    name: body.name,
    category: body.category,
    price: Number(body.price),
    image_url: body.image_url || null,
  });
  return NextResponse.json(product);
}

export async function DELETE(request, { params }) {
  if (!isLoggedIn()) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }
  await deleteProduct(Number(params.id));
  return NextResponse.json({ ok: true });
    }
