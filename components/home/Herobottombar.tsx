"use client";

import { FaNodeJs, FaReact } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";



const MongoDBLogo = () => (
  <SiMongodb className="text-green-600"/>
);

const ExpressLogo = () => (
  <SiExpress />
);

const ReactLogo = () => (
  <FaReact className="text-blue-400 font-extrabold" />
);

const NodeLogo = () => (
  <span>
    <FaNodeJs className="text-green-700" />
  </span>
);

const stack = [
  { name: "MongoDB",  Logo: MongoDBLogo,  color: "#4DB33D" },
  { name: "Express",  Logo: ExpressLogo,  color: "#888888" },
  { name: "React",    Logo: ReactLogo,    color: "#61DAFB" },
  { name: "Node.js",  Logo: NodeLogo,     color: "#339933" },
];

export default function HeroBottomBar() {
  return (
    <div
      className="flex items-center px-12"
      style={{ borderTop: "1px solid var(--line)", minHeight: "60px" }}
    >
      <span
        className="text-[9px] tracking-[3px] uppercase mr-8 shrink-0"
        style={{ color: "var(--ink-muted)" }}
      >
        Stack
      </span>

      <div className="flex">
        {stack.map(({ name, Logo, color }, i) => (
          <div
            key={name}
            className="group flex items-center gap-2.5 px-6 py-3 cursor-default transition-colors duration-200 hover:bg-[var(--bg-soft)]"
            style={{
              borderLeft: "1px solid var(--line)",
              ...(i === stack.length - 1 ? { borderRight: "1px solid var(--line)" } : {}),
            }}
          >
            <span className="transition-all duration-300 group-hover:brightness-125"
              style={{ filter: `drop-shadow(0 0 0px ${color})` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.filter = `brightness(1.3) drop-shadow(0 0 7px ${color})`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.filter = "none";
              }}
            >
              <Logo />
            </span>
            <span
              className="text-[var(--ink-muted)] text-[10px] tracking-[1px] uppercase transition-colors duration-200 group-hover:text-[var(--ink)]"
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}