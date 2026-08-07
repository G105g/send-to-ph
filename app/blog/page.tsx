import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog | Send to PH",
  description:
    "Guides, tips, and news about sending money to the Philippines cheaply and safely.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        Blog
      </h1>
      <p className="mt-3 text-gray-400">
        Tips, comparisons, and guides for sending money to the Philippines.
      </p>

      {posts.length === 0 ? (
        <p className="mt-8 text-gray-500">No posts yet. Check back soon.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-[#27272a] bg-[#181818] p-6 transition-colors hover:border-gray-600"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {post.readMinutes} min read
                </span>
              </div>

              <Link href={`/blog/${post.slug}/`}>
                <h2 className="mt-2 text-xl font-semibold text-white transition-colors group-hover:text-green-500">
                  {post.title}
                </h2>
              </Link>

              <p className="mt-2 text-gray-300">{post.excerpt}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-[#27272a] px-2.5 py-1 text-xs font-medium text-gray-300"
                  >
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${post.slug}/`}
                className="mt-4 inline-block text-sm font-medium text-green-500 hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
