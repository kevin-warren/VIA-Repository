// 'use client';

// import { useSearchParams } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import Post from './posts/Post';
// import Profile from './profiles/ProfileList';
// import styles from '../styles/Tabs.module.css';

// interface PostType {
//   id: string;
//   title: string;
//   company: string;
//   category: string;
//   date: string;
//   location: string;
//   pay?: string | null;
//   presence?: string | null;
//   jobType?: string | null;
//   hours?: string | null;
//   startDate?: string | null;
//   endDate?: string | null;
//   summary?: string | null;
//   duties: string;
//   qualifications: string;
//   author?: string;
//   content?: string; // if you want to keep it
// }

// interface ProfileType {
//   id: string;
//   name: string;
//   bio: string;
//   date: string;
// }

// interface TabProps {
//   posts: PostType[];
//   profiles: ProfileType[];
// }

// export default function Tabs({ posts, profiles }: TabProps) {
//   const searchParams = useSearchParams();
//   const initialTab = searchParams.get('tab') === 'profiles' ? 'profiles' : 'jobs';
//   const [activeTab, setActiveTab] = useState<'jobs' | 'profiles'>(initialTab);

//   const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
//   const selectedPost = posts.find((p) => p.id === selectedPostId);

//   const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
//   const selectedProfile = profiles.find((p) => p.id === selectedProfileId);

//   useEffect(() => {
//     const tab = searchParams.get('tab');
//     if (tab === 'profiles' || tab === 'jobs') {
//       setActiveTab(tab);
//     }
//   }, [searchParams]);

//   return (
//     <>
//       <div className={styles.tabButtons}>
//         <button
//           className={`${styles.tab} ${activeTab === 'jobs' ? styles.activeTab : ''}`}
//           onClick={() => setActiveTab('jobs')}
//         >
//           Job Postings
//         </button>
//         <button
//           className={`${styles.tab} ${activeTab === 'profiles' ? styles.activeTab : ''}`}
//           onClick={() => setActiveTab('profiles')}
//         >
//           Profile Postings
//         </button>
//       </div>

//       {activeTab === 'jobs' ? (
//         <div className={styles.jobLayout}>
//           <div className={styles.postList}>
//             {posts.map((post) => (
//               <div key={post.id} onClick={() => setSelectedPostId(post.id)}>
//                 <Post {...post} />
//               </div>
//             ))}
//           </div>

//           <div className={styles.postDetail}>
//             {selectedPost ? (
//               <>
//                 <h2>{selectedPost.title}</h2>
//                 <p><strong>Company:</strong> {selectedPost.company}</p>
//                 <p><strong>Category:</strong> {selectedPost.category}</p>
//                 <p><strong>Date Posted:</strong> {selectedPost.date}</p>
//                 <p><strong>Location:</strong> {selectedPost.location}</p>
//                 {selectedPost.pay && <p><strong>Pay Rate:</strong> {selectedPost.pay}</p>}
//                 {selectedPost.presence && <p><strong>Work Environment:</strong> {selectedPost.presence}</p>}
//                 {selectedPost.jobType && <p><strong>Job Type:</strong> {selectedPost.jobType}</p>}
//                 {selectedPost.hours && <p><strong>Hours per Week:</strong> {selectedPost.hours}</p>}
//                 {selectedPost.startDate && <p><strong>Start Date:</strong> {selectedPost.startDate}</p>}
//                 {selectedPost.endDate && <p><strong>End Date:</strong> {selectedPost.endDate}</p>}
//                 {selectedPost.summary && <p><strong>Company Summary:</strong> {selectedPost.summary}</p>}
//                 <p><strong>Job Duties:</strong> {selectedPost.duties}</p>
//                 <p><strong>Qualifications:</strong> {selectedPost.qualifications}</p>
//               </>
//             ) : (
//               <p className={styles.postDetailText}>Select a post to view details</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div className={styles.jobLayout}>
//           <div className={styles.postList}>
//             {profiles.map((profile) => (
//               <div key={profile.id} onClick={() => setSelectedProfileId(profile.id)}>
//                 <Profile {...profile} />
//               </div>
//             ))}
//           </div>

//           <div className={styles.postDetail}>
//             {selectedProfile ? (
//               <>
//                 <h2>{selectedProfile.name}</h2>
//                 <p>{selectedProfile.date}</p>
//                 <p>{selectedProfile.bio}</p>
//               </>
//             ) : (
//               <p className={styles.postDetailText}>Select a profile to view details</p>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// Tabs.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Post from './posts/Post';
import Profile from './profiles/ProfileList';
import styles from '../styles/Tabs.module.css';
import type { Post as PostType, Profile as ProfileType } from '../../lib/types';
import Image from 'next/image';

interface TabProps {
  posts: PostType[];
  profiles: ProfileType[];
}

export default function Tabs({ posts, profiles }: TabProps) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'profiles' ? 'profiles' : 'jobs';
  const [activeTab, setActiveTab] = useState<'jobs' | 'profiles'>(initialTab);

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const selectedPost = posts.find((p) => p.id === selectedPostId);

  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const selectedProfile = profiles.find((p) => p.id === selectedProfileId);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'profiles' || tab === 'jobs') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <>
      <div className={styles.tabButtons}>
        <button
          className={`${styles.tab} ${activeTab === 'jobs' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          Job Postings
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'profiles' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('profiles')}
        >
          Profile Postings
        </button>
      </div>

      {activeTab === 'jobs' ? (
        <div className={styles.jobLayout}>
          <div className={styles.postList}>
            {posts.map((post) => (
              <div key={post.id} onClick={() => setSelectedPostId(post.id)}>
                <Post {...post} />
              </div>
            ))}
          </div>

          <div className={styles.postDetail}>
            {selectedPost ? (
              <div className={styles.jobPosting}>
                <div className={styles.applyButtonWrapper}>
                  <button className={styles.tab}>Apply</button>
                </div>

                <div className={styles.logoContainer}>
                  <Image src={selectedPost.logo} alt="Logo preview" width={40} height={40} className={styles.logoPreview} />
                  <h2 className={styles.companyName}>{selectedPost.company}</h2>
                </div>

                <h1>{selectedPost.title}</h1>


                <p className={styles.jobDate}>
                  Posted on: {selectedPost.date}
                  {selectedPost.applyBy && (
                    <>
                      {' • '}Apply by: {new Date(selectedPost.applyBy).toISOString().split('T')[0]}
                    </>
                  )}
                </p>

                <hr />

                <p> 
                  <strong>
                    {selectedPost.location} {' '} • {' '}
                    {selectedPost.jobType} {'('}
                    {selectedPost.presence}{')'}
                  </strong>
                </p>


                {selectedPost.pay && <p><strong>Pay Rate:</strong> {selectedPost.pay}</p>}
                {/* {selectedPost.startDate && <p><strong>Start Date:</strong> {selectedPost.startDate}</p>}
                {selectedPost.endDate && <p><strong>End Date:</strong> {selectedPost.endDate}</p>} */}

                <p>
                  {selectedPost.startDate && (
                    <>
                      <strong>Start Date:</strong>{' '}
                      {new Date(selectedPost.startDate).toISOString().split('T')[0]}
                    </>
                  )}
                  {selectedPost.startDate && selectedPost.endDate && ' • '}
                  {selectedPost.endDate && (
                    <>
                      <strong>End Date:</strong>{' '}
                      {new Date(selectedPost.endDate).toISOString().split('T')[0]}
                    </>
                  )}
                </p>


                {/* Multiline text rendering */}
                {selectedPost.summary && (
                  <div className={styles.postSection}>
                    <strong>Company Summary:</strong>
                    <div dangerouslySetInnerHTML={{ __html: selectedPost.summary.replace(/\n/g, '<br />') }} />
                  </div>
                )}
                {selectedPost.jobDescription && (
                  <div className={styles.postSection}>
                    <strong>Job Description:</strong>
                    <div dangerouslySetInnerHTML={{ __html: selectedPost.jobDescription.replace(/\n/g, '<br />') }} />
                  </div>
                )}
                {selectedPost.duties && (
                  <div className={styles.postSection}>
                    <strong>Job Duties and Responsibilities:</strong>
                    <div dangerouslySetInnerHTML={{ __html: selectedPost.duties.replace(/\n/g, '<br />') }} />
                  </div>
                )}
                {selectedPost.qualifications && (
                  <div className={styles.postSection}>
                    <strong>Qualifications:</strong>
                    <div dangerouslySetInnerHTML={{ __html: selectedPost.qualifications.replace(/\n/g, '<br />') }} />
                  </div>
                )}
              </div>
            ) : (
              <p className={styles.postDetailText}>Select a post to view details</p>
            )}
          </div>


        </div>
      ) : (
        <div className={styles.jobLayout}>
          <div className={styles.postList}>
            {profiles.map((profile) => (
              <div key={profile.id} onClick={() => setSelectedProfileId(profile.id)}>
                <Profile {...profile} />
              </div>
            ))}
          </div>

          <div className={styles.postDetail}>
            {selectedProfile ? (
              <>
                <h2>{selectedProfile.name}</h2>
                <p>{selectedProfile.date}</p>
                <p>{selectedProfile.bio}</p>
              </>
            ) : (
              <p className={styles.postDetailText}>Select a profile to view details</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
