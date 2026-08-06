export type Provider = {
  id: string;
  name: string;
  slug: string;
  logoColor: string;
  flatFeeUsd: number;
  fxMarginPercent: number; // e.g. 0.005 = 0.5% markup on mid-market rate
  speed: string;
  deliveryMethods: string[];
  minFeeNote?: string;
};

export type Quote = Provider & {
  feeUsd: number;
  rateUsed: number;
  recipientGetsPhp: number;
  totalCostUsd: number;
  sortValue: number;
};

export const providers: Provider[] = [
  {
    id: "wise",
    name: "Wise",
    slug: "wise",
    logoColor: "#00B9FF",
    flatFeeUsd: 4.17,
    fxMarginPercent: 0.0048,
    speed: "Minutes to 1 day",
    deliveryMethods: ["Bank transfer", "Mobile wallet", "Cash pickup"],
    minFeeNote: "Transparent mid-market rate",
  },
  {
    id: "remitly",
    name: "Remitly",
    slug: "remitly",
    logoColor: "#FF1654",
    flatFeeUsd: 0,
    fxMarginPercent: 0.015,
    speed: "Minutes to 3 days",
    deliveryMethods: ["Bank deposit", "Cash pickup", "Mobile money", "Home delivery"],
    minFeeNote: "Economy often $0 fee",
  },
  {
    id: "worldremit",
    name: "WorldRemit",
    slug: "worldremit",
    logoColor: "#7A69FF",
    flatFeeUsd: 3.99,
    fxMarginPercent: 0.012,
    speed: "Within minutes",
    deliveryMethods: ["Bank deposit", "Cash pickup", "Mobile wallet", "Airtime top-up"],
    minFeeNote: "First transfer may be fee-free",
  },
  {
    id: "westernunion",
    name: "Western Union",
    slug: "westernunion",
    logoColor: "#FFDD00",
    flatFeeUsd: 5.0,
    fxMarginPercent: 0.018,
    speed: "Minutes to 5 days",
    deliveryMethods: ["Cash pickup", "Bank account", "Mobile wallet"],
    minFeeNote: "Higher fees for cash pickup speed",
  },
  {
    id: "moneygram",
    name: "MoneyGram",
    slug: "moneygram",
    logoColor: "#DA291C",
    flatFeeUsd: 4.99,
    fxMarginPercent: 0.017,
    speed: "Minutes to 1 day",
    deliveryMethods: ["Cash pickup", "Bank deposit", "Mobile wallet"],
    minFeeNote: "Extensive agent network",
  },
  {
    id: "xoom",
    name: "Xoom / PayPal",
    slug: "xoom",
    logoColor: "#0070BA",
    flatFeeUsd: 4.99,
    fxMarginPercent: 0.014,
    speed: "Minutes to 4 hours",
    deliveryMethods: ["Bank deposit", "Cash pickup", "Bill pay", "Mobile reload"],
    minFeeNote: "PayPal-backed",
  },
];

export function computeQuotes(
  sendAmountUsd: number,
  midMarketRate: number
): Quote[] {
  return providers
    .map((provider) => {
      const rateUsed = midMarketRate * (1 - provider.fxMarginPercent);
      const recipientGetsPhp = sendAmountUsd * rateUsed;
      const totalCostUsd = sendAmountUsd + provider.flatFeeUsd;
      const feeUsd = provider.flatFeeUsd + sendAmountUsd * provider.fxMarginPercent;

      return {
        ...provider,
        feeUsd: Number(feeUsd.toFixed(2)),
        rateUsed: Number(rateUsed.toFixed(4)),
        recipientGetsPhp: Number(recipientGetsPhp.toFixed(2)),
        totalCostUsd: Number(totalCostUsd.toFixed(2)),
        sortValue: recipientGetsPhp,
      };
    })
    .sort((a, b) => b.sortValue - a.sortValue);
}

export function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
