'use client';
import {
  //UserGroupIcon,
  HomeIcon,
  // DocumentDuplicateIcon,
  // EnvelopeIcon
} from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
//import { usePathname } from 'next/navigation';
import Link from 'next/link';
//import clsx from 'clsx';
import styles from '@/app/ui/styles/NavLinks.module.css';


const links = [
  { name: 'Repository', 
    href: '/', 
    icon: HomeIcon 
  },
  {
    name: 'Application Form',
    href: '/application-form',
    // icon: DocumentDuplicateIcon,
  },
  { 
    name: 'Profile Form', 
    href: '/profile-form', 
    // icon: EnvelopeIcon 
  },
];

export default function NavLinks() {
  //const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        //const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={styles.navLink}
          >
            <p className={styles.linkText}>{link.name}</p>
          </Link>
        );
      })}

    </>
  );
}
