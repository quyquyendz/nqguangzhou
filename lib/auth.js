import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

export function checkPassword(input) {
  return typeof input === "string" && input === process.env.ADMIN_PASSWORD;
}

export function isLoggedIn() {
  const token = cookies().get(COOKIE_NAME)?.value;
  return token === process.env.ADMIN_PASSWORD;
}

export function setSession() {
  cookies().set(COOKIE_NAME, process.env.ADMIN_PASSWORD, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSession() {
  cookies().delete(COOKIE_NAME);
}
