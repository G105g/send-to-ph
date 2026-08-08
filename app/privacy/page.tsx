import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Learn To Transfer",
  description:
    "Learn To Transfer privacy policy. Learn what data we collect, how we use it, and your rights.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-gray-300">
      <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Last updated: August 6, 2026
      </p>

      <section className="mt-8 space-y-6">
        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">1. Overview</h2>
          <p className="mt-2 leading-relaxed">
            Learn To Transfer (“we”, “us”, or “our”) operates this comparison
            website to help users find better ways to send money
            internationally. This Privacy Policy explains how we collect, use,
            store, and protect your information when you visit our site or use
            our tools.
          </p>
        </div>

        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">
            2. Information we collect
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>
              <strong className="text-white">Email address</strong> — only when
              you voluntarily sign up for rate alerts or contact us.
            </li>
            <li>
              <strong className="text-white">Usage data</strong> — pages
              visited, approximate location (country-level), browser type, and
              device information, collected through analytics and cookies.
            </li>
            <li>
              <strong className="text-white">Conversion inputs</strong> —
              amounts and currency selections entered into our calculator are
              processed in your browser and are not stored on our servers.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">
            3. How we use your information
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>Send rate-alert emails you explicitly request.</li>
            <li>Improve website content, performance, and user experience.</li>
            <li>Detect abuse, fraud, and technical issues.</li>
            <li>
              Measure affiliate link performance and fulfill partner reporting
              requirements.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">
            4. Cookies and tracking
          </h2>
          <p className="mt-2 leading-relaxed">
            We use cookies and similar technologies to remember your preferences
            (such as favorite currency pairs), analyze traffic, and track
            affiliate referrals. You can disable cookies in your browser
            settings, but some features may not work correctly.
          </p>
        </div>

        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">
            5. Third-party links and affiliate partners
          </h2>
          <p className="mt-2 leading-relaxed">
            Our site contains links to third-party money-transfer providers.
            Some of these are affiliate links, which means we may earn a
            commission if you click through and complete a transfer. These
            partners have their own privacy policies and we encourage you to
            review them. Our current affiliate and referral partners include
            Wise, Remitly, WorldRemit, Western Union, MoneyGram, Xoom, and
            ExchangeRate-API.
          </p>
        </div>

        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">
            6. Data retention and security
          </h2>
          <p className="mt-2 leading-relaxed">
            We keep your email address only as long as you remain subscribed to
            rate alerts. You can unsubscribe at any time, and your email will be
            permanently deleted from our systems. We use industry-standard
            measures to protect data, but no online service can guarantee
            absolute security.
          </p>
        </div>

        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">7. Your rights</h2>
          <p className="mt-2 leading-relaxed">
            Depending on your location, you may have the right to access,
            correct, or delete your personal data. To exercise these rights, or
            if you have questions about this policy, contact us at{" "}
            <a
              href="mailto:gary@learntotransfer.com"
              className="text-green-500 hover:underline"
            >
              gary@learntotransfer.com
            </a>
            .
          </p>
        </div>

        <div className="rounded-2xl border border-[#27272a] bg-[#181818] p-6">
          <h2 className="text-xl font-semibold text-white">8. Contact us</h2>
          <p className="mt-2 leading-relaxed">
            Learn To Transfer
            <br />
            Email:{" "}
            <a
              href="mailto:gary@learntotransfer.com"
              className="text-green-500 hover:underline"
            >
              gary@learntotransfer.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
