import AffiliateDisclosure from "./AffiliateDisclosure";

export default function PostContent({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <AffiliateDisclosure />
      <div className="mt-6">
        {lines.map((line, idx) => {
          const key = idx;
          const trimmed = line.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith("## ")) {
            return (
              <h2 key={key} className="mt-8 text-2xl font-bold text-white">
                {trimmed.replace("## ", "")}
              </h2>
            );
          }

          if (trimmed.startsWith("- [ ] ")) {
            return (
              <div key={key} className="flex items-start gap-2 py-1">
                <input type="checkbox" readOnly className="mt-1.5" />
                <span className="text-gray-300">{trimmed.replace("- [ ] ", "")}</span>
              </div>
            );
          }

          if (trimmed.startsWith("- ")) {
            return (
              <li key={key} className="ml-5 text-gray-300">
                {renderInline(trimmed.replace("- ", ""))}
              </li>
            );
          }

          // Wrap list-like contiguous blocks in a <ul> — kept simple here.
          return (
            <p key={key} className="leading-relaxed text-gray-300">
              {renderInline(trimmed)}
            </p>
          );
        })}
      </div>
    </article>
  );
}

function renderInline(text: string) {
  // Convert markdown links to anchor tags, and relative /go/* links stay internal.
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [full, label, href] = match;
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const isExternal = /^https?:\/\//.test(href);
    parts.push(
      <a
        key={match.index}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer sponsored" : undefined}
        className="font-medium text-green-500 hover:underline"
      >
        {label}
      </a>
    );
    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
