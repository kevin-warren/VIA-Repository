//import { notFound } from 'next/navigation';
import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';

// Define the correct props type
type PageProps = {
  params: {
    id: string;
  };
};

// ✅ No "async" needed unless you're fetching
export default function Page({ params }: PageProps) {
  const post = posts.find((post) => post.id === params.id);

  if (!post) return <p>Post not found.</p>;

  return (
    <>
      <h1>Post</h1>
      <Post {...post} />
    </>
  );
}

// Optional for static generation
export function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id,
  }));
}
