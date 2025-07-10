// app/ui/components/ServerNavLinks.tsx
import { auth } from '../../../auth';
import { sql } from '@vercel/postgres';
import NavLinksClient from './NavLinksClient';

export default async function ServerNavLinks() {
  const session = await auth();
  const userId = session?.user?.id;

  let hasProfile = false;

  if (userId) {
    const result = await sql`
      SELECT id FROM "Profile"
      WHERE "userId" = ${userId}
      LIMIT 1;
    `;
    hasProfile = result.rows.length > 0;
  }

  return <NavLinksClient hasProfile={hasProfile} />;
}
