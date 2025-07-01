import Link from 'next/link';
import styles from '../../styles/Profile.module.css';

export default function Profile({
  id,
  name,
  bio,
  date,
}: {
  id: string;
  name: string;
  bio: string;
  date: Date | string;
}) {
  return (
    <div className={styles.profileCard}>
      <Link href={`/profile/${id}`} className={styles.profileName}>
        <h2>{name}</h2>
      </Link>
      <p className={styles.profileDate}>{date instanceof Date ? date.toISOString().split('T')[0] : date}</p>
      <p className={styles.profileBio}>{bio}</p>
    </div>
  );
}
