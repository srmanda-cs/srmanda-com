"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export default function MagneticButton({
  children,
  href,
  onClick,
  strength = 0.35,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component: React.ElementType = href ? "a" : "button";
  const props = href
    ? { href }
    : { type: "button" as const, onClick };

  return (
    <Component
      ref={ref}
      className="magnetic"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      <motion.span
        className="magnetic-inner"
        style={reduce ? undefined : { x: sx, y: sy }}
      >
        {children}
      </motion.span>
    </Component>
  );
}
