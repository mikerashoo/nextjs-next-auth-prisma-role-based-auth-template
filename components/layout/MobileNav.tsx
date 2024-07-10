import { FlexProps, Flex, useColorModeValue, IconButton } from "@chakra-ui/react";
import { User } from "next-auth";
import { FiMenu } from "react-icons/fi";
import ProviderNameHeader from "./ProviderNameHeader";

interface MobileProps extends FlexProps {
    onOpen: () => void;
    user?: User;
  }
  
   
  
  const MobileNav = ({ onOpen, user, ...rest }: MobileProps) => {
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        display={{ base: "flex", md: "none" }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <ProviderNameHeader name={user.provider.name} />
      </Flex>
    );
  };

  export default MobileNav;