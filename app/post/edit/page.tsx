// 'use client';

// import { useSearchParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { useState, useEffect } from 'react';
// import styles from '../../ui/styles/InsertForm.module.css';
// import Image from 'next/image';

// export default function EditPostPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { data: session } = useSession();

//   const [loading, setLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     id: '',
//     title: '',
//     company: '',
//     logo: '',
//     category: '',
//     date: '',
//     applyBy: '',
//     location: '',
//     pay: '',
//     presence: '',
//     jobType: '',
//     jobDescription: '',
//     startDate: '',
//     endDate: '',
//     summary: '',
//     duties: '',
//     qualifications: '',
//   });

//   useEffect(() => {
//     const id = searchParams.get('id');
//     if (!id) {
//       console.error('No post id in query params');
//       return;
//     }

//     async function fetchPost() {
//       try {
//         const res = await fetch(`/api/posts/${id}`);
//         if (!res.ok) throw new Error('Failed to fetch post');
//         const { post } = await res.json();

//         setFormData({
//           id: post.id,
//           title: post.title || '',
//           company: post.company || '',
//           logo: post.logo || '',
//           category: post.category || '',
//           date: post.date ? post.date.slice(0, 10) : '',
//           applyBy: post.applyBy ? post.applyBy.slice(0, 10) : '',
//           location: post.location || '',
//           pay: post.pay || '',
//           presence: post.presence || '',
//           jobType: post.jobType || '',
//           jobDescription: post.jobDescription || '',
//           startDate: post.startDate ? post.startDate.slice(0, 10) : '',
//           endDate: post.endDate ? post.endDate.slice(0, 10) : '',
//           summary: post.summary || '',
//           duties: post.duties || '',
//           qualifications: post.qualifications || '',
//         });

//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchPost();
//   }, [searchParams]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
  
//     const formDataUpload = new FormData();
//     formDataUpload.append('file', file);
//     formDataUpload.append('upload_preset', 'My_upload_preset'); // replace with your Cloudinary preset
  
//     try {
//       const res = await fetch('https://api.cloudinary.com/v1_1/dcqnwr46v/image/upload', {
//         method: 'POST',
//         body: formDataUpload,
//       });
  
//       const data = await res.json();
//       setFormData(prev => ({ ...prev, logo: data.secure_url }));
//     } catch (err) {
//       console.error('Failed to upload logo to Cloudinary:', err);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     await fetch('/api/posts', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         ...formData,
//         // hours: formData.hours ? Number(formData.hours) : null,
//         author: session?.user?.name,
//         userId: session?.user?.id,
//       }),
//     });

//     router.push('/?tab=posts');
//   };

//   if (loading) return <div>Loading post...</div>;

//   return (
//     <main className={styles.pageWrapper}>
//       <div className={styles.container}>
//         <h2 className={styles.heading}>New Job Post</h2>
//         <form onSubmit={handleSubmit} className={styles.form}>
  
//         <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Job Title*</label>
//             <input
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Company Name*</label>
//             <input
//               name="company"
//               value={formData.company}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             />
//           </div>
//         </div>

//         <div className={styles.formRow}>
//             <div className={styles.formGroup}>
//               <label className={styles.label}>Date Posted*</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 className={`${styles.input} ${styles.narrowInput}`}
//                 required
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.label}>Apply By</label>
//               <input
//                 type="date"
//                 name="applyBy"
//                 value={formData.applyBy}
//                 onChange={handleChange}
//                 className={`${styles.input} ${styles.narrowInput}`}
//               />
//             </div>
//           </div>

//           <div className={styles.formRow}>

//             <div className={styles.formGroup}>
//               <label className={styles.label}>Company Logo*</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleLogoUpload}
//                 className={`${styles.input} ${styles.narrowInput}`}
//                 required
//               />
//               {formData.logo && (
//                 <Image src={formData.logo} alt="Logo preview" width={40} height={40} className={styles.logoPreview} />
//               )}
//             </div>
//             {/* <div className={styles.formGroup}>
//               <label className={styles.label}>Company Logo*</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleLogoUpload}
//                 className={`${styles.input} ${styles.narrowInput}`}
//                 // required
//               />
//               {formData.logo && (
//                 <Image src={formData.logo} alt="Logo preview" width={40} height={40} className={styles.logoPreview} />
//               )}
//             </div> */}

//             <div className={styles.formGroup}>
//               <label className={styles.label}>Job Location*</label>
//               <input
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 className={`${styles.input} ${styles.narrowInput}`}
//                 required
//               />
//             </div>
//           </div>

//           <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Job Category*</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             >
//               <option value="">Select</option>
//               <option>Technology</option>
//               <option>Healthcare</option>
//               <option>Finance</option>
//               <option>Education</option>
//               <option>Marketing</option>
//               <option>Retail</option>
//               <option>Engineering</option>
//               <option>Legal</option>
//               <option>Other</option>
//             </select>
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Job Type*</label>
//             <select
//               name="jobType"
//               value={formData.jobType}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             >
//               <option value="">Select</option>
//               <option>Full-time</option>
//               <option>Part-time</option>
//               <option>Internship</option>
//             </select>
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Work Environment*</label>
//             <select
//               name="presence"
//               value={formData.presence}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             >
//               <option value="">Select</option>
//               <option>Remote</option>
//               <option>Hybrid</option>
//               <option>On-site</option>
//             </select>
//           </div>
//         </div>
  
          
  
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Pay Rate/Range</label>
//             <input
//               name="pay"
//               value={formData.pay}
//               onChange={handleChange}
//               className={`${styles.input} ${styles.narrowInput}`}
//             />
//           </div>
  
          
//         <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Start Date</label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               className={styles.input}
//             />
//           </div>
  
//           <div className={styles.formGroup}>
//             <label className={styles.label}>End Date</label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               className={styles.input}
//             />
//           </div>
//         </div>
  
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Company Summary</label>
//             <textarea
//               name="summary"
//               value={formData.summary}
//               onChange={handleChange}
//               rows={4}
//               className={styles.input}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Job Description</label>
//             <textarea
//               name="jobDescription"
//               value={formData.jobDescription}
//               onChange={handleChange}
//               rows={4}
//               className={styles.input}
//             />
//           </div>
  
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Job Duties and Responsibilities*</label>
//             <textarea
//               name="duties"
//               value={formData.duties}
//               onChange={handleChange}
//               rows={4}
//               className={styles.input}
//               required
//             />
//           </div>
  
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Qualifications*</label>
//             <textarea
//               name="qualifications"
//               value={formData.qualifications}
//               onChange={handleChange}
//               rows={4}
//               className={styles.input}
//               required
//             />
//           </div>
//           <div>
//             <button type="submit" className={styles.button}>Update</button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import styles from '../../ui/styles/InsertForm.module.css';
import Image from 'next/image';

export default function EditPostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    company: '',
    logo: '',
    category: '',
    date: '',
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

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) {
      console.error('No post id in query params');
      return;
    }

    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const { post } = await res.json();

        setFormData({
          id: post.id,
          title: post.title || '',
          company: post.company || '',
          logo: post.logo || '',
          category: post.category || '',
          date: post.date ? post.date.slice(0, 10) : '',
          applyBy: post.applyBy ? post.applyBy.slice(0, 10) : '',
          location: post.location || '',
          pay: post.pay || '',
          presence: post.presence || '',
          jobType: post.jobType || '',
          jobDescription: post.jobDescription || '',
          startDate: post.startDate ? post.startDate.slice(0, 10) : '',
          endDate: post.endDate ? post.endDate.slice(0, 10) : '',
          summary: post.summary || '',
          duties: post.duties || '',
          qualifications: post.qualifications || '',
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPost();
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  
  //   const formDataUpload = new FormData();
  //   formDataUpload.append('file', file);
  //   formDataUpload.append('upload_preset', 'My_upload_preset'); // replace with your Cloudinary preset
  
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

    await fetch('/api/posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        // hours: formData.hours ? Number(formData.hours) : null,
        author: session?.user?.name,
        userId: session?.user?.id,
      }),
    });

    router.push('/?tab=posts');
  };

  if (loading) return <div>Loading post...</div>;

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Edit Project Post</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
  
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Project Name*</label>
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
              <label className={styles.label}>Company/Organization Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className={`${styles.input} ${styles.narrowInput}`}
                // required
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
              <option>Financial Services</option>
              <option>Legal Services</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Marketing</option>
              <option>Retail</option>
              <option>Engineering</option>
              <option>Legal</option>
              <option>Real Estate</option>
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
            <label className={styles.label}>Project Qualifications*</label>
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
            <button type="submit" className={styles.button}>Update</button>
          </div>
        </form>
      </div>
    </main>
  );
}