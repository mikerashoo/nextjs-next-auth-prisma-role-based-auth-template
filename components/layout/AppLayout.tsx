import React, { PropsWithChildren } from "react";
import PageLoading from "../ui-components/PageLoading";
import SignInForm from "../auth/SignInForm";
import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
} from "@chakra-ui/react";
import {
  DesktopSideNav,
  MobileSideNav,
} from "./AppSideBar";
import Header from "./Header";
import { Router } from "next/router";

function AppLayout({ children }: PropsWithChildren) {
  const { isAuthenticated, loading, logout, user } = useAuth();

  // const [isChecking, setIsChecking] = useState<boolean>(true);
  // const [error, setError] = useState<string>();

  if (loading) {
    return <PageLoading />;
  } else if (!isAuthenticated) {
    return <SignInForm />;
  } else {
    return <PageWrapper>{children}</PageWrapper>;
  }
}

const PageWrapper = ({ children }) => {
  const { user } = useAuth();
  const [toggled, setToggled] = React.useState(false);

  const [desktopCollapsed, setDesktopCollapsed] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      <Box display={{
        base:'flex',
        lg:'none'
      }} style={{height: "100%", minHeight: "screen" }}>
        <MobileSideNav
          user={user}
          setToggled={setToggled}
          toggled={toggled}
        />
        <main style={{ display: "flex", width: '100%', height: '100%', flexDirection: "column" }}>
          <Header onToggle={() => setToggled(!toggled)} />


          {children}
        </main>
      </Box>

      <Box display={{
        base:'none',
        lg:'flex'
      }} className="h-full min-h-screen "  style={{  height: "100%", minHeight: "screen" }}>
        <DesktopSideNav
          user={user}
          setCollapsed={setDesktopCollapsed}
          collapsed={desktopCollapsed}
        />
        <main style={{ display: "flex", width: '100%', height: '100%', flexDirection: "column" }}>
           {loading ? <PageLoading /> : children}
 
        </main>
      </Box>
    </>

  
  ); 
}
export default AppLayout;
