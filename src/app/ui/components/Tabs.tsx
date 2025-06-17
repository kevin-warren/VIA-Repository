'use client';

import { useState } from 'react';
import Post from '@/app/ui/components/posts/Post';
import Profile from '@/app/ui/components/profiles/Profile';
import styles from '@/app/page.module.css'; // or move to a shared css file

type TabProps = {
  posts: typeof import('@/app/lib/placeholder-data').posts;
  profiles: typeof import('@/app/lib/placeholder-profiles').profiles;
};

export default function Tabs({ posts, profiles }: TabProps) {
  const [activeTab, setActiveTab] = useState<'jobs' | 'profiles'>('jobs');

  return (
    <>
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
            {posts?.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </>
        ) : (
          <>
            <h2>Profile Postings</h2>
            {profiles?.map((profile) => (
              <Profile key={profile.id} {...profile} />
            ))}
          </>
        )}
      </section>
    </>
  );
}
