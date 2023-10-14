import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const incomeTags = await db.incomeTag.findMany();
    return NextResponse.json(incomeTags, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch Income tags" },
      { status: 500 }
    );
  }
}
