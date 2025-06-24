import type { NextAuthConfig } from 'next-auth';
 
// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnProtected = nextUrl.pathname.startsWith('/profile/insert') ||
//                             nextUrl.pathname.startsWith('/post/insert');
//                     // if (isOnProtected) {
//                     //   if (isLoggedIn) return true;
//                     //   return false; // Redirect unauthenticated users to login page
//                     // } else if (isLoggedIn) {
//                     //   return Response.redirect(new URL('/dashboard', nextUrl));
//                     // }
//                     // return true;
//       if (isOnProtected && !isLoggedIn) return false;
//       if (!isOnProtected && isLoggedIn && nextUrl.pathname === '/login') {
//         return Response.redirect(new URL('/', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;

export const authConfig = {
  pages: { signIn: '/login' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;

      const protectedRoutes = ['/post/insert', '/profile/insert'];

      if (protectedRoutes.some(route => path.startsWith(route))) {
        return isLoggedIn; // require login
      }

      if (path === '/login' && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      return true; // allow public pages
    },
  },
  providers: [],
} satisfies NextAuthConfig;
