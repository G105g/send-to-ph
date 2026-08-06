"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRightLeft,
  Banknote,
  CheckCircle2,
  Clock,
  Info,
  Loader2,
  Truck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { computeQuotes, formatCurrency, formatNumber, Quote } from "@/lib/providers";
import { FALLBACK_USD_PHP_RATE, getUsdPhpRate } from "@/lib/rates";

const COUNTRIES = {
  from: [{ code: "US", name: "United States", currency: "USD" }],
  to: [{ code: "PH", name: "Philippines", currency: "PHP" }],
};

export default function ComparisonTool() {
  const [amount, setAmount] = useState<number>(500);
  const [rate, setRate] = useState<number | null>(null);
  const [loadingRate, setLoadingRate] = useState(true);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getUsdPhpRate().then((r) => {
      if (cancelled) return;
      setRate(r ?? FALLBACK_USD_PHP_RATE);
      setLoadingRate(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const quotes = useMemo<Quote[]>(() => {
    if (!rate) return [];
    return computeQuotes(amount, rate);
  }, [amount, rate]);

  const best = quotes[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
      <div className="mb-8 text-center md:mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Learn To Transfer — Compare Money Transfers
        </h1>
        <p className="mt-3 text-gray-400">
          Compare fees, exchange rates, and speed — find the best deal in seconds.
        </p>
      </div>

      <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-5 shadow-xl md:p-8">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-400">
              From
            </label>
            <div className="rounded-xl border border-[#27272a] bg-[#111] px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">
                  {COUNTRIES.from[0].name}
                </span>
                <span className="rounded-md bg-[#27272a] px-2 py-1 text-xs font-semibold text-white">
                  {COUNTRIES.from[0].currency}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center pb-1 md:pb-3">
            <ArrowRightLeft className="text-gray-500" size={20} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-400">
              To
            </label>
            <div className="rounded-xl border border-[#27272a] bg-[#111] px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">
                  {COUNTRIES.to[0].name}
                </span>
                <span className="rounded-md bg-[#27272a] px-2 py-1 text-xs font-semibold text-white">
                  {COUNTRIES.to[0].currency}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="amount"
            className="mb-1.5 block text-sm font-medium text-gray-400"
          >
            Send amount
          </label>
          <div className="flex items-center rounded-xl border border-[#27272a] bg-[#111] px-4 py-3 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
            <span className="mr-2 text-lg text-gray-400">$</span>
            <input
              id="amount"
              type="number"
              min={1}
              step={1}
              value={amount}
              onChange={(e) =>
                setAmount(Number(e.target.value) || 0)
              }
              className="w-full bg-transparent text-lg font-semibold text-white outline-none placeholder:text-gray-600"
              aria-label="Send amount in USD"
            />
            <span className="text-sm font-medium text-gray-500">USD</span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
          {loadingRate ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Loading live rate…
            </>
          ) : rate ? (
            <>
              <TrendingUp size={16} className="text-green-500" />
              Live mid-market rate: 1 USD = {" "}
              <span className="font-semibold text-white">
                {formatNumber(rate, 2)} PHP
              </span>
            </>
          ) : null}
        </div>
      </div>

      {best && (
        <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-100 md:text-base">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 size={18} className="text-green-500" />
            Best deal right now: {best.name}
          </div>
          <p className="mt-1">
            Recipient gets{" "}
            <span className="font-bold text-white">
              {formatCurrency(best.recipientGetsPhp, "PHP")}
            </span>{" "}
            with a fee of{" "}
            <span className="font-semibold text-white">
              {formatCurrency(best.feeUsd, "USD")}
            </span>
            .
          </p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white md:text-xl">
          Provider comparison
        </h2>

        <div className="space-y-3">
          {quotes.map((quote, idx) => {
            const isBest = idx === 0;
            const savings = isBest
              ? 0
              : quote.recipientGetsPhp - best.recipientGetsPhp;

            return (
              <div
                key={quote.id}
                className={`relative rounded-2xl border p-4 transition-all md:p-5 ${
                  isBest
                    ? "border-green-500/50 bg-gradient-to-r from-green-500/10 to-transparent"
                    : "border-[#27272a] bg-[#181818] hover:border-gray-600"
                } ${
                  highlighted === quote.id ? "ring-1 ring-white/20" : ""
                }`}
                onMouseEnter={() => setHighlighted(quote.id)}
                onMouseLeave={() => setHighlighted(null)}
              >
                {isBest && (
                  <span className="absolute -top-3 left-4 rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-bold text-black">
                    Best deal
                  </span>
                )}

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-black"
                      style={{ backgroundColor: quote.logoColor }}
                    >
                      {quote.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {quote.name}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {quote.speed}
                        </span>
                        <span className="flex items-center gap-1">
                          <Truck size={12} />
                          {quote.deliveryMethods.slice(0, 2).join(" • ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                    <div>
                      <div className="text-xs text-gray-500">Rate</div>
                      <div className="font-medium text-white">
                        {formatNumber(quote.rateUsed, 4)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Fee</div>
                      <div className="font-medium text-white">
                        {formatCurrency(quote.feeUsd, "USD")}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Total cost</div>
                      <div className="font-medium text-white">
                        {formatCurrency(quote.totalCostUsd, "USD")}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-green-500">They get</div>
                      <div className="text-lg font-bold text-white">
                        {formatCurrency(quote.recipientGetsPhp, "PHP")}
                      </div>
                    </div>
                  </div>
                </div>

                {quote.minFeeNote && (
                  <div className="mt-3 flex items-start gap-1.5 text-xs text-gray-500">
                    <Info size={12} className="mt-0.5 shrink-0" />
                    {quote.minFeeNote}
                  </div>
                )}

                {!isBest && savings !== 0 && (
                  <div className="mt-2 text-xs text-red-400">
                    {formatCurrency(-savings, "PHP")} less than best deal
                  </div>
                )}

                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    quote.name + " send money to Philippines"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full rounded-lg border border-white/10 bg-white/5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10 md:mt-5"
                >
                  Visit {quote.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#27272a] bg-[#181818] p-4">
          <Wallet className="mb-2 text-green-500" size={20} />
          <h3 className="font-medium text-white">Compare fees</h3>
          <p className="mt-1 text-sm text-gray-400">
            See flat fees and exchange rate markups side by side.
          </p>
        </div>
        <div className="rounded-xl border border-[#27272a] bg-[#181818] p-4">
          <Banknote className="mb-2 text-green-500" size={20} />
          <h3 className="font-medium text-white">More pesos received</h3>
          <p className="mt-1 text-sm text-gray-400">
            Sort results by the total PHP your recipient receives.
          </p>
        </div>
        <div className="rounded-xl border border-[#27272a] bg-[#181818] p-4">
          <Clock className="mb-2 text-green-500" size={20} />
          <h3 className="font-medium text-white">Fast delivery</h3>
          <p className="mt-1 text-sm text-gray-400">
            Compare bank, cash pickup, mobile wallet, and home delivery speed.
          </p>
        </div>
      </div>
    </div>
  );
}
