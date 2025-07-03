// import NextAuth from 'next-auth';
// import Google from 'next-auth/providers/google';
// //import CredentialsProvider from 'next-auth/providers/credentials';
// import { PrismaClient } from '@prisma/client';
// import { PrismaAdapter } from '@auth/prisma-adapter';

// const prisma = new PrismaClient();


// export const { auth, handlers, signIn, signOut } = NextAuth({
//   providers: [
//         // CredentialsProvider({
//         //     name: 'Sign in',
//         //     credentials: {
//         //         email: { 
//         //             label: 'Email', 
//         //             type: 'email',
//         //             placeholder: 'Enter your email',
//         //         },
//         //         password: { label: 'Password', type: 'password' },
//         //     },
//         //     async authorize(credentials) {
//         //         if (!credentials || !credentials.email || !credentials.password) 
//         //             return null;

//         //         const dbUser = await prisma.user.findFirst({
//         //             where: {
//         //                 email: credentials.email
//         //             },
//         //         });
//         //         if (dbUser && dbUser.password === credentials.password) {
//         //             const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;
//         //             return dbUserWithoutPassword as User;
//         //         }
//         //     },
//         // }),
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID as string,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });
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

        // User not found or no password set (e.g., Google-only user)
        if (!dbUser?.password) return null;

        // Check password with bcrypt
        const isValidPassword = await bcrypt.compare(password, dbUser.password);
        if (!isValidPassword) return null;

        // Strip password before returning user
        const { password: _, ...userWithoutPassword } = dbUser;
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
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
});

// export async function loginIsRequiredServer() {
//   const session = await getServerSession(authConfig);
//   if (!session) return redirect("/");
// }

// export function loginIsRequiredClient() {
//   if (typeof window !== "undefined") {
//     const session = useSession();
//     const router = useRouter();
//     if (!session) router.push("/");
//   }
// }