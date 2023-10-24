"use client";

import { useEffect } from "react";
import { IncomeForm } from "@/components/forms/Income";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { FC } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CreateIncomePageProps {
  params: {
    id: string;
  };
}

const IncomeCreation: FC<CreateIncomePageProps> = ({ params }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  });
  return (
    <div className="sm:h-5/6 flex items-center mb-24">
      <MaxWidthWrapper className="max-w-2xl mt-5">
        <IncomeForm params={params} isEditing={false} />
      </MaxWidthWrapper>
    </div>
  );
};

export default IncomeCreation;
