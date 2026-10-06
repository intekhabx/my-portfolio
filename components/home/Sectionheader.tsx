

interface ISectionHeaderProps {
  slNo: string,
  slText: string,
  leftMainTitle: string,
  rightMainTitle: string,
  desc: string,
}


export default function SectionHeader({slNo, slText, leftMainTitle, rightMainTitle, desc}: ISectionHeaderProps) {
  return (
    <>
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4 text-center">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto pb-4 border-b border-[var(--line)]">
          
          {/* Sub-badge / Index */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-[12px] font-mono tracking-[3px] text-[var(--ink-muted)]">
              {slNo}
            </span>
            <span className="text-[var(--ink-muted)] text-[12px]">-</span>
            <span className="text-[11px] font-mono uppercase tracking-[3px] text-[var(--ink-muted)]">
              {slText}
            </span>
          </div>

          {/* Main Title */}
          <h2
            className="text-[28px] sm:text-[28px] md:text-[38px] tracking-[-1.5px] leading-tight font-semibold text-[var(--ink)] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {leftMainTitle}<em className="italic font-serif font-normal text-[var(--accent)]"> {rightMainTitle}</em>
          </h2>

          {/* Centered Description */}
          <p className="text-[12px] md:text-[13px] text-[var(--ink-muted)] max-w-xl leading-relaxed font-normal">
            {desc}
          </p>

        </div>
      </div>
    </>
  )
}