import Script from "next/script";
import ComparisonTool from "@/components/ComparisonTool";

export const revalidate = 300;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the cheapest way to send money from the USA to the Philippines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cheapest option depends on the amount and delivery method. For most bank deposits and mobile wallet transfers, Wise and Remitly typically offer the best combination of low fees and fair exchange rates. Compare providers on our homepage for your exact amount.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to send money to the Philippines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Transfer speed varies by provider and delivery method. Mobile wallet and cash pickup transfers can arrive in minutes. Bank deposits usually take a few hours to one business day. Economy transfers may take 1–3 business days.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to send money to the Philippines online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, as long as you use a licensed and regulated money-transfer provider such as Wise, Remitly, WorldRemit, Western Union, MoneyGram, or Xoom. These companies use encryption and comply with financial regulations in the United States and the Philippines.",
      },
    },
    {
      "@type": "Question",
      name: "Can I send money to a GCash or Maya wallet from the USA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many providers including Wise, Remitly, WorldRemit, and Xoom support direct transfers to Philippine mobile wallets such as GCash and Maya. Check the delivery options shown in our comparison results.",
      },
    },
    {
      "@type": "Question",
      name: "Why do exchange rates matter when sending money?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The exchange rate determines how many Philippine pesos your recipient receives. Some providers add a hidden markup to the rate, which can cost more than a flat fee. We show the estimated total received so you can pick the best deal.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="bg-[#111]">
        <ComparisonTool />
      </section>
    </>
  );
}
