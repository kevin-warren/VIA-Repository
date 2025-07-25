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

  // const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  
  //   const formDataUpload = new FormData();
  //   formDataUpload.append('file', file);
  //   formDataUpload.append('upload_preset', 'logo_preset'); // replace with your Cloudinary preset
  
  //   try {
  //     const res = await fetch('https://api.cloudinary.com/v1_1/dcqnwr46v/image/upload', {
  //       method: 'POST',
  //       body: formDataUpload,
  //     });
  
  //     const data = await res.json();
  //     setFormData(prev => ({ ...prev, logo: data.secure_url }));
  //   } catch (err) {
  //     console.error('Failed to upload logo to Cloudinary:', err);
  //   }
  // };  

  // Upload function (takes a File, returns uploaded URL)
  async function handleLogoUpload(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) {
        console.error("Upload failed:", await res.text());
        return null;
      }
  
      const data = await res.json();
      return data.url; // <-- actual Vercel Blob URL
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  }
  
// Change event handler (takes event, extracts file, calls upload)
async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  if (!file) return;

  const uploadedUrl = await handleLogoUpload(file);
  if (uploadedUrl) {
    console.log("Uploaded logo URL:", uploadedUrl);

    // ✅ Update the form state with the uploaded logo URL
    setFormData(prev => ({
      ...prev,
      logo: uploadedUrl,
    }));
  }
}


// JSX
<input type="file" accept="image/*" onChange={onFileChange} />

  

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
        <h2 className={styles.heading}>New Project Post</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
  
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Project Title*</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Company/Organization Name*</label>
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
              <label className={styles.label}>Company/Organization Logo*</label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className={`${styles.input} ${styles.narrowInput}`}
                required
              />
              {formData.logo && (
                <Image src={formData.logo} alt="Logo preview" width={40} height={40} className={styles.logoPreview} />
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Project Location*</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`${styles.input} ${styles.narrowInput}`}
                placeholder="e.g. Richmond, VA"
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Industry Type*</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.input}
              required
            >
              <option value="">Select</option>
              <option>Agriculture</option>
              <option>Food/Beverage</option>
              <option>Life Science and Health</option>
              <option>Manufacturing</option>
              <option>Information Technology</option>
              <option>Autonomous Systems</option>
              <option>Unmanned Systems</option>
              <option>Energy</option>
              <option>Environmental Technology</option>
              <option>Outdoor Recreation/Tourism</option>
              <option>Main Street</option>
              <option>Service Industry</option>
              <option>Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Work Type*</label>
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
          <label className={styles.label}>Paid or Not Paid</label>
          <select
            name="pay"
            value={formData.pay}
            onChange={handleChange}
            className={`${styles.input} ${styles.narrowInput}`}
          >
            <option value="">Select an option</option>
            <option value="Paid">Paid</option>
            <option value="Not Paid">Not Paid</option>
          </select>
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
            <label className={styles.label}>Company/Organization Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={4}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Project Description</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              rows={4}
              className={styles.input}
            />
          </div>
  
          <div className={styles.formGroup}>
            <label className={styles.label}>Project Duties and Responsibilities*</label>
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
