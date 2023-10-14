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
import { IncomeTag, User } from "@prisma/client";
import { FC } from "react";
import { Pen, Trash } from "lucide-react";

interface IncomeCardProps {
  income: {
    id: string;
    description: string;
    value: number;
    IncomeTag: IncomeTag;
    User: User;
  };
}

const IncomeCard: FC<IncomeCardProps> = ({ income }) => {
  const { description, value, IncomeTag, id } = income;
  return (
    <Card className=" flex flex-col justify-center text-start rounded-3xl border-[#9633d9] border-opacity-70">
      <CardHeader>
        <CardTitle>{description}</CardTitle>
        <CardDescription className="dark:text-zinc-400">
          Categoria: {IncomeTag.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 text-green-700 font-semibold">
        R$ {value}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" size="icon" className="hover:text-[#9633d9]">
          <Link href={`/incomes/1`} className="hover:underline">
            <Pen />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="hover:text-[#9633d9]">
          <Link href={`/incomes/1`} className="hover:underline">
            <Trash />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IncomeCard;
