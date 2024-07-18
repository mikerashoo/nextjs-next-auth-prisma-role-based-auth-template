"use client";

import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogoIcon } from "../common/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Header({onToggle}) {
  const { user, loading } = useAuth();


  //
  // color={useColorModeValue("gray.50", "white")}

  return (
  <Box bg={useColorModeValue("white", "teal.500")} display={{
    base: "block",
    md: "none",
  }} className="w-full">
      <Flex
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
            <IconButton
               
              onClick={onToggle}
              icon={<HamburgerIcon w={5} h={5} />}
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
        <Flex
          flex={{ base: 1 }}
          display={'flex'}
          justify={{ base: "center", md: "start" }}
        >
          <Link href={"/"} className="flex flex-row">
            
            <Heading color={'teal'} className="inline-flex items-center " size={"md"} mr={2}>
             
            <LogoIcon />{" "} {user.provider.name}{" "}
            </Heading>
          </Link>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={"https://avatars.dicebear.com/api/male/username.svg"}
              />
            </MenuButton>
            <MenuList alignItems={"center"}>
              <br />
              <Center>
                <Avatar
                  size={"2xl"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </Center>
              <br />
              <Center>
                <p> {user.firstName}</p>
              </Center>
              <br />
              <Center>
                <p> Role: {user.role}</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem onClick={() => signOut()}>Sign Out </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
    </Box>
  );
}
 

  