import UnAuthorized from "@/components/auth/UnAuthorized";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function unauthorized() { 
  return (
   <UnAuthorized />
  );
}

export default unauthorized;
