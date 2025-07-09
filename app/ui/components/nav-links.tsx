'use client';
import {
  //UserGroupIcon,
  //HomeIcon,
  // DocumentDuplicateIcon,
  // EnvelopeIcon
} from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
//import { usePathname } from 'next/navigation';
import Link from 'next/link';
//import clsx from 'clsx';

import styles from '../styles/NavLinks.module.css';


const links = [
  // { name: 'Repository', 
  //   href: '/', 
  //   icon: HomeIcon 
  // },
  {
    name: 'Create New Job Post',
    href: "/post/insert",
    // icon: DocumentDuplicateIcon,
  },
  { 
    name: 'Create New Profile', 
    href: "/profile/insert", 
    // icon: EnvelopeIcon 
  },
];

export default function NavLinks() {
  //const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <div className={styles.linkButtonWrapper} key={link.name}>
          <Link href={link.href} className={styles.linkButton}>
            <div>{link.name}</div>
          </Link>
        </div>
      ))}

    </>
  );
}
