// Free, no-key exchange rate API: ExchangeRate-API Open Access Endpoint
// Docs: https://www.exchangerate-api.com/docs/free
// Endpoint: https://open.er-api.com/v6/latest/{base}
// Attribution required: https://www.exchangerate-api.com

export type RateResponse = {
  result: "success" | "error";
  base_code: string;
  time_last_update_unix: number;
  time_next_update_unix: number;
  rates: Record<string, number>;
  "error-type"?: string;
};

const EXCHANGE_API_BASE = "https://open.er-api.com/v6/latest";

export async function fetchLatestRates(base: string): Promise<RateResponse | null> {
  try {
    const res = await fetch(`${EXCHANGE_API_BASE}/${encodeURIComponent(base)}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      console.error("ExchangeRate-API error:", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    if (data.result !== "success") {
      console.error("ExchangeRate-API error:", data["error-type"]);
      return null;
    }
    return data as RateResponse;
  } catch (err) {
    console.error("Failed to fetch exchange rates:", err);
    return null;
  }
}

export function convertAmount(
  amount: number,
  from: string,
  to: string,
  rates: Record<string, number>
): number | null {
  if (!rates[from] || !rates[to]) return null;
  const inBase = amount / rates[from];
  const result = inBase * rates[to];
  return Number(result.toFixed(4));
}

export const MAJOR_CURRENCIES = [
  { code: "PHP", name: "Philippine Peso", flag: "🇵🇭" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "KRW", name: "South Korean Won", flag: "🇰🇷" },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽" },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾" },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩" },
  { code: "VND", name: "Vietnamese Dong", flag: "🇻🇳" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴" },
];

export const STORAGE_KEYS = {
  rates: "sendtoph:rates",
  favorites: "sendtoph:favorites",
};

export type CachedRates = {
  base: string;
  rates: Record<string, number>;
  lastUpdate: number;
  nextUpdate: number;
};

export function saveRatesToCache(cache: CachedRates) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.rates, JSON.stringify(cache));
  } catch {
    // Ignore quota/storage errors
  }
}

export function loadRatesFromCache(): CachedRates | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.rates);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedRates;
    // Only use cache if it's less than 48 hours old
    if (Date.now() - parsed.lastUpdate * 1000 > 48 * 60 * 60 * 1000) return null;
    return parsed;
  } catch {
    return null;
  }
}

export type FavoritePair = {
  from: string;
  to: string;
};

export function loadFavorites(): FavoritePair[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.favorites);
    return raw ? (JSON.parse(raw) as FavoritePair[]) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: FavoritePair[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  } catch {
    // Ignore quota/storage errors
  }
}

export function formatCurrencyValue(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}
