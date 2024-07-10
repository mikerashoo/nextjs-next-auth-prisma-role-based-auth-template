import React, { PropsWithChildren, useEffect, useState } from "react";
import PageLoading from "../ui-components/PageLoading";
import SignInForm from "../auth/SignInForm"; 
import { BACKEND_TEST_URL } from "@/utils/types/constants/backend-constants";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Breadcrumb, BreadcrumbItem, Drawer, DrawerContent, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { capitalizeFirst } from "@/utils/constants";
import Link from "next/link";
import GeneralErrorComponent from "../ui-components/GeneralErrorComponent";
import { ISubRoute } from "@/utils/route-configurations/routeRole";
import { HomeIcon, HomeModernIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import MobileNav from "./MobileNav";
import SidebarContent from "./SidebarContent";

function AppLayout({ children }: PropsWithChildren) {
  const { isAuthenticated, loading, logout, user } = useAuth();

  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const checkConnection = async () => {
    try {
      setIsChecking(true);
      setError(null);

      const response = await fetch(BACKEND_TEST_URL);

      if (response.ok) {
        setIsChecking(false);
      } else {
        setIsChecking(false);
        setError("Connection Failed. Please Try Again");
      }
    } catch (error) {
      console.error("Backend Connection Test Error:", error);
      setIsChecking(false);

      setError("Connection Failed. Please Try Again");
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  if (loading || isChecking) return <PageLoading />;

  if (error)
    return <GeneralErrorComponent error={error} onTryAgain={checkConnection} />;

  if (!isAuthenticated) {
    return <SignInForm />;
  } else {
    return (
      <PageWrapper>
        {/* <PageBreadCrumbs /> */}

        {children}
      </PageWrapper>
    );
  }
}

const PageWrapper = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: session, status } = useSession();
  const bg  = useColorModeValue("gray.100", "gray.800");

  if (status == "loading") return <PageLoading />;
  if (status == "unauthenticated") return <SignInForm />;
  //  const navs = session && session.user ? RouteRoles.find(rRoute => 'PROVIDER_ADMIN').subRoutes : [];
  const navs: ISubRoute[] = [
    {
      icon: <HomeIcon width={24} className="mr-2" />,
      label: "Home",
      route: "",
    },
    {
      icon: <HomeModernIcon width={24} className="mr-2" />,
      label: "Branches",
      route: "branches",
    },
  ];
  if (status == "authenticated")
    return (
      <Box minH="100vh">
         {/* <Header /> */}
        <SidebarContent
          routes={navs}
          user={session?.user}
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent
              routes={navs}
              user={session?.user}
              onClose={onClose}
            />
          </DrawerContent>
        </Drawer>
        <MobileNav onOpen={onOpen} user={session?.user} />
        <Box
         bg={bg}  
         
         className="min-h-screen"

          h={'full'}  
          ml={{ base: 0, md: 60 }}  
          >
           
            {children}</Box>
      </Box>
    );
  return <></>;
};

const PageBreadCrumbs = () => {
  const pathnames = usePathname();
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const pathItems = pathNames.map((path, i) => ({
    // Optionally you can capitalize the first letter here
    name: capitalizeFirst(path),
    path: "/" + pathNames.slice(undefined, i + 1).join("/"),
    isCurrent: pathNames.indexOf(path) == pathNames.length - 1,
  }));
  return pathItems.length == 1 ? (
    <></>
  ) : (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      {pathNames.map((link, index) => {
        let href = `/${pathNames.slice(0, index + 1).join("/")}`;
        // let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
        let itemLink = link[0].toUpperCase() + link.slice(1, link.length);
        return (
          <BreadcrumbItem key={index}>
            {index == pathNames.length - 1 ? (
              <p> {itemLink} </p>
            ) : (
              <Link href={href}>{itemLink}</Link>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default AppLayout;
