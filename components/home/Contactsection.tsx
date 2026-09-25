"use client";

import { useState } from "react";
import { submitContactMessage } from "@/lib/actions";
import { FiCopy, FiMail, FiCheck, FiArrowUpRight, FiClock, FiFolder, FiCheckCircle, FiAlertCircle, FiSend, FiMessageSquare } from "react-icons/fi";

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
      
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4 text-center">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto pb-4 border-b border-[var(--line)]">
          
          {/* Sub-badge / Index */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-[12px] font-mono tracking-[3px] text-[var(--ink-muted)]">
              04
            </span>
            <span className="text-[var(--ink-muted)] text-[12px]">—</span>
            <span className="text-[11px] font-mono uppercase tracking-[3px] text-[var(--ink-muted)]">
               Contact Me
            </span>
          </div>

          {/* Main Title */}
          <h2
            className="text-[28px] sm:text-[28px] md:text-[38px] tracking-[-1.5px] leading-tight font-semibold text-[var(--ink)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Initiate a <em className="italic font-serif font-normal text-[var(--accent)]">Conversation</em>
          </h2>

          {/* Centered Description */}
          <p className="text-[12px] md:text-[13px] text-[var(--ink-muted)] max-w-xl leading-relaxed font-normal">
            Available for full-stack engineering roles, technical collaborations, or consulting on custom web architecture.
          </p>

        </div>
      </div>

      {/* ── Main Container Card ── */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl sm:rounded-3xl border border-[var(--line-dark)] bg-[var(--bg-dark)] overflow-hidden shadow-2xl">

          {/* LEFT COLUMN: Info & Actions */}
          <div className="lg:col-span-5 p-5 sm:p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--line-dark)] relative overflow-hidden">
            {/* Soft Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4 sm:space-y-6">
              <span className=" font-mono inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--line-dark)] bg-white/5 text-[9px] uppercase tracking-[2px] text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for hire
              </span>

              <h3
                className="text-[24px] sm:text-[30px] md:text-[48px] leading-[1.2] text-slate-200"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Let's build something{" "}
                <em className="text-[var(--accent)] italic font-mono">remarkable.</em>
              </h3>

              <p className="mb-4 text-[13px] sm:text-[14px] leading-[1.7] text-slate-200 opacity-80 max-w-md">
                Have a product in mind, a system that needs untangling, 
                or just a good question? I’m open to freelance work, 
                full time roles, and interesting collaborations.
              </p>
            </div>

            {/* Email Action Buttons */}
            <div className="relative z-10 my-8">
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                {/* Copy Email Button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-slate-400 hover:border-[var(--accent)] bg-transparent text-[10px] sm:text-[11px] font-mono tracking-[2px] uppercase text-slate-400 hover:text-[var(--accent)] transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  {copied ? <FiCheck size={15} /> : <FiCopy size={15} />}
                  <span>{copied ? "COPIED!" : "COPY EMAIL"}</span>
                </button>

                {/* Email Directly Button */}
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-transparent text-[10px] sm:text-[11px] font-mono tracking-[2px] uppercase text-[var(--accent)] hover:opacity-80 transition-all duration-200 group"
                >
                  <FiMail size={15} />
                  <span>EMAIL DIRECTLY</span>
                  <FiArrowUpRight size={15}/>
                </a>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="relative z-10 pt-6 border-t border-[var(--line-dark)] grid grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-[var(--line-dark)] text-[var(--accent)] shrink-0">
                  <FiClock size={18} />
                </div>
                <div>
                  <p
                    className="text-[18px] sm:text-[20px] font-bold leading-none text-slate-200 mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    24h
                  </p>
                  <p className="text-[8px] sm:text-[9px] uppercase tracking-[1.5px] text-slate-200 opacity-70">
                    Response time
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-[var(--line-dark)] text-[var(--accent)] shrink-0">
                  <FiFolder size={18} />
                </div>
                <div>
                  <p
                    className="text-[18px] sm:text-[20px] font-bold leading-none text-slate-200 mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    5+
                  </p>
                  <p className="text-[8px] sm:text-[9px] uppercase tracking-[1.5px] text-slate-200 opacity-70">
                    Projects shipped
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="lg:col-span-7 p-5 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-black/20">
            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-8 sm:py-12 px-2 space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                  <FiCheckCircle size={30} />
                </div>
                <h3
                  className="text-[22px] sm:text-[28px] text-slate-200"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Message sent!{" "}
                  <em className="text-[var(--accent)] italic">Thank you.</em>
                </h3>
                <p className="text-[13px] sm:text-[14px] text-slate-200 opacity-70 max-w-sm">
                  I have received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-6 py-2.5 rounded-xl border border-[var(--line-dark)] text-[11px] uppercase tracking-[2px] text-slate-200 hover:border-white/40 transition-all cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form action={handleSubmit} className="flex flex-col gap-5 sm:gap-6">

                <div className="pb-4 border-b border-[var(--line-dark)] mb-8">
                  <div className="flex items-center gap-2.5">
                    <FiMessageSquare className="text-[var(--accent)]" size={18} />
                    <h4 className="text-[15px] sm:text-[17px] font-medium text-slate-200">
                      Send a Direct Message
                    </h4>
                  </div>
                  <p className="text-[12px] text-slate-200 opacity-70">
                    Fill out the form below and I'll get back to you shortly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] sm:text-[10px] uppercase tracking-[2px] text-slate-200 font-medium">
                      Your Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="john doe"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--line-dark)] bg-white/5 text-[13px] text-slate-200 placeholder:text-slate-200/30 focus:outline-none focus:border-[var(--accent)] focus:bg-white/[0.08] transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] sm:text-[10px] uppercase tracking-[2px] text-slate-200 font-medium">
                      Your Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--line-dark)] bg-white/5 text-[13px] text-slate-200 placeholder:text-slate-200/30 focus:outline-none focus:border-[var(--accent)] focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] sm:text-[10px] uppercase tracking-[2px] text-slate-200 font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl border border-[var(--line-dark)] bg-white/5 text-[13px] text-slate-200 placeholder:text-slate-200/30 focus:outline-none focus:border-[var(--accent)] focus:bg-white/[0.08] transition-all resize-none"
                  />
                </div>

                {/* Error Notification */}
                {status === "error" && (
                  <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[12px]">
                    <FiAlertCircle size={16} className="shrink-0" />
                    <span>{errMsg}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="self-start inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[var(--accent)] text-white text-[10px] sm:text-[11px] font-medium uppercase tracking-[2px] transition-all hover:opacity-90 hover:shadow-lg hover:shadow-[var(--accent)]/20 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer w-full sm:w-auto"
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
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}