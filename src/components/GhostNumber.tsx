"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function GhostNumber({ number }: { number: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.span
      ref={ref}
      className="section-header-ghost mono"
      aria-hidden
      initial={{ opacity: 0, scale: 0.72 }}
      animate={
        inView
          ? { opacity: 0.045, scale: 1 }
          : { opacity: 0, scale: 0.72 }
      }
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {number}
    </motion.span>
  );
}
