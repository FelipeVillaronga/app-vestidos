import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "../../../../lib/RentalManagementSystem";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req: Request) {
  const form = await req.formData();
  const email = (form.get("email") || "").toString().trim();

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  const result = subscribeToNewsletter(email);

  if ("error" in result) {
    const res = NextResponse.redirect(new URL("/?newsletter=error&message=already_subscribed", req.url));
    return res;
  }

  const res = NextResponse.redirect(new URL("/?newsletter=success", req.url));
  return res;
}
