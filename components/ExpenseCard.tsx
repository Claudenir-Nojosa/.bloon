import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { ExpenseTag, User } from "@prisma/client";
import { FC } from "react";

interface ExpenseCardProps {
  expense: {
    id: string;
    description: string;
    value: number;
    ExpenseTag: ExpenseTag;
    User: User;
  };
}

const ExpenseCard: FC<ExpenseCardProps> = ({ expense }) => {
  const { description, value, ExpenseTag, id } = expense;
  return (
    <Card className="min-w-[10rem] min-h-[20rem] flex flex-col justify-center text-start">
      <CardHeader>
        <CardTitle>{description}</CardTitle>
        <CardDescription className="text-zinc-400">
          {ExpenseTag.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">{value}</CardContent>
      <CardFooter>
        <Button variant="outline">
          <Link href={`/expenses/1`} className="hover:underline">
            Saiba mais...
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExpenseCard;
