import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IMarkdownMessageProps {
  content: string;
  isUser?: boolean;
}

const MarkdownMessage = ({ content, isUser = false }: IMarkdownMessageProps) => {

  if (!content?.trim()) {
    return null;
  }

  return (
    <div
      className={` markdown-message text-[13px] leading-6 break-words ${isUser ? "text-white" : "text-white/80"}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // ─────────────────────────────────────────
          // Paragraph
          // ─────────────────────────────────────────
          p: ({ children }) => (
            <p className="mb-3 last:mb-0">
              {children}
            </p>
          ),

          // ─────────────────────────────────────────
          // Headings
          // ─────────────────────────────────────────
          h1: ({ children }) => (
            <h1 className="mt-1 mb-3 text-xl font-bold text-white">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mt-4 mb-2 text-lg font-bold text-white">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mt-4 mb-2 text-base font-semibold text-white">
              {children}
            </h3>
          ),

          h4: ({ children }) => (
            <h4 className="mt-3 mb-1.5 text-sm font-semibold text-white">
              {children}
            </h4>
          ),

          h5: ({ children }) => (
            <h5 className="mt-3 mb-1 text-sm font-medium text-white">
              {children}
            </h5>
          ),

          h6: ({ children }) => (
            <h6 className="mt-2 mb-1 text-xs font-medium text-white/80">
              {children}
            </h6>
          ),

          // ─────────────────────────────────────────
          // Bold / Italic / Strikethrough
          // ─────────────────────────────────────────
          strong: ({ children }) => (
            <strong className="font-semibold text-white">
              {children}
            </strong>
          ),

          em: ({ children }) => (
            <em className="italic text-white/90">
              {children}
            </em>
          ),

          del: ({ children }) => (
            <del className="text-white/40">
              {children}
            </del>
          ),

          // ─────────────────────────────────────────
          // Unordered List
          // ─────────────────────────────────────────
          ul: ({ children }) => (
            <ul className="mb-3 list-disc space-y-1 pl-5">
              {children}
            </ul>
          ),

          // ─────────────────────────────────────────
          // Ordered List
          // ─────────────────────────────────────────
          ol: ({ children }) => (
            <ol className="mb-3 list-decimal space-y-1 pl-5">
              {children}
            </ol>
          ),

          // ─────────────────────────────────────────
          // List Item
          // ─────────────────────────────────────────
          li: ({ children }) => (
            <li className="pl-1">
              {children}
            </li>
          ),

          // ─────────────────────────────────────────
          // Links
          // ─────────────────────────────────────────
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-opacity hover:opacity-70"
              style={{ color: "#a78bfa" }}
            >
              {children}
            </a>
          ),

          // ─────────────────────────────────────────
          // Blockquote
          // ─────────────────────────────────────────
          blockquote: ({ children }) => (
            <blockquote
              className="my-3 py-1 pl-4 italic"
              style={{
                borderLeft: "3px solid #8b5cf6",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {children}
            </blockquote>
          ),

          // ─────────────────────────────────────────
          // Inline Code
          // ─────────────────────────────────────────
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");

            /*
             * react-markdown doesn't always expose `inline`
             * depending on the installed version.
             *
             * A block code element normally receives a
             * language-* className.
             */
            const isCodeBlock = Boolean(match);

            if (isCodeBlock) {
              return (
                <div className="my-3 overflow-hidden rounded-xl border border-white/10 bg-black/30">
                  {match?.[1] && (
                    <div className="border-b border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white/35">
                      {match[1]}
                    </div>
                  )}

                  <pre className="overflow-x-auto p-4 text-[12px] leading-5">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            }

            return (
              <code
                className="rounded-md px-1.5 py-0.5 text-[12px]"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "#c4b5fd",
                }}
                {...props}
              >
                {children}
              </code>
            );
          },

          // ─────────────────────────────────────────
          // Horizontal Rule
          // ─────────────────────────────────────────
          hr: () => (
            <hr className="my-4 border-0 border-t border-white/10" />
          ),

          // ─────────────────────────────────────────
          // Images
          // ─────────────────────────────────────────
          img: ({ src, alt }) => {
            if (!src) return null;

            return (
              <img
                src={src}
                alt={alt || ""}
                loading="lazy"
                className="my-3 h-auto max-w-full rounded-xl border border-white/10"
              />
            );
          },

          // ─────────────────────────────────────────
          // Tables
          // ─────────────────────────────────────────
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full border-collapse text-left text-[12px]">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-white/[0.06]">
              {children}
            </thead>
          ),

          tbody: ({ children }) => (
            <tbody>{children}</tbody>
          ),

          tr: ({ children }) => (
            <tr className="border-b border-white/10 last:border-0">
              {children}
            </tr>
          ),

          th: ({ children }) => (
            <th className="border-r border-white/10 px-3 py-2.5 font-semibold text-white last:border-r-0">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border-r border-white/10 px-3 py-2.5 text-white/70 last:border-r-0">
              {children}
            </td>
          ),

          // ─────────────────────────────────────────
          // Keyboard
          // ─────────────────────────────────────────
          kbd: ({ children }) => (
            <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[11px]">
              {children}
            </kbd>
          ),

          // ─────────────────────────────────────────
          // Line Break
          // ─────────────────────────────────────────
          br: () => <br />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownMessage;
