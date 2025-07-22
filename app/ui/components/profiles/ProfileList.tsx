// import Link from 'next/link';
import styles from '../../styles/Profile.module.css';

export default function Profile({
  //id,
  name,
  date,
  headline,
}: {
  //id: string;
  name: string;
  date: Date | string;
  headline: string;
}) {
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileName}>
        <h2>{name}</h2>
      </div>
      <p className={styles.profileHeadline}>{headline}</p>
      <p className={styles.profileDate}>
        Posted on:{' '}{date instanceof Date ? date.toISOString().split('T')[0] : date}
      </p>
    </div>
  );
}

