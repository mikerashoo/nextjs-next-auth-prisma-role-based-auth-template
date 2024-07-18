 
import { UserRole } from "@/models/users";
import "next-auth";  
import { IProviderSiteLoginData } from "../shared/shared-types/userModels";


declare module "next-auth" {
  /**
   * Extends the built-in session.user type
   * session.user is available in both the client and server side
   */
  interface User extends IProviderSiteLoginData { 
  }
 
  /**
   * Extends the built-in session type
   */
  interface Session {
    user:  IProviderSiteLoginData;
    accessToken: string;
    refreshToken: string;   
    accessTokenExpires: number; 
    error?: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  /** Extends the built-in JWT type */
  interface JWT {
    user: User;
    accessToken: string;
    refreshToken: string;   
    accessTokenExpires: number; 
    error?: string;
    role: UserRole;

  }
}
