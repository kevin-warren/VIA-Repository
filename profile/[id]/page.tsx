import { notFound } from 'next/navigation';
import { profiles } from '@/app/lib/placeholder-profiles';
import Profile from '@/app/ui/components/profiles/Profile';

type Props = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  // Await params in case it's a Promise
  const resolvedParams = params instanceof Promise ? await params : params;

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
  return profiles.map((profile) => ({
    id: profile.id,
  }));
}