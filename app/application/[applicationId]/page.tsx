// 'use client';

// import { use, useEffect, useState } from 'react';

// interface Application {
//   name: string;
//   email: string;
//   phone: string;
//   linkedin: string;
//   website: string;
//   resume: string;
//   bio: string;
//   date: string;
// }

// export default function ViewApplicationPage({
//   params,
// }: {
//   params: Promise<{ applicationId: string }>;
// }) {
//   const { applicationId } = use(params);
//   const [application, setApplication] = useState<Application | null>(null);

//   useEffect(() => {
//     async function fetchApplication() {
//       try {
//         const res = await fetch(`/api/applications/${applicationId}`);
//         console.log('Fetching /api/applications/', applicationId, 'Status:', res.status);

//         if (!res.ok) {
//           throw new Error(`Failed to fetch application: ${res.status}`);
//         }

//         const data = await res.json();
//         setApplication(data.application || null);
//       } catch (err) {
//         console.error('❌ Error loading application:', err);
//       }
//     }

//     fetchApplication();
//   }, [applicationId]);

//   if (!application) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Application Details</h2>
//       <p><strong>Name:</strong> {application.name}</p>
//       <p><strong>Email:</strong> {application.email}</p>
//       <p><strong>Phone:</strong> {application.phone}</p>
//       <p><strong>LinkedIn:</strong> {application.linkedin}</p>
//       <p><strong>Website:</strong> {application.website}</p>
//       <p><strong>Bio:</strong> {application.bio}</p>
//       <p>
//         <strong>Resume:</strong>{' '}
//         <a href={application.resume} target="_blank" rel="noopener noreferrer">
//           View Resume
//         </a>
//       </p>
//       <p><strong>Date Applied:</strong> {new Date(application.date).toLocaleDateString()}</p>
//     </div>
//   );
// }

'use client';

import { use, useEffect, useState } from 'react';
import styles from '../../ui/styles/Tabs.module.css'; // same as used in tabs.tsx

interface Application {
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  website?: string;
  resume?: string;
  bio?: string;
  date: string;
}

export default function ViewApplicationPage({
  params,
}: {
  params: Promise<{ applicationId: string }>;
}) {
  const { applicationId } = use(params);
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    async function fetchApplication() {
      try {
        const res = await fetch(`/api/applications/${applicationId}`);
        if (!res.ok) throw new Error(`Failed to fetch application: ${res.status}`);
        const data = await res.json();
        setApplication(data.application || null);
      } catch (err) {
        console.error('❌ Error loading application:', err);
      }
    }

    fetchApplication();
  }, [applicationId]);

  if (!application) return <p>Loading...</p>;

  return (
    <div className={styles.postDetail} style={{
      maxWidth: '700px',
      margin: '0rem auto',
      background: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      // boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <h1>{application.name}</h1>

      {(application.resume || application.date) && (
        <p className={styles.resumeAndDate}>
          {application.resume && (
            <a href={application.resume} target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          )}
          {application.resume && application.date && <span className={styles.dot}> • </span>}
          {application.date && (
            <span className={styles.jobDate}>
              Submitted on: {new Date(application.date).toLocaleDateString()}
            </span>
          )}
        </p>
      )}

      <hr />

      {application.bio && (
        <>
          <h3>About</h3>
          <p>{application.bio}</p>
          <hr />
        </>
      )}

      <h3>Contact</h3>
      {application.email && (
        <p>
          <strong>Email:</strong>{' '}
          <a href={`mailto:${application.email}`}>{application.email}</a>
        </p>
      )}
      {application.phone && (
        <p>
          <strong>Phone:</strong>{' '}
          <a href={`tel:${application.phone}`}>{application.phone}</a>
        </p>
      )}
      {application.linkedin && (
        <p>
          <strong>LinkedIn:</strong>{' '}
          <a href={application.linkedin} target="_blank" rel="noopener noreferrer">
            {application.linkedin}
          </a>
        </p>
      )}
      {application.website && (
        <p>
          <strong>Website:</strong>{' '}
          <a href={application.website} target="_blank" rel="noopener noreferrer">
            {application.website}
          </a>
        </p>
      )}
    </div>
  );
}
