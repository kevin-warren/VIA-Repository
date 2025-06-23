'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import styles from '@/app/ui/styles/InsertForm.module.css';

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    bio: '',
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uuid = uuidv4();

    fetch(
      `/api/profiles?id=${uuid}&name=${formData.name}&bio=${formData.bio}&date=${formData.date}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, id: uuid }),
      }
    )
      .then(() => {
        setFormData({
          id: '',
          name: '',
          bio: '',
          date: '',
        });
        router.push('/?tab=profiles');
      })
      .catch(console.error);
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>New Profile Post</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>
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
            <label htmlFor="bio" className={styles.label}>
              Bio:
            </label>
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
            <label htmlFor="date" className={styles.label}>
              Date:
            </label>
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
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
