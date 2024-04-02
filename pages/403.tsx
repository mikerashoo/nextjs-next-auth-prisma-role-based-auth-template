import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function unauthorized() { 
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <h1 className="uppercase tracking-widest text-gray-500">
        403 | UnAuthorized
      </h1>
      
    </div>
  );
}

export default unauthorized;
