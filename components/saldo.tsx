"use client";

import { Button } from "./ui/button";
import { AreaChart, Eye, EyeOff, Wallet } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { title as textTitle } from "@/components/shared/primitives";
import Budget from "./Budget";
import { useState } from "react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Saldo = () => {
  const [showData, setShowData] = useState(false);
  const { data: session, status } = useSession();

  const showDataHandler = () => {
    setShowData(!showData);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center w-full">
          <p className="text-4xl">
            Olá,{" "}
            <span className={textTitle({ color: "violet", size: "sm" })}>
              {session?.user?.name}
            </span>
            <span> 🪙</span>
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col justify-end items-start gap-2">
          <div className="mb-4"></div>
          {session?.user?.image === null ? (
            ""
          ) : (
            <div>
              <div className="flex gap-5 items-center">
                <Image
                  className="rounded-full"
                  src={session?.user?.image || ""}
                  height={80}
                  width={80}
                  alt={`${session?.user?.name} profile pic`}
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => showDataHandler()}
                >
                  {showData ? <Eye /> : <EyeOff />}
                </Button>
                <Badge variant="outline">
                  <div>
                    <p>Receita mensal</p>
                    {showData ? (
                      <span className="text-green-500">R$ 0,00</span>
                    ) : (
                      <span className="text-green-500">R$ --</span>
                    )}
                  </div>
                </Badge>
                <Badge variant="outline">
                  <div>
                    <p>Despesa mensal</p>
                    {showData ? (
                      <span className="text-red-500">R$ 0,00</span>
                    ) : (
                      <span className="text-red-500">R$ --</span>
                    )}
                  </div>
                </Badge>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-end">
          <Button
            className="mt-10 rounded-md gap-2 border bg-transparent border-purple-900"
            variant="outline"
          >
            <Wallet />
            <Link href="/dashboard">Verificar carteira!</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Saldo;
