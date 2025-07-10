// 'use client';
// // import { login } from "../lib/actions/auth";
// import Link from "next/link";


// export const SignInButton = () => {
//   return ( 
//     <Link href="/login">
//       Sign In
//     </Link>
// )};

import Link from "next/link";
import styles from "../ui/styles/Tabs.module.css";

export function SignInButton() {
  return <Link href="/login" className={styles.tab}>Sign In</Link>;
}
