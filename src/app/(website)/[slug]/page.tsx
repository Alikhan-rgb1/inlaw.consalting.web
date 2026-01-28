import { client } from "@/sanity/lib/client";
import { type SanityDocument, type FilteredResponseQueryOptions } from "next-sanity";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const options: FilteredResponseQueryOptions = { next: { revalidate: false } };

export async function generateStaticParams() {
  return [];
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = null;

  try {
    post = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 prose">
      <h1>{post.title}</h1>
      <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
      {Array.isArray(post.body) && <PortableText value={post.body} />}
    </main>
  );
}
