// app/ui/components/NavLinksClient.tsx
'use client';

import Link from 'next/link';
import styles from '../styles/NavLinks.module.css';

interface NavLinksClientProps {
  hasProfile: boolean;
}

export default function NavLinksClient({ hasProfile }: NavLinksClientProps) {
  const links = [
    {
      name: 'Create Project Post',
      href: '/post/insert',
    },
    // Conditionally show profile creation link
    !hasProfile && {
      name: 'Create Advisor Post',
      href: '/profile/insert',
    },
  ].filter(Boolean) as { name: string; href: string }[];

  return (
    <>
      {links.map((link) => (
        <div key={link.name} className={styles.linkButtonWrapper}>
          <Link href={link.href} className={styles.linkButton}>
            {link.name}
          </Link>
        </div>
      ))}
    </>
  );
}


// 'use client';
// import {
//   //UserGroupIcon,
//   //HomeIcon,
//   // DocumentDuplicateIcon,
//   // EnvelopeIcon
// } from '@heroicons/react/24/outline';

// import { auth } from '../../../auth';
// import { sql } from '@vercel/postgres';
// // Map of links to display in the side navigation.
// // Depending on the size of the application, this would be stored in a database.
// //import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// //import clsx from 'clsx';

// import styles from '../styles/NavLinks.module.css';


// export const dynamic = "force-dynamic";

// export default async function NavLinks() {
//   const session = await auth();
//   const userId = session?.user?.id;

//   // Assume you store profiles with a "userId" column
//   let hasProfile = false;

//   if (userId) {
//     const result = await sql`
//       SELECT id FROM "Profile"
//       WHERE "userId" = ${userId}
//       LIMIT 1;
//     `;
//     hasProfile = result.rows.length > 0;
//   }

//   const links = [
//     {
//       name: 'Create New Job Post',
//       href: '/post/insert',
//     },
//     // Conditionally include the profile link
//     !hasProfile && {
//       name: 'Create New Profile',
//       href: '/profile/insert',
//     },
//   ].filter(Boolean); // remove false/null values

//   return (
//     <>
//       {links
//         .filter((link): link is { name: string; href: string } => Boolean(link))
//         .map((link) => (
//           <div key={link.name}>
//             <Link href={link.href}>{link.name}</Link>
//           </div>
//       ))}
//     </>
//   );
// }


// const links = [
//   // { name: 'Repository', 
//   //   href: '/', 
//   //   icon: HomeIcon 
//   // },
//   {
//     name: 'Create New Job Post',
//     href: "/post/insert",
//     // icon: DocumentDuplicateIcon,
//   },
//   { 
//     name: 'Create New Profile', 
//     href: "/profile/insert", 
//     // icon: EnvelopeIcon 
//   },
// ];

// export default function NavLinks() {
//   //const pathname = usePathname();
//   return (
//     <>
//       {links.map((link) => (
//         <div className={styles.linkButtonWrapper} key={link.name}>
//           <Link href={link.href} className={styles.linkButton}>
//             <div>{link.name}</div>
//           </Link>
//         </div>
//       ))}

//     </>
//   );
// }
