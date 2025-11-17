import { NextResponse } from "next/server";
import { getUniqueColors, getUniqueStyles } from "@/lib/RentalManagementSystem";

// Disable caching for this API route
export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET() {
    const colors = getUniqueColors();
    const styles = getUniqueStyles();

    return NextResponse.json(
        { colors, styles },
        {
            headers: {
                "Cache-Control":
                    "no-store, no-cache, must-revalidate, proxy-revalidate",
                Pragma: "no-cache",
                Expires: "0",
            },
        }
    );
}
