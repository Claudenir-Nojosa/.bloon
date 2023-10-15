import { auth } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) return new Response("No session found", { status: 401 });

  try {
    const expenses = await db.expense.findMany({
      select: {
        value: true,
        id: true,
        userId: true,
        updatedAt: true,
        description: true,
        date: true,
        expenseTagId: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        userId: session.user.id,
      },
    });
    const incomes = await db.income.findMany({
      select: {
        value: true,
        id: true,
        userId: true,
        updatedAt: true,
        description: true,
        date: true,
        incomeTagId: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        userId: session.user.id,
      },
    });

    const combinedData = [...incomes, ...expenses];

    combinedData.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    return NextResponse.json({ combinedData }, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    if (error)
      return NextResponse.json(
        { message: "Could not fetch transactions" },
        { status: 500 }
      );
  }
}
