'use client';
import styles from '../ui/styles/SignOutDropdown.module.css';
import { useRouter } from 'next/navigation';

export function SignInButton() {
  const router = useRouter();
  return (
    <div className={styles.dropdown}>
      <button onClick={() => router.push('/login')} className={styles.profileButton}>Sign In</button>
    </div>
  );
}

