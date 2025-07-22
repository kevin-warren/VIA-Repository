import { sql } from '@vercel/postgres';
import Profile from '../../ui/components/profiles/ViewProfile';

export const dynamic = 'force-dynamic';

export default async function ProfilePage({ params }: { params: { userId: string } }) {
  const result = await sql`
    SELECT name, bio, date, resume, email, phone, linkedin, website, headline FROM "Profile"
    WHERE "userId" = ${params.userId}
    LIMIT 1;
  `;

  const profile = result.rows[0];
  

  return (
    <>
    <main style={{ padding: '1rem' }}>
      <h1>My Profile</h1>
      <Profile
        name={profile.name}
        bio={profile.bio}
        date={profile.date}
        resume={profile.resume}
        email={profile.email}
        phone={profile.phone}
        linkedin={profile.linkedin}
        website={profile.website}
        headline={profile.headline}
      />
    </main>
    </>
  );
}
