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
          <Link href="/" className={styles.title}>Project Accelerate</Link>
          <span className={styles.slogan}>
            Driving Solutions for Virginia Entrepreneurs
          </span>
        </div>
        <p className={styles.description}>
          Project Accelerate brings together a diverse group of business leaders, industry experts, students, faculty, and advisors all dedicated to supporting Virginia&apos;s growing businesses. The Project Accelerate Repository is a virtual hub where innovators can post specific challenges — from choosing the right CRM system to refining a prototype or business model — and connect with advisors eager to help.
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
