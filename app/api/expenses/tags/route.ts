import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const expenseTags = await db.expenseTag.findMany();
    return NextResponse.json(expenseTags, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch Expense tags" },
      { status: 500 }
    );
  }
}
