import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Goal } from "lucide-react";

const AcessoRapido = () => {
  return (
    <div className="text-start">
      <h2 className="font-semibold mb-8">Acesso rápido</h2>
      <div className="flex">
        <Button size="icon" variant="ghost">
          <Image
            src="https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/expensesIcon.png?raw=true"
            alt="Expense Image"
            height={60}
            width={60}
            className="m-6"
          />
        </Button>
        <Button size="icon" variant="ghost">
          <Image
            src="https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/incomesIcon.png?raw=true"
            alt="Income Image"
            height={60}
            width={60}
            className="m-6"
          />
        </Button>
        <Button size="icon" variant="ghost">
          <Goal />
        </Button>
      </div>
    </div>
  );
};

export default AcessoRapido;
