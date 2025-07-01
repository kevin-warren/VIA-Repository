'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Post from './posts/Post';
import Profile from './profiles/Profile';
import styles from '../styles/Tabs.module.css';

interface TabProps {
  posts: { id: string; title: string; content: string; date: string; author: string; }[];
  profiles: { id: string; name: string; bio: string; date: string; }[];
}

export default function Tabs({ posts, profiles }: TabProps) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'profiles' ? 'profiles' : 'jobs';
  const [activeTab, setActiveTab] = useState<'jobs' | 'profiles'>(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'profiles' || tab === 'jobs') {
      setActiveTab(tab);
    }
  }, [searchParams]);

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
            {/* <h2>Job Postings</h2> */}
            {posts?.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                date={post.date}
              />
            ))}
          </>
        ) : (
          <>
            {/* <h2>Profile Postings</h2> */}
            {profiles?.map((profile) => (
              <Profile
                key={profile.id}
                id={profile.id}
                name={profile.name}
                bio={profile.bio}
                date={profile.date}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
