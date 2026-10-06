"use client";

import { useState } from "react";
import { submitContactMessage } from "@/lib/actions";
import {
  FiCopy, FiMail, FiCheck, FiArrowUpRight, FiClock, FiFolder,
  FiCheckCircle, FiAlertCircle, FiSend, FiMessageSquare, FiUser,
} from "react-icons/fi";
import SectionHeader from "./Sectionheader";

/* ─── Design tokens ──────────────────────────────────────────
   Card hamesha dark rahta hai (light aur dark dono page par),
   isliye yahan colors hardcoded hain. Accent site se aata hai. */
const ACCENT      = "var(--accent, #1d9bf0)";
const ACCENT_DIM  = "color-mix(in srgb, var(--accent, #1d9bf0) 14%, transparent)";
const ACCENT_LINE = "color-mix(in srgb, var(--accent, #1d9bf0) 38%, transparent)";

const SHELL       = "#0b0e14";
const PANEL_R     = "rgba(0,0,0,0.28)";
const FIELD_BG    = "rgba(255,255,255,0.04)";
const BORDER      = "rgba(255,255,255,0.09)";
const BORDER_HI   = "rgba(255,255,255,0.18)";
const TEXT        = "rgba(255,255,255,0.92)";
const TEXT_SOFT   = "rgba(255,255,255,0.62)";
const TEXT_MUTED  = "rgba(255,255,255,0.4)";

const FIELD_CLS =
  "contact-input w-full rounded-xl text-[13px] outline-none transition-all placeholder:text-white/30";

export default function ContactSection() {
  const EMAIL_ADDRESS = "intekhab118211989@gmail.com";

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errMsg, setErrMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setStatus("success");
      } else {
        const err = res.error;
        setStatus("error");
        if (typeof err === "string") {
          setErrMsg(err ?? "Something went wrong.");
        } else {
          setErrMsg(
            err?.email?.[0] ||
              err?.name?.[0] ||
              err?.message?.[0] ||
              "Invalid input"
          );
        }
      }
    } catch {
      setStatus("error");
      setErrMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="border-t border-[var(--line)] py-8 sm:py-12 md:py-20 w-full">

      {/* Input focus + browser autofill styling (dark card ke andar white na ho) */}
      <style>{`
        .contact-input {
          background: ${FIELD_BG};
          border: 1px solid ${BORDER};
          color: ${TEXT};
        }
        .contact-input:hover { border-color: ${BORDER_HI}; }
        .contact-input:focus {
          border-color: ${ACCENT_LINE};
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 4px ${ACCENT_DIM};
        }
        .contact-input:-webkit-autofill,
        .contact-input:-webkit-autofill:hover,
        .contact-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #fff !important;
          caret-color: #fff;
          -webkit-box-shadow: 0 0 0 1000px #131824 inset !important;
          box-shadow: 0 0 0 1000px #131824 inset !important;
          transition: background-color 9999s ease-out 0s;
        }
      `}</style>

      {/* ── Section Header ── */}
      <SectionHeader slNo="06" slText="Contact Me" leftMainTitle="Initiate a" rightMainTitle="Conversation" desc="Available for full-stack engineering roles, technical collaborations, or consulting on custom web architecture." />

      {/* ── Main Container Card ── */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-12">
        <div
          className="relative grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-2xl sm:rounded-3xl"
          style={{
            background: SHELL,
            border: `1px solid ${BORDER_HI}`,
            boxShadow:
              "0 40px 90px -35px rgba(0,0,0,0.65), 0 14px 40px -20px rgba(29,155,240,0.25), 0 0 0 1px rgba(0,0,0,0.25)",
          }}
        >
          {/* Background: grid + glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 30% 20%, #000, transparent 75%)",
              maskImage: "radial-gradient(ellipse 80% 70% at 30% 20%, #000, transparent 75%)",
            }}
          />
          <div aria-hidden className="pointer-events-none absolute -top-24 -left-16 w-80 h-80 rounded-full blur-3xl"
            style={{ background: ACCENT_DIM }} />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-20 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "color-mix(in srgb, var(--accent, #1d9bf0) 8%, transparent)" }} />
          {/* top hairline */}
          <div aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${ACCENT_LINE}, transparent)` }} />

          {/* ═════════ LEFT COLUMN: Info & Actions ═════════ */}
          <div
            className="relative z-10 lg:col-span-5 p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col gap-8 lg:gap-10 border-b lg:border-b-0 lg:border-r"
            style={{ borderColor: BORDER }}
          >
            {/* Intro */}
            <div className="space-y-4 sm:space-y-5">
              <span
                className="font-mono inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] uppercase tracking-[2px]"
                style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.04)", color: TEXT }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for hire
              </span>

              <h3
                className="text-[20px] sm:text-[26px] md:text-[32px] leading-[1.15] tracking-tight"
                style={{ fontFamily: "var(--font-serif)", color: TEXT }}
              >
                Let&apos;s build something{" "}
                <em className="italic" style={{ color: ACCENT }}>remarkable.</em>
              </h3>

              <p className="text-[13px] sm:text-[14px] leading-[1.75] max-w-md" style={{ color: TEXT_SOFT }}>
                Have a product in mind, a system that needs untangling,
                or just a good question? I&apos;m open to freelance work,
                full time roles, and interesting collaborations.
              </p>
            </div>

            {/* Email card */}
            <div className="space-y-3">
              <div
                className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl"
                style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.03)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_LINE}`, color: ACCENT }}
                >
                  <FiMail size={17} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[9px] uppercase tracking-[2px] mb-0.5" style={{ color: TEXT_MUTED }}>
                    Email
                  </p>
                  <p className="font-mono text-[11.5px] sm:text-[12.5px] truncate" style={{ color: TEXT }}>
                    {EMAIL_ADDRESS}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email"
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[9.5px] font-mono uppercase tracking-[1.5px] cursor-pointer transition-all active:scale-95"
                  style={{
                    border: `1px solid ${copied ? "rgba(52,211,153,0.4)" : BORDER}`,
                    color: copied ? "#34d399" : TEXT_SOFT,
                    background: copied ? "rgba(52,211,153,0.08)" : "transparent",
                  }}
                >
                  {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="group flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-[10.5px] sm:text-[11px] font-mono uppercase tracking-[2px] transition-all"
                style={{ border: `1px solid ${ACCENT_LINE}`, color: ACCENT, background: ACCENT_DIM }}
              >
                <span>Email directly</span>
                <FiArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Quick metrics */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-auto">
              {[
                { icon: <FiClock size={17} />,  value: "24h", label: "Response time" },
                { icon: <FiFolder size={17} />, value: "5+",  label: "Projects shipped" },
              ].map(m => (
                <div
                  key={m.label}
                  className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl"
                  style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.03)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: ACCENT_DIM, color: ACCENT }}
                  >
                    {m.icon}
                  </div>
                  <div>
                    <p
                      className="text-[18px] sm:text-[20px] font-bold leading-none mb-1"
                      style={{ fontFamily: "var(--font-display)", color: TEXT }}
                    >
                      {m.value}
                    </p>
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-[1.5px]" style={{ color: TEXT_MUTED }}>
                      {m.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═════════ RIGHT COLUMN: Contact Form ═════════ */}
          <div
            className="relative z-10 lg:col-span-7 p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center"
            style={{ background: PANEL_R }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-10 sm:py-14 px-2 space-y-4">
                <div className="relative mb-3">
                  <div className="absolute inset-[-14px] rounded-full border animate-pulse" style={{ borderColor: "rgba(52,211,153,0.2)" }} />
                  <div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(52,211,153,0.1)",
                      border: "1px solid rgba(52,211,153,0.3)",
                      color: "#34d399",
                      boxShadow: "0 0 36px rgba(52,211,153,0.2)",
                    }}
                  >
                    <FiCheckCircle size={30} />
                  </div>
                </div>
                <h3
                  className="text-[22px] sm:text-[28px]"
                  style={{ fontFamily: "var(--font-serif)", color: TEXT }}
                >
                  Message sent!{" "}
                  <em className="italic" style={{ color: ACCENT }}>Thank you.</em>
                </h3>
                <p className="text-[13px] sm:text-[14px] max-w-sm leading-relaxed" style={{ color: TEXT_SOFT }}>
                  I have received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-6 py-2.5 rounded-xl text-[10.5px] uppercase tracking-[2px] cursor-pointer transition-all hover:bg-white/5"
                  style={{ border: `1px solid ${BORDER_HI}`, color: TEXT }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form action={handleSubmit} className="flex flex-col gap-5 sm:gap-6">

                {/* Form header */}
                <div
                  className="flex items-start sm:items-center justify-between gap-4 pb-5"
                  style={{ borderBottom: `1px solid ${BORDER}` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_LINE}`, color: ACCENT }}
                    >
                      <FiMessageSquare size={17} />
                    </div>
                    <div>
                      <h4 className="text-[15px] sm:text-[17px] font-medium leading-tight" style={{ color: TEXT }}>
                        Send a direct message
                      </h4>
                      <p className="text-[11.5px] sm:text-[12px] mt-0.5" style={{ color: TEXT_MUTED }}>
                        Fill out the form and I&apos;ll get back to you shortly.
                      </p>
                    </div>
                  </div>

                  <span
                    className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-[1.5px] font-mono whitespace-nowrap"
                    style={{ border: `1px solid ${BORDER}`, color: TEXT_SOFT }}
                  >
                    <FiClock size={10} /> ~24h reply
                  </span>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="text-[9.5px] sm:text-[10px] uppercase tracking-[2px] font-medium" style={{ color: TEXT_SOFT }}>
                      Your Name
                    </label>
                    <div className="relative">
                      <FiUser size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: TEXT_MUTED }} />
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className={`${FIELD_CLS} pl-10 pr-4 py-3`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="text-[9.5px] sm:text-[10px] uppercase tracking-[2px] font-medium" style={{ color: TEXT_SOFT }}>
                      Your Email
                    </label>
                    <div className="relative">
                      <FiMail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: TEXT_MUTED }} />
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className={`${FIELD_CLS} pl-10 pr-4 py-3`}
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-[9.5px] sm:text-[10px] uppercase tracking-[2px] font-medium" style={{ color: TEXT_SOFT }}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`${FIELD_CLS} px-4 py-3 resize-none leading-relaxed`}
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <div
                    className="flex items-center gap-2.5 p-3.5 rounded-xl text-[12px]"
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.28)", color: "#f87171" }}
                  >
                    <FiAlertCircle size={16} className="shrink-0" />
                    <span>{errMsg}</span>
                  </div>
                )}

                {/* Submit */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-white text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[2px] transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer w-full sm:w-auto"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT}, color-mix(in srgb, var(--accent, #1d9bf0) 78%, #000))`,
                      boxShadow: `0 12px 30px -10px ${ACCENT_LINE}`,
                    }}
                  >
                    {status === "loading" ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FiSend size={14} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center sm:text-left" style={{ color: TEXT_MUTED }}>
                    Typically replies within 24 hours.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}