import { sql } from '@vercel/postgres';
import Profile from '../../ui/components/profiles/Profile';

export const dynamic = "force-dynamic";

export default async function ProfilePage({ params }: { params: { userId: string } }) {
  const result = await sql`
    SELECT name, bio, date FROM "Profile"
    WHERE "userId" = ${params.userId}
    LIMIT 1;
  `;

  const profile = result.rows[0];

  if (!profile) {
    return <div>No profile found.</div>;
  }

  return (
    <Profile
      name={profile.name}
      bio={profile.bio}
      date={profile.date}
    />
  );
}
