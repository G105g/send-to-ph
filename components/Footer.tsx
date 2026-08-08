import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#27272a] bg-[#111] text-gray-400">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm">
            © {new Date().getFullYear()} Learn To Transfer. Independent comparison.
          </p>
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-white">Compare</Link>
            <Link href="/rate-alerts" className="hover:text-white">Rate Alerts</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/about" className="hover:text-white">About</Link>
          </nav>
        </div>
        <div className="mt-4 flex flex-col items-center justify-between gap-2 border-t border-[#27272a] pt-4 text-xs text-gray-500 md:flex-row">
          <nav className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/affiliate-disclosure" className="hover:text-white">Affiliate Disclosure</Link>
          </nav>
          <span>Rates and fees are estimates for comparison only.</span>
        </div>
      </div>
    </footer>
  );
}
