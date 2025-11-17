import { addItem } from "@/lib/RentalManagementSystem";
import { isAdmin } from "@/lib/CsrfSessionManagement";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    if (!isAdmin()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, category, pricePerDay, sizes, color, style, description, images, alt } = body;

        // Validaciones requeridas
        if (!name || typeof name !== "string" || name.trim().length === 0) {
            return NextResponse.json({ error: "El nombre es requerido" }, { status: 400 });
        }

        if (!category || !["dress", "shoes", "bag", "jacket"].includes(category)) {
            return NextResponse.json({ error: "Categoría inválida" }, { status: 400 });
        }

        if (!pricePerDay || typeof pricePerDay !== "number" || pricePerDay <= 0) {
            return NextResponse.json({ error: "El precio debe ser mayor a 0" }, { status: 400 });
        }

        if (!sizes || !Array.isArray(sizes) || sizes.length === 0) {
            return NextResponse.json({ error: "Debe especificar al menos una talla" }, { status: 400 });
        }

        if (!color || typeof color !== "string" || color.trim().length === 0) {
            return NextResponse.json({ error: "El color es requerido" }, { status: 400 });
        }

        if (!description || typeof description !== "string" || description.trim().length === 0) {
            return NextResponse.json({ error: "La descripción es requerida" }, { status: 400 });
        }

        // Valores por defecto para campos opcionales
        const itemData = {
            name: name.trim(),
            category,
            pricePerDay,
            sizes,
            color: color.trim(),
            style: style?.trim() || undefined,
            description: description.trim(),
            images: images && Array.isArray(images) && images.length > 0
                ? images
                : ["/images/dresses/placeholder.jpg"],
            alt: alt?.trim() || `${name.trim()} - ${color.trim()}`,
        };

        const result = addItem(itemData);
        return NextResponse.json({ item: result.item }, { status: 201 });
    } catch (error) {
        console.error("Error adding item:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}
