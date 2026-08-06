import ComparisonTool from "@/components/ComparisonTool";

export const revalidate = 300;

export default function Home() {
  return (
    <section className="bg-[#111]">
      <ComparisonTool />
    </section>
  );
}
