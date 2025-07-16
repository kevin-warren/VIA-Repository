'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from '../../styles/Post.module.css';

export default function ViewPost({
  id,
  title,
  content,
  date,
}: {
  id: string;
  title: string;
  content: string;
  date: Date | string;
}) {
  // const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = () => {
    // Redirect to profile/edit with query params or use global state
    const params = new URLSearchParams({
      id,
      title,
      content,
      date: date instanceof Date ? date.toISOString().split('T')[0] : date,
    });

    console.log("🧭 Navigating to /post/edit with params:", params.toString());

    router.push(`/post/edit?${params.toString()}`);
  };

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    console.log('🧹 Deleting post ID:', id);


    const res = await fetch('/api/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      if (res.ok) {
        console.log('✅ Post deleted successfully');
        setTimeout(() => {
          router.push('/?tab=posts');
          router.refresh();
        }, 300); // small delay to let DB finish
      } else {
        const errorData = await res.json();
        console.error('❌ Failed to delete post:', errorData);
      }       
  };

  return (
    <div className={styles.viewPostCard}>
      <div className={styles.postActions}>
        <button onClick={handleEdit} className={styles.postButton}>Edit</button>
        <button onClick={handleDelete} className={styles.postButton}>Delete</button>
      </div>
      <div className={styles.postName}>
        <h2>{title}</h2>
      </div>
      <p className={styles.postDate}>
        {date instanceof Date ? date.toISOString().split('T')[0] : date}
      </p>
      <p className={styles.postContent}>{content}</p>
    </div>
  );
}
