import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        // Check for missing credentials
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Look up user by email
        const dbUser = await prisma.user.findUnique({
          where: { email },
        });

        console.log("DB user found:", dbUser);

        // User not found or no password set (e.g., Google-only user)
        if (!dbUser?.password) {
            console.log("No user or no password set");
            return null;
        }

        // Check password with bcrypt
        const isValidPassword = await bcrypt.compare(password, dbUser.password);
        console.log("Password valid:", isValidPassword);

        if (!isValidPassword) return null;

        // Strip password before returning user
        const { password: _, ...userWithoutPassword } = dbUser;
        console.log("Returning user:", userWithoutPassword);
        return userWithoutPassword;
      },
    }),

    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      console.log("JWT callback: token = ", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      console.log("Final session = ", session);
      return session;
    },
  },
});

