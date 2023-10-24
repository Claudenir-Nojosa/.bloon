import { auth } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface contextProps {
  params: {
    id: string;
  };
}
export async function POST(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();
    const session = await auth();
    if (!session) return new Response("No session found", { status: 401 });

    const userId = session.user.id as string;

    const existingRecord = await db.userMonthlyLimit.findFirst({
      where: { expenseTagId: params.id },
    });

    if (existingRecord) {
      await db.userMonthlyLimit.update({
        where: { id: existingRecord.id },
        data: {
          monthlyLimit: body.monthlyLimit,
        },
      });

      return NextResponse.json(
        { message: "Limite atualizado com sucesso" },
        { status: 200 }
      );
    } else {
      const monthlyLimit = await db.userMonthlyLimit.create({
        data: {
          userId: userId,
          expenseTagId: params.id,
          monthlyLimit: body.monthlyLimit,
        },
      });

      return NextResponse.json(monthlyLimit, { status: 200 });
    }
  } catch (error) {
    console.log("erro:", error);
    return NextResponse.json(
      { message: "Não foi possível definir o limite da despesa" },
      { status: 500 }
    );
  }
}
export async function PATCH(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();
    const userMonthlyLimit = await db.userMonthlyLimit.findFirst({
      where: { expenseTagId: params.id },
    });

    if (!userMonthlyLimit) {
      return NextResponse.json(
        { message: "Registro não encontrado" },
        { status: 404 }
      );
    }

    await db.userMonthlyLimit.update({
      where: { id: userMonthlyLimit.id },
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

export async function GET(req: Request, context: contextProps) {
  const session = await auth();
  if (!session) return new Response("No session found", { status: 401 });

  try {
    const { params } = context;
    const userMonthlyLimit = await db.userMonthlyLimit.findFirst({
      where: {
        expenseTagId: params.id,
      },
    });
    return NextResponse.json(userMonthlyLimit, { status: 200 });
  } catch (error) {
    if (error) console.log(error);
    return NextResponse.json(
      { message: "Could not fetch ExpenseTag" },
      { status: 500 }
    );
  }
}
