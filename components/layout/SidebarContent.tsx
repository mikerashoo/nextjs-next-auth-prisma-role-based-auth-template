import { ISubRoute } from "@/utils/route-configurations/routeRole";
import { BoxProps, Text,  useColorModeValue, Flex, Stack, Menu, MenuButton, HStack, Avatar, VStack, MenuList, MenuItem, MenuDivider, CloseButton, Box, Heading } from "@chakra-ui/react";
 
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FiChevronDown } from "react-icons/fi";
import Logo from "../common/Logo";
import NavItem from "./NavItem";
import ProviderNameHeader from "./ProviderNameHeader";

interface SidebarProps extends BoxProps {
    user?: User;
    routes: ISubRoute[];
    onClose: () => void;
  }
  
  const SidebarContent = ({ routes, user, onClose, ...rest }: SidebarProps) => {
    const router = useRouter();
  
    const selected = router.pathname.split('/')[1]; 
 
  
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue("white", "gray.100")} 
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex
          alignItems="start"
          mb={8}
          py={4} 
          justifyContent="space-between"
        bg={useColorModeValue("gray.50", "gray.200")}

        > 
          <Flex
            flexDirection={"column"}
            alignItems="center"
            px={2}
            justifyContent="center"
          >
            <Logo large={false} />
            <Stack display={{ base: "none", md: "flex" }}>
              {user && <ProviderNameHeader name={user.provider.name} />}
            </Stack>
           
          </Flex>
          <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
        </Flex>
        <div className="flex flex-col h-full">
          {routes.map((link) => (
            <NavItem
              onClose={onClose}
              key={link.route}
              selected={link.route == selected}
              link={link.route}
              icon={link.icon}
            >
              {link.label}
            </NavItem>
          ))}
        </div>
      </Box>
    );
  };



  export default SidebarContent;