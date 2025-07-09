// import Link from 'next/link';
import styles from '../../styles/Post.module.css';

export default function Component({
  // id,
  title,
  content,
  date,
}: {
  // id: string;
  title: string;
  content: string;
  date: Date | string;
}) {
  return (
    <div className={styles.wrapper}>  
      <div className={styles.jobPosting}>
        <div className={styles.container}>
          <div className={styles.jobTitle}>
            <h2>{title}</h2>
          </div>
          <button className={styles.tab}>Apply</button>
        </div>
        <p className={styles.jobDate}>
          {date instanceof Date ? date.toISOString().split('T')[0] : date}
        </p>
        <p className={styles.jobDescription}>{content}</p>
      </div>
    </div>

  );
}
