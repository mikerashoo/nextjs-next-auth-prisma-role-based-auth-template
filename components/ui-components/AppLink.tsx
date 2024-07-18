import React, { PropsWithChildren, ReactNode } from "react";

import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
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
  href = fromHome ? '/' + href : path + '/' + href;




  return (<Link as={NextLink} href={href} className="border px-4 py-1 font-normal hover:bg-gray-300 rounded-md">
    {children}
  </Link>
  )

}

export default AppLink;
