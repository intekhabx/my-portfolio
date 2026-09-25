"use client";

import React from "react";

interface MacbookFrameProps {
  src?: string;
  alt: string;
}

export default function MacbookFrame({ src, alt }: MacbookFrameProps) {
  return (
    <div className="relative w-full max-w-[440px] md:max-w-[480px] mx-auto select-none pointer-events-none transition-all duration-300">
      {/* ── Laptop Chassis ──
          Light mode: Dark charcoal (#121214)
          Dark mode: Lighter space-gray (#2d2d32) */}
      <div className="relative aspect-[16/10] w-full rounded-[10px] md:rounded-[12px] bg-[#121214] dark:bg-[#2d2d32] p-[2.5%] pb-[3.2%] shadow-2xl border border-neutral-700/30 dark:border-neutral-500/40">
        
        {/* Camera Dot */}
        <div className="absolute top-[1.2%] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#08080a] dark:bg-[#18181c] flex items-center justify-center">
          <div className="w-[1.5px] h-[1.5px] rounded-full bg-[#0a3246]" />
        </div>

        {/* Display Screen */}
        <div className="relative w-full h-full overflow-hidden rounded-[3px] bg-black">
          {src ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 text-center">
              <span className="text-[32px] font-serif italic text-neutral-600">
                {alt.charAt(0)}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[2px] text-neutral-500 mt-1">
                Preview Unavailable
              </span>
            </div>
          )}

          {/* Screen Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ── Base / Lip ── */}
      <div className="relative w-[106%] -left-[3%] h-[10px] md:h-[12px] bg-gradient-to-b from-[#242428] via-[#161618] to-[#0c0c0e] dark:from-[#3e3e46] dark:via-[#2b2b30] dark:to-[#1f1f24] rounded-b-[8px] md:rounded-b-[10px] border-t border-neutral-600/40 dark:border-neutral-400/30 shadow-lg flex justify-center">
        <div className="w-[14%] h-[3px] md:h-[4px] bg-[#0c0c0e] dark:bg-[#1f1f24] rounded-b-[2px]" />
      </div>

      <div className="w-[85%] mx-auto h-[8px] bg-black/30 dark:bg-black/60 blur-sm rounded-full -mt-0.5" />
    </div>
  );
}