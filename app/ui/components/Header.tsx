import { auth } from '../../../auth';
import { SignInButton } from '../sign-in-button';
import { SignOutButton } from '../profile-button';
import styles from '../../ui/styles/Header.module.css';
import Link from 'next/link';

export const dynamic = "force-dynamic";

export default async function Header() {
  const session = await auth();

  return (
    <header className={styles.header}>
      <div className={styles.titleWrapper}>
        <div className={styles.titleRow}>
          <Link href="/" className={styles.title}>Village Advisor Network</Link>
          <span className={styles.slogan}>
            Accelerating solutions for Virginia entrepreneurs
          </span>
        </div>
        <p className={styles.description}>
          The Village Advisor Network (VAN) is a diverse group of business leaders, industry experts, students, faculty, and advisors committed to supporting Virginia’s growing businesses. The VAN Repository is a virtual space where innovators can post specific challenges — from choosing the right CRM system to refining a prototype or business model — and connect with advisors ready to help.
        </p>
      </div>
      {session?.user ? (
        <SignOutButton userName={session.user.name ?? ""} />
      ) : (
        <SignInButton />
      )}
    </header>
  );
}
