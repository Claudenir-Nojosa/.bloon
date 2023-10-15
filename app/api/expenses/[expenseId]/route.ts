import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface contextProps {
  params: {
    expenseId: string;
  };
}

export async function POST(context: contextProps) {
  try {
    const { params } = context;
    await db.expense.delete({
      where: {
        id: params.expenseId,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.log("erro ao deletar expense:", error);
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
        id: params.expenseId,
      },
      data: {
        description: body.description,
        value: body.value,
        date: body.date,
      },
    });
    return NextResponse.json({ message: "Update Success" }, { status: 200 });
  } catch (error) {
    console.log("erro:", error);
    return NextResponse.json(
      { message: "Could Not Update Expense" },
      { status: 500 }
    );
  }
}
