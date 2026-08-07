export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  readMinutes: number;
};

export const posts: Post[] = [
  {
    slug: "how-to-compare-remittance-fees",
    title: "How to compare remittance fees like a pro",
    excerpt:
      "Hidden FX markups can cost you more than flat fees. Learn what to look for when sending money to the Philippines.",
    publishedAt: "2026-08-06",
    author: "Send to PH team",
    tags: ["fees", "fx-markup", "philippines"],
    readMinutes: 5,
    content: `## The two numbers that matter

When you send money abroad, most people only look at the transfer fee. But providers make a second profit through the exchange rate markup — the gap between the rate they give you and the real mid-market rate.

## Flat fees vs. hidden markups

- **Flat fee**: a fixed amount like $3.99 or $4.99, often shown clearly.
- **FX margin**: a percentage shaved off the exchange rate, usually hidden in plain sight.

A provider advertising "$0 fee" might still take 1–2% through the exchange rate. On a $500 transfer, that can be $5–$10 more than a provider with a small flat fee and a fair rate.

## How to calculate the true cost

1. Find the mid-market rate (the rate banks use to trade with each other).
2. Compare it to the rate your provider quotes.
3. Multiply the difference by your send amount.
4. Add the flat fee.

That total is what you’re really paying.

## Why it matters for the Philippines

Filipino remittances are a lifeline for families. Even a 1% difference adds up to thousands of pesos over a year. Comparing both fee types helps you send more pesos home.

## Quick checklist

- [ ] Check the mid-market rate before you send.
- [ ] Compare the provider’s quoted rate.
- [ ] Add the flat fee to the FX markup cost.
- [ ] Pick the option where your recipient receives the most.

Use our [comparison tool](/) to see the real cost across Wise, Remitly, WorldRemit, Western Union, MoneyGram, and Xoom side by side.
`,
  },
  {
    slug: "best-way-send-usd-to-php",
    title: "Best way to send USD to PHP in 2026",
    excerpt:
      "A head-to-head look at Wise, Remitly, WorldRemit, Western Union, MoneyGram, and Xoom for US-to-Philippines transfers.",
    publishedAt: "2026-08-06",
    author: "Send to PH team",
    tags: ["providers", "usd-to-php", "comparison"],
    readMinutes: 6,
    content: `## The big six for US-to-Philippines transfers

- **Wise**: transparent mid-market rate, low flat fee. Best for bank deposits and mobile wallets.
- **Remitly**: often $0 economy fee, competitive rate. Great for recurring transfers.
- **WorldRemit**: fast, multiple delivery options including airtime top-up.
- **Western Union**: huge cash pickup network. Higher fees but convenient for rural recipients.
- **MoneyGram**: similar to Western Union with strong agent coverage.
- **Xoom / PayPal**: fast bank and cash pickup, backed by PayPal.

## Which one should you choose?

- **Most pesos received**: usually Wise or Remitly.
- **Fastest cash pickup**: Western Union, MoneyGram, or WorldRemit.
- **Mobile wallet delivery**: Wise, Remitly, and WorldRemit all support GCash and similar wallets.
- **Recurring transfers**: Remitly and Wise both offer rate locks and autopay options.

## Our recommendation

For most people sending to a Philippine bank account or GCash, start with [Wise](/go/wise) or [Remitly](/go/remitly). Compare them on our homepage for your exact amount before you commit.
`,
  },
  {
    slug: "rate-alerts-save-money",
    title: "How rate alerts can save you money",
    excerpt:
      "The peso exchange rate moves daily. Set a rate alert and send when the rate works in your favor.",
    publishedAt: "2026-08-06",
    author: "Send to PH team",
    tags: ["rate-alerts", "timing", "savings"],
    readMinutes: 4,
    content: `## Timing matters

The USD to PHP exchange rate changes every trading day. A swing of just 1% can mean hundreds of extra pesos on a typical remittance.

## What are rate alerts?

A rate alert lets you set a target exchange rate. When the market hits your target, you get notified so you can send money at the best possible moment.

## Example: why it adds up

If you send $500 and the rate moves from 56.00 to 56.50, your recipient gets an extra ₱250. Over a year, that can easily cover a month of groceries or utilities.

## How to use ours

Set your target rate on our [rate alerts page](/rate-alerts). We’ll email you when USD/PHP reaches it. No spam, just the alert.

## Pro tip

Combine rate alerts with a provider that locks in rates. Some services let you hold a quote for 24 hours after the alert fires, giving you time to complete the transfer.
`,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
