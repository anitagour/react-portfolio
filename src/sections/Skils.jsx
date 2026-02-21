import { FaJava, FaReact } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFastapi,
  SiPython,
  SiDocker,
  SiMongodb,
  SiAngular,
} from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function Skills() {
  const skills = [
    { icon: <FaJava />, name: "Java" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiAngular />, name: "Angular" },
  ];

  const repeated = [...skills, ...skills]; // duplicate for infinite loop

  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const x = useMotionValue(0);
  const speed = 0.5;

  // Infinite scroll animation
  useAnimationFrame(() => {
    if (!trackRef.current) return;
    const width = trackRef.current.scrollWidth / 2;

    let current = x.get();
    current -= speed;

    if (Math.abs(current) >= width) {
      current = 0;
    }

    x.set(current);
  });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="w-full py-20 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#0f0b8f] to-[#1c1d8d] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#0f0b8f] to-[#1c1d8d] opacity-20 blur-[120px] animate-pulse delay-500" />
      </div>

      {/* Heading */}
      <motion.h2
        className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00b8f8] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Skills
      </motion.h2>

      <motion.p
        className="mt-3 mb-12 text-white/80 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      {/* Scrolling Skills */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-14 text-6xl text-[#1cd8d2]"
          style={{ x, whiteSpace: "nowrap" }}
        >
          {repeated.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 min-w-[120px] hover:scale-110 transition-transform duration-300"
            >
              {s.icon}
              <p className="text-sm text-white">{s.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
