// import NextAuth, { User } from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// export const authConfig = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "Enter your email"
//         },
//         password: {
//           label: "Password",
//           type: "password"
//         }
//       },
//       async authorize(credentials: any) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email
//           }
//         });

//         if (!user || !user?.password) {
//           return null;
//         }

//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isCorrectPassword) {
//           return null;
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name
//         } as User;
//       }
//     })
//   ],
//   pages: {
//     signIn: '/login'
//   },
//   session: {
//     strategy: "jwt"
//   },
//   secret: process.env.NEXTAUTH_SECRET as string
// };
