import { updateItem } from "@/lib/RentalManagementSystem";
import { isAdmin } from "@/lib/CsrfSessionManagement";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!isAdmin()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const itemId = parseInt(id, 10);
    if (isNaN(itemId)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();
    const { name, category, pricePerDay, sizes, color, style, description, images, alt } = body;

    // Validaciones básicas
    if (name !== undefined && (!name || typeof name !== "string")) {
        return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    if (pricePerDay !== undefined && (typeof pricePerDay !== "number" || pricePerDay <= 0)) {
        return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    if (sizes !== undefined && (!Array.isArray(sizes) || sizes.length === 0)) {
        return NextResponse.json({ error: "Invalid sizes" }, { status: 400 });
    }

    // Construir objeto de actualizaciones solo con campos definidos
    const updates: Record<string, unknown> = {};
    if (name !== undefined) updates.name = name;
    if (category !== undefined) updates.category = category;
    if (pricePerDay !== undefined) updates.pricePerDay = pricePerDay;
    if (sizes !== undefined) updates.sizes = sizes;
    if (color !== undefined) updates.color = color;
    if (style !== undefined) updates.style = style;
    if (description !== undefined) updates.description = description;
    if (images !== undefined) updates.images = images;
    if (alt !== undefined) updates.alt = alt;

    const result = updateItem(itemId, updates);
    if ("error" in result) {
        return NextResponse.json({ error: result.error }, { status: 404 });
    }

    return NextResponse.json({ item: result.item });
}
