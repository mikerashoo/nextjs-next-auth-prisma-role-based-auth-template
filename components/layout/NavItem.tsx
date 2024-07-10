import { Box, FlexProps } from "@chakra-ui/react"; 
import { User } from "next-auth";
import { ReactNode } from "react";

import NextLink from "next/link";

interface NavItemProps extends FlexProps {
    icon: ReactNode;
    link: string;
    children: React.ReactNode;
    selected?: boolean;
    onClose: () => void;
  }
  
  interface MobileProps extends FlexProps {
    onOpen: () => void;
    user?: User;
  }
  
  
  const NavItem = ({
    icon,
    link,
    onClose,
    children,
    selected,
    ...rest
  }: NavItemProps) => {
    return (
      <Box
        as={NextLink}
        href={'/' + link}
        onClick={onClose}
        cursor="pointer"
        my={0.1}
        _hover={{
          bg: selected ? '' : 'gray.100',
        }} 
        textColor={selected ? "teal.400" : "gray.500"}
        className={`flex items-center px-4 py-2 ${selected ? ' border-l-8 bg-gray-100 font-bold' : 'border-l-0'} border-teal-500  `}
        {...rest}
      >
 {/* {icon} */}
        {children}
      </Box>
    );
  };

  export default NavItem;