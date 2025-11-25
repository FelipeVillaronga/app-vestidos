import { NextResponse } from "next/server";
import { isAdmin } from "../../../../../../../lib/CsrfSessionManagement";
import { cancelRental } from "../../../../../../../lib/RentalManagementSystem";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { error } = cancelRental(id);
  
  if (error) {
    const res = NextResponse.redirect(new URL("/admin?rental=error&message=not_found", req.url));
    return res;
  }
  
  const res = NextResponse.redirect(new URL("/admin?rental=success", req.url));
  return res;
}
