# Send to PH

A production-ready, static Next.js money-transfer comparison site for the **USA → Philippines** corridor.

Live URL: _(deploy to Vercel after push)_

---

## What it does

- Compares fees, exchange rates, delivery speed, and methods across 6 providers: **Wise, Remitly, WorldRemit, Western Union, MoneyGram, Xoom/PayPal**.
- Fetches a live USD → PHP mid-market rate from the **Wise public API**.
- Sorts results by **most PHP received** (best deal first).
- Dark, mobile-first UI styled like learnsto.com.

---

## Pages

| Path | Purpose |
|------|---------|
| `/` | Main comparison tool |
| `/about` | About the service |
| `/blog` | SEO content placeholder |
| `/rate-alerts` | Email signup for rate alerts (form ready for Resend) |

---

## Tech stack

- **Next.js 16** (App Router, static export)
- **TypeScript**
- **Tailwind CSS v4**
- **lucide-react** for icons
- **Wise public API** for live USD/PHP rate (fallback hardcoded)
- **Vercel** for hosting

---

## Getting started

```bash
cd send-to-ph
npm install
npm run dev
```

Open http://localhost:3000.

---

## Build for production

```bash
npm run build
```

Static files are output to `dist/`.

---

## Environment variables

No variables are required for the MVP. Optional:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | For sending rate-alert confirmation emails later |
| `SUPABASE_URL` + `SUPABASE_ANON_KEY` | For storing corridor/provider data later |

---

## Project structure

```
send-to-ph/
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Comparison tool
│   ├── globals.css         # Dark theme tokens
│   ├── about/page.tsx
│   ├── blog/page.tsx
│   └── rate-alerts/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ComparisonTool.tsx  # Main calculator + results
├── lib/
│   ├── providers.ts        # Provider data + quote math
│   └── rates.ts            # Wise API + fallback rate
├── public/
├── dist/                   # Static export
└── next.config.ts
```

---

## How fees are estimated

Each provider has:

- `flatFeeUsd` — fixed fee per transfer.
- `fxMarginPercent` — markup hidden in the exchange rate (e.g., `0.015` = 1.5% worse than mid-market).

Formula:

```
rateUsed = midMarketRate * (1 - fxMarginPercent)
recipientGetsPhp = sendAmountUsd * rateUsed
totalCostUsd = sendAmountUsd + flatFeeUsd
feeUsd = flatFeeUsd + (sendAmountUsd * fxMarginPercent)
```

Results are sorted by `recipientGetsPhp` descending.

---

## Deployment

### Vercel CLI

```bash
npx vercel --prod
```

### GitHub + Vercel

1. Push to `G105g/send-to-ph` on GitHub.
2. Import the repo at https://vercel.com/new.
3. Framework preset: Next.js.
4. Deploy.

---

## Roadmap

- [ ] Replace static provider data with Supabase-backed rows.
- [ ] Add live provider fee/rate scraping or official APIs.
- [ ] Wire `/rate-alerts` to Resend.
- [ ] Add more corridors (e.g., US → Mexico, US → India).
- [ ] Blog posts with real content.
