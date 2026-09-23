"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";

const techs = [
  { name: "MongoDB",    description: "NoSQL Database",       icon: SiMongodb, color: "#47A248" },
  { name: "Express.js", description: "Backend Framework",    icon: SiExpress, color: "#ffffff" },
  { name: "React",      description: "Frontend Library",     icon: FaReact,   color: "#61DAFB" },
  { name: "Node.js",    description: "JavaScript Runtime",   icon: FaNodeJs,  color: "#8CC84B" },
];

export default function MernStack() {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  return (
    // No width, no height, no background, no padding — all controlled by parent
    <div className="inline-flex flex-col items-center">
      {/* <h2 className="mb-10 text-xl font-bold tracking-widest text-cyan-400">
        MERN STACK
      </h2> */}

      <div className="flex justify-center px-1">
        {techs.map((tech, index) => {
          const Icon = tech.icon;

          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              onClick={() =>
                setActiveTech(activeTech === tech.name ? null : tech.name)
              }
              className="group relative flex flex-col items-center"
            >
              {/* Popup */}
              <div
                className={`
                  pointer-events-none absolute -top-14 z-20
                  transition-all duration-300
                  ${
                    activeTech === tech.name
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                  }
                `}
              >
                <div
                  className="rounded-full px-5 py-2 shadow-2xl whitespace-nowrap"
                  style={{ backgroundColor: tech.color }}
                >
                  <h4 className="font-bold text-black text-sm">{tech.name}</h4>
                  {/* <p className="text-xs text-black/80">{tech.description}</p> */}
                </div>
                <div
                  className="mx-auto -mt-1 h-3 w-3 rotate-45"
                  style={{ backgroundColor: tech.color }}
                />
              </div>

              {/* Icon Wrapper */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1.15 }}
                className="relative cursor-pointer p-4 md:p-5"
              >
                {/* Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-2xl"
                  style={{ backgroundColor: tech.color }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.35 }}
                />

                {/* Shine */}
                {/* <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div className="absolute left-[-60%] top-0 h-full w-[18%] skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-700 group-hover:left-[140%]" />
                </div> */}

                {/* Floating Icon */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon
                    color={tech.color}
                    className="h-8 w-8 md:h-10 md:w-10 transition-all duration-300 group-hover:drop-shadow-[0_0_25px_currentColor]"
                  />
                </motion.div>
              </motion.div>

              {/* Bottom Letter */}
              <span className="mt-2 text-lg md:text-xl font-bold" style={{ color: tech.color }}>
                {tech.name[0]}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
