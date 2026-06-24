"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

/* ─── constants ─────────────────────────────────────── */
const BLUE      = "#1d9bf0";
const BLUE_DIM  = "rgba(29,155,240,0.12)";
const BLUE_MED  = "rgba(29,155,240,0.30)";
const BLUE_GLOW = "rgba(29,155,240,0.20)";
const CARD_BG   = "rgba(20,22,28,0.97)";
const INNER_BG  = "rgba(12,14,18,0.95)";

const TERMINAL_LINES = [
  { prompt: "~", cmd: "whoami",        out: "intekhab — full stack dev"         },
  { prompt: "~", cmd: "echo $STACK",   out: "MongoDB · Express · React · Node"  },
  { prompt: "~", cmd: "npm run build", out: "✓  compiled successfully in 1.2s"  },
];

const PROJECTS = [
  { name: "secureAuth",     stack: "Express · Redis",  status: "live" },
  { name: "iTry",      stack: "React · Express", status: "wip" },
  { name: "FormWarts", stack: "Nextjs · Postgres",     status: "wip"  },
];

const TAGS = ["React", "Node.js", "MongoDB", "Express"];

/* ─── types ─────────────────────────────────────────── */
interface Pos { x: number; y: number; w: number; h: number }
type CardId = "user" | "terminal" | "product";

/* ─── SVG connection lines ───────────────────────────── */
function ConnectionLines({
  positions,
  dragging,
}: {
  positions: Record<CardId, Pos>;
  dragging: CardId | null;
}) {
  const bezier = (ax: number, ay: number, bx: number, by: number) => {
    const cx = (ax + bx) / 2;
    return `M${ax},${ay} C${cx},${ay} ${cx},${by} ${bx},${by}`;
  };

  const u = positions.user;
  const t = positions.terminal;
  const p = positions.product;

  // connect right-center of card → left-center of next card
  const d1 = bezier(u.x + u.w, u.y + u.h / 2, t.x, t.y + t.h / 2);
  const d2 = bezier(t.x + t.w, t.y + t.h / 2, p.x, p.y + p.h / 2);

  const col = dragging ? BLUE : "rgba(29,155,240,0.5)";
  const lw  = dragging ? 1.8 : 1.2;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5"
          markerWidth="5" markerHeight="5" orient="auto">
          <path d="M2 2L8 5L2 8" fill="none" stroke={col}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* glow behind lines when dragging */}
      {dragging && (
        <>
          <path d={d1} fill="none" stroke={BLUE} strokeWidth="5"
            opacity="0.12" filter="url(#line-glow)" />
          <path d={d2} fill="none" stroke={BLUE} strokeWidth="5"
            opacity="0.12" filter="url(#line-glow)" />
        </>
      )}

      <path d={d1} fill="none" stroke={col} strokeWidth={lw}
        strokeDasharray="5 3.5" opacity={dragging ? 1 : 0.7}
        markerEnd="url(#arr)"
        style={{ transition: "stroke 0.2s, stroke-width 0.2s, opacity 0.2s" }}
      />
      <path d={d2} fill="none" stroke={col} strokeWidth={lw}
        strokeDasharray="5 3.5" opacity={dragging ? 1 : 0.7}
        markerEnd="url(#arr)"
        style={{ transition: "stroke 0.2s, stroke-width 0.2s, opacity 0.2s" }}
      />
    </svg>
  );
}

/* ─── DraggableCard ──────────────────────────────────── */
function DraggableCard({
  id,
  initialX,
  initialY,
  constraintsRef,
  onDragChange,
  onPosChange,
  children,
}: {
  id: CardId;
  initialX: number;
  initialY: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  onDragChange: (id: CardId | null) => void;
  onPosChange: (id: CardId, x: number, y: number, w: number, h: number) => void;
  children: React.ReactNode;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // Report initial position + size once mounted
  useEffect(() => {
    const el   = cardRef.current;
    if (!el) return;
    onPosChange(id, initialX, initialY, el.offsetWidth, el.offsetHeight);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Called on every drag tick — read the element's ACTUAL translated position
  // from its getBoundingClientRect relative to the canvas, so SVG lines stay
  // perfectly connected regardless of how framer motion applies the transform.
  const handleDrag = useCallback(() => {
    const el     = cardRef.current;
    const canvas = constraintsRef.current;
    if (!el || !canvas) return;

    const eRect = el.getBoundingClientRect();
    const cRect = canvas.getBoundingClientRect();

    onPosChange(
      id,
      eRect.left - cRect.left,
      eRect.top  - cRect.top,
      eRect.width,
      eRect.height,
    );
  }, [constraintsRef, id, onPosChange]);

  return (
    <motion.div
      ref={cardRef}
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0}
      initial={{ x: initialX, y: initialY }}
      onDrag={handleDrag}
      onDragStart={() => { setActive(true);  onDragChange(id);   handleDrag(); }}
      onDragEnd={() => { setActive(false); onDragChange(null); handleDrag(); }}
      whileDrag={{ scale: 1.025 }}
      className="absolute cursor-grab active:cursor-grabbing select-none"
      style={{
        borderRadius: 10,
        border: active
          ? `2px solid ${BLUE}`
          : "1.5px solid rgba(255,255,255,0.08)",
        background: CARD_BG,
        boxShadow: active
          ? `0 0 0 4px ${BLUE_GLOW}, 0 12px 40px rgba(0,0,0,0.6), 0 0 20px ${BLUE_GLOW}`
          : "0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04) inset",
        backdropFilter: "blur(12px)",
        transition: "box-shadow 0.2s, border-color 0.2s",
        zIndex: active ? 30 : 2,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Card contents ──────────────────────────────────── */
function UserCard() {
  return (
    <div style={{ minWidth: 170 }}>
      <div className="flex items-center justify-between px-3 py-[9px]"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-[6px]">
          <div className="w-[7px] h-[7px] rounded-full" style={{ background: BLUE }} />
          <span className="text-[9px] tracking-[2.5px] uppercase font-medium"
            style={{ color: "rgba(255,255,255,0.35)" }}>Identity</span>
        </div>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" opacity={0.7}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>

      <div className="flex items-center gap-3 px-3 py-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
          style={{
            background: "linear-gradient(135deg,rgba(29,155,240,0.25),rgba(29,155,240,0.08))",
            color: BLUE,
            border: `1.5px solid ${BLUE_MED}`,
            boxShadow: `0 0 10px ${BLUE_DIM}`,
          }}>
          IN
        </div>
        <div className="flex flex-col gap-[3px]">
          <span className="text-[12px] font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
            Intekhab
          </span>
          <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            Full Stack Developer
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-[5px] px-3 pb-3">
        {TAGS.map((t) => (
          <span key={t}
            className="text-[8px] px-[7px] py-[3px] tracking-[0.5px] rounded-full"
            style={{ background: BLUE_DIM, color: BLUE, border: `1px solid ${BLUE_MED}` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function TerminalCard() {
  return (
    <div style={{ width: 265 }}>
      {/* title bar */}
      <div className="flex items-center gap-[7px] px-[14px] py-[10px]"
        style={{
          borderBottom: "1px solid rgba(29,155,240,0.2)",
          background: "rgba(10,12,16,0.9)",
          borderRadius: "10px 10px 0 0",
        }}>
        <div className="flex items-center gap-[5px]">
          <div className="w-[10px] h-[10px] rounded-full"
            style={{ background: "#ff5f57", boxShadow: "0 0 4px #ff5f5788" }} />
          <div className="w-[10px] h-[10px] rounded-full"
            style={{ background: "#febc2e", boxShadow: "0 0 4px #febc2e88" }} />
          <div className="w-[10px] h-[10px] rounded-full"
            style={{ background: "#28c840", boxShadow: "0 0 4px #28c84088" }} />
        </div>
        <span className="text-[9px] tracking-[2px] uppercase mx-auto"
          style={{ color: "rgba(29,155,240,0.55)", fontFamily: "monospace" }}>
          bash — intekhab
        </span>
      </div>

      {/* body — stopPropagation so scroll doesn't trigger drag */}
      <div
        className="px-3 py-3 overflow-y-auto flex flex-col gap-[10px]"
        style={{
          height: 178,
          fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace",
          fontSize: "10.5px",
          lineHeight: 1.7,
          background: INNER_BG,
          borderRadius: "0 0 10px 10px",
          scrollbarWidth: "thin",
          scrollbarColor: `${BLUE_MED} transparent`,
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {TERMINAL_LINES.map((line, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex items-start gap-[6px]">
              <span style={{ color: "#5a9e6a" }}>❯</span>
              <span style={{ color: BLUE, opacity: 0.65 }}>{line.prompt}</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>{line.cmd}</span>
            </div>
            {line.out && (
              <div className="pl-[18px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                {line.out}
              </div>
            )}
          </div>
        ))}
        <div className="flex items-center gap-[6px]">
          <span style={{ color: "#5a9e6a" }}>❯</span>
          <span style={{ color: BLUE, opacity: 0.65 }}>~</span>
          <span className="inline-block w-[7px] h-[13px]"
            style={{ background: BLUE, opacity: 0.8, animation: "blink 1s step-end infinite" }} />
        </div>
      </div>
    </div>
  );
}

function ProductCard() {
  return (
    <div style={{ minWidth: 170 }}>
      <div className="flex items-center justify-between px-3 py-[9px]"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-[6px]">
          <div className="w-[7px] h-[7px] rounded-full" style={{ background: "#22c55e" }} />
          <span className="text-[9px] tracking-[2.5px] uppercase font-medium"
            style={{ color: "rgba(255,255,255,0.35)" }}>Projects</span>
        </div>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" opacity={0.7}>
          <path d="m7.5 4.27 9 5.15"/>
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
          <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
        </svg>
      </div>

      {PROJECTS.map((proj, i) => (
        <div key={proj.name}
          className="flex items-center justify-between px-3 py-[10px]"
          style={{ borderBottom: i < PROJECTS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
          <div className="flex flex-col gap-[3px]">
            <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
              {proj.name}
            </span>
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              {proj.stack}
            </span>
          </div>
          <div className="flex items-center gap-[5px]">
            <div className="w-[5px] h-[5px] rounded-full"
              style={{
                background: proj.status === "live" ? "#22c55e" : "#f59e0b",
                boxShadow: proj.status === "live" ? "0 0 6px #22c55e88" : "0 0 6px #f59e0b88",
              }} />
            <span className="text-[8px]"
              style={{ color: proj.status === "live" ? "#22c55e" : "#f59e0b" }}>
              {proj.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── initial positions ──────────────────────────────── */
const INIT: Record<CardId, Pos> = {
  user:     { x: 35,  y: 105,  w: 170, h: 148 },
  terminal: { x: 200, y: 180,  w: 265, h: 228 },
  product:  { x: 400, y: 80,  w: 170, h: 152 },
};

/* ─── main export ────────────────────────────────────── */
export default function HeroPlayground() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<CardId, Pos>>(INIT);
  const [dragging,  setDragging]  = useState<CardId | null>(null);

  const handlePosChange = useCallback(
    (id: CardId, x: number, y: number, w: number, h: number) =>
      setPositions((prev) => ({ ...prev, [id]: { x, y, w, h } })),
    [],
  );

  return (
    /* outer wrapper: full-width on mobile, flex-1 on md+ */
    <div className="md:w-[90%] w-full flex items-center justify-center md:px-0">
      <div
        ref={constraintsRef}
        className="relative w-full overflow-hidden"
        style={{
          /* taller on desktop, shorter on mobile via inline clamp */
          height: "clamp(320px, 45vw, 480px)",
          borderRadius: 12,
          border: "1.5px solid rgba(29,155,240,0.22)",
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(29,155,240,0.06) 0%, transparent 55%),
            radial-gradient(circle at 80% 20%, rgba(29,155,240,0.04) 0%, transparent 50%),
            radial-gradient(circle, rgba(29,155,240,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "auto, auto, 24px 24px",
          // backgroundColor: "rgba(8,10,14,0.98)",
          // boxShadow: "0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        <ConnectionLines positions={positions} dragging={dragging} />

        <DraggableCard id="user" initialX={INIT.user.x} initialY={INIT.user.y}
          constraintsRef={constraintsRef} onDragChange={setDragging} onPosChange={handlePosChange}>
          <UserCard />
        </DraggableCard>

        <DraggableCard id="terminal" initialX={INIT.terminal.x} initialY={INIT.terminal.y}
          constraintsRef={constraintsRef} onDragChange={setDragging} onPosChange={handlePosChange}>
          <TerminalCard />
        </DraggableCard>

        <DraggableCard id="product" initialX={INIT.product.x} initialY={INIT.product.y}
          constraintsRef={constraintsRef} onDragChange={setDragging} onPosChange={handlePosChange}>
          <ProductCard />
        </DraggableCard>

        {/* live badge */}
        <div className="absolute top-3 right-3 flex items-center gap-[5px] pointer-events-none select-none">
          <div className="w-[5px] h-[5px] rounded-full animate-pulse"
            style={{ background: BLUE, boxShadow: `0 0 6px ${BLUE}` }} />
          <span className="text-[8px] tracking-[2px] uppercase"
            style={{ color: "rgba(29,155,240,0.45)" }}>live preview</span>
        </div>

        <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
      </div>
    </div>
  );
}