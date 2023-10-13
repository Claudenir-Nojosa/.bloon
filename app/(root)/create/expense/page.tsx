import { ExpenseForm } from "@/components/forms/Expense";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

const ExpenseCreation = () => {
  return (
    <div className="h-5/6 flex items-center">
      <MaxWidthWrapper className="max-w-2xl">
        <ExpenseForm />
      </MaxWidthWrapper>
    </div>
  );
};

export default ExpenseCreation;
