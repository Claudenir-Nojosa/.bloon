import { IncomeForm } from "@/components/forms/Income";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { FC } from "react";

interface CreateIncomePageProps {
  params: {
    id: string;
  };
}

const IncomeCreation: FC<CreateIncomePageProps> = ({ params }) => {
  return (
    <div className="h-5/6 flex items-center">
      <MaxWidthWrapper className="max-w-2xl">
        <IncomeForm params={params} isEditing={false} />
      </MaxWidthWrapper>
    </div>
  );
};

export default IncomeCreation;
