// // app/profile/edit/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import styles from '../../ui/styles/InsertForm.module.css';

// export default function EditPostPage() {
//   const router = useRouter();
//   const { data: session, /*status */ } = useSession();
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     id: '',
//     title: '',
//     content: '',
//     date: new Date().toISOString().slice(0, 10),
//   });

//   useEffect(() => {
//     async function fetchPost() {
//       if (!session?.user?.id) return;
//       const res = await fetch(`/api/posts/${session.user.id}`);
//       const { post } = await res.json();
//       setFormData({
//         id: post.id,
//         title: post.title,
//         content: post.content,
//         date: post.date.slice(0, 10),
//       });
//       setLoading(false);
//     }
//     fetchPost();
//   }, [session]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await fetch('/api/posts', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         ...formData,
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
//         <h2 className={styles.heading}>Edit Post</h2>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <div className={styles.formGroup}>
//             <label htmlFor="title" className={styles.label}>Title:</label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className={styles.input}
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="content" className={styles.label}>Content:</label>
//             <textarea
//               id="content"
//               name="content"
//               rows={4}
//               value={formData.content}
//               onChange={handleChange}
//               className={styles.input}
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="date" className={styles.label}>Date:</label>
//             <input
//               type="text"
//               id="date"
//               name="date"
//               value={formData.date}
//               readOnly
//               className={styles.input}
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

export default function EditPostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    content: '',
    date: '',
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
          title: post.title,
          content: post.content,
          date: post.date ? post.date.slice(0, 10) : '',
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPost();
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
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
        <h2 className={styles.heading}>Edit Post</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>Title:</label>
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
            <button type="submit" className={styles.button}>Update</button>
          </div>
        </form>
      </div>
    </main>
  );
}
