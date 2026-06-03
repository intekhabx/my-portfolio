"use client";

import { useState } from "react";
import { submitContact } from "@/lib/actions";

export default function ContactSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");

    try {
      const res = await submitContact(formData);

      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrMsg(res.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <section
      id="contact"
      className="grid grid-cols-1 border-t border-[var(--line)] md:grid-cols-2"
    >
      {/* LEFT SIDE */}
      <div className="border-b border-[var(--line)] px-4 py-10 md:border-b-0 md:border-r md:px-12 md:py-14">
        <p className="mb-4 text-[9px] uppercase tracking-[3px] text-[var(--ink-muted)]">
          Get in touch
        </p>

        <h2 className="mb-4 text-[22px] leading-[1.3] tracking-[-0.5px] md:text-[28px] font-[var(--font-serif)] text-[var(--ink)]">
          Let's build something{" "}
          <em className="text-[var(--accent)] italic">remarkable.</em>
        </h2>

        <p className="mb-8 text-[13px] leading-[1.8] md:text-[14px] text-[var(--ink-soft)]">
          Open to freelance work, full-time roles, and interesting
          collaborations. I usually reply within 24 hours.
        </p>

        {/* EMAIL */}
        <a
          href="mailto:intekhab118211989@gmail.com"
          className="mb-10 flex items-center gap-3 text-[13px] text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)] md:text-[14px]"
        >
          <span className="text-[var(--ink-muted)]">→</span>
          intekhab118211989@gmail.com
        </a>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-6">
          {[
            { num: "24h", label: "Response time" },
            { num: "12+", label: "Projects shipped" },
          ].map(({ num, label }) => (
            <div key={label}>
              <p className="mb-1 text-[28px] leading-none tracking-[-1px] md:text-[32px] font-[var(--font-display)] text-[var(--accent)]">
                {num}
              </p>

              <p className="text-[9px] uppercase tracking-[2px] text-[var(--ink-muted)]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-[var(--bg-dark)] px-4 py-10 md:px-12 md:py-14">
        <p className="mb-6 text-[9px] uppercase tracking-[3px] text-[var(--on-dark-muted)]">
          Send a message
        </p>

        {status === "success" ? (
          <div className="flex h-48 flex-col justify-center">
            <p className="mb-3 text-[20px] md:text-[22px] font-[var(--font-serif)] text-[var(--on-dark)]">
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
              {
                name: "name",
                label: "Name",
                type: "text",
                placeholder: "john doe"
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "your@email.com",
              },
              {
                name: "message",
                label: "Message",
                type: "textarea",
                placeholder: "Tell me about your project...",
              },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="mb-2 block text-[9px] uppercase tracking-[2px] text-[var(--on-dark-muted)]">
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

            {/* ERROR */}
            {status === "error" && (
              <p className="text-[12px] text-red-400">{errMsg}</p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="self-start bg-[var(--accent)] px-8 py-3 text-[10px] uppercase tracking-[2px] text-white transition-all hover:bg-white hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Message →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}