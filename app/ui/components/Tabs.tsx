'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Post from './posts/Post';
import Profile from './profiles/ProfileList';
import styles from '../styles/Tabs.module.css';
import type { Post as PostType, Profile as ProfileType } from '../../lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import { useSession } from 'next-auth/react';


interface TabProps {
  posts: PostType[];
  profiles: ProfileType[];
}

export default function Tabs({ posts, profiles }: TabProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

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
          Project Postings
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'profiles' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('profiles')}
        >
          Advisor Postings
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
                <button
                  className={styles.tab}
                  onClick={() => {
                    if (!session) {
                      router.push(`/api/auth/signin?callbackUrl=/apply?postId=${selectedPost.id}`);
                    } else {
                      router.push(`/apply?postId=${selectedPost.id}`);
                    }
                  }}
                >
                  Apply
                </button>
               
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


                {selectedPost.pay && <p><strong>Compensation:</strong> {selectedPost.pay}</p>}
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

          {/* <div className={styles.postDetail}>
            {selectedProfile ? (
              <>
                <h1>{selectedProfile.name}</h1>
                <h3>{selectedProfile.headline}</h3>
                {(selectedProfile.resume || selectedProfile.date) && (
                  <p className={styles.resumeAndDate} style={{ marginBottom: '0rem' }}>
                    {selectedProfile.resume && (
                      <a href={selectedProfile.resume} target="_blank" rel="noopener noreferrer">
                        <strong>View Resume</strong>
                      </a>
                    )}
                    {selectedProfile.resume && selectedProfile.date && <span className={styles.dot}> • </span>}
                    {selectedProfile.date && <span className={styles.jobDate}>Posted on: {selectedProfile.date}</span>}
                  </p>
                )}
                {selectedProfile.searchingFor && (
                  <p style={{ marginTop: '0rem' }}><strong>Searching for:</strong> {selectedProfile.searchingFor}</p>
                )}

                <hr />

                {selectedProfile.timeCommitment && (
                  <p><strong>Time Commitment:</strong> {selectedProfile.timeCommitment}</p>
                )}
                {selectedProfile.presence && (
                  <p><strong>Presence:</strong> {selectedProfile.presence}</p>
                )}
                {selectedProfile.location && (
                  <p><strong>Location:</strong> {selectedProfile.location}</p>
                )}
                {selectedProfile.typeOfPerson && (
                  <p><strong>Type of Person:</strong> {selectedProfile.typeOfPerson}</p>
                )}

                {selectedProfile.bio && (
                  <>
                    <h3>About</h3>
                    <p>{selectedProfile.bio}</p>
                    
                    <hr />
                  </>
                )}

                

                <h3>Contact</h3>
                {selectedProfile.email && <p><strong>Email:</strong> <a href={`mailto:${selectedProfile.email}`}>{selectedProfile.email}</a></p>}
                {selectedProfile.phone && <p><strong>Phone:</strong> <a href={`tel:${selectedProfile.phone}`}>{selectedProfile.phone}</a></p>}
                {selectedProfile.linkedin && <p><strong>LinkedIn:</strong> <a href={selectedProfile.linkedin} target="_blank" rel="noopener noreferrer">{selectedProfile.linkedin}</a></p>}
                {selectedProfile.website && <p><strong>Website:</strong> <a href={selectedProfile.website} target="_blank" rel="noopener noreferrer">{selectedProfile.website}</a></p>}
              </>
            ) : (
              <p className={styles.postDetailText}>Select a profile to view details</p>
            )}
          </div> */}

        <div className={styles.postDetail}>
          {selectedProfile ? (
            <>
              {/* Name and Headline */}
              <div className={styles.profileHeader}>
                <h1>{selectedProfile.name}</h1>
                <h3 className={styles.profileHeadline}>{selectedProfile.headline}</h3>
              </div>

              {/* Resume and Date */}
              {(selectedProfile.resume || selectedProfile.date) && (
                <p className={styles.resumeAndDate}>
                  {selectedProfile.resume && (
                    <a href={selectedProfile.resume} target="_blank" rel="noopener noreferrer">
                      <strong>View Resume</strong>
                    </a>
                  )}
                  {selectedProfile.resume && selectedProfile.date && (
                    <span className={styles.dot}> • </span>
                  )}
                  {selectedProfile.date && (
                    <span className={styles.jobDate}>Posted on: {selectedProfile.date}</span>
                  )}
                </p>
              )}

              

              <hr />

              {/* Quick Details */}

              {/* Searching For */}
              {selectedProfile.searchingFor && (
                <p>
                  <strong>Searching for:</strong> {selectedProfile.searchingFor}
                </p>
              )}
              <div className={styles.profileDetailsGrid}>
                {selectedProfile.timeCommitment && (
                  <p>
                    <strong>Time Commitment:</strong> {selectedProfile.timeCommitment}
                  </p>
                )}
                {selectedProfile.presence && (
                  <p>
                    <strong>Preferred Work Style:</strong> {selectedProfile.presence}
                  </p>
                )}
                {selectedProfile.location && (
                  <p>
                    <strong>Available Work Location(s):</strong> {selectedProfile.location}
                  </p>
                )}
                {selectedProfile.typeOfPerson && (
                  <p>
                    <strong>Type of Person:</strong> {selectedProfile.typeOfPerson}
                  </p>
                )}
              </div>

              

              {/* Bio Section */}
              {selectedProfile.bio && (
                <>
                  <hr />
                  <h3>About</h3>
                  <p>{selectedProfile.bio}</p>
                  
                </>
              )}

              

              {/* Contact Section */}
              
              <div className={styles.profileContact}>
              {(selectedProfile.email || selectedProfile.phone || selectedProfile.linkedin || selectedProfile.website) && (
                  <>
                  <hr />
                  <h3>Contact</h3>
                  </>
                  )}

                  {selectedProfile.email && (
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${selectedProfile.email}`}>{selectedProfile.email}</a>
                  </p>
                )}

                {selectedProfile.phone && (
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a href={`tel:${selectedProfile.phone}`}>{selectedProfile.phone}</a>
                  </p>
                )}
                {selectedProfile.linkedin && (
                  <p>
                    <strong>LinkedIn:</strong>{' '}
                    <a href={selectedProfile.linkedin} target="_blank" rel="noopener noreferrer">
                      {selectedProfile.linkedin}
                    </a>
                  </p>
                )}
                {selectedProfile.website && (
                  <p>
                    <strong>Website:</strong>{' '}
                    <a href={selectedProfile.website} target="_blank" rel="noopener noreferrer">
                      {selectedProfile.website}
                    </a>
                  </p>
                )}
              </div>
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
