import { Button } from "./ui/button";
import { AreaChart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { title as textTitle } from "@/components/shared/primitives";
import Budget from "./Budget";

const Saldo = async () => {
  const session = await auth();
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      <div className="mb-4 flex flex-col justify-start items-start gap-2">
        <div className="flex items-center w-full">
          <p className="text-4xl">
            Olá,{" "}
            <span className={textTitle({ color: "violet", size: "sm" })}>
              {session?.user?.name}
            </span>
            <span> 🪙</span>
          </p>
        </div>
      </div>

      {session?.user?.image === null ? (
        ""
      ) : (
        <div className="flex gap-5 items-center">
          <Image
            className="rounded-full"
            src={session?.user?.image || ""}
            height={80}
            width={80}
            alt={`${session?.user?.name} profile pic`}
          />
          <Button
            className="mt-10 rounded-2xl gap-2 border border-purple-900"
            variant="outline"
          >
            <AreaChart />
            <Link href="/dashboard">Verificar carteira!</Link>
          </Button>
        </div>
      )}
      <Budget />
    </div>
  );
};

export default Saldo;
