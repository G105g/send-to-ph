"use client";

import { useState } from "react";
import { Bell, CheckCircle2, Loader2 } from "lucide-react";

export default function RateAlertsPage() {
  const [email, setEmail] = useState("");
  const [targetRate, setTargetRate] = useState("56.50");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Placeholder: in production this posts to a Resend-backed API route
    // or writes to Supabase. Simulating network delay for MVP.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <Bell className="mx-auto h-10 w-10 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Rate Alerts
        </h1>
        <p className="mt-3 text-gray-400">
          Get notified when the USD to PHP rate hits your target.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-[#27272a] bg-[#181818] p-6 md:p-8">
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <h2 className="mt-4 text-xl font-semibold text-white">You’re on the list</h2>
            <p className="mt-2 text-gray-400">
              We’ll email you when USD/PHP reaches your target rate.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#27272a] bg-[#111] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="targetRate"
                className="mb-1.5 block text-sm font-medium text-gray-300"
              >
                Target rate (PHP per 1 USD)
              </label>
              <input
                id="targetRate"
                type="number"
                step="0.01"
                min="1"
                required
                value={targetRate}
                onChange={(e) => setTargetRate(e.target.value)}
                className="w-full rounded-xl border border-[#27272a] bg-[#111] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-400 disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Subscribing…
                </>
              ) : (
                "Get rate alerts"
              )}
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-xs text-gray-500">
          We respect your inbox. Unsubscribe anytime. Resend integration coming
          next.
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-[#27272a] bg-[#181818] p-5">
        <h2 className="text-lg font-semibold text-white">Why rate alerts matter</h2>
        <p className="mt-2 text-sm text-gray-400">
          A better rate can mean hundreds more pesos for your recipient on a
          single transfer. Set your target, and we’ll watch the market for you.
        </p>
      </div>
    </div>
  );
}
