 
import { UserRole } from "@/models/users";
import "next-auth";  
import { IProviderAdminLoginData } from "../shared/shared-types/userModels";


declare module "next-auth" {
  /**
   * Extends the built-in session.user type
   * session.user is available in both the client and server side
   */
  interface User extends IProviderAdminLoginData {

  }
 
  /**
   * Extends the built-in session type
   */
  interface Session {
    user:  IProviderAdminLoginData;
    accessToken: string;
    refreshToken: string;   
    accessTokenExpires: number; 
    error?: string;

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
  }
}
