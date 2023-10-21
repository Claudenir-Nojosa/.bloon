import { auth } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) return new Response("No session found", { status: 401 });

  try {
    const expenses = await db.expense.findMany({
      select: {
        userId: true,
        id: true,
        description: true,
        value: true,
        date: true,
        expenseTagId: true,
        ExpenseTag: true,
        User: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        userId: session.user.id,
      },
    });
    return NextResponse.json({ expenses }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error)
      return NextResponse.json(
        { message: "Could not fetch expenses" },
        { status: 500 }
      );
  }
}
