// import { auth } from '../../../auth';
// import { logout } from "../lib/actions/auth";
// import styles from "../ui/styles/Tabs.module.css";

// export const dynamic = "force-dynamic";

// export function SignOutButton() {
//   return (
//     <form action={logout}>
//       <button type="submit" className={styles.tab}>Profile</button>
//     </form>
//   );
// }

'use client';

import { useState, useRef, useEffect } from 'react';
import { logout } from '../lib/actions/auth';
import styles from '../ui/styles/SignOutDropdown.module.css';

interface Props {
  userName: string;
}

export function SignOutButton({ userName }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className={styles.profileButton}
      >
        Profile
      </button>

      {open && (
        <div className={styles.menu}>
          <div className={styles.signedIn}>Signed in: {userName}</div>
          <a href="/profile/me" className={styles.menuItem}>View Profile</a>
          <form action={logout}>
            <button type="submit" className={styles.menuItem}>Sign Out</button>
          </form>
        </div>
      )}
    </div>
  );
}

