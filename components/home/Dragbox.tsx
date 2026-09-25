"use client"

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface StepItem {
  id: string;
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  accent: string;
  staggerClass: string;
  mobilePos: { top: number; left?: number; right?: number };
  mobileSize: { w: number };
}

interface CardPos { x: number; y: number; w: number; h: number }
type CardPositions = Record<string, CardPos>;
interface ConnectionLinesProps { cardPositions: CardPositions; draggingId: string | null }

/* ─── Icons ────────────────────────────────────────────── */
const PlanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2a6 6 0 0 0-6 6c0 2.5 1.5 4.7 3.5 5.6V16a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-2.4c2-.9 3.5-3.1 3.5-5.6a6 6 0 0 0-6-6z"/>
    <path d="M10 20h4"/><path d="M11 22h2"/>
  </svg>
);
const BuildIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="7 18 1 12 7 6" />
    <polyline points="17 6 23 12 17 18" />
    <path d="M14 3L10 21" />
  </svg>
);
const IntegrateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);
const DeployIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const STEPS: StepItem[] = [
  {
    id: "plan", title: "Plan", description: "Requirements & Design",
    icon: PlanIcon, accent: "#38bdf8", staggerClass: "lg:translate-y-3",
    mobilePos: { top: 25, left: 35 }, mobileSize: { w: 170 },
  },
  {
    id: "build", title: "Build", description: "Frontend + Backend development",
    icon: BuildIcon, accent: "#3b82f6", staggerClass: "lg:translate-y-14",
    mobilePos: { top: 185, right: 40 }, mobileSize: { w: 175 },
  },
  {
    id: "integrate", title: "Integrate", description: "APIs, DB & Tools",
    icon: IntegrateIcon, accent: "#22c55e", staggerClass: "lg:-translate-y-3",
    mobilePos: { top: 345, left: 35 }, mobileSize: { w: 178 },
  },
  {
    id: "deploy", title: "Deploy", description: "CI/CD, containerize & ship",
    icon: DeployIcon, accent: "#ec4899", staggerClass: "lg:translate-y-10",
    mobilePos: { top: 510, right: 48 }, mobileSize: { w: 170 },
  },
];

/* ─── Custom Inner Visual Structures ─────────────────────── */
const CardInnerVisual: React.FC<{ id: string; accent: string; description: string }> = ({ id, accent, description }) => {
  if (id === "plan") {
    return (
      <div className="flex flex-col gap-1.5 p-2 rounded bg-[#c2ecff]/10 border border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
          <div className="h-1.5 w-12 rounded bg-white/20" />
          <div className="h-1.5 w-6 rounded bg-white/10 ml-auto" />
        </div>
        <div className="h-1.5 w-full rounded bg-white/10" />
        <p className="text-[10px] font-mono text-slate-400 leading-tight mt-1">{description}</p>
      </div>
    );
  }
  if (id === "build") {
    return (
      <div className="flex flex-col gap-1.5 p-2 rounded bg-[#0d1322]/60 border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
          </div>
          <span className="text-[8px] font-mono text-slate-500">v1.0.0</span>
        </div>
        <p className="text-[10px] font-mono text-slate-400 leading-tight mt-0.5">{description}</p>
      </div>
    );
  }
  if (id === "integrate") {
    return (
      <div className="flex flex-col gap-1.5 p-2 rounded bg-[#181A23]/50 border border-white/5">
        <div className="flex items-center justify-between border-b border-white/5 pb-1">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <span className="text-[9px] font-mono text-slate-300">REST / tRPC</span>
          </div>
          <span className="text-[8px] font-mono px-1 rounded bg-green-500/20 text-green-400">200 OK</span>
        </div>
        <p className="text-[10px] font-mono text-slate-400 leading-tight mt-0.5">{description}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1.5 p-2 rounded bg-[#efd2e1]/10 border border-white/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-[9px] font-mono text-slate-300">Deployed</span>
        </div>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
      </div>
      <p className="text-[10px] font-mono text-slate-400 leading-tight mt-0.5">{description}</p>
    </div>
  );
};

/* ─── Connection Lines (logic unchanged) ─────────────── */
const ConnectionLines: React.FC<ConnectionLinesProps> = ({ cardPositions, draggingId }) => {
  const calculateCurvePath = (connId: string, p1?: CardPos, p2?: CardPos): string => {
    if (!p1 || !p2 || p1.w === 0 || p2.w === 0) return "";
    const isVertical = p2.y > p1.y + p1.h - 15;
    if (isVertical) {
      const startX = p1.x + p1.w * 0.5; const startY = p1.y + p1.h;
      const endX   = p2.x + p2.w * 0.5; const endY   = p2.y;
      const dy = Math.abs(endY - startY);
      return `M ${startX},${startY} C ${startX},${startY + dy*0.5} ${endX},${endY - dy*0.5} ${endX},${endY}`;
    }
    if (connId === "c1") {
      const startX = p1.x+p1.w*0.95; const startY = p1.y+p1.h*0.2;
      const endX   = p2.x+p2.w*0.05; const endY   = p2.y+p2.h*0.25;
      const dx = endX-startX;
      return `M ${startX},${startY} C ${startX+dx*0.35},${startY-40} ${endX-dx*0.35},${endY-30} ${endX},${endY}`;
    }
    if (connId === "c2") {
      const startX = p1.x+p1.w*0.95; const startY = p1.y+p1.h*0.8;
      const endX   = p2.x+p2.w*0.05; const endY   = p2.y+p2.h*0.75;
      const dx = endX-startX;
      return `M ${startX},${startY} C ${startX+dx*0.45},${startY+45} ${endX-dx*0.45},${endY+40} ${endX},${endY}`;
    }
    const startX = p1.x+p1.w*0.95; const startY = p1.y+p1.h*0.3;
    const endX   = p2.x+p2.w*0.05; const endY   = p2.y+p2.h*0.7;
    const dx = endX-startX;
    return `M ${startX},${startY} C ${startX+dx*0.5},${startY-25} ${endX-dx*0.4},${endY+30} ${endX},${endY}`;
  };

  const connections = [
    { from: "plan", to: "build", id: "c1", color: STEPS[1].accent },
    { from: "build", to: "integrate", id: "c2", color: STEPS[2].accent },
    { from: "integrate", to: "deploy", id: "c3", color: STEPS[3].accent },
  ];

  return (
    <svg className="absolute inset-0 pointer-events-none w-full h-full z-10" style={{ overflow: "visible" }}>
      <defs>
        {connections.map((conn) => (
          <marker key={conn.id} id={`arrow-${conn.id}`}
            viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={conn.color}/>
          </marker>
        ))}
      </defs>
      {connections.map((conn) => {
        const path = calculateCurvePath(conn.id, cardPositions[conn.from], cardPositions[conn.to]);
        if (!path) return null;
        const isDragging = draggingId === conn.from || draggingId === conn.to;
        return (
          <g key={conn.id}>
            <path d={path} fill="none" stroke={conn.color} strokeWidth={isDragging ? "5" : "2.5"} opacity={isDragging ? 0.35 : 0.15}/>
            <path d={path} fill="none" stroke={conn.color} strokeWidth={isDragging ? 2 : 1.5}
              strokeDasharray={isDragging ? "none" : "4 4"} markerEnd={`url(#arrow-${conn.id})`}
              opacity={isDragging ? 1 : 0.85}/>
          </g>
        );
      })}
    </svg>
  );
};

/* ─── Main ───────────────────────────────────────────── */
export default function DragableBox() {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs     = useRef<Record<string, HTMLDivElement | null>>({});
  const animFrameRef = useRef<number | null>(null);
  const snapBackRef  = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [cardPositions, setCardPositions] = useState<CardPositions>({
    plan: {x:0,y:0,w:0,h:0}, build: {x:0,y:0,w:0,h:0},
    integrate: {x:0,y:0,w:0,h:0}, deploy: {x:0,y:0,w:0,h:0},
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const newPos: CardPositions = {};
    STEPS.forEach((step) => {
      const el = cardRefs.current[step.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        newPos[step.id] = { x: rect.left-cRect.left, y: rect.top-cRect.top, w: rect.width, h: rect.height };
      }
    });
    setCardPositions(newPos);
  }, []);

  const handleDragUpdate = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => updatePositions());
  }, [updatePositions]);

  const startSnapBackTracking = useCallback(() => {
    if (snapBackRef.current) cancelAnimationFrame(snapBackRef.current);
    const startTime = performance.now();
    const duration  = 750;
    const animateSnap = (now: number) => {
      updatePositions();
      if (now - startTime < duration) snapBackRef.current = requestAnimationFrame(animateSnap);
      else updatePositions();
    };
    snapBackRef.current = requestAnimationFrame(animateSnap);
  }, [updatePositions]);

  useEffect(() => {
    updatePositions();
    const t = setTimeout(updatePositions, 100);
    window.addEventListener("resize", updatePositions);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updatePositions);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (snapBackRef.current)  cancelAnimationFrame(snapBackRef.current);
    };
  }, [updatePositions]);

  const MOBILE_HEIGHT = 500 + 140 + 24;

  return (
    <div className="w-full flex items-center justify-center font-sans select-none text-slate-100 p-2 sm:p-4">
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl rounded-2xl border border-cyan-500/10 shadow-2xl overflow-hidden"
        style={{
          minHeight: isMobile ? MOBILE_HEIGHT : 320,
          backgroundColor: "#0b0c10",
          backgroundImage: `radial-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      >
        {/* Top-right "Drag the cards" pill badge */}
        <div className="absolute top-4 right-4 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-[#101726]/80 backdrop-blur-md text-xs text-zinc-300/80 font-mono">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6"/>
            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
            <path d="M18 8a2 2 0 0 1 2 2v4a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
          </svg>
          Drag the cards
        </div>

        <div className={isMobile ? "" : "px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14 flex items-center justify-center"}>
          <ConnectionLines cardPositions={cardPositions} draggingId={draggingId} />

          {/* ── MOBILE: ── */}
          {isMobile ? (
            <div className="relative w-full" style={{ height: MOBILE_HEIGHT }}>
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isCardDragging = draggingId === step.id;
                const pos = step.mobilePos;
                return (
                  <div
                    key={step.id}
                    className="absolute"
                    style={{
                      top: pos.top,
                      left: pos.left !== undefined ? pos.left : undefined,
                      right: pos.right !== undefined ? pos.right : undefined,
                      width: step.mobileSize.w,
                    }}
                  >
                    <motion.div
                      ref={(el) => { cardRefs.current[step.id] = el; }}
                      drag
                      dragSnapToOrigin={true}
                      dragConstraints={{ top: -140, bottom: 140, left: -140, right: 140 }}
                      dragElastic={0.2}
                      onDragStart={() => {
                        if (snapBackRef.current) cancelAnimationFrame(snapBackRef.current);
                        setDraggingId(step.id); handleDragUpdate();
                      }}
                      onDrag={() => handleDragUpdate()}
                      onDragEnd={() => { setDraggingId(null); startSnapBackTracking(); }}
                      whileHover={{ scale: 1.02 }}
                      className="w-full cursor-grab active:cursor-grabbing rounded-xl overflow-hidden select-none transition-shadow"
                      style={{
                        touchAction: "none",
                        backgroundColor: "#181A23",
                        border: isCardDragging ? `2px solid ${step.accent}` : "1px solid rgba(255,255,255,0.12)",
                        boxShadow: isCardDragging
                          ? `0 0 24px ${step.accent}66, 0 8px 20px rgba(0,0,0,0.6)`
                          : "0 8px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      {/* Node Card Header */}
                      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/5 bg-white/[0.03]">
                        <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-200">
                          {step.title}
                        </span>
                        <div style={{ color: step.accent }}>
                          <Icon />
                        </div>
                      </div>
                      {/* Node Card Body with SVG structure */}
                      <div className="p-2.5">
                        <CardInnerVisual id={step.id} accent={step.accent} description={step.description} />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── DESKTOP/TABLET: grid ── */
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 relative z-20 w-full items-center">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isCardDragging = draggingId === step.id;
                return (
                  <div key={step.id}
                    className={`relative flex flex-col items-center w-full max-w-[185px] mx-auto transition-transform duration-300 ${step.staggerClass}`}>
                    <motion.div
                      ref={(el) => { cardRefs.current[step.id] = el; }}
                      drag dragSnapToOrigin={true}
                      dragConstraints={{ top: -140, bottom: 140, left: -140, right: 140 }}
                      dragElastic={0.2}
                      onDragStart={() => {
                        if (snapBackRef.current) cancelAnimationFrame(snapBackRef.current);
                        setDraggingId(step.id); handleDragUpdate();
                      }}
                      onDrag={() => handleDragUpdate()}
                      onDragEnd={() => { setDraggingId(null); startSnapBackTracking(); }}
                      whileHover={{ scale: 1.02 }}
                      className="w-full cursor-grab active:cursor-grabbing rounded-xl overflow-hidden select-none transition-shadow"
                      style={{
                        touchAction: "none",
                        backgroundColor: "#181A23",
                        border: isCardDragging ? `2px solid ${step.accent}` : "1px solid rgba(255,255,255,0.12)",
                        boxShadow: isCardDragging
                          ? `0 0 24px ${step.accent}66, 0 8px 20px rgba(0,0,0,0.6)`
                          : "0 8px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      {/* Node Card Header */}
                      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/5 bg-white/[0.03]">
                        <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-200">
                          {step.title}
                        </span>
                        <div style={{ color: step.accent }}>
                          <Icon />
                        </div>
                      </div>
                      {/* Node Card Body with SVG structure */}
                      <div className="p-2.5">
                        <CardInnerVisual id={step.id} accent={step.accent} description={step.description} />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
