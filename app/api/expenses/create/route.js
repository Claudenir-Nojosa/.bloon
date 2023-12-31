import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req) {
  const session = await auth();
  try {
    const body = await req.json();

    const expense = await db.expense.create({
      data: {
        description: body.description,
        value: body.value,
        date: body.date,
        paid: body.paid,
        User: {
          connect: {
            id: session.user.id,
          },
        },
        ExpenseTag: {
          connect: {
            id: body.expenseTagId,
          },
        },
      },
    });
    return NextResponse.json(expense, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Could not create expense" },
      { status: 500 }
    );
  }
}
