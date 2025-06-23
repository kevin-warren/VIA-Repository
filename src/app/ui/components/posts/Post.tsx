// import React, { JSX } from 'react';


/*import Link from 'next/link';

export default function Component({ id, title, content, date }: { id: string, title: string, content: string, date: string }) {
    return (
        <div key={id} className="border border-gray-200 p-4 my-4">
            <Link href={`/post/${id}`}>
                <h2>{title}</h2>
            </Link>
            <p className="text-gray-500">{date}</p>
            <p>{content}</p>
        </div>
    );
}
*/

import Link from 'next/link';
import styles from '@/app/ui/styles/Post.module.css';

export default function Component({
  id,
  title,
  content,
  date,
}: {
  id: string;
  title: string;
  content: string;
  date: string;
}) {
  return (
    //<div className={styles.wrapper}>
      <div key={id} className={styles.jobPosting}>
      <div className={styles.container}>
        <Link href={`/post/${id}`} className={styles.jobTitle}>
          <h2>{title}</h2>
        </Link>
        <button className = {styles.tab}>
          Apply
        </button>
      </div>
      <p className={styles.jobDate}>{date}</p>
      <p className={styles.jobDescription}>{content}</p>
      </div>
    //</div>
  );
}

