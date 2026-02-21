import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import ParticlesBackground from "../components/ParticlesBackground";
import avator from "../assets/avator.png";

/* SOCIAL LINKS */
const socials = [
  { Icon: FaLinkedin, label: "LinkedIn", href: "#" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/anitagour" },
];

/* ICON GLOW ANIMATION */
const glowVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.2,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95 },
};

export default function Home() {
  /* ROLES */
  const roles = useMemo(() => ["Web Developer", "Full Stack Developer"], []);

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  /* TYPING EFFECT */
  useEffect(() => {
    const current = roles[index];

    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) {
          setSubIndex((v) => v + 1);
        } else if (!deleting && subIndex === current.length) {
          setDeleting(true);
        } else if (deleting && subIndex > 0) {
          setSubIndex((v) => v - 1);
        } else {
          setDeleting(false);
          setIndex((i) => (i + 1) % roles.length);
        }
      },
      deleting ? 40 : 70,
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-black overflow-hidden"
    >
      {/* BACKGROUND PARTICLES */}
      <ParticlesBackground />

      {/* CENTER WRAPPER */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div
          className="
            w-full max-w-7xl px-6
            grid grid-cols-1 lg:grid-cols-2
            items-center justify-items-center
            gap-14
          "
        >
          {/* LEFT: TEXT */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* ROLE */}
            <motion.div
              className="mb-4 text-2xl sm:text-3xl font-semibold text-white min-h-[1.5em]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {roles[index].substring(0, subIndex)}
              <span className="inline-block w-[2px] h-[1em] ml-1 bg-white animate-pulse" />
            </motion.div>

            {/* NAME */}
            <motion.h1
              className="
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                font-bold
                bg-clip-text text-transparent
                bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
              "
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Hello, I’m
              <br />
              <span className="text-white whitespace-nowrap">Anita Gour</span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              className="mt-6 max-w-xl text-gray-300 text-base sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              I build clean, modern and responsive web applications with a focus
              on performance and user experience.
            </motion.p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6">
              <a
                href="#projects"
                className="
                  px-6 py-3 rounded-full text-white font-medium
                  bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
                  hover:scale-105 transition
                "
              >
                View My Work
              </a>

              <a
                href="/Anita-cv.pdf"
                download
                className="
                  px-6 py-3 rounded-full font-medium text-white
                  bg-gray-700 hover:bg-gray-600
                  hover:scale-105 transition
                "
              >
                My Resume
              </a>
            </div>

            {/* SOCIALS */}
            <div className="mt-8 flex gap-6 text-2xl">
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-400"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="flex items-center justify-center">
            <motion.img
              src={avator}
              alt="Anita Gour"
              className="w-[260px] sm:w-[320px] lg:w-[400px]"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
