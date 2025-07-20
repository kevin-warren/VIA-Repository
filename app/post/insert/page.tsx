'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../ui/styles/InsertForm.module.css';
import Image from 'next/image';

export default function CreatePostPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    logo: '',
    category: '',
    date: new Date().toISOString().slice(0, 10),
    applyBy: '',
    location: '',
    pay: '',
    presence: '',
    jobType: '',
    jobDescription: '',
    startDate: '',
    endDate: '',
    summary: '',
    duties: '',
    qualifications: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', 'My_upload_preset'); // replace with your Cloudinary preset
  
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dcqnwr46v/image/upload', {
        method: 'POST',
        body: formDataUpload,
      });
  
      const data = await res.json();
      setFormData(prev => ({ ...prev, logo: data.secure_url }));
    } catch (err) {
      console.error('Failed to upload logo to Cloudinary:', err);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user) {
      alert('You must be signed in to submit a post.');
      return;
    }

    const missingFields = ['title', 'company', 'category', 'date', 'location', 'duties', 'qualifications'].filter(
      (field) => !formData[field as keyof typeof formData]
    );
    if (missingFields.length > 0) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: uuidv4(),
          author: session.user.name,
          userId: session.user.id,
          ...formData,
        }),
      });

      router.push('/');
    } catch (error) {
      console.error('❌ Failed to submit post', error);
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>New Job Post</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
  
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Job Title*</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Company Name*</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Date Posted*</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`${styles.input} ${styles.narrowInput}`}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Apply By</label>
              <input
                type="date"
                name="applyBy"
                value={formData.applyBy}
                onChange={handleChange}
                className={`${styles.input} ${styles.narrowInput}`}
              />
            </div>
          </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
              <label className={styles.label}>Company Logo*</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className={`${styles.input} ${styles.narrowInput}`}
                required
              />
              {formData.logo && (
                <Image src={formData.logo} alt="Logo preview" width={40} height={40} className={styles.logoPreview} />
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Job Location*</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`${styles.input} ${styles.narrowInput}`}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Job Category*</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.input}
              required
            >
              <option value="">Select</option>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>Education</option>
              <option>Marketing</option>
              <option>Retail</option>
              <option>Engineering</option>
              <option>Legal</option>
              <option>Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Job Type*</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className={styles.input}
              required
            >
              <option value="">Select</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Work Environment*</label>
            <select
              name="presence"
              value={formData.presence}
              onChange={handleChange}
              className={styles.input}
              required
            >
              <option value="">Select</option>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>
          </div>
        </div>
  
          
  
          <div className={styles.formGroup}>
            <label className={styles.label}>Pay Rate/Range</label>
            <input
              name="pay"
              value={formData.pay}
              onChange={handleChange}
              className={`${styles.input} ${styles.narrowInput}`}
            />
          </div>
  
          
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
  
          <div className={styles.formGroup}>
            <label className={styles.label}>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>
  
          <div className={styles.formGroup}>
            <label className={styles.label}>Company Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={4}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Job Description</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              rows={4}
              className={styles.input}
            />
          </div>
  
          <div className={styles.formGroup}>
            <label className={styles.label}>Job Duties and Responsibilities*</label>
            <textarea
              name="duties"
              value={formData.duties}
              onChange={handleChange}
              rows={4}
              className={styles.input}
              required
            />
          </div>
  
          <div className={styles.formGroup}>
            <label className={styles.label}>Qualifications*</label>
            <textarea
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              rows={4}
              className={styles.input}
              required
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
