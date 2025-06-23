import NavLinks from './nav-links';
import styles from '@/app/ui/styles/layout.module.css';
import { signOut } from '../../../../auth';


export default function SideNav() {
  return (
    <div className={styles.sideNav}>
      <div className={styles.navContainer}>
        <NavLinks />
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >Sign out</form>
      </div>
    </div>
  );
}
