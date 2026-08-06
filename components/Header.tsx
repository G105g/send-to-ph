"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#111]/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Send to <span className="text-green-500">PH</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-300 md:flex">
          <Link href="/" className="hover:text-white">Compare</Link>
          <Link href="/rate-alerts" className="hover:text-white">Rate Alerts</Link>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <Link href="/about" className="hover:text-white">About</Link>
        </nav>

        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#27272a] bg-[#181818] md:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4 text-sm font-medium text-gray-300">
            <Link href="/" className="py-2 hover:text-white" onClick={() => setOpen(false)}>Compare</Link>
            <Link href="/rate-alerts" className="py-2 hover:text-white" onClick={() => setOpen(false)}>Rate Alerts</Link>
            <Link href="/blog" className="py-2 hover:text-white" onClick={() => setOpen(false)}>Blog</Link>
            <Link href="/about" className="py-2 hover:text-white" onClick={() => setOpen(false)}>About</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
