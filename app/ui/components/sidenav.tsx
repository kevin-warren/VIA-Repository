"use server";

//import { sign } from 'crypto';
import NavLinks from './nav-links';
import styles from '../../ui/styles/layout.module.css';
//import { signIn } from 'next-auth/react';
//import { PowerIcon } from '@heroicons/react/24/outline';
//import { Button } from '@/app/ui/button';
import { auth } from "../../../auth";
import { SignInButton } from '../sign-in-button';
import { SignOutButton } from '../sign-out-button';


export default async function SideNav() {
  const session = await auth();
  console.log(session);

  return (
    <div className={styles.sideNav}>
      <div className={styles.navContainer}>
        <NavLinks />
        
         {session?.user ? (
          <>
            <div> Signed in: {session.user.name} </div>
            <SignOutButton />
          </>
         ) : (
          <SignInButton />
         )}
      </div>
    </div>
  );
}