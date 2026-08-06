export const metadata = {
  title: "Blog | Send to PH",
  description:
    "Guides, tips, and news about sending money to the Philippines cheaply and safely.",
};

const posts = [
  {
    slug: "how-to-compare-remittance-fees",
    title: "How to compare remittance fees like a pro",
    excerpt:
      "Hidden FX markups can cost you more than flat fees. Learn what to look for when sending money to the Philippines.",
    date: "2026-08-06",
  },
  {
    slug: "best-way-send-usd-to-php",
    title: "Best way to send USD to PHP in 2026",
    excerpt:
      "A head-to-head look at Wise, Remitly, WorldRemit, Western Union, MoneyGram, and Xoom for US-to-Philippines transfers.",
    date: "2026-08-06",
  },
  {
    slug: "rate-alerts-save-money",
    title: "How rate alerts can save you money",
    excerpt:
      "The peso exchange rate moves daily. Set a rate alert and send when the rate works in your favor.",
    date: "2026-08-06",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        Blog
      </h1>
      <p className="mt-3 text-gray-400">
        Tips, comparisons, and guides for sending money to the Philippines.
      </p>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-[#27272a] bg-[#181818] p-6 transition-colors hover:border-gray-600"
          >
            <div className="text-xs text-gray-500">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <h2 className="mt-2 text-xl font-semibold text-white">{post.title}</h2>
            <p className="mt-2 text-gray-300">{post.excerpt}</p>
            <span className="mt-4 inline-block text-sm font-medium text-green-500">
              Coming soon
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
