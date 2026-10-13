import { NextResponse } from "next/server";
import { checkPassword, setSession, clearSession } from "@/lib/auth";

export async function POST(request) {
  const { password } = await request.json();
  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Sai mật khẩu" }, { status: 401 });
  }
  setSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  clearSession();
  return NextResponse.json({ ok: true });
}
