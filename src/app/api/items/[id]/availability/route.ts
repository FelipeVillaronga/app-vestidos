import { NextResponse } from "next/server";
import { getItem, getItemRentals } from "@/lib/RentalManagementSystem";

// Disable caching for this API route
export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const item = getItem(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const rentals = getItemRentals(id).map((r) => ({ start: r.start, end: r.end }));
  return NextResponse.json({ rentals }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  });
}
