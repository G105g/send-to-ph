import type { Metadata } from "next";
import { Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Learn To Transfer",
  description:
    "Get in touch with Learn To Transfer. Questions, feedback, or partnership inquiries welcome.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <Mail className="mx-auto h-10 w-10 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Contact us
        </h1>
        <p className="mt-3 text-gray-400">
          Questions, feedback, or partnership inquiries? We’d love to hear from
          you.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-[#27272a] bg-[#181818] p-6 md:p-8">
        <ContactForm />
      </div>

      <div className="mt-6 rounded-xl border border-[#27272a] bg-[#181818] p-5 text-center">
        <p className="text-sm text-gray-400">
          Prefer email? Reach us directly at{" "}
          <a
            href="mailto:gary@learntotransfer.com"
            className="font-medium text-green-500 hover:underline"
          >
            gary@learntotransfer.com
          </a>
        </p>
      </div>
    </div>
  );
}
