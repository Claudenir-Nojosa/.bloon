import { auth } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return new Response("No session found", { status: 401 });

    const userId = session.user.id as string;

    const userMonthlyLimit = await db.userMonthlyLimit.findMany({
      select: {
        ExpenseTag: true,
        monthlyLimit: true,
      },
      where: {
        userId: userId,
      },
    });
    return NextResponse.json(userMonthlyLimit, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch Expense tags limits" },
      { status: 500 }
    );
  }
}
