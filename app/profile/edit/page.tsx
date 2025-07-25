// // app/profile/edit/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import styles from '../../ui/styles/InsertForm.module.css';

// export default function EditProfilePage() {
//   const router = useRouter();
//   const { data: session, /*status */ } = useSession();
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     bio: '',
//     date: new Date().toISOString().slice(0, 10),
//     resume: '',
//     email: '',
//     phone: '',
//     linkedin: '',
//     website: '',
//     headline: '',
//   });

//   useEffect(() => {
//     async function fetchProfile() {
//       if (!session?.user?.id) return;
//       const res = await fetch(`/api/profiles/${session.user.id}`);
//       const { profile } = await res.json();
//       setFormData({
//         id: profile.id,
//         name: profile.name,
//         bio: profile.bio,
//         date: profile.date.slice(0, 10),
//         resume: profile.resume,
//         email: profile.email,
//         phone: profile.phone,
//         linkedin: profile.linkedin,
//         website: profile.website,
//         headline: profile.headline,
//       });
//       setLoading(false);
//     }
//     fetchProfile();
//   }, [session]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await fetch('/api/profiles', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         ...formData,
//         author: session?.user?.name,
//         userId: session?.user?.id,
//       }),
//     });
//     router.push('/?tab=profiles');
//   };

//   if (loading) return <div>Loading profile...</div>;

//   return (
//     <main className={styles.pageWrapper}>
//       <div className={styles.container}>
//         <h2 className={styles.heading}>Create New Profile</h2>
//         <form onSubmit={handleSubmit} className={styles.form}>

//             <div className={styles.formGroup}>
//               <label htmlFor="name" className={styles.label}>
//                 Full Name*
//               </label>
//               <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`${styles.input} ${styles.narrowInput}`}
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="headline" className={styles.label}>
//               Headline
//             </label>
//             <input
//               type="text"
//               id="headline"
//               name="headline"
//               value={formData.headline}
//               onChange={handleChange}
//               className={`${styles.input} ${styles.narrowInput}`}
//             />
//           </div>
          
//           <div className={styles.formRow}>
//             <div className={styles.formGroup}>
//               <label htmlFor="email" className={styles.label}>
//                 Email*
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`${styles.input} ${styles.narrowInput}`}
//                 required
//               />
//             </div>
//             <div className={styles.formGroup}>
//               <label htmlFor="phone" className={styles.label}>
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className={`${styles.input} ${styles.narrowInput}`}
//               />
//             </div>
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="resume" className={styles.label}>
//               Resume (PDF)
//             </label>
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
//               className={`${styles.input} ${styles.narrowInput}`}
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="bio" className={styles.label}>
//               Bio:
//             </label>
//             <textarea
//               id="bio"
//               name="bio"
//               rows={4}
//               value={formData.bio}
//               onChange={handleChange}
//               className={styles.input}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="linkedin" className={styles.label}>
//               LinkedIn
//             </label>
//             <input
//               type="url"
//               id="linkedin"
//               name="linkedin"
//               value={formData.linkedin}
//               onChange={handleChange}
//               className={`${styles.input} ${styles.narrowInput}`}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="website" className={styles.label}>
//               Website
//             </label>
//             <input
//               type="url"
//               id="website"
//               name="website"
//               value={formData.website}
//               onChange={handleChange}
//               className={`${styles.input} ${styles.narrowInput}`}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="date" className={styles.label}>
//               Date*
//             </label>
//             <input
//               type="text"
//               id="date"
//               name="date"
//               value={formData.date}
//               readOnly
//               className={`${styles.input} ${styles.narrowInput}`}
//             />
//           </div>
//           <div>
//             <button type="submit" className={styles.button}>
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from '../../ui/styles/InsertForm.module.css';

export default function EditProfilePage() {
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
    resume: '',
    searchingFor: '',
    timeCommitment: '',
    presence: '',
    location: '',
    typeOfPerson: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user?.id) return;

      try {
        const res = await fetch(`/api/profiles/${session.user.id}`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        const { profile } = await res.json();

        setFormData({
          id: profile.id,
          name: profile.name || '',
          bio: profile.bio || '',
          date: profile.date ? profile.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
          resume: profile.resume || '',
          email: profile.email || '',
          phone: profile.phone || '',
          linkedin: profile.linkedin || '',
          website: profile.website || '',
          headline: profile.headline || '',
          searchingFor: profile.searchingFor || '',
          timeCommitment: profile.timeCommitment || '',
          presence: profile.presence || '',
          location: profile.location || '',
          typeOfPerson: profile.typeOfPerson || '',
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    }

    fetchProfile();
  }, [session]);

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
    formDataCloudinary.append('upload_preset', 'resume_auto_preset');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dcqnwr46v/raw/upload', {
        method: 'POST',
        body: formDataCloudinary,
      });

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
      alert('Must be signed in to edit your profile.');
      return;
    }

    let resumeUrl = formData.resume;
    if (resumeFile) {
      const uploadedUrl = await uploadResume(resumeFile);
      if (!uploadedUrl) {
        alert('Failed to upload resume PDF');
        return;
      }
      resumeUrl = uploadedUrl;
    }

    const userId = session.user.id;
    const author = session.user.name;

    try {
      await fetch(`/api/profiles/${formData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          author,
          userId,
          resume: resumeUrl,
        }),
      });

      setResumeFile(null);
      router.push('/?tab=profiles');
      router.refresh();
    } catch (error) {
      console.error('❌ Failed to update profile', error);
      alert('There was an error updating your profile.');
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Edit Profile</h2>
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
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${styles.narrowInput}`}
                // required
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
                Preferred Work Type
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
              Update
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
