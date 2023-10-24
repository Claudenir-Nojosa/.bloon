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
    <Card>
      <CardHeader className="text-start">
        <h2 className="font-semibold mb-8 text-2xl md:text-start text-center">Acesso rápido</h2>
      </CardHeader>
      <CardContent>
        <div className="w-full md:flex-row flex-col flex md:justify-between gap-6 md:gap-20">
          <div>
            <Badge variant="outline" className="flex flex-col items-center">
              <Link href="/create/expense">
                <Button size="icon" variant="ghost">
                  <Image
                    src="https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/despesa.png?raw=true"
                    alt="Adicionar Despesa"
                    width={30}
                    height={30}
                  />
                </Button>
                <span>Adicionar despesa</span>
              </Link>
            </Badge>
          </div>
          <div>
            <Badge variant="outline" className="flex flex-col items-center">
              <Link href="/create/income">
                <Button size="icon" variant="ghost">
                <Image
                    src="https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/receita.png?raw=true"
                    alt="Adicionar Receita"
                    width={30}
                    height={30}
                  />
                </Button>
                <span>Adicionar receita</span>
              </Link>
            </Badge>
          </div>
          <div>
            <Badge variant="outline" className="flex flex-col items-center">
              <Link href="/goals">
                <Button size="icon" variant="ghost">
                <Image
                    src="https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/metas.png?raw=true"
                    alt="Metas de gastos"
                    width={30}
                    height={30}
                  />
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
