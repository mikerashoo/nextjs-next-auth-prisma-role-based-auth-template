"use client";

import { PropsWithChildren, ReactNode } from "react";

 
export const PageLayout = ({ pageHeader, children }: {
  pageHeader: ReactNode
} & PropsWithChildren) => { 
    return (
       <div className="flex flex-col">
        {pageHeader}
        <div className="px-4 py-2">
          {children}
        </div>
       </div>
    ); 
};
 
