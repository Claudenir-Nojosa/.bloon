import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FormInputExpense = {
  description: string;
  value: number;
  tagId: string;
};
