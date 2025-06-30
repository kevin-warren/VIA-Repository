import Tabs from './ui/components/Tabs';
import styles from './page.module.css';
import { /*connectToDB,*/ getPosts, getProfiles } from './lib/data';
import { Suspense } from 'react';

export default async function Home() {
  // const client = await connectToDB();
  const posts = await getPosts();
  const profiles = await getProfiles();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense fallback={<div>Loading.....</div>}>
          <Tabs posts={posts} profiles={profiles} />
        </Suspense>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
