import { deleteItem } from "@/lib/RentalManagementSystem";
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

    const result = deleteItem(itemId);
    if ("error" in result) {
        return NextResponse.json({ error: result.error }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
}
