// pages/api/auth/[...nextauth].ts
import NextAuth, {SessionStrategy} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; 
import { getUserFromBackend, getUserRefreshToken } from "@/backend-services/auth";
 

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  try {
    
    return await getUserRefreshToken(token);
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: { label: "Username/Email/Phone", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const userName = credentials.userName; // This could be email, username, or phone number
        const password = credentials.password;

        const user = await getUserFromBackend(userName, password);
        

        if (!user) {
          throw new Error('No user found with the given details');
        }

       
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", 
    signOut: "/auth/signOut", 
  },
  // Add further configuration as needed
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This is default behavior but you can use database sessions if you prefer.
    // strategy: ,
  },
  callbacks: {
    
    async jwt({ token, user }) {
      // If it's the first time the JWT is being created (user sign in)
      if (user) {
        token.user = user; 
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires
        token.role = user.role
      }

       // Return previous token if the access token has not expired yet
       if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token) 
    },
    async session({ session, token }) {
      
      // Assign the role from the JWT to the session
      if(token){
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.accessTokenExpires = token.accessTokenExpires;
        session.error = token.error
        session.role = token.role

      }
     
      return session;
    },
  }
  
};

export default NextAuth(authOptions);


// export default NextAuth({
  
// });
