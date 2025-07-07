// 'use client';
// import { logout } from "../lib/actions/auth";

// export const SignOutButton = () => {
//   return ( 
//     <button onClick={() => logout()}>
//       Sign Out
//     </button>
// )};
// server component — doesn't need "use client"
import { logout } from "../lib/actions/auth";

export function SignOutButton() {
  return (
    <form action={logout}>
      <button type="submit">Sign Out</button>
    </form>
  );
}
