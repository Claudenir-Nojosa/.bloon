import React, { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

interface ButtonActionProps {
  isIncome: boolean;
  id: string;
}

const ButtonAction: FC<ButtonActionProps> = ({ isIncome, id }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>...</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer hover:text-[#9633d9]">
          {isIncome ? (
            <Link href={`/incomes/${id}`}>Editar</Link>
          ) : (
            <Link href={`/expenses/${id}`}>Editar</Link>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:text-[#9633d9]">
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonAction;
