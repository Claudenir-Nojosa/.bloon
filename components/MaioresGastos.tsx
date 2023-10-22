import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MaioresGastos = () => {
  return (
    <Card className="min-h-fit">
      <CardHeader>
        <CardTitle>Maiores Gastos do mês atual</CardTitle>
        <CardDescription>Onde você gastou mais durante o mês</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  );
};

export default MaioresGastos;
