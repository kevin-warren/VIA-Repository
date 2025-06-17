// import { posts } from '@/app/lib/placeholder-data';
import { profiles } from '@/app/lib/placeholder-profiles';
import Tabs from './ui/components/Tabs'; // client component
import styles from './page.module.css';
import { connectToDB, getPosts } from '@/app/lib/data';
import Link from "next/link";

export default async function Home() {
  const client = await connectToDB();
  const posts = await getPosts();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {client && <p className='text-green-500 my-2'>Connected to database!</p>}
        <Link href="/post/insert" passHref>
          <button>
            New +
          </button>
        </Link>

        <Tabs posts={posts} profiles={profiles} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
