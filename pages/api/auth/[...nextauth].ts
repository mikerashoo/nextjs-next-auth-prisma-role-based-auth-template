// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: { label: "Username/Email/Phone", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const userField = credentials.userName; // This could be email, username, or phone number
        const passwordInput = credentials.password;

        // Try to identify the user based on the input (email, username, or phone)
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: userField }, 
              { phoneNumber: userField },
            ],
          }, 
        });

        if (!user) {
          throw new Error('No user found with the given details');
        }

        // Verify password
        const isValid = await bcrypt.compare(passwordInput, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        const { password, ...userWithoutPassword } = user; 
        // Return user object for successful authentication
        return userWithoutPassword;
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
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // If it's the first time the JWT is being created (user sign in)
      if (user) {
        token.user = user; 
      }
      return token;
    },
    async session({ session, token }) {
      // Assign the role from the JWT to the session
      session.user = token.user;
      return session;
    },
  }
  
});
