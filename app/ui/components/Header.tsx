// import { auth } from '../../../auth';
// import { SignInButton } from '../sign-in-button';
// import { SignOutButton } from '../profile-button';
// import styles from '../../ui/styles/Header.module.css'; 
// import Link from 'next/link';

// export const dynamic = "force-dynamic";

// export default async function Header() {
//   const session = await auth();

//   return (
//     <header className={styles.header}>
//       <Link href="/" className={styles.title}>VIA Repository</Link>

//       <div className={styles.authControls}>
//         {session?.user ? (
//           <>
//             <span>Signed in: {session.user.name}</span>
//             <SignOutButton />
//           </>
//         ) : (
//           <SignInButton />
//         )}
//       </div>
//     </header>
//   );
// }

// app/ui/components/Header.tsx
import { auth } from '../../../auth';
import { SignInButton } from '../sign-in-button';
import { SignOutButton } from '../profile-button';
import styles from '../../ui/styles/Header.module.css';
import Link from 'next/link';

export const dynamic = "force-dynamic";

export default async function Header() {
  const session = await auth();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.title}>VIA Repository</Link>

      <div className={styles.authControls}>
        {session?.user ? (
          <SignOutButton userName={session.user.name ?? ""} />
        ) : (
          <SignInButton />
        )}
      </div>
    </header>
  );
}
