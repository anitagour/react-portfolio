import React from "react";
import { motion } from "framer-motion";
import profile from "../assets/profile.jpg"; // <-- change if different image

export default function About() {
  const stats = [
    { label: "Experience", value: "1+ years" },
    { label: "Specialty", value: "Full Stack" },
    { label: "Focus", value: "Performance & UX" },
  ];
  const glows = [
    "w-[300px] h-[300px] -top-20 -left-20 opacity-20 blur-[120px]",
    "w-[250px] h-[250px] bottom-0 right-0 opacity-20 blur-[120px]",
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#1cd8d2] to-[#302b63] animate-pulse ${c}`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl w-full px-6 md:px-10 py-16">
        <motion.div
          className="flex flex-col md:flex-row  justify-center gap-12 text-center md:text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Profile Image */}
          <motion.div
            className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px]
            rounded-2xl overflow-hidden shadow-2xl
            bg-gradient-to-br from-[#1cd8d2]/20 to-[#302b63]/20
            border border-[#1cd8d2]/25"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={profile}
              alt="Profile"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          {/* Text Section */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start">
            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-tight
              bg-clip-text text-transparent
              bg-gradient-to-r from-[#1cd8d2] via-[#00bfbf] to-[#1cd8d2]"
            >
              Anita Gour
            </h2>

            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              Full Stack Developer
            </p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md-max-w-3xl">
              I build scalable, modern applications with a strong focus on clean
              architecture, delightful UX, and performance. My toolkit spans
              Java, React, Next.js, TypeScript, Tailwind CSS, and RESTful APIs —
              bringing ideas to life from concept to production with robust
              backends and smooth interfaces.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold">{item.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#Projects"
                className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition"
              >
                View Projects
              </a>
              <a
                href="#Contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white px-5 py-3 hover:bg-white/20 transition"
              >
                Get in touch
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="text-center mt-10 md:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            About Me
          </h3>

          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            I’m a Software Developer, Content Creator, and Web Developer —
            passionate about building fast, resilient applications and sharing
            coding insights on Instagram and YouTube.
          </p>

          <p className="mt-4 text-gray-400">
            I love turning ideas into scalable, user-friendly products that make
            an impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
