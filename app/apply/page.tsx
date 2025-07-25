'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '../ui/styles/InsertForm.module.css';

export default function ApplyPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');

  const user = session?.user;

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    resume: '',
    bio: '',
    date: new Date().toISOString().slice(0, 10),
    message: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadResume = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!res.ok) {
        throw new Error(await res.text());
      }
  
      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error('Resume upload failed:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId || !user?.id) return;

    setSubmitting(true);
    let resumeUrl = formData.resume;

    if (resumeFile) {
      const uploaded = await uploadResume(resumeFile);
      if (!uploaded) {
        alert('Resume upload failed');
        setSubmitting(false);
        return;
      }
      resumeUrl = uploaded;
    }

    const applicationData = {
      ...formData,
      resume: resumeUrl,
      userId: user.id,
      postId,
    };

    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData),
    });

    if (res.ok) {
      router.push('/?tab=posts');
      router.refresh();
    } else {
      alert('Error submitting application');
    }
    setSubmitting(false);
  };

  // Handle loading session
  if (session === null) {
    return <div>Loading session...</div>;
  }

  // Block if user is not signed in
  if (!user) {
    return (
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Project Application</h2>
          <p>You must be signed in to apply.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Project Application</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${styles.narrowInput}`}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${styles.narrowInput}`}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Resume (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className={`${styles.input} ${styles.narrowInput}`}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.input} ${styles.narrowInput}`}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className={`${styles.input} ${styles.narrowInput}`}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className={`${styles.input} ${styles.narrowInput}`}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Leave a Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Date</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              readOnly
              className={`${styles.input} ${styles.narrowInput}`}
            />
          </div>

          <div>
            <button type="submit" className={styles.button} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
