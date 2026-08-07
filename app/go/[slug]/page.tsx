import { notFound, redirect } from "next/navigation";
import { AFFILIATE_LINKS } from "@/lib/affiliates";

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(AFFILIATE_LINKS).map((slug) => ({ slug }));
}

export default function GoPage({ params }: { params: { slug: string } }) {
  const config = AFFILIATE_LINKS[params.slug];
  if (!config) notFound();
  redirect(config.destinationUrl);
}
