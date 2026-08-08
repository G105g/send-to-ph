"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, Send } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <h2 className="mt-4 text-xl font-semibold text-white">Message sent</h2>
        <p className="mt-2 text-gray-400">
          Thanks for reaching out. We’ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-gray-300"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-xl border border-[#27272a] bg-[#111] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-gray-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-xl border border-[#27272a] bg-[#111] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-gray-300"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-xl border border-[#27272a] bg-[#111] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          placeholder="How can we help?"
        />
      </div>

      {status === "error" && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-400 disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Sending…
          </>
        ) : (
          <>
            <Send size={18} />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
