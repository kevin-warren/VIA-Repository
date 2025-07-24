// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import styles from '../../../ui/styles/Post.module.css';

// interface Application {
//   id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   linkedin?: string;
//   website?: string;
//   resume?: string;
//   bio?: string;
//   date: string;
// }

// export default function MyApplicationsPage() {
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [loading, setLoading] = useState(true);
//   const params = useParams();
//   const postId = params.postId as string;

//   useEffect(() => {
//     if (!postId) return;

//     async function fetchApplications() {
//       try {
//         const res = await fetch(`/api/applications/post/${postId}`);
//         if (!res.ok) throw new Error('Failed to fetch applications');
//         const data = await res.json();
//         setApplications(data.applications || []);
//       } catch (error) {
//         console.error('Error fetching applications:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchApplications();
//   }, [postId]);

//   if (loading) return <p>Loading applications...</p>;
//   if (!applications.length) return <p>No applications submitted yet.</p>;

//   return (
//     <main>
//       <div style={{ padding: '1rem' }}>
//       <h1 style={{ marginBottom: '1rem' }}>Applications</h1>
//       </div>
      
//       <div className={styles.scrollContainer}>
        
//         {applications.map((app) => (
//           <div
//             key={app.id}
//             className={styles.viewPostCard}
//             onClick={() => window.location.href = `/application/${app.id}`}
//             style={{ cursor: 'pointer' }}
//           >
//             <div className={styles.jobTitle}>
//               <h2>{app.name}</h2>
//             </div>
//               <p className={styles.jobDescription}><strong>Email:</strong> {app.email}</p>
//               {/* {app.phone && <p className={styles.jobDescription}><strong>Phone:</strong> {app.phone}</p>} */}
//               {/* {app.linkedin && <p className={styles.jobDescription}><strong>LinkedIn:</strong> {app.linkedin}</p>} */}
//               <p className={styles.jobDate}>
//                 Submitted on: {new Date(app.date).toLocaleDateString()}
//               </p>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../../../ui/styles/Post.module.css';

interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  website?: string;
  resume?: string;
  bio?: string;
  date: string;
}

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobTitle, setJobTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const postId = params.postId as string;

  useEffect(() => {
    if (!postId) return;

    async function fetchApplicationsAndJobTitle() {
      try {
        // Fetch applications
        const applicationsRes = await fetch(`/api/applications/post/${postId}`);
        if (!applicationsRes.ok) throw new Error('Failed to fetch applications');
        const applicationsData = await applicationsRes.json();

        // Fetch job post (for title)
        const postRes = await fetch(`/api/posts/${postId}`);
        if (!postRes.ok) throw new Error('Failed to fetch post');
        const postData = await postRes.json();

        setApplications(applicationsData.applications || []);
        setJobTitle(postData.post?.title || null);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchApplicationsAndJobTitle();
  }, [postId]);

  if (loading) return <p>Loading applications...</p>;
  if (!applications.length) return <p>No applications submitted yet.</p>;

  return (
    <main>
      <div style={{ padding: '1rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>
          Applications{jobTitle ? ` for ${jobTitle}` : ''}
        </h1>
      </div>

      <div className={styles.scrollContainer}>
        {applications.map((app) => (
          <div
            key={app.id}
            className={styles.viewPostCard}
            onClick={() => window.location.href = `/application/${app.id}`}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.jobTitle}>
              <h2>{app.name}</h2>
            </div>
            <p className={styles.jobDescription}><strong>Email:</strong> {app.email}</p>
            {/* Uncomment below lines if you want more details */}
            {/* {app.phone && <p className={styles.jobDescription}><strong>Phone:</strong> {app.phone}</p>} */}
            {/* {app.linkedin && <p className={styles.jobDescription}><strong>LinkedIn:</strong> {app.linkedin}</p>} */}
            <p className={styles.jobDate}>
              Submitted on: {new Date(app.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
