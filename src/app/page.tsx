'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';
import Profile from '@/app/ui/components/profiles/Profile'; // You'll create this next
import { profiles } from '@/app/lib/placeholder-profiles'; // You'll create this data too

export default function Home() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'profiles'>('jobs');

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.tabButtons}>
          <button
            className={`${styles.tab} ${activeTab === 'jobs' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Job Postings
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'profiles' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('profiles')}
          >
            Profile Postings
          </button>
        </div>

        <section>
          {activeTab === 'jobs' ? (
            <>
              <h2>Job Postings</h2>
              {posts.map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </>
          ) : (
            <>
              <h2>Profile Postings</h2>
              {profiles.map((profile) => (
                <Profile key={profile.id} {...profile} />
              ))}
            </>
          )}
        </section>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
