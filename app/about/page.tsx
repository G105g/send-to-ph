export const metadata = {
  title: "About | Learn To Transfer",
  description:
    "Learn why Learn To Transfer exists and how we help you compare money transfers to the Philippines.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        About Learn To Transfer
      </h1>

      <p className="mt-6 text-lg leading-8 text-gray-300">
        Sending money home shouldn&apos;t cost more than it has to. Learn To Transfer is an
        independent comparison tool that helps people find
        the cheapest, fastest, and most reliable way to send money to the
        Philippines.
      </p>

      <div className="mt-8 rounded-2xl border border-[#27272a] bg-[#181818] p-6">
        <h2 className="text-xl font-semibold text-white">What we compare</h2>
        <ul className="mt-4 space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span>Transfer fees — flat, percentage, or hidden in the exchange rate.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span>Exchange rate markups — the true cost between the mid-market rate and what you get.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span>Delivery speed — from minutes to a few days depending on method.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span>Delivery options — bank deposit, cash pickup, mobile wallet, and home delivery.</span>
          </li>
        </ul>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Important: Learn To Transfer is an independent comparison site. Rates and fees
        shown are estimates for demonstration purposes. Always confirm the final
        price on the provider&apos;s website before sending money.
      </p>
    </div>
  );
}