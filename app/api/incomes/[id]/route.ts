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
    await db.income.delete({
      where: {
        id: params.id,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.log("erro:", error);
    return NextResponse.json(
      { message: "Could Not Delete Income" },
      { status: 500 }
    );
  }
}
export async function PATCH(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();
    await db.income.update({
      where: {
        id: params.id,
      },
      data: {
        description: body.description,
        value: body.value,
        incomeTagId: body.incomeTagId,
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
    const income = await db.income.findFirst({
      where: {
        id: params.id,
      },
      include: {
        IncomeTag: true,
        User: true,
      },
    });
    return NextResponse.json(income, { status: 200 });
  } catch (error) {
    if (error) console.log(error);
    return NextResponse.json(
      { message: "Could not fetch income" },
      { status: 500 }
    );
  }
}
