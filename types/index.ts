import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FormInputExpense = {
  description: string;
  value: number;
  expenseTagId: string;
  date: Date;
};
export type FormInputIncome = {
  description: string;
  value: number;
  incomeTagId: string;
  date: Date;
};
