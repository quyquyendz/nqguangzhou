import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isLoggedIn } from "@/lib/auth";

export async function POST(request) {
  if (!isLoggedIn()) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }
  const file = (await request.formData()).get("file");
  if (!file) {
    return NextResponse.json({ error: "Thiếu file" }, { status: 400 });
  }
  const blob = await put(`products/${Date.now()}-${file.name}`, file, {
    access: "public",
  });
  return NextResponse.json({ url: blob.url });
}
