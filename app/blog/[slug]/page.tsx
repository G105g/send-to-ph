import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import PostContent from "@/components/PostContent";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} | Send to PH Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white"
      >
        <ArrowLeft size={16} /> Back to blog
      </Link>

      <AffiliateDisclosure />

      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-gray-300">{post.excerpt}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <User size={14} /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {post.readMinutes} min read
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-[#27272a] px-3 py-1 text-xs font-medium text-gray-300"
            >
              <Tag size={12} /> {tag}
            </span>
          ))}
        </div>
      </header>

      <PostContent content={post.content} />

      <div className="mt-12 rounded-2xl border border-[#27272a] bg-[#181818] p-6">
        <h3 className="text-lg font-semibold text-white">Ready to send?{' '}</h3>
        <p className="mt-2 text-gray-400">
          Compare fees and exchange rates for sending money from the USA to the
          Philippines.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-xl bg-green-500 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-green-400"
        >
          Compare providers
        </Link>
      </div>
    </div>
  );
}
