'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from '../../styles/Profile.module.css';

export default function ViewProfile({
  name,
  bio,
  date,
}: {
  name: string;
  bio: string;
  date: Date | string;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = () => {
    // Redirect to profile/edit with query params or use global state
    const params = new URLSearchParams({
      name,
      bio,
      date: date instanceof Date ? date.toISOString().split('T')[0] : date,
    });

    router.push(`/profile/edit?${params.toString()}`);
  };

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete your profile?');
    if (!confirmed) return;

    await fetch('/api/profiles', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session?.user?.id }),
    });

    router.push('/');
    router.refresh();       
  };

  return (
    <div className={styles.viewProfileCard}>
      <div className={styles.profileActions}>
        <button onClick={handleEdit} className={styles.profileButton}>Edit</button>
        <button onClick={handleDelete} className={styles.profileButton}>Delete</button>
      </div>
      <div className={styles.profileName}>
        <h2>{name}</h2>
      </div>
      <p className={styles.profileDate}>
        {date instanceof Date ? date.toISOString().split('T')[0] : date}
      </p>
      <p className={styles.profileBio}>{bio}</p>
    </div>
  );
}
