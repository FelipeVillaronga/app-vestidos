import { NextResponse } from "next/server";
import { listItems, type Category } from "../../../../lib/RentalManagementSystem";

// Disable caching for this API route
export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || undefined;
  const categoryParam = searchParams.get("category");
  const category = (categoryParam && ["dress", "shoes", "bag", "jacket"].includes(categoryParam))
    ? (categoryParam as Category)
    : undefined;
  const size = searchParams.get("size") || undefined;
  const color = searchParams.get("color") || undefined;
  const style = searchParams.get("style") || undefined;

  const items = listItems({ q, category, size, color, style }).map((i) => ({
    id: i.id,
    name: i.name,
    category: i.category,
    pricePerDay: i.pricePerDay,
    sizes: i.sizes,
    color: i.color,
    style: i.style,
    image: i.images[0],
    alt: i.alt,
  }));

  return NextResponse.json({ items }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  });
}
