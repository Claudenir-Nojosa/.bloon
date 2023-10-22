import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ContasFuturas = () => {
  return (
    <Card className="min-h-fit">
      <CardHeader>
        <CardTitle>Contas a pagar</CardTitle>
        <CardDescription>Suas despesas ainda não pagas</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  );
};

export default ContasFuturas;
