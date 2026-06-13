"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 hover:scale-105"
      style={{
        borderColor: "var(--line)",
        color: "var(--accent)",
        background: "var(--bg-soft)",
      }}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <FiSun size={16} />
      ) : (
        <FiMoon size={16} />
      )}
    </button>
  );
}