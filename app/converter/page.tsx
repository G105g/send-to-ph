import CurrencyConverter from "@/components/CurrencyConverter";

export const metadata = {
  title: "Currency Converter | Learn To Transfer",
  description:
    "Convert currencies with live exchange rates. Works offline with cached rates. Save your favorite pairs.",
};

export default function ConverterPage() {
  return (
    <section className="bg-[#111]">
      <CurrencyConverter />
    </section>
  );
}
