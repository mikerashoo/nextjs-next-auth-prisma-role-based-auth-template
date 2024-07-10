import React, { PropsWithChildren, ReactNode } from "react";

import NextLink, { LinkProps } from "next/link";
import { Link } from "@chakra-ui/react";
import clsx from "clsx";

import { usePathname } from 'next/navigation'; 

interface AppLinkProps extends PropsWithChildren { 
  href: string;
  className?: string;
  fromHome?: boolean;
}
function AppLink({ href, className, children, fromHome }: AppLinkProps) {
  const path = usePathname();
  fromHome = fromHome ?? href.startsWith('/')
  href = fromHome ? href : path + '/' + href;
  return (
    <Link
     as={NextLink} 
     href={
       href
     } 
     className={clsx(
        className,
        `rounded py-1 bg-gray-100 border-gray-300 font-bold px-4 border text-sm text-white text-center h-fit flex items-center justify-center gap-2`, 
      )}
     >
      {children}
    </Link>
  );
}

export default AppLink;
