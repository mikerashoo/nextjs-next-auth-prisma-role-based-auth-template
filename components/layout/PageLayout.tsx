"use client";

import { Box, useColorModeValue } from "@chakra-ui/react";
import { PropsWithChildren, ReactNode } from "react";

 
export const PageLayout = ({ pageHeader, children }: {
  pageHeader: ReactNode
} & PropsWithChildren) => { 
    return (
       <div className="flex flex-col h-full min-h-screen w-full bg-gray-100  gap-0">
        {pageHeader} 
        <Box className="flex p-2 min-h-svh  h-full w-full bg-gray-100 ">
        {children} 

        </Box>
       </div>
    ); 
};
 
