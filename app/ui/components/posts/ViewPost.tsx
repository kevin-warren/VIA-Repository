'use client';

import { useRouter } from 'next/navigation';
import styles from '../../styles/Post.module.css';

export default function ViewPost({
  id,
  title,
  company,
  logo,
  location,
  jobType,
  presence,
  date,
  applicationCount,
}: {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  jobType: string;
  presence: string;
  date: Date | string;
  applicationCount?: number;
}) {
  const router = useRouter();

  const handleEdit = () => {
    const params = new URLSearchParams({
      id,
      title,
      company,
      logo,
      location,
      jobType,
      presence,
      date: date instanceof Date ? date.toISOString().split('T')[0] : date,
    });
    router.push(`/post/edit?${params.toString()}`);
  };

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    const res = await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setTimeout(() => {
        router.push('/?tab=posts');
        router.refresh();
      }, 300);
    } else {
      const errorData = await res.json();
      console.error('Failed to delete post:', errorData);
    }
  };

  return (
    <div className={styles.viewPostCard}>
      <div className={styles.postActions}>
        <button onClick={() => router.push(`/applications/post/${id}`)} className={styles.postButton}>Applications ({applicationCount ?? 0})</button>
        <button onClick={handleEdit} className={styles.postButton}>Edit</button>
        <button onClick={handleDelete} className={styles.postButton}>Delete</button>
      </div>
      <div className={styles.jobTitle}>
        <h2>{title}</h2>
        {/* <img src={logo} /> */}
      </div>
      <p className={styles.jobDescription}>{company}</p>
      <p className={styles.jobDescription}>{jobType}, {presence}</p>
      <p className={styles.jobDate}>
        {location} • Posted on: {date instanceof Date ? date.toISOString().split('T')[0] : date}
      </p>
    </div>
  );
}

