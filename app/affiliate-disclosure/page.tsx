import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | Learn To Transfer",
  description:
    "Learn To Transfer affiliate disclosure. We may earn commissions when you use our partner links at no extra cost to you.",
};

const partners = [
  { name: "Wise", category: "Money transfer provider" },
  { name: "Remitly", category: "Money transfer provider" },
  { name: "WorldRemit", category: "Money transfer provider" },
  { name: "Western Union", category: "Money transfer provider" },
  { name: "MoneyGram", category: "Money transfer provider" },
  { name: "Xoom / PayPal", category: "Money transfer provider" },
  { name: "ExchangeRate-API", category: "Exchange rate data provider" },
];

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-gray-300">
      <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        Affiliate Disclosure
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Last updated: August 6, 2026
      </p>

      <section className="mt-8 space-y-6">
        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">We use affiliate links</h2>
          <p className="mt-2 leading-relaxed">
            Learn To Transfer participates in affiliate and referral programs
            with money-transfer providers and related services. Some of the links
            on this website are affiliate links. If you click on an affiliate
            link and sign up or complete a qualifying transaction, we may earn a
            commission or referral fee from the provider.
          </p>
          <p className="mt-3 leading-relaxed font-medium text-white">
            This comes at no extra cost to you.
          </p>
        </div>

        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">FTC disclosure</h2>
          <p className="mt-2 leading-relaxed">
            In accordance with the Federal Trade Commission (FTC) guidelines
            concerning the use of endorsements and testimonials in advertising,
            we disclose that we have a material connection with some of the
            providers listed on our site. We are not employees of these
            companies, and our opinions are our own.
          </p>
        </div>

        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">Editorial independence</h2>
          <p className="mt-2 leading-relaxed">
            Our ratings, reviews, and recommendations are based on independent
            research, publicly available data, and our own analysis of fees,
            exchange rates, speed, and delivery options. We do not let
            affiliate commissions influence which providers appear first or how
            they are ranked. The best deal for the user is always determined by
            the total amount the recipient receives.
          </p>
        </div>

        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">How we make money</h2>
          <p className="mt-2 leading-relaxed">
            Learn To Transfer is free to use. Our revenue comes from:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>Affiliate commissions when users choose a provider through our link.</li>
            <li>Optional future advertising or sponsored placements (clearly labeled).</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">Current partners</h2>
          <ul className="mt-3 space-y-2">
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="flex items-center justify-between rounded-xl bg-[#111] px-4 py-3"
              >
                <span className="font-medium text-white">{partner.name}</span>
                <span className="text-sm text-gray-500">{partner.category}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">Questions?</h2>
          <p className="mt-2 leading-relaxed">
            If you have any questions about this disclosure or our affiliate
            relationships, email us at{" "}
            <a
              href="mailto:gary@learntotransfer.com"
              className="text-green-500 hover:underline"
            >
              gary@learntotransfer.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
