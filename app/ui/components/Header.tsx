// app/ui/components/Header.tsx
import { auth } from '../../../auth';
import { SignInButton } from '../sign-in-button';
import { SignOutButton } from '../sign-out-button';
import styles from '../../ui/styles/Header.module.css'; // create this
import Link from 'next/link';

export const dynamic = "force-dynamic";

export default async function Header() {
  const session = await auth();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.title}>VIA Repository</Link>

      <div className={styles.authControls}>
        {session?.user ? (
          <>
            <span>Signed in: {session.user.name}</span>
            <SignOutButton />
          </>
        ) : (
          <SignInButton />
        )}
      </div>
    </header>
  );
}
