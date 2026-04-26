"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import type { Profile, Stats, CurrentProject } from "@/types";
import MagneticButton from "./MagneticButton";
import Avatar from "./Avatar";
import StatsStrip from "./StatsStrip";
import SocialIcons from "./SocialIcons";
import NowCard from "./NowCard";

export default function Hero({
  profile,
  stats,
  current,
}: {
  profile: Profile;
  stats: Stats;
  current: CurrentProject;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [shimmered, setShimmered] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 80, damping: 18, mass: 0.4 });
  const spy = useSpring(py, { stiffness: 80, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      px.set(((e.clientX - cx) / rect.width) * -6);
      py.set(((e.clientY - cy) / rect.height) * -4);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [px, py, reduce]);

  const firstNameLetters = Array.from(profile.first_name);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 220,
        damping: 18,
        mass: 0.7,
      },
    },
  };

  const lastNameDelay = 0.1 + firstNameLetters.length * 0.05 + 0.15;

  return (
    <section className="hero" id="about" ref={ref}>
      <div className="hero-grid">
        {/* LEFT COLUMN: identity */}
        <div className="hero-main">
          <motion.div
            className="hero-info-strip mono"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span>{profile.title}</span>
            <span>{profile.location}</span>
            <span>{profile.timezone}</span>
          </motion.div>

          <motion.div
            style={{
              x: reduce ? 0 : spx,
              y: reduce ? 0 : spy,
              willChange: "transform",
            }}
          >
            <motion.span
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hero-name"
              aria-label={profile.first_name}
              style={{ display: "block" }}
            >
              {firstNameLetters.map((char, i) => (
                <motion.span
                  key={`f-${i}`}
                  className="hero-letter"
                  variants={letterVariants}
                  aria-hidden
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </motion.span>

            <motion.span
              className={`hero-name hero-name-gradient${
                shimmered ? " is-shimmering" : ""
              }`}
              style={{ display: "block" }}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 22,
                mass: 0.8,
                delay: lastNameDelay,
              }}
              onAnimationComplete={() => setShimmered(true)}
            >
              {profile.last_name}
            </motion.span>
          </motion.div>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: lastNameDelay + 0.2 }}
          >
            Building the{" "}
            <span className="hero-tagline-accent">infrastructure</span> that
            lets teams ship fearlessly.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: lastNameDelay + 0.35 }}
          >
            {profile.status && (
              <span className="hero-status mono">
                <span className="hero-status-dot" aria-hidden />
                {profile.status}
              </span>
            )}
            <MagneticButton href="#contact">
              let&apos;s talk{" "}
              <span className="magnetic-arrow" aria-hidden>
                →
              </span>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: lastNameDelay + 0.5 }}
          >
            <SocialIcons profile={profile} size="lg" />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: avatar + stats */}
        <motion.div
          className="hero-side"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Avatar name={profile.name} size="lg" />
          <StatsStrip stats={stats} />
        </motion.div>
      </div>

      {/* Below: currently shipping */}
      <motion.div
        className="hero-now"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: lastNameDelay + 0.65 }}
      >
        <NowCard current={current} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: lastNameDelay + 0.85 }}
      >
        <a href="#about-detail" className="hero-scroll mono">
          ↓ &nbsp;01 · about
        </a>
      </motion.div>
    </section>
  );
}
