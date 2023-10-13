import { IncomeForm } from "@/components/forms/Income";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

const IncomeCreation = () => {
  return (
    <div className="h-5/6 flex items-center">
      <MaxWidthWrapper className="max-w-2xl">
        <IncomeForm />
      </MaxWidthWrapper>
    </div>
  );
};

export default IncomeCreation;
