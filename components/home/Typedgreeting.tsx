"use client";

import { useEffect, useState } from "react";

type Word = { text: string; accent: boolean };

const WORDS: Word[] = [
  { text: "Hello,", accent: false },
  { text: "I'm", accent: false },
  { text: "Md", accent: true },
  { text: "Intekhab", accent: true },
  { text: "Alam", accent: true },
];

const FULL = WORDS.map((w) => w.text).join(" ");

interface TypedGreetingProps {
  speed?: number;
  delay?: number;
  className?: string;
}

export default function TypedGreeting({
  speed = 350,
  delay = 400,
  className = "",
}: TypedGreetingProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(WORDS.length);
      return;
    }

    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= WORDS.length) {
            if (interval) clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [speed, delay]);

  return (
    <p
      aria-label={FULL}
      className={`relative inline-block font-mono text-[11px] md:text-[10px] tracking-wide text-[var(--ink-soft)] ${className}`}
    >
      {/* invisible full text reserves the space, so the layout never shifts */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {FULL}
      </span>

      {/* words appear one by one, left to right */}
      <span aria-hidden className="absolute left-0 top-0 whitespace-nowrap">
        {WORDS.slice(0, count).map((w, i) => (
          <span
            key={i}
            className={w.accent ? "text-[var(--accent)] font-semibold" : ""}
          >
            {w.text}
            {i < WORDS.length - 1 ? " " : ""}
          </span>
        ))}
        <span className="inline-block w-[1px] h-[1em] translate-y-[2px] bg-[var(--accent)] animate-pulse" />
      </span>
    </p>
  );
}
