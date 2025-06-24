import NavLinks from './nav-links';
import styles from '@/app/ui/styles/layout.module.css';
import { signOut } from '../../../../auth';
import { PowerIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';


export default function SideNav() {
  return (
    <div className={styles.sideNav}>
      <div className={styles.navContainer}>
        <NavLinks />
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}>
            <Button>
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign out</div>
            </Button>
        </form>
      </div>
    </div>
  );
}
