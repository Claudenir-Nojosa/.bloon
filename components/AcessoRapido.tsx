import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Goal, GoalIcon, MinusCircle, PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";

const AcessoRapido = () => {
  return (
    <Card className=" dark:border-purple-950 dark:bg-gradient-to-r from-purple-900 via-purple-950 to-black">
      <CardHeader className="text-start">
        <h2 className="font-semibold mb-8 text-2xl">Acesso rápido</h2>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-between gap-20">
          <div>
            <Badge variant="outline" className="flex flex-col items-center">
              <Link href="/create/expense">
                <Button size="icon" variant="ghost">
                  <MinusCircle />
                </Button>
                <span>Adicionar despesa</span>
              </Link>
            </Badge>
          </div>
          <div>
            <Badge variant="outline" className="flex flex-col items-center">
              <Link href="/create/income">
                <Button size="icon" variant="ghost">
                  <PlusCircle />
                </Button>
                <span>Adicionar receita</span>
              </Link>
            </Badge>
          </div>
          <div>
            <Badge variant="outline" className="flex flex-col items-center">
              <Link href="/goals">
                <Button size="icon" variant="ghost">
                  <GoalIcon />
                </Button>
                <span>Consultar metas</span>
              </Link>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcessoRapido;
