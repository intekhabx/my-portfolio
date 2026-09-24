"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiArrowUp, FiBriefcase, FiCode, FiCommand,
  FiCpu, FiLayers, FiMessageSquare, FiRefreshCw,
  FiUser, FiZap,
} from "react-icons/fi";

/* ─── Theme tokens (matches portfolio blue accent) ───── */
const ACCENT     = "#1d9bf0";
const ACCENT_DIM = "rgba(29,155,240,0.12)";
const ACCENT_MED = "rgba(29,155,240,0.25)";

/* Three layers of dark — creates depth without being confusing
   BG_OUTER  = page background  (#0a0a0a ish — matches var(--bg))
   BG_SHELL  = chatbot shell    slightly lighter
   BG_CHAT   = message area     slightly lighter still        */
const BG_SHELL   = "#0f1117";
const BG_CHAT    = "#13161e";
const BG_INPUT   = "#0d1015";
const BORDER     = "rgba(255,255,255,0.07)";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { label: "Tech Stack",   icon: <FiCode />,      query: "Tell me about the tech stack"  },
  { label: "Projects",     icon: <FiLayers />,    query: "Show me the projects"           },
  { label: "Availability", icon: <FiBriefcase />, query: "Are you available for work?"   },
];

function getReply(q: string): string {
  const ql = q.toLowerCase();
  if (ql.includes("stack") || ql.includes("tech") || ql.includes("use"))
    return "Intekhab works with Next.js, React, TypeScript, Node.js, Express, MongoDB, Redis and AI integrations — focused on building scalable full-stack systems.";
  if (ql.includes("project") || ql.includes("work") || ql.includes("show"))
    return "Featured projects include PulseHub (real-time voting) and I-Try (AI assistant). Explore more in the Selected Work section.";
  if (ql.includes("hire") || ql.includes("available") || ql.includes("freelance"))
    return "Intekhab is open to freelance contracts and full-time roles focused on Full Stack and AI engineering.";
  return "I can help you explore Intekhab's experience, skills, projects and availability. Try a quick prompt below!";
}

export default function ChatAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [focused, setFocused]   = useState(false);
  const scrollAreaRef           = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLInputElement>(null);
  const isEmpty                 = messages.length === 0;

  /* scroll only the chat container — never the page */
  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(p => [...p, { id: Date.now().toString(), sender: "user", text: q, timestamp: time }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages(p => [...p, {
        id: (Date.now()+1).toString(), sender: "bot",
        text: getReply(q),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }]);
      setLoading(false);
    }, 700);
  };

  const reset = () => { setMessages([]); setInput(""); setLoading(false); };

  return (
    <div
      className="flex flex-col w-full"
      style={{ height: 520, background: BG_SHELL }}
    >

      {/* ── Message area ── slightly different bg so it pops */}
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto"
        style={{
          background: BG_CHAT,
          scrollbarWidth: "thin",
          scrollbarColor: `rgba(29,155,240,0.15) transparent`,
        }}
      >
        {isEmpty ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center h-full px-6 py-10">
            {/* Icon */}
            <div className="relative mb-7">
              <div className="absolute inset-[-18px] rounded-full border animate-pulse"
                style={{ borderColor: `${ACCENT}18` }} />
              <div className="absolute inset-[-9px] rounded-full border"
                style={{ borderColor: `${ACCENT}10` }} />
              <div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: ACCENT_DIM,
                  border: `1px solid ${ACCENT_MED}`,
                  boxShadow: `0 0 32px rgba(29,155,240,0.12)`,
                }}
              >
                <FiCpu className="w-6 h-6" style={{ color: ACCENT }} />
              </div>
            </div>

            <p className="text-[9px] uppercase tracking-[3px] mb-3"
              style={{ color: `${ACCENT}99` }}>
              Portfolio AI
            </p>

            <h2 className="text-[clamp(22px,3vw,34px)] leading-[1.1] tracking-tight font-semibold text-white text-center mb-2">
              Ask me anything
              <br />
              <em className="font-serif font-normal italic" style={{ color: "rgba(255,255,255,0.3)" }}>
                about Intekhab.
              </em>
            </h2>

            <p className="text-[11px] text-center max-w-[280px] leading-relaxed mt-2 mb-7"
              style={{ color: "rgba(255,255,255,0.28)" }}>
              Projects, stack, experience and availability — all through conversation.
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {QUICK_PROMPTS.map(p => (
                <button
                  key={p.label}
                  onClick={() => send(p.query)}
                  className="flex items-center gap-2 px-3.5 py-2 text-[11px] transition-all"
                  style={{
                    border: `1px solid ${BORDER}`,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = ACCENT_MED;
                    e.currentTarget.style.background  = ACCENT_DIM;
                    e.currentTarget.style.color       = "rgba(255,255,255,0.85)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.background  = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.color       = "rgba(255,255,255,0.45)";
                  }}
                >
                  <span style={{ color: ACCENT }}>{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ── Messages ── */
          <div className="px-4 sm:px-6 py-5 space-y-5">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-1"
                    style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_MED}` }}>
                    <FiCpu className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                  </div>
                )}

                <div className={`flex flex-col max-w-[78%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.18)" }}>
                      {msg.sender === "user" ? "You" : "Intekhab AI"}
                    </span>
                    <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.1)" }}>{msg.timestamp}</span>
                  </div>

                  <div
                    className="px-4 py-2.5 text-[13px] leading-relaxed"
                    style={{
                      borderRadius: msg.sender === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      background: msg.sender === "user"
                        ? ACCENT
                        : "rgba(255,255,255,0.05)",
                      border: msg.sender === "user" ? "none" : `1px solid ${BORDER}`,
                      color: msg.sender === "user" ? "#fff" : "rgba(255,255,255,0.78)",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-1"
                    style={{ background: "rgba(255,255,255,0.05)", border: BORDER }}>
                    <FiUser className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.4)" }} />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_MED}` }}>
                  <FiCpu className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                </div>
                <div className="flex items-center gap-1.5 px-4 py-2.5"
                  style={{ borderRadius: "14px 14px 14px 4px", background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}` }}>
                  {[0,120,240].map(d => (
                    <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: ACCENT, animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* ── Input bar — same dark as shell ── */}
      <div
        className="shrink-0 px-3 sm:px-5 py-3"
        style={{
          borderTop: `1px solid ${BORDER}`,
          background: BG_SHELL,
        }}
      >
        <div className="flex justify-center">
          <form
            onSubmit={e => { e.preventDefault(); send(); }}
            className="relative flex items-center w-full md:w-1/2"
            style={{
              border: `1px solid ${focused ? ACCENT_MED : BORDER}`,
              borderRadius: 50,
              background: BG_INPUT,
              transition: "border-color 0.2s",
            }}
          >
            <FiMessageSquare className="absolute left-3.5 w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.18)" }} />

            <input
              id="agent-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Ask about projects, stack, availability..."
              className="w-full bg-transparent outline-none pl-10 pr-20 py-3 text-[12.5px] text-white placeholder:text-white/20"
            />

            <div className="absolute right-2 flex items-center gap-1.5">
              <span className="hidden sm:flex items-center gap-1 px-1.5 py-1 text-[8px]"
                style={{ border: `1px solid ${BORDER}`, borderRadius: 50, color: "rgba(255,255,255,0.18)" }}>
                <FiCommand className="w-2 h-2" />K
              </span>
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all disabled:opacity-25 cursor-pointer"
                style={{ background: ACCENT, color: "#fff" }}
              >
                <FiArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* bottom hint + reset row */}
        <div className="flex items-center justify-between mt-2 px-1">
          <div className="flex items-center gap-3 text-[8.5px] uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.14)" }}>
            <span className="flex items-center gap-1 text-orange-300"><FiZap className="w-2.5 h-2.5" />Fast</span>
            <span className="w-px h-2.5 text-orange-300" style={{ background: BORDER }} />
            <span className="text-orange-300">Ask anything</span>
          </div>
          <button onClick={reset}
            className="flex items-center gap-1 text-[8.5px] text-orange-400 cursor-pointer uppercase tracking-wider hover:text-orange-500"
          >
            <FiRefreshCw className="w-2.5 h-2.5" />Reset
          </button>
        </div>
      </div>

    </div>
  );
}