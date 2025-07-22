'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import styles from '../../ui/styles/InsertForm.module.css';

export default function CreateProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    bio: '',
    date: new Date().toISOString().slice(0, 10),
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    headline: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadResume = async (file: File): Promise<string | null> => {
    const formDataCloudinary = new FormData();
    formDataCloudinary.append('file', file);
    formDataCloudinary.append('upload_preset', 'resume_auto_preset'); // replace with your actual preset

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dcqnwr46v/auto/upload',
        {
          method: 'POST',
          body: formDataCloudinary,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Upload failed: ${text}`);
      }

      const data = await res.json();
      return data.secure_url || null;
    } catch (error) {
      console.error('Resume upload failed:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) {
      alert('Must be signed in to submit a profile.');
      return;
    }

    let resumeUrl = '';
    if (resumeFile) {
      const uploadedUrl = await uploadResume(resumeFile);
      if (!uploadedUrl) {
        alert('Failed to upload resume PDF');
        return;
      }
      resumeUrl = uploadedUrl;
    }

    const id = uuidv4();
    const userId = session.user.id;
    const author = session.user.name;

    try {
      await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id,
          author,
          userId,
          resume: resumeUrl,
          email: formData.email,
          phone: formData.phone,
          linkedin: formData.linkedin,
          website: formData.website,
          headline: formData.headline,
        }),
      });

      setFormData({ id: '', name: '', bio: '', date: '', email: '', phone: '', linkedin: '', website: '', headline: '' });
      setResumeFile(null);
      router.push('/?tab=profiles');
      router.refresh();
    } catch (error) {
      console.error('❌ Failed to submit profile', error);
      alert('There was an error creating your profile.');
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Create New Profile</h2>
        <form onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name*
              </label>
              <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${styles.narrowInput}`}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="headline" className={styles.label}>
              Headline*
            </label>
            <input
              type="text"
              id="headline"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${styles.narrowInput}`}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`${styles.input} ${styles.narrowInput}`}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="resume" className={styles.label}>
              Resume (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className={`${styles.input} ${styles.narrowInput}`}
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
            <label htmlFor="linkedin" className={styles.label}>
              LinkedIn
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className={`${styles.input} ${styles.narrowInput}`}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="website" className={styles.label}>
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className={`${styles.input} ${styles.narrowInput}`}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date" className={styles.label}>
              Date*
            </label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              readOnly
              className={`${styles.input} ${styles.narrowInput}`}
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
