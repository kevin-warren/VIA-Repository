import styles from '../../styles/Post.module.css';
import Image from 'next/image';

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
        <div className={styles.logoAndContent}>
          {logo && (
            <Image src={logo} alt="Logo preview" width={50} height={50} className={styles.logoPreview} />
          )}
          <div className={styles.jobTextContent}>
            <div className={styles.jobTitle}>
              <h2>{title}</h2>
            </div>
            <p className={styles.jobDescription}>{company}</p>
            <p className={styles.jobDescription}>
              {jobType}, {presence}
            </p>
            <p className={styles.jobDate}>
              {location} • Posted on:{' '}
              {date instanceof Date ? date.toISOString().split('T')[0] : date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

