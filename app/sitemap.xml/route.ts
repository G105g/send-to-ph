import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { AFFILIATE_LINKS } from "@/lib/affiliates";

export const dynamic = "force-static";
export const revalidate = 86400;

const BASE_URL = "https://send-to-ph.vercel.app";

export async function GET() {
  const staticRoutes = [
    "",
    "about",
    "blog",
    "contact",
    "converter",
    "privacy",
    "rate-alerts",
    "affiliate-disclosure",
  ];

  const posts = getAllPosts();
  const postRoutes = posts.map((post) => `blog/${post.slug}`);
  const goRoutes = Object.keys(AFFILIATE_LINKS).map((slug) => `go/${slug}`);

  const urls = [...staticRoutes, ...postRoutes, ...goRoutes];

  const today = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}/${route}/</loc>
    <lastmod>${today}</lastmod>
    <priority>${route === "" ? "1.0" : route.startsWith("blog/") ? "0.7" : "0.5"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
