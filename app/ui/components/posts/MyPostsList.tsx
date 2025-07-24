'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ViewPost from './ViewPost';
import styles from '../../styles/Post.module.css';

type Post = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  date: string;
  jobType: string;
  presence: string;
  applicationCount?: number;
};

export default function MyPostsList() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const userId = session?.user?.id;
    if (!userId) return;

    async function fetchPosts() {
      try {
        const res = await fetch(`/api/posts/user/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [session, status]);

  if (status === 'loading' || loading) return <p>Loading your posts...</p>;

  if (!posts.length) return <p>You have no posts yet.</p>;

  return (
    <div className={styles.scrollContainer}>
      {posts.map((post) => (
        <ViewPost
          key={post.id}
          id={post.id}
          title={post.title}
          company={post.company}
          logo={post.logo}
          location={post.location}
          date={post.date.slice(0, 10)}
          jobType={post.jobType}
          presence={post.presence}
          applicationCount={post.applicationCount}
        />
      ))}
    </div>
  );
}
