import { ExpenseForm } from "@/components/forms/Expense";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { FC } from "react";

interface CreateExpensePageProps {
  params: {
    id: string;
  };
}

const ExpenseCreation: FC<CreateExpensePageProps> = ({ params }) => {
  return (
    <div className="h-5/6 flex items-center">
      <MaxWidthWrapper className="max-w-2xl">
        <ExpenseForm params={params} isEditing={false} />
      </MaxWidthWrapper>
    </div>
  );
};

export default ExpenseCreation;
