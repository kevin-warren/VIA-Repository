import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
//import CredentialsProvider from 'next-auth/providers/credentials';

export const {auth, handlers, signIn, signOut} = NextAuth({
    providers: [
        // CredentialsProvider({
        //     name: 'Sign in',
        //     credentials: {
        //         email: { 
        //             label: 'Email', 
        //             type: 'email',
        //             placeholder: 'Enter your email',
        //         },
        //         password: { label: 'Password', type: 'password' },
        //     },
        //     async authorize(credentials) {
        //         if (!credentials || !credentials.email || !credentials.password) 
        //             return null;

        //         const dbUser = await prisma.user.findFirst({
        //             where: {
        //                 email: credentials.email
        //             },
        //         });
        //         if (dbUser && dbUser.password === credentials.password) {
        //             const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;
        //             return dbUserWithoutPassword as User;
        //         }
        //     },
        // }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        })
    ],
})