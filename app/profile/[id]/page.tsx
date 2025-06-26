import { notFound } from 'next/navigation';
// import { profiles } from '@/app/lib/placeholder-profiles';
import Profile from '../../ui/components/profiles/Profile';
import { getProfiles } from '../../lib/data'; // import real data

type Props = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  // Await params in case it's a Promise
  const resolvedParams = params instanceof Promise ? await params : params;
  const profiles = await getProfiles(); // fetch from database
  const profile = profiles.find((profile) => profile.id === resolvedParams.id);

  if (!profile) notFound();

  return (
    <>
      <h1>Profile</h1>
      <Profile {...profile} />
    </>
  );
}

export async function generateStaticParams() {
  const profiles = await getProfiles(); // fetch real post IDs
  return profiles.map((profile) => ({
    id: profile.id,
  }));
}