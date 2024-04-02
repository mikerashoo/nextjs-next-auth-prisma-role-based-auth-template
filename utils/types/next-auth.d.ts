import "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in session.user type
   * session.user is available in both the client and server side
   */
  interface User {
    role?: string;
  }

  /**
   * Extends the built-in session type
   */
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Extends the built-in JWT type */
  interface JWT {
    role?: string;
  }
}
