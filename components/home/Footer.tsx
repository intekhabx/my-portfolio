"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="flex justify-between items-center px-10 py-4"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <p
        className="tracking-widest"
        style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "1px" }}
      >
        © {year} — intekhabx. All rights reserved.
      </p>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="uppercase tracking-widest transition-colors duration-200"
        style={{
          fontSize: "10px",
          color: "var(--text-muted)",
          letterSpacing: "1px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
        }
      >
        Back to top ↑
      </button>
    </footer>
  );
}