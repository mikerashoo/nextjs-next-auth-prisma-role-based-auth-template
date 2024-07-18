import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import React from "react";

function PageHeading({ title, action }: { title: string; action?: any }) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap md:flex-nowrap md:justify-between items-start  mb-4 gap-2 md:p-4 p-2">
      <h1 className="text-2xl font-bold text-gray-900 flex  w-full items-center">
        <ArrowBackIcon onClick={() => router.back()} /> {title}
      </h1>
      {action}
    </div>
  );
}

export default PageHeading;
