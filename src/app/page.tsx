import Tabs from './ui/components/Tabs';
import styles from './page.module.css';
import { connectToDB, getPosts, getProfiles } from '@/app/lib/data';
import Link from "next/link";
import { Suspense } from 'react';

export default async function Home() {
  const client = await connectToDB();
  const posts = await getPosts();
  const profiles = await getProfiles();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {client && <p className={styles.dbStatus}>Connected to database!</p>}

        <div className={styles.buttonRow}>
          <Link href="/post/insert" passHref>
            <button className={styles.purpleButton}>Create New Job Post</button>
          </Link>
          <Link href="/profile/insert" passHref>
            <button className={styles.greenButton}>Create New Profile</button>
          </Link>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <Tabs posts={posts} profiles={profiles} />
        </Suspense>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
