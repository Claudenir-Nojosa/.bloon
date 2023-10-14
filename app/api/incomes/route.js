import { auth } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) return new Response("No session found", { status: 401 });

  try {
    const incomes = await db.income.findMany({
      select: {
        userId: true,
        id: true,
        description: true,
        value: true,
        IncomeTag: true,
        User: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        userId: session.user.id,
      },
    });
    return NextResponse.json({ incomes }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error)
      return NextResponse.json(
        { message: "Could not fetch incomes" },
        { status: 500 }
      );
  }
}
