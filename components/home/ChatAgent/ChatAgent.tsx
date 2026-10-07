"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiArrowUp, FiBriefcase, FiCode, FiCommand,
  FiCpu, FiLayers, FiRefreshCw,
} from "react-icons/fi";
import MarkdownMessage from "./MarkdownMessage";
import axios from "axios";


/* ─── Theme tokens (ye panel hamesha dark rahega) ───────── */
const ACCENT     = "#1d9bf0";
const ACCENT_DIM = "rgba(29,155,240,0.12)";
const ACCENT_MED = "rgba(29,155,240,0.28)";

const SHELL      = "#0b0e14";                    // main panel
const PILL       = "#0f131b";                    // input pill (solid, taaki light page par bhi dikhe)
const BORDER     = "rgba(255,255,255,0.08)";
const BORDER_HI  = "rgba(255,255,255,0.16)";
const TEXT       = "rgba(255,255,255,0.88)";
const TEXT_SOFT  = "rgba(255,255,255,0.5)";
const TEXT_MUTED = "rgba(255,255,255,0.28)";

/* Fade sirf input pill ke NEECHE hota hai (pill solid dark par baithta hai),
   aur curve eased hai: dark jyada der tak rehta hai aur phir jaldi ghulta hai.
   Isse light page par beech ka dhundhla gray band nahi banta.
   Fade lamba karna ho to 88% ko chhota karo (jaise 84%). */
const FRAME_MASK = `linear-gradient(to bottom,
  #000 0%, #000 88%,
  rgba(0,0,0,0.82) 91%,
  rgba(0,0,0,0.5) 94.5%,
  rgba(0,0,0,0.2) 97.5%,
  transparent 100%)`;

/* Light mode me dark panel ko beige/white page me ghulane se dhundhla gray band
   banta hai. Isliye light page par default me panel ka neeche ka kinara band
   (floating card) rakha hai. Agar light mode me bhi fade chahiye to true kar do. */
const LIGHT_MODE_FADE = false;

/* Page light hai ya dark: --bg ka asli rang padh kar nikalta hai,
   isliye class / data-theme / system theme kisi se bhi toggle ho, kaam karega. */
function useIsLightPage() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const check = () => {
      const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
      const probe = document.createElement("div");
      probe.style.color = bg || "#000";
      probe.style.display = "none";
      document.body.appendChild(probe);
      const m = getComputedStyle(probe).color.match(/\d+(\.\d+)?/g);
      document.body.removeChild(probe);
      if (!m) return;
      const [r, g, b] = m.map(Number);
      setIsLight((0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55);
    };

    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true });
    obs.observe(document.body, { attributes: true });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", check);
    return () => { obs.disconnect(); mq.removeEventListener("change", check); };
  }, []);

  return isLight;
}

interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { label: "Tech Stack",   desc: "Tools & technologies I work with", icon: <FiCode />,      query: "Tell me about the tech stack"  },
  { label: "Projects",     desc: "Things I've built and shipped",    icon: <FiLayers />,    query: "Show me the projects"           },
  { label: "Availability", desc: "Open for freelance & full-time",   icon: <FiBriefcase />, query: "Are you available for work?"   },
];


export default function ChatAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [focused, setFocused]   = useState(false);
  const scrollAreaRef           = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLInputElement>(null);
  const isEmpty                 = messages.length === 0;
  const isLight                 = useIsLightPage();
  const fade                    = !isLight || LIGHT_MODE_FADE;   // bottom fade on/off


  // whenever a visitor comes give them a seesionId
  useEffect(() => {
    async function getSessionId(){
      try {
        await axios.get("/api/agent/session");
        console.log("sessionId has been attached");
      } 
      catch (error) {
        console.log(error);
      }
    }

    getSessionId();
  }, []);


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


  // function that give time
  const getTime = () => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return time;
  }


  const send = async (text?: string) => {
    // step:1 - trim the input or text
    const query = (text ?? input).trim();
    if (!query || loading) return;
    
    // step:2 - add the user input message in the chat
    const time = getTime();
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: "user", text: query, timestamp: time }]);

    // step:3 - reset the loading in input state
    setInput("");
    setLoading(true);

    try {
      // step:4 - send request with input prompt to backend api
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        body: JSON.stringify({ prompt: query }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // reader that reads the chunk
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      let fullResponse = "";

      const msgId = Date.now().toString();
      setMessages((prev) => [...prev, {id: msgId, text: fullResponse, sender: "agent", timestamp: getTime()}]);
      setLoading(false);

      while (true) {
        // extracting eack chunk data
        const { value, done } = await reader!.read();

        if (done) break;

        const text = decoder.decode(value);

        fullResponse += text;

        setMessages((prev) => prev.map((msg) => msg.id === msgId ? {...msg, text: fullResponse} : msg));
      }
      // const res = await axios.post("/api/agent/chat", {prompt: query});
      // console.log(res.data);
    } 
    catch (error: any) {
      console.log(error);
      const time = getTime();
      setMessages((prev) => [...prev, {id: Date.now().toString(), sender: "agent", text: "Your Query is Failed", timestamp: time}])
    }
    finally{
      setLoading(false); 
    }
  };


  // reset the chat***
  const reset = async () => {
    setMessages([]); setInput(""); setLoading(false); 
    try {
      await axios.patch("/api/agent/chat");
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {
    reset();
  }, [])
  

  return (
    <div className="relative w-full" style={{ height: fade ? 610 : 570 }}>

      {/* Browser autofill / purane suggestion select karne par input white na ho */}
      <style>{`
        #agent-input:-webkit-autofill,
        #agent-input:-webkit-autofill:hover,
        #agent-input:-webkit-autofill:focus,
        #agent-input:-webkit-autofill:active {
          -webkit-text-fill-color: #fff !important;
          caret-color: #fff;
          -webkit-box-shadow: 0 0 0 1000px ${PILL} inset !important;
          box-shadow: 0 0 0 1000px ${PILL} inset !important;
          border-radius: 999px;
          transition: background-color 9999s ease-out 0s;
        }
      `}</style>

      {/* ── Glow peeche (mask se bahar, isliye fade nahi hota) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[70%] h-40 rounded-full blur-3xl"
        style={{ background: "rgba(29,155,240,0.16)" }}
      />

      {/* ── Frame layer: bg + border + grid, neeche se fade hota hai ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: fade ? "20px 20px 0 0" : 20,
          border: `1px solid ${fade ? BORDER_HI : "rgba(255,255,255,0.1)"}`,
          borderBottom: fade ? "none" : undefined,
          boxShadow: fade
            ? undefined
            : "0 40px 80px -30px rgba(11,14,20,0.55), 0 12px 30px -12px rgba(29,155,240,0.25), 0 0 0 1px rgba(11,14,20,0.06)",
          backgroundColor: SHELL,
          backgroundImage: `
            radial-gradient(60% 45% at 50% 0%, rgba(29,155,240,0.16), transparent 70%),
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 36px 36px, 36px 36px",
          WebkitMaskImage: fade ? FRAME_MASK : undefined,
          maskImage: fade ? FRAME_MASK : undefined,
        }}
      />

      {/* ── Content layer (hamesha poora visible) ── */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Header */}
        <div
          className="shrink-0 flex items-center justify-between px-4 sm:px-5 h-12"
          style={{ borderBottom: `1px solid ${BORDER}` }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                <span
                  key={c}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: c, boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.25)" }}
                />
              ))}
            </div>
            <span className="hidden sm:block w-px h-3.5" style={{ background: BORDER }} />
            <span className="text-[10.5px] font-mono tracking-wide" style={{ color: TEXT_SOFT }}>
              intekhab<span style={{ color: ACCENT }}>.ai</span>
              <span className="hidden sm:inline" style={{ color: TEXT_MUTED }}> / agent</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider" style={{ color: TEXT_SOFT }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ background: "#22c55e", opacity: 0.5 }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#22c55e" }} />
              </span>
              <span className="hidden sm:inline">Ready</span>
            </span>
            <button
              onClick={reset}
              title="Reset chat"
              className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[9px] uppercase tracking-[1.2px] sm:tracking-[1.5px] font-medium cursor-pointer transition-all"
              style={{
                color: "#fdba74",
                borderRadius: 999,
                border: "1px solid #fdba7433",
                background: "linear-gradient(135deg, #fdba741f, #fdba7408)",
                boxShadow: "0 0 18px -6px #fdba7466",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#fdba7466";
                e.currentTarget.style.background  = "linear-gradient(135deg, #fdba7433, #fdba7414)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#fdba7433";
                e.currentTarget.style.background  = "linear-gradient(135deg, #fdba741f, #fdba7408)";
              }}
            >
              <FiRefreshCw className="w-2 h-2 sm:w-2.5 sm:h-2.5" />Reset
            </button>
          </div>
        </div>

        {/* Message area */}
        <div
          ref={scrollAreaRef}
          className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitMaskImage: "linear-gradient(to bottom, #000 calc(100% - 28px), transparent 100%)",
            maskImage: "linear-gradient(to bottom, #000 calc(100% - 28px), transparent 100%)",
          }}
        >
          {isEmpty ? (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center min-h-full px-3 sm:px-5 py-8">
              {/* Logo with pulsing rings */}
              <div className="relative mb-7">
                <div className="absolute inset-[-18px] rounded-full border animate-pulse"
                  style={{ borderColor: `${ACCENT}22` }} />
                <div className="absolute inset-[-9px] rounded-full border"
                  style={{ borderColor: `${ACCENT}16` }} />
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: ACCENT_DIM,
                    border: `1px solid ${ACCENT_MED}`,
                    boxShadow: "0 0 36px rgba(29,155,240,0.18)",
                  }}
                >
                  <FiCpu className="w-6 h-6" style={{ color: ACCENT }} />
                </div>
              </div>

              <p className="text-[9px] uppercase tracking-[3px] mb-3" style={{ color: `${ACCENT}99` }}>
                Portfolio AI
              </p>

              <h2 className="text-[clamp(24px,3.2vw,34px)] leading-[1.1] tracking-tight font-semibold text-white text-center">
                Ask me anything
                <br />
                <em className="font-serif font-normal italic" style={{ color: "rgba(255,255,255,0.35)" }}>
                  about Intekhab.
                </em>
              </h2>

              <p className="text-[12px] text-center max-w-[300px] leading-relaxed mt-3 mb-6" style={{ color: TEXT_MUTED }}>
                Projects, stack, experience and availability — all through conversation.
              </p>

              {/* Quick prompts — ek hi line me */}
              <div className="grid grid-cols-[auto_auto] justify-center gap-2 sm:flex sm:flex-nowrap">
                {QUICK_PROMPTS.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => send(p.query)}
                    className={`flex items-center justify-center gap-2 px-3.5 py-2 text-[11.5px] whitespace-nowrap cursor-pointer transition-all ${i === 2 ? "col-span-2 justify-self-center" : ""}`}
                    style={{
                      border: `1px solid ${BORDER}`,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.03)",
                      color: TEXT_SOFT,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = ACCENT_MED;
                      e.currentTarget.style.background  = ACCENT_DIM;
                      e.currentTarget.style.color       = "rgba(255,255,255,0.9)";
                      e.currentTarget.style.transform   = "translateY(-1px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.background  = "rgba(255,255,255,0.03)";
                      e.currentTarget.style.color       = TEXT_SOFT;
                      e.currentTarget.style.transform   = "translateY(0)";
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
            <div className="px-3 sm:px-6 py-5 space-y-5">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "agent" && (
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-5"
                      style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_MED}` }}>
                      <FiCpu className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                    </div>
                  )}

                  <div className={`flex flex-col max-w-[90%] sm:max-w-[75%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-[9px] uppercase tracking-widest" style={{ color: TEXT_MUTED }}>
                        {msg.sender === "user" ? "You" : "Intekhab AI"}
                      </span>
                      <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.16)" }}>{msg.timestamp}</span>
                    </div>

                    <div
                      className="px-3.5 py-2.5 text-[12px] sm:px-4 sm:text-[13px] leading-relaxed"
                      style={{
                        borderRadius: msg.sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        background: msg.sender === "user"
                          ? `linear-gradient(135deg, ${ACCENT}, #0b7fd6)`
                          : "rgba(255,255,255,0.045)",
                        border: msg.sender === "user" ? "none" : msg.text.startsWith('{"error":') ? "1px solid red" : `1px solid ${BORDER}`,
                        color: msg.sender === "user" ? "#fff" : TEXT,
                        boxShadow: msg.sender === "user" ? "0 8px 24px -10px rgba(29,155,240,0.6)" : "none",
                      }}
                    >
                      {/* format the message and show to user */}
                      {msg.text.startsWith('{"error":') ? <div className="text-red-500">{msg.text.slice(10, msg.text.lastIndexOf('"'))}</div>
                        : <MarkdownMessage content={msg.text} />
                      }
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_MED}` }}>
                    <FiCpu className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                  </div>
                  <div className="flex items-center gap-1.5 px-4 py-2.5"
                    style={{ borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.045)", border: `1px solid ${BORDER}` }}>
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

        {/* Input — solid pill, fade wale zone me floating dikhta hai */}
        <div className={`shrink-0 px-2.5 sm:px-5 pt-2 ${fade ? "pb-16" : "pb-6"}`}>
          <form
            onSubmit={e => { e.preventDefault(); send(); }}
            className="relative flex items-center w-full max-w-[560px] mx-auto"
            style={{
              border: `1px solid ${focused ? ACCENT_MED : BORDER_HI}`,
              borderRadius: 999,
              background: PILL,
              boxShadow: focused
                ? "0 0 0 4px rgba(29,155,240,0.12), 0 14px 36px -10px rgba(0,0,0,0.6)"
                : "0 14px 36px -10px rgba(0,0,0,0.55)",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          >
            <input
              id="agent-input"
              ref={inputRef}
              type="text"
              autoComplete="off"
              value={input}
              onChange={e => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Ask about projects, stack, availability..."
              className="w-full bg-transparent outline-none pl-5 pr-24 py-3.5 text-[13px] text-white placeholder:text-white/30"
            />

            <div className="absolute right-2 flex items-center gap-1.5">
              <span className="hidden sm:flex items-center gap-1 px-1.5 py-1 text-[9px] font-mono"
                style={{ border: `1px solid ${BORDER}`, borderRadius: 999, color: TEXT_MUTED }}>
                <FiCommand className="w-2 h-2" />K
              </span>
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex items-center justify-center w-9 h-9 rounded-full transition-all disabled:opacity-30 cursor-pointer active:scale-95"
                style={{ background: ACCENT, color: "#fff" }}
              >
                <FiArrowUp className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}