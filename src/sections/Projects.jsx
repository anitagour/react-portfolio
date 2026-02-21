import { useEffect, useMemo, useRef, useState } from "react";
import img1 from "../assets/aihm.png";
import img2 from "../assets/dc-event.png";
import img3 from "../assets/first-mart.png";
// import photo1 from "../assets/img1.JPG";
// import photo2 from "../assets/photo2.PNG";
// import photo3 from "../assets/photo3.png";

import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

/* ---------- MOBILE DETECTION HOOK ---------- */

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);

    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

/* ---------- COMPONENT ---------- */

export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "Aihm Project",
        link: "https://webmartsolutions.com/demo/aihm/index.html",
        bgColor: "#0d4d3d",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "DC Event",
        link: "https://anitagour.github.io/dc-event/",
        bgColor: "#3084d3",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "First Mart",
        link: "https://anitagour.github.io/first-mart/",
        bgColor: "#dc9317",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile],
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
        {/* Section Title */}
        <h2 className="absolute top-10 text-2xl font-semibold text-white/90 z-20">
          My Work
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.title}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.6 }}
            className="relative w-full flex items-center justify-center"
          >
            {/* Large Background Title */}
            <h2
              className="absolute left-[5%] top-[0%]
              text-[clamp(3rem,8vw,6rem)]
              font-bold italic
              text-white/10
              select-none
              z-0"
            >
              {activeProject.title}
            </h2>

            {/* Image Card */}
            <div
              className="relative mt-20 w-[80%] max-w-[1200px] h-[80vh]
              rounded-2xl overflow-hidden
              shadow-[0_40px_80px_rgba(0,0,0,0.5)]
              z-10"
            >
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />

              {/* Button */}
              <div
                className={`absolute ${
                  isMobile ? "bottom-16" : "bottom-10"
                } left-1/2 -translate-x-1/2`}
              >
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
                >
                  View Project
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
