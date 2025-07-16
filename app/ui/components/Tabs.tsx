'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Post from './posts/Post';
import Profile from './profiles/ProfileList';
import styles from '../styles/Tabs.module.css';
import ViewPost from './posts/ViewPost';


interface TabProps {
  posts: { id: string; title: string; content: string; date: string; author: string }[];
  profiles: { id: string; name: string; bio: string; date: string }[];
}

export default function Tabs({ posts, profiles }: TabProps) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'profiles' ? 'profiles' : 'jobs';
  const [activeTab, setActiveTab] = useState<'jobs' | 'profiles'>(initialTab);

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const selectedPost = posts.find((p) => p.id === selectedPostId);

  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const selectedProfile = profiles.find((p) => p.id === selectedProfileId);

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

      {activeTab === 'jobs' ? (
        <div className={styles.jobLayout}>
          <div className={styles.postList}>
            {posts.map((post) => (
              <div key={post.id} onClick={() => setSelectedPostId(post.id)}>
                <Post {...post} />
              </div>
            ))}
          </div>

          <div className={styles.postDetail}>
            {selectedPost ? (
              <>
                {/* <p id={selectedPost.id}></p>   */}
                <h2>{selectedPost.title}</h2>
                <p>{selectedPost.date}</p>
                <p>{selectedPost.content}</p>
                </>
              // <ViewPost
              //   id={selectedPost.id}          // ← here
              //   title={selectedPost.title}
              //   content={selectedPost.content}
              //   date={selectedPost.date}
              // />
              ) : (
                <p className={styles.postDetailText}>Select a post to view details</p>
              )}
          </div>            
        </div>
      ) : (
        <div className={styles.jobLayout}>
          <div className={styles.postList}>
            {profiles.map((profile) => (
              <div key={profile.id} onClick={() => setSelectedProfileId(profile.id)}>
                <Profile {...profile} />
              </div>
            ))}
          </div>

          <div className={styles.postDetail}>
            {selectedProfile ? (
              <>
                <h2>{selectedProfile.name}</h2>
                <p>{selectedProfile.date}</p>
                <p>{selectedProfile.bio}</p>
              </>
            ) : (
              <p className={styles.postDetailText}>Select a profile to view details</p>
            )}
            </div>
        </div>
      )}
    </>
  );
}
