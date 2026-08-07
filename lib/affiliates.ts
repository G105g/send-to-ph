export type AffiliateConfig = {
  name: string;
  destinationUrl: string;
};

export const AFFILIATE_LINKS: Record<string, AffiliateConfig> = {
  wise: {
    name: "Wise",
    destinationUrl: "https://wise.com/us/",
  },
  remitly: {
    name: "Remitly",
    destinationUrl: "https://www.remitly.com/us/en/philippines",
  },
  worldremit: {
    name: "WorldRemit",
    destinationUrl: "https://www.worldremit.com/en/usa/philippines",
  },
  westernunion: {
    name: "Western Union",
    destinationUrl: "https://www.westernunion.com/us/en/web/send-money/start.html",
  },
  moneygram: {
    name: "MoneyGram",
    destinationUrl: "https://www.moneygram.com/mgo/us/en/",
  },
  xoom: {
    name: "Xoom / PayPal",
    destinationUrl: "https://www.xoom.com/philippines/send-money",
  },
  exchangerateapi: {
    name: "ExchangeRate-API",
    destinationUrl: "https://www.exchangerate-api.com",
  },
};

export function getAffiliateUrl(slug: string): string | null {
  return AFFILIATE_LINKS[slug]?.destinationUrl ?? null;
}

export function affiliateLink(slug: string, fallback?: string): string {
  if (AFFILIATE_LINKS[slug]) {
    return `/go/${slug}`;
  }
  return fallback ?? "#";
}
