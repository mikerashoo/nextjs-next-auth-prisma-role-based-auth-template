// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { IProviderAdminLoginData } from "@/utils/shared/shared-types/userModels";
import { useSession } from "next-auth/react";
import { stat } from "fs";
import { validateRefreshToken } from "@/backend-services/auth";

interface AuthContextProps {
  loading: boolean;
  user: IProviderAdminLoginData;
  isAuthenticated: boolean;
  //   login: (userName: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IProviderAdminLoginData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {

    console.log("Status", status)
    const onAuth = () => {
      setUser(session?.user);

      setIsAuthenticated(true);

      setIsLoading(false);
    };
    const validateToken = async () => {
      try {
        setError(null);
        if (session.user) {
          const response = await validateRefreshToken(session.refreshToken);
          if (response.data) {
            onAuth();
          } else {
            setIsAuthenticated(false);

            setIsLoading(false);
            setError("Connection Failed. Please Try Again");
          }
        } else {
          setIsAuthenticated(false);

          setIsLoading(false);
          setError("Connection Failed. Please Try Again");
        }
      } catch (error) {
        console.error("Backend Connection Test Error:", error);

        setError("Connection Failed. Please Try Again");
      }
    };

    if (status === "authenticated") {
      validateToken();
    } else if (status === "unauthenticated") {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [session, status]);

  //   const login = async (userName: string, password: string) => {
  //     try {
  //       const user = await authLogin(userName, password);
  //       localStorage.setItem(LOGIN_DATA_KEY, JSON.stringify(user));
  //       PREVIOUS_LOGIN_DATA.set(userName);
  //       setUser(user);
  //       setIsAuthenticated(true);
  //     } catch (error) {
  //       throw new Error(error.message);
  //     }
  //   };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    router.refresh;
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
