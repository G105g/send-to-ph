import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#27272a] bg-[#111] text-gray-400">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm">
            © {new Date().getFullYear()} Send to PH. Independent comparison.
          </p>
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-white">Compare</Link>
            <Link href="/rate-alerts" className="hover:text-white">Rate Alerts</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/about" className="hover:text-white">About</Link>
          </nav>
        </div>
        <p className="mt-4 text-center text-xs text-gray-500 md:text-left">
          Rates and fees are estimates for comparison only. Confirm final pricing on the
          provider’s website before sending.
        </p>
      </div>
    </footer>
  );
}
