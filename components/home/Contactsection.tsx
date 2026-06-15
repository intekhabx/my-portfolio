"use client";

import { useState } from "react";
import { submitContactMessage } from "@/lib/actions";
import { MdEmail } from "react-icons/md";

export default function ContactSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errMsg, setErrMsg] = useState("");

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
    <section id="contact" className="border-t border-[var(--line)]">

      {/* ── Header ── */}
      <div className="flex items-center gap-5 px-4 py-5 md:px-12 border-b border-[var(--line)]">
        <span
          className="shrink-0 text-[11px] tracking-[3px]"
          style={{ color: "var(--ink-muted)", fontFamily: "var(--font-display)" }}
        >
          04
        </span>
        <span className="text-[11px] text-[var(--ink-muted)]">—</span>
        <h2
          className="text-[28px] md:text-[36px] tracking-[-1px] text-[var(--ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Contact <span className="italic text-[var(--accent)]">Me</span>
        </h2>
        <div className="hidden md:block flex-1 h-px ml-4 bg-[var(--line)]" />
      </div>

      {/* ── TOP: 2-col grid — Info left | Form right ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--line)]">

        {/* LEFT — Info */}
        <div className="px-5 py-10 md:px-12 md:py-14 border-b md:border-b-0 md:border-r border-[var(--line)] flex flex-col justify-center">
          <p className="mb-4 text-[9px] uppercase tracking-[3px] text-[var(--ink-muted)]">
            Get in touch
          </p>

          <h2
            className="mb-5 max-w-[480px] text-[22px] leading-[1.3] tracking-[-0.5px] md:text-[32px]"
            style={{ fontFamily: "var(--font-serif)", color: "var(--ink)" }}
          >
            Let's build something{" "}
            <em className="text-[var(--accent)] italic">remarkable.</em>
          </h2>

          <p className="mb-8 max-w-[420px] text-[13px] leading-[1.8] md:text-[14px] text-[var(--ink-soft)]">
            Open to freelance work, full-time roles, and interesting
            collaborations. I usually reply within 24 hours.
          </p>

          <a
            href="mailto:intekhab118211989@gmail.com"
            className="mb-10 inline-flex items-center gap-1 text-[13px] md:text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)]">
            <span><MdEmail size={20} /></span>intekhab118211989@gmail.com
          </a>

          <div className="grid grid-cols-2 gap-8 max-w-[280px]">
            {[
              { num: "24h", label: "Response time" },
              { num: "5+",  label: "Projects shipped" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p
                  className="mb-1 text-[32px] leading-none tracking-[-1px] text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {num}
                </p>
                <p className="text-[9px] uppercase tracking-[2px] text-[var(--ink-muted)]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="bg-[var(--bg-dark)] px-5 py-10 md:px-12 md:py-14 flex flex-col justify-center">
          <p className="mb-6 text-[9px] uppercase tracking-[3px] text-[var(--on-dark)]">
            Send a message
          </p>

          {status === "success" ? (
            <div className="flex flex-col justify-center py-10">
              <p
                className="mb-3 text-[20px] md:text-[22px] text-[var(--on-dark)]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Message sent!{" "}
                <em className="text-[var(--accent)] italic">Thank you.</em>
              </p>
              <p className="text-[13px] text-[var(--on-dark-muted)]">
                I'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form action={handleSubmit} className="flex flex-col gap-5">
              {[
                { name: "name",    label: "Name",    type: "text",     placeholder: "john doe"                    },
                { name: "email",   label: "Email",   type: "email",    placeholder: "your@email.com"              },
                { name: "message", label: "Message", type: "textarea", placeholder: "Tell me about your project..." },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="mb-2 block text-[9px] uppercase tracking-[2px] text-[var(--on-dark)]">
                    {label}
                  </label>
                  {type === "textarea" ? (
                    <textarea
                      name={name}
                      required
                      rows={4}
                      placeholder={placeholder}
                      className="w-full resize-none border-b border-[var(--line-dark)] bg-transparent py-2.5 text-[13px] text-[var(--on-dark)] outline-none transition-colors focus:border-white/40 placeholder:opacity-20"
                    />
                  ) : (
                    <input
                      name={name}
                      type={type}
                      required
                      placeholder={placeholder}
                      className="w-full border-b border-[var(--line-dark)] bg-transparent py-2.5 text-[13px] text-[var(--on-dark)] outline-none transition-colors focus:border-white/40 placeholder:opacity-20"
                    />
                  )}
                </div>
              ))}

              {status === "error" && (
                <p className="text-[12px] text-red-400">{errMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="self-start mt-2 bg-[var(--accent)] px-8 py-3 text-[10px] uppercase tracking-[2px] text-white transition-all hover:bg-white hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}