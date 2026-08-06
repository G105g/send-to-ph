"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRightLeft,
  Heart,
  History,
  Loader2,
  RefreshCw,
  Search,
  Star,
  Trash2,
  TrendingUp,
  WifiOff,
} from "lucide-react";
import {
  CachedRates,
  convertAmount,
  FavoritePair,
  fetchLatestRates,
  formatCurrencyValue,
  loadFavorites,
  loadRatesFromCache,
  MAJOR_CURRENCIES,
  saveFavorites,
  saveRatesToCache,
} from "@/lib/exchange";

const TIME_RANGES = [
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "90D", days: 90 },
];

function getCurrency(code: string) {
  return MAJOR_CURRENCIES.find((c) => c.code === code) || { code, name: code, flag: "" };
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(500);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PHP");
  const [ratesCache, setRatesCache] = useState<CachedRates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const [favorites, setFavorites] = useState<FavoritePair[]>([]);
  const [range, setRange] = useState(30);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);
    setOffline(!navigator.onLine);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);

      // Try cache first so offline users see something immediately.
      const cached = loadRatesFromCache();
      if (cached && !cancelled) {
        setRatesCache(cached);
      }

      if (navigator.onLine) {
        const fresh = await fetchLatestRates(from);
        if (!cancelled) {
          if (fresh) {
            const cache: CachedRates = {
              base: fresh.base_code,
              rates: fresh.rates,
              lastUpdate: fresh.time_last_update_unix,
              nextUpdate: fresh.time_next_update_unix,
            };
            setRatesCache(cache);
            saveRatesToCache(cache);
          } else if (!cached) {
            setError("Could not load exchange rates. Please try again.");
          }
        }
      } else if (!cached) {
        setError("You’re offline and no cached rates are available.");
      }

      if (!cancelled) setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [from]);

  const converted = useMemo(() => {
    if (!ratesCache) return null;
    return convertAmount(amount, from, to, ratesCache.rates);
  }, [amount, from, to, ratesCache]);

  const rate = useMemo(() => {
    if (!ratesCache || !ratesCache.rates[from] || !ratesCache.rates[to]) return null;
    return Number((ratesCache.rates[to] / ratesCache.rates[from]).toFixed(6));
  }, [from, to, ratesCache]);

  const inverseRate = useMemo(() => {
    if (!rate) return null;
    return Number((1 / rate).toFixed(6));
  }, [rate]);

  const isFavorite = favorites.some((f) => f.from === from && f.to === to);

  function toggleFavorite() {
    const next = isFavorite
      ? favorites.filter((f) => !(f.from === from && f.to === to))
      : [...favorites, { from, to }];
    setFavorites(next);
    saveFavorites(next);
  }

  function removeFavorite(pair: FavoritePair) {
    const next = favorites.filter((f) => !(f.from === pair.from && f.to === pair.to));
    setFavorites(next);
    saveFavorites(next);
  }

  function swap() {
    setFrom(to);
    setTo(from);
  }

  function applyFavorite(pair: FavoritePair) {
    setFrom(pair.from);
    setTo(pair.to);
  }

  const filteredCurrencies = useMemo(() => {
    const term = search.trim().toUpperCase();
    return term
      ? MAJOR_CURRENCIES.filter(
          (c) =>
            c.code.includes(term) || c.name.toUpperCase().includes(term)
        )
      : MAJOR_CURRENCIES;
  }, [search]);

  // Synthetic historical data: walk backwards from current rate with small noise.
  // In production, replace with real historical API series.
  const history = useMemo(() => {
    if (!rate) return [];
    const days = range;
    const data = [];
    const now = new Date();
    let current = rate;
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (days - 1 - i));
      const noise = (Math.sin(i * 0.5) + Math.cos(i * 0.3)) * 0.003 * current;
      current = i === 0 ? rate : Number((rate + noise).toFixed(6));
      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        rate: current,
      });
    }
    return data;
  }, [rate, range]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
      <div className="mb-8 text-center md:mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Currency Converter
        </h1>
        <p className="mt-3 text-gray-400">
          Live rates, offline cache, and your favorite pairs in one place.
        </p>
      </div>

      {offline && (
        <div className="mb-6 flex items-center justify-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
          <WifiOff size={16} />
          You’re offline. Showing cached rates if available.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Converter card */}
          <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-5 shadow-xl md:p-8">
            <div className="mb-5">
              <label
                htmlFor="amount"
                className="mb-1.5 block text-sm font-medium text-gray-400"
              >
                Amount
              </label>
              <div className="flex items-center rounded-xl border border-[#27272a] bg-[#111] px-4 py-3 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
                <input
                  id="amount"
                  type="number"
                  min={1}
                  step={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="w-full bg-transparent text-lg font-semibold text-white outline-none placeholder:text-gray-600"
                  aria-label="Amount"
                />
              </div>
            </div>

            <div className="grid items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
              <CurrencySelect
                label="From"
                value={from}
                onChange={setFrom}
                search={search}
                setSearch={setSearch}
                options={filteredCurrencies}
              />

              <button
                onClick={swap}
                className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#27272a] bg-[#111] text-gray-400 transition-colors hover:border-green-500 hover:text-green-500 md:mb-3"
                aria-label="Swap currencies"
              >
                <ArrowRightLeft size={18} />
              </button>

              <CurrencySelect
                label="To"
                value={to}
                onChange={setTo}
                search={search}
                setSearch={setSearch}
                options={filteredCurrencies}
              />
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-[#111] p-4">
              <div>
                <div className="text-sm text-gray-500">Converted amount</div>
                <div className="text-2xl font-bold text-white md:text-3xl">
                  {converted !== null ? formatCurrencyValue(converted, to) : "—"}
                </div>
              </div>
              <button
                onClick={toggleFavorite}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                  isFavorite
                    ? "border-yellow-500/50 bg-yellow-500/20 text-yellow-500"
                    : "border-[#27272a] bg-[#111] text-gray-400 hover:text-white"
                }`}
                aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
              >
                <Star
                  size={20}
                  fill={isFavorite ? "currentColor" : "none"}
                  strokeWidth={isFavorite ? 0 : 2}
                />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <TrendingUp size={14} className="text-green-500" />
                {rate ? `1 ${from} = ${rate} ${to}` : "Rate unavailable"}
              </span>
              {inverseRate && (
                <span className="text-gray-500">
                  1 {to} = {inverseRate} {from}
                </span>
              )}
            </div>

            {ratesCache && (
              <div className="mt-3 text-xs text-gray-500">
                Rates updated{" "}
                {new Date(ratesCache.lastUpdate * 1000).toLocaleString("en-US")}.{" "}
                <a
                  href="https://www.exchangerate-api.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-300"
                >
                  Rates By Exchange Rate API
                </a>
              </div>
            )}

            {loading && (
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                <Loader2 size={16} className="animate-spin" />
                Loading live rates…
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </div>
            )}
          </div>

          {/* Chart */}
          <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-5 md:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <History size={18} className="text-green-500" />
                <h2 className="font-semibold text-white">
                  {from} → {to} trend
                </h2>
              </div>
              <div className="flex gap-1">
                {TIME_RANGES.map((r) => (
                  <button
                    key={r.days}
                    onClick={() => setRange(r.days)}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                      range === r.days
                        ? "bg-green-500 text-black"
                        : "bg-[#27272a] text-gray-400 hover:text-white"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64 w-full md:h-72">
              {history.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={history}>
                    <defs>
                      <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      stroke="#52525b"
                      tick={{ fill: "#a1a1aa", fontSize: 12 }}
                      interval="preserveStartEnd"
                      minTickGap={24}
                    />
                    <YAxis
                      domain={["auto", "auto"]}
                      stroke="#52525b"
                      tick={{ fill: "#a1a1aa", fontSize: 12 }}
                      tickFormatter={(v) => Number(v).toFixed(3)}
                      width={54}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#181818",
                        border: "1px solid #27272a",
                        borderRadius: "8px",
                        color: "#f3f4f6",
                      }}
                      itemStyle={{ color: "#22c55e" }}
                      formatter={(value) => [
                        `${Number(value ?? 0).toFixed(4)} ${to}`,
                        `${from} → ${to}`,
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="rate"
                      stroke="#22c55e"
                      strokeWidth={2}
                      fill="url(#rateGradient)"
                      dot={false}
                      activeDot={{ r: 4, fill: "#22c55e", stroke: "#111" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-500">
                  Chart will appear once rates load.
                </div>
              )}
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Historical trend is simulated from the current rate for demo purposes.
              Real historical data will be added via a time-series API next.
            </p>
          </div>
        </div>

        {/* Sidebar: favorites */}
        <aside className="h-fit rounded-2xl border border-[#27272a] bg-[#181818] p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Heart size={18} className="text-green-500" />
            <h2 className="font-semibold text-white">Favorite pairs</h2>
          </div>

          {favorites.length === 0 ? (
            <p className="text-sm text-gray-500">
              No favorites yet. Tap the star on a conversion to save a pair.
            </p>
          ) : (
            <ul className="space-y-2">
              {favorites.map((pair, idx) => (
                <li
                  key={`${pair.from}-${pair.to}-${idx}`}
                  className="flex items-center justify-between rounded-xl bg-[#111] px-3 py-2"
                >
                  <button
                    onClick={() => applyFavorite(pair)}
                    className="flex flex-1 items-center gap-2 text-left text-sm text-white hover:text-green-500"
                  >
                    <span className="font-semibold">{pair.from}</span>
                    <ArrowRightLeft size={12} className="text-gray-500" />
                    <span className="font-semibold">{pair.to}</span>
                  </button>
                  <button
                    onClick={() => removeFavorite(pair)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                    aria-label="Remove favorite"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 rounded-xl border border-[#27272a] bg-[#111] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <RefreshCw size={14} className="text-green-500" />
              Offline ready
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Rates are cached locally so you can convert even without an
              internet connection.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function CurrencySelect({
  label,
  value,
  onChange,
  search,
  setSearch,
  options,
}: {
  label: string;
  value: string;
  onChange: (code: string) => void;
  search: string;
  setSearch: (s: string) => void;
  options: { code: string; name: string; flag: string }[];
}) {
  const selected = getCurrency(value);

  return (
    <div className="relative">
      <label className="mb-1.5 block text-sm font-medium text-gray-400">
        {label}
      </label>
      <div className="group relative">
        <select
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setSearch("");
          }}
          className="w-full appearance-none rounded-xl border border-[#27272a] bg-[#111] px-4 py-3 pr-10 text-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
        >
          {options.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.code} — {c.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
          <Search size={16} />
        </div>
      </div>
    </div>
  );
}
