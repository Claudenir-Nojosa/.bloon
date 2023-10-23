import { auth } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface contextProps {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();
    await db.expenseTag.update({
      where: { id: params.id },
      data: {
        monthlyLimit: body.monthlyLimit,
      },
    });
    return NextResponse.json(
      { message: "ExpenseTag changed Limit Successfully" },
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
    const expenseTag = await db.expenseTag.findFirst({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(expenseTag, { status: 200 });
  } catch (error) {
    if (error) console.log(error);
    return NextResponse.json(
      { message: "Could not fetch ExpenseTag" },
      { status: 500 }
    );
  }
}
