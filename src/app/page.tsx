// import { posts } from '@/app/lib/placeholder-data';
// import { profiles } from '@/app/lib/placeholder-profiles';
import Tabs from './ui/components/Tabs'; // client component
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
        {client && <p className='text-green-500 my-2'>Connected to database!</p>}
        
        
        <div className="flex gap-4 mb-4">
          <Link href="/post/insert" passHref>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Create New Job Post
            </button>
          </Link>
          <Link href="/profile/insert" passHref>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Create New Profile
            </button>
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
