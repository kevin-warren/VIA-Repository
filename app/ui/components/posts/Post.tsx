import styles from '../../styles/Post.module.css';

export default function Component({
  title,
  company,
  logo,
  location,
  jobType,
  presence,
  date,
}: {
  title: string;
  company: string;
  logo: string;
  location: string;
  jobType: string;
  presence: string;
  date: Date | string;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.jobPosting}>
        <div className={styles.jobTitle}>
          <h2>{title}</h2>
          {/* <img src={logo} /> */}
        </div>
        <p className={styles.jobDescription}>{company}</p>
        <p className={styles.jobDescription}>{jobType}, {presence}</p>
        <p className={styles.jobDate} >
          {location} • Posted on:{' '}
          {date instanceof Date ? date.toISOString().split('T')[0] : date}
        </p>
      </div>
    </div>
  );
}

