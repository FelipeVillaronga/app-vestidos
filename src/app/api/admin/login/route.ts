import { NextResponse } from "next/server";
import { setAdminSession, verifyCsrfToken } from "@/lib/CsrfSessionManagement";

export async function POST(req: Request) {
  const form = await req.formData();
  const csrf = form.get("csrf")?.toString() ?? null;
  if (!verifyCsrfToken(csrf)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 400 });
  }
  const username = (form.get("username") || "").toString();
  const password = (form.get("password") || "").toString();

  // Read credentials from environment variables
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  // Security check: ensure environment variables are set
  if (!expectedUsername || !expectedPassword) {
    console.error("SECURITY ERROR: Admin credentials not configured in environment variables!");
    return NextResponse.json(
      { error: "Server configuration error. Please contact administrator." },
      { status: 500 }
    );
  }

  // Validate credentials
  if (!username || !password || username !== expectedUsername || password !== expectedPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  setAdminSession();
  return NextResponse.redirect(new URL("/admin", req.url));
}
