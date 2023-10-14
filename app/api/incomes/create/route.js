import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req) {
  const session = await auth();
  try {
    const body = await req.json();

    const income = await db.income.create({
      data: {
        description: body.description,
        value: body.value,
        date: body.date,
        User: {
          connect: {
            id: session.user.id,
          },
        },
        IncomeTag: {
          connect: {
            id: body.incomeTagId,
          },
        },
      },
    });
    return NextResponse.json(income, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Could not create income" },
      { status: 500 }
    );
  }
}
