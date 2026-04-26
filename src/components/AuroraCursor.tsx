"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export default function AuroraCursor() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const x = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.6 });
  const y = useSpring(my, { stiffness: 55, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX - 300);
      my.set(e.clientY - 300);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  if (reduce) return null;

  return (
    <motion.div
      className="aurora-cursor"
      style={{ x, y }}
      aria-hidden
    />
  );
}
