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
  // mobile absolute position (used only below sm breakpoint)
  mobilePos: { top: number; left?: number; right?: number };
  mobileSize: { w: number };
}

interface CardPos { x: number; y: number; w: number; h: number }
type CardPositions = Record<string, CardPos>;
interface ConnectionLinesProps { cardPositions: CardPositions; draggingId: string | null }

/* ─── Icons (unchanged) ──────────────────────────────── */
const PlanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2a6 6 0 0 0-6 6c0 2.5 1.5 4.7 3.5 5.6V16a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-2.4c2-.9 3.5-3.1 3.5-5.6a6 6 0 0 0-6-6z"/>
    <path d="M10 20h4"/><path d="M11 22h2"/>
  </svg>
);
const BuildIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IntegrateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);
const DeployIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const STEPS: StepItem[] = [
  {
    id: "plan", title: "Plan", description: "Requirements & architecture design",
    icon: PlanIcon, accent: "#38bdf8", staggerClass: "lg:translate-y-3",
    mobilePos: { top: 22, left: 28 }, mobileSize: { w: 148 },
  },
  {
    id: "build", title: "Build", description: "Frontend + backend development",
    icon: BuildIcon, accent: "#3b82f6", staggerClass: "lg:translate-y-14",
    mobilePos: { top: 100, right: 20 }, mobileSize: { w: 155 },
  },
  {
    id: "integrate", title: "Integrate", description: "APIs, DB & real-time features",
    icon: IntegrateIcon, accent: "#22c55e", staggerClass: "lg:-translate-y-3",
    mobilePos: { top: 260, left: 35 }, mobileSize: { w: 158 },
  },
  {
    id: "deploy", title: "Deploy", description: "CI/CD, containerize & ship",
    icon: DeployIcon, accent: "#ec4899", staggerClass: "lg:translate-y-10",
    mobilePos: { top: 420, right: 48 }, mobileSize: { w: 148 },
  },
];

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
            <path d={path} fill="none" stroke={conn.color} strokeWidth={isDragging ? "6" : "3.5"} opacity={isDragging ? 0.35 : 0.12}/>
            <path d={path} fill="none" stroke={conn.color} strokeWidth={isDragging ? 2.5 : 1.8}
              strokeDasharray={isDragging ? "none" : "6 4"} markerEnd={`url(#arrow-${conn.id})`}
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

  // mobile container height = last card top + card height + padding
  const MOBILE_HEIGHT = 390 + 140 + 24;

  return (
    <div className="w-full flex items-center justify-center font-sans select-none text-slate-100">
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl rounded-2xl border border-white/10 bg-[#101217] shadow-2xl overflow-hidden"
        style={{
          // mobile: fixed height for absolute layout; sm+: auto
          minHeight: isMobile ? MOBILE_HEIGHT : 280,
          padding: isMobile ? 0 : undefined,
        }}
        // sm+ padding via className
      >
        <div className={isMobile ? "" : "px-4 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10 flex items-center justify-center"}>
          <ConnectionLines cardPositions={cardPositions} draggingId={draggingId} />

          {/* ── MOBILE: absolute positioned ── */}
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
                      whileHover={{ scale: 1.03 }}
                      className="w-full cursor-grab active:cursor-grabbing rounded-xl p-3.5 flex flex-col items-center text-center select-none"
                      style={{
                        backgroundColor: "rgba(22,25,33,0.95)",
                        backdropFilter: "blur(12px)",
                        border: isCardDragging ? `1.5px solid ${step.accent}` : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: isCardDragging
                          ? `0 0 28px ${step.accent}55, 0 10px 24px rgba(0,0,0,0.5)`
                          : "0 6px 18px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2.5"
                        style={{ backgroundColor: `${step.accent}18`, border: `1px solid ${step.accent}44`, color: step.accent }}>
                        <Icon/>
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-1 tracking-tight">{step.title}</h3>
                      <p className="text-[10px] text-zinc-400 leading-normal">{step.description}</p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── DESKTOP/TABLET: original grid ── */
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 relative z-20 w-full items-center">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isCardDragging = draggingId === step.id;
                return (
                  <div key={step.id}
                    className={`relative flex flex-col items-center w-full max-w-[165px] mx-auto transition-transform duration-300 ${step.staggerClass}`}>
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
                      whileHover={{ scale: 1.03 }}
                      className="w-full cursor-grab active:cursor-grabbing rounded-xl p-3.5 flex flex-col items-center text-center select-none"
                      style={{
                        backgroundColor: "rgba(22,25,33,0.95)",
                        backdropFilter: "blur(12px)",
                        border: isCardDragging ? `1.5px solid ${step.accent}` : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: isCardDragging
                          ? `0 0 28px ${step.accent}55, 0 10px 24px rgba(0,0,0,0.5)`
                          : "0 6px 18px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2.5"
                        style={{ backgroundColor: `${step.accent}18`, border: `1px solid ${step.accent}44`, color: step.accent }}>
                        <Icon/>
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-1 tracking-tight">{step.title}</h3>
                      <p className="text-[10px] text-zinc-400 leading-normal">{step.description}</p>
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
