import { NextResponse } from "next/server";
import { createLenderApplication } from "@/lib/RentalManagementSystem";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const phoneDigits = phone.replace(/\D/g, "");
  return phoneDigits.length >= 10;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const {
      fullName,
      email,
      phone,
      itemTypes,
      approximateQuantity,
      message,
    } = body;

    // Validation
    if (!fullName || !email || !phone || !itemTypes || !approximateQuantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    const quantity = Number(approximateQuantity);
    if (isNaN(quantity) || quantity < 1) {
      return NextResponse.json(
        { error: "Invalid quantity" },
        { status: 400 }
      );
    }

    const { application } = createLenderApplication({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      itemTypes: itemTypes.trim(),
      approximateQuantity: quantity,
      message: message?.trim() || undefined,
    });
    
    console.log("📧 [SIMULATED EMAIL] To: admin@glamrent.com");
    console.log("Subject: New Lender Application Received");
    console.log(`Applicant: ${application.fullName} (${application.email})`);
    console.log(`Item Types: ${application.itemTypes}`);
    console.log(`Quantity: ${application.approximateQuantity}`);
    console.log("---");
    
    console.log("📧 [SIMULATED EMAIL] To:", application.email);
    console.log("Subject: Thank you for your lender application!");
    console.log("Body: We have received your application and will contact you soon.");
    console.log("---");

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        applicationId: application.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing lender application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
