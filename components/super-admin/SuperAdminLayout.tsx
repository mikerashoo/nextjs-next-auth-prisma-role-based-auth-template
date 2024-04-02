import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PageLoading from "../ui-components/PageLoading";
import Header from "../common/Header";

const SuperAdminLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      // Explicitly handle the loading state
      return; // Simply return if still loading
    }
    
    if (status === "unauthenticated") {
      // Redirect unauthenticated users to sign-in page
      signIn('credentials', { callbackUrl: `${window.location.origin}/super-admin` });
      return; // Exit early
    }

    if (session?.user.role !== 'SUPER_ADMIN') {
      // Redirect unauthorized users to the 403 page
      router.push({
        pathname: "/403",
        query: { callbackUrl: router.asPath }, // Use asPath for the current URL
      });
    }
  }, [session, status, router]);

  // Display loading indicator while checking session
  if (status === "loading" || !session || session.user.role !== 'SUPER_ADMIN') {
    return <PageLoading />;
  }

  // Render children for authenticated and authorized users
  return (
    <>
     
      <main>{children}</main> 
    </>
  );
};

export default SuperAdminLayout;