'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../ui/styles/InsertForm.module.css';

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession(); // get user session

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    content: '',
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uuid = uuidv4();

    const author = session?.user?.name; // get user's name

    if (!author) {
      alert("You must be signed in to submit a post.");
      return;
    }
    console.log("Submitting post with author:", author);

    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: uuid,
          author,
        }),
      });

      setFormData({ id: '', title: '', content: '', date: '' });
      router.push('/');
    } catch (error) {
      console.error("❌ Failed to submit post", error);
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>New Job Post</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>Job Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="content" className={styles.label}>Content:</label>
            <textarea
              id="content"
              name="content"
              rows={4}
              value={formData.content}
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
            <button type="submit" className={styles.button}>Submit</button>
          </div>
        </form>
      </div>
    </main>
  );
}
