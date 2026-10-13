import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { getProducts, createProduct } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request) {
  if (!isLoggedIn()) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }
  const body = await request.json();
  const product = await createProduct({
    code: body.code,
    name: body.name,
    category: body.category,
    price: Number(body.price),
    image_url: body.image_url || null,
  });
  return NextResponse.json(product, { status: 201 });
}
