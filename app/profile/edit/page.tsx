// app/profile/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from '../../ui/styles/InsertForm.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const { data: session, /*status */ } = useSession();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    bio: '',
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user?.id) return;
      const res = await fetch(`/api/profiles/${session.user.id}`);
      const { profile } = await res.json();
      setFormData({
        id: profile.id,
        name: profile.name,
        bio: profile.bio,
        date: profile.date.slice(0, 10),
      });
      setLoading(false);
    }
    fetchProfile();
  }, [session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/profiles', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        author: session?.user?.name,
        userId: session?.user?.id,
      }),
    });
    router.push('/?tab=profiles');
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Edit Profile</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bio" className={styles.label}>Bio:</label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="date" className={styles.label}>Date:</label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              readOnly
              className={styles.input}
            />
          </div>
          <div>
            <button type="submit" className={styles.button}>Update</button>
          </div>
        </form>
      </div>
    </main>
  );
}
