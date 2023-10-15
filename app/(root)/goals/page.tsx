"use client";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Expense, Income, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";

const Goals = () => {
  return (
    <MaxWidthWrapper className="max-w-xl mb-12 sm:mt-15 flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl mt-10">Página será construída ainda...</h1>
    </MaxWidthWrapper>
  );
};

export default Goals;
