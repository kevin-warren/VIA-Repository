//import Image from "next/image";
import styles from "./page.module.css";
import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section>
          <h2>Job Postings</h2>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </section>
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}

