import { auth } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface contextProps {
  params: {
    id: string;
  };
}

export async function DELETE(req: Request, context: contextProps) {
  try {
    const { params } = context;
    await db.expense.delete({
      where: {
        id: params.id,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.log("erro:", error);
    return NextResponse.json(
      { message: "Could Not Delete Expense" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();
    await db.expense.update({
      where: {
        id: params.id,
      },
      data: {
        description: body.description,
        value: body.value,
        expenseTagId: body.expenseTagId,
        date: body.date,
        paid: body.paid,
      },
    });
    return NextResponse.json({ message: "Update Success" }, { status: 200 });
  } catch (error) {
    console.log("erro:", error);
    return NextResponse.json(
      { message: "Could Not Update Income" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, context: contextProps) {
  const session = await auth();
  if (!session) return new Response("No session found", { status: 401 });

  try {
    const { params } = context;
    const expense = await db.expense.findFirst({
      where: {
        id: params.id,
      },
      include: {
        ExpenseTag: true,
        User: true,
      },
    });
    return NextResponse.json(expense, { status: 200 });
  } catch (error) {
    if (error) console.log(error);
    return NextResponse.json(
      { message: "Could not fetch expense" },
      { status: 500 }
    );
  }
}
