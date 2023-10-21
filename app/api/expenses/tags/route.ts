import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    await db.expenseTag.update({
      where: { id: body.expenseTagId },
      data: {
        monthlyLimit: body.monthlyLimit,
      },
    });
    return NextResponse.json(
      { message: "ExpenseTag Setted Limit Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("erro:", error);
    return NextResponse.json(
      { message: "Could Not Set a Limit in the ExpenseTag" },
      { status: 500 }
    );
  }
}

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
