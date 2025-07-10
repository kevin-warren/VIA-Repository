'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../lib/actions/auth';
import styles from '../ui/styles/SignOutDropdown.module.css';
import { useSession } from 'next-auth/react';

interface Props {
  userName: string;
}

export function SignOutButton({ userName }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewProfile = async () => {
    if (!session?.user?.id) return;

    const res = await fetch(`/api/profiles/${session.user.id}`);
    const data = await res.json();

    if (res.ok && data.profile) {
      router.push(`/profile/${session.user.id}`);
    } else {
      router.push('/profile/insert');
    }
  };

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button onClick={() => setOpen(prev => !prev)} className={styles.profileButton}>
        Profile
      </button>

      {open && (
        <div className={styles.menu}>
          <div className={styles.signedIn}>Signed in: {userName}</div>
          <button onClick={handleViewProfile} className={styles.menuItem}>
            View Profile
          </button>
          <form action={logout}>
            <button type="submit" className={styles.menuItem}>Sign Out</button>
          </form>
        </div>
      )}
    </div>
  );
}
