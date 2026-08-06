// Wise public rate endpoint (no API key required for GET /rates)
// Docs: https://wise.com/help/articles/2942133/getting-the-mid-market-exchange-rate

const WISE_API_BASE = "https://api.wise.com/v1";

export async function getUsdPhpRate(): Promise<number | null> {
  try {
    const res = await fetch(
      `${WISE_API_BASE}/rates?source=USD&target=PHP`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 300 }, // cache 5 minutes
      }
    );

    if (!res.ok) {
      console.error("Wise API error:", res.status, await res.text());
      return null;
    }

    const data = await res.json();

    // Wise returns an array of rate objects; pick the first USD->PHP match
    if (Array.isArray(data) && data.length > 0) {
      const match = data.find(
        (r: { source: string; target: string; rate: number }) =>
          r.source === "USD" && r.target === "PHP"
      );
      if (match) return Number(match.rate);
    }

    return null;
  } catch (err) {
    console.error("Failed to fetch Wise rate:", err);
    return null;
  }
}

// Fallback mid-market rate used when Wise API is unavailable.
// Update this periodically.
export const FALLBACK_USD_PHP_RATE = 56.85;
