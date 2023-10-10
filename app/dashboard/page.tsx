import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { auth } from "@/lib/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  console.log(session);
  return (
    <MaxWidthWrapper className="mb-12 mt-20 sm:mt-15 flex flex-col items-center justify-center text-center">
      <h1>Seja bem vindo!</h1>
      <pre>{session?.user.name}</pre>
    </MaxWidthWrapper>
  );
};

export default page;
