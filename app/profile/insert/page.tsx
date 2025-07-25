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
    searchingFor: '',
    timeCommitment: '',
    presence: '',
    location: '',
    typeOfPerson: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
          searchingFor: formData.searchingFor,
          timeCommitment: formData.timeCommitment,
          presence: formData.presence,
          location: formData.location,
          typeOfPerson: formData.typeOfPerson,
        }),
      });

      setFormData({ id: '', name: '', bio: '', date: '', email: '', phone: '', linkedin: '', website: '', headline: '', searchingFor: '', timeCommitment: '', presence: '', location: '', typeOfPerson: '' });
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
        <p>We are extremely grateful for your commitment to consider working with innovators/entrepreneurs across our region that are seeking expertise with a specific challenge. You are in no way obligated to assist anyone by submitting your profile. As a part of this network, you can review and apply to project postings and search on specific industries. Applications will be reviewed by the creator of the respective posting. You can also reach out to the Advancement Foundation directly to indicate your interest in a specific project, and we can help mediate a connection. </p>
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
              placeholder="Briefly describe yourself in one line"
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
            <label htmlFor="searchingFor" className={styles.label}>
              Searching For
            </label>
            <input
              type="text"
              id="searchingFor"
              name="searchingFor"
              value={formData.searchingFor}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g. Full-time Marketing jobs starting in Spring 2026"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="timeCommitment" className={styles.label}>
              Time Commitment
            </label>
            <input
              type="text"
              id="timeCommitment"
              name="timeCommitment"
              value={formData.timeCommitment}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g. 10 Hours/Week in the Fall"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="presence" className={styles.label}>
                Work Type
              </label>
              <select
                id="presence"
                name="presence"
                value={formData.presence}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Select presence</option>
                <option value="In-Person">In-Person</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          


            <div className={styles.formGroup}>
              <label htmlFor="location" className={styles.label}>
                Available Work Location(s)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="typeOfPerson" className={styles.label}>
                Type of Person
              </label>
              <select
                id="typeOfPerson"
                name="typeOfPerson"
                value={formData.typeOfPerson}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Select type</option>
                <option value="High School Student">High School Student</option>
                <option value="College Student">College Student</option>
                <option value="Business Leader">Business Leader</option>
                <option value="Industry Expert">Industry Expert</option>
                <option value="University Faculty">University Faculty</option>
                <option value="Business Advisor">Business Advisor</option>
                <option value="Other">Other</option>
              </select>
            </div>
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
              placeholder="Tell us about yourself and/or your career interests"
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
