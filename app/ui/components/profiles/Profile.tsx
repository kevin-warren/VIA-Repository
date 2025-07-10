import styles from '../../styles/Profile.module.css';

export default function Profile({
  name,
  bio,
  date,
}: {
  name: string;
  bio: string;
  date: Date | string;
}) {
  return (
    <div className={styles.viewProfileCard}>
      <div className={styles.profileActions}>
        <button className={styles.profileButton}>Edit</button>
        <button className={styles.profileButton}>Delete</button>
      </div>
      <div className={styles.profileName}>
        <h2>{name}</h2>
      </div>
      <p className={styles.profileDate}>
        {date instanceof Date ? date.toISOString().split('T')[0] : date}
      </p>
      <p className={styles.profileBio}>{bio}</p>
    </div>
  );
}
