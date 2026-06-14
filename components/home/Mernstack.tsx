"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";

const techs = [
  {
    name: "MongoDB",
    description: "NoSQL Database",
    icon: SiMongodb,
    color: "#47A248",
  },
  {
    name: "Express.js",
    description: "Backend Framework",
    icon: SiExpress,
    color: "#ffffff",
  },
  {
    name: "React",
    description: "Frontend Library",
    icon: FaReact,
    color: "#61DAFB",
  },
  {
    name: "Node.js",
    description: "JavaScript Runtime",
    icon: FaNodeJs,
    color: "#8CC84B",
  },
];

export default function MernStack() {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  return (
    <section className="flex flex-col items-center py-20 bg-[var(--bg-soft)]">
      <h2 className="mb-16 text-4xl font-bold tracking-widest text-cyan-400">
        MERN STACK
      </h2>

      <div className="flex flex-wrap justify-center gap-14">
        {techs.map((tech, index) => {
          const Icon = tech.icon;

          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              onClick={() =>
                setActiveTech(
                  activeTech === tech.name ? null : tech.name
                )
              }
              className="group relative flex flex-col items-center"
            >
              {/* Popup */}
              <div
                className={`
                  pointer-events-none
                  absolute
                  -top-24
                  z-20
                  transition-all
                  duration-300
                  ${
                    activeTech === tech.name
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                  }
                `}
              >
                <div
                  className="rounded-full px-5 py-3 shadow-2xl whitespace-nowrap"
                  style={{
                    backgroundColor: tech.color,
                  }}
                >
                  <h4 className="font-bold text-black">
                    {tech.name}
                  </h4>

                  <p className="text-xs text-black/80">
                    {/* {tech.description} */}
                  </p>
                </div>

                <div
                  className="mx-auto -mt-1 h-3 w-3 rotate-45"
                  style={{
                    backgroundColor: tech.color,
                  }}
                />
              </div>

              {/* Icon Wrapper */}
              <motion.div
                whileHover={{
                  scale: 1.2,
                }}
                whileTap={{
                  scale: 1.15,
                }}
                className="relative cursor-pointer p-5"
              >
                {/* Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-2xl"
                  style={{
                    backgroundColor: tech.color,
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.35 }}
                />

                {/* Shine */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div className="absolute left-[-120%] top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-all duration-700 group-hover:left-[150%]" />
                </div>

                {/* Floating Icon */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon
                    size={80}
                    color={tech.color}
                    className="transition-all duration-300 group-hover:drop-shadow-[0_0_25px_currentColor]"
                  />
                </motion.div>
              </motion.div>

              {/* Bottom Letter */}
              <span
                className="mt-4 text-4xl font-bold"
                style={{
                  color: tech.color,
                }}
              >
                {tech.name[0]}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}