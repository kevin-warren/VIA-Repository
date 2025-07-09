//"use server";
export const dynamic = "force-dynamic";

//import { auth } from "../../../auth";
import NavLinks from './nav-links';
import styles from '../../ui/styles/sidenav.module.css';
//import { SignInButton } from '../sign-in-button';
//import { SignOutButton } from '../sign-out-button';

export default async function SideNav() {
  // const session = await auth();
  // console.log("SESSION FROM AUTH:", session);

  return (
    <div className={styles.postButtons}>
      <div className={styles.post}>
        <NavLinks />
        {/* {session?.user ? (
          <>
            <div>Signed in: {session.user.name}</div>
            <SignOutButton />
          </>
        ) : (
          <SignInButton />
        )} */}
      </div>
    </div>
  );
}
