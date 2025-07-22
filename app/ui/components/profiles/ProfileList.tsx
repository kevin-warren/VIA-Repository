// import Link from 'next/link';
import styles from '../../styles/Profile.module.css';

export default function Profile({
  //id,
  name,
  bio,
  date,
  email,
  phone,
  linkedin,
  website,
  headline,
}: {
  //id: string;
  name: string;
  bio: string | null;
  date: Date | string;
  email: string;
  phone?: string | null;
  linkedin?: string | null;
  website?: string | null;
  headline: string;
}) {
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileName}>
        <h2>{name}</h2>
      </div>
      <p className={styles.profileHeadline}>{headline}</p>
      {/* <p className={styles.profileBio}>{bio}</p> */}
      {/* <p className={styles.profileDob}>{dob instanceof Date ? dob.toISOString().split('T')[0] : dob}</p> */}
      {/* <p className={styles.profileEmail}>{email}</p> */}
      {/* <p className={styles.profilePhone}>{phone}</p> */}
      {/* <p className={styles.profileLinkedin}>{linkedin}</p> */}
      {/* <p className={styles.profileWebsite}>{website}</p> */}
      <p className={styles.profileDate}>
        Posted on:{' '}{date instanceof Date ? date.toISOString().split('T')[0] : date}
      </p>
    </div>
  );
}

