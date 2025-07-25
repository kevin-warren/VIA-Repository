//"use server";
export const dynamic = "force-dynamic";

//import { auth } from "../../../auth";
import ServerNavLinks from './ServerNavLinks';
import styles from '../../ui/styles/SideNav.module.css';
//import { SignInButton } from '../sign-in-button';
//import { SignOutButton } from '../sign-out-button';

export default async function SideNav() {
  // const session = await auth();
  // console.log("SESSION FROM AUTH:", session);

  return (
    <div className={styles.postButtons}>
      <div className={styles.post}>
        <ServerNavLinks />
        {/* {session?.user ? (
          <>
            <div>Signed in: {session.user.name}</div>
            <SignOutButton />
          </>
        ) : (
          <SignInButton />
        )} */}
        <a href="https://www.linkedin.com/in/kevin-t-warren" className={styles.madeBy}>Made by: Kevin Warren</a>
      </div>
    </div>
  );
}
