import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /go/

Sitemap: https://send-to-ph.vercel.app/sitemap.xml
`;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
