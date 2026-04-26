"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SkillsState = {
  activeTags: string[];
  source: "none" | "hover" | "observed";
  setHoverTags: (tags: string[]) => void;
  clearHoverTags: () => void;
  setObservedTags: (id: string, tags: string[]) => void;
  clearObservedTags: (id: string) => void;
  isDimmed: (tag: string) => boolean;
  isHighlighted: (tag: string) => boolean;
  hasActive: boolean;
};

const SkillsCtx = createContext<SkillsState | null>(null);

export function SkillsProvider({ children }: { children: ReactNode }) {
  const [hoverTags, setHover] = useState<string[]>([]);
  // Map of source-id → tags, in insertion order. Latest insertion wins.
  const observedRef = useRef(new Map<string, string[]>());
  const [observedTags, setObserved] = useState<string[]>([]);

  const setHoverTags = useCallback((tags: string[]) => setHover(tags), []);
  const clearHoverTags = useCallback(() => setHover([]), []);

  const recomputeObserved = useCallback(() => {
    const last = Array.from(observedRef.current.entries()).at(-1);
    setObserved(last?.[1] ?? []);
  }, []);

  const setObservedTags = useCallback(
    (id: string, tags: string[]) => {
      observedRef.current.delete(id);
      observedRef.current.set(id, tags);
      recomputeObserved();
    },
    [recomputeObserved]
  );

  const clearObservedTags = useCallback(
    (id: string) => {
      observedRef.current.delete(id);
      recomputeObserved();
    },
    [recomputeObserved]
  );

  const value = useMemo<SkillsState>(() => {
    // Hover wins over observed
    const active = hoverTags.length ? hoverTags : observedTags;
    const source: SkillsState["source"] = hoverTags.length
      ? "hover"
      : observedTags.length
        ? "observed"
        : "none";
    const lowerSet = new Set(active.map((t) => t.toLowerCase()));
    const hasActive = lowerSet.size > 0;
    return {
      activeTags: active,
      source,
      setHoverTags,
      clearHoverTags,
      setObservedTags,
      clearObservedTags,
      hasActive,
      isHighlighted: (tag) => hasActive && lowerSet.has(tag.toLowerCase()),
      isDimmed: (tag) => hasActive && !lowerSet.has(tag.toLowerCase()),
    };
  }, [
    hoverTags,
    observedTags,
    setHoverTags,
    clearHoverTags,
    setObservedTags,
    clearObservedTags,
  ]);

  return <SkillsCtx.Provider value={value}>{children}</SkillsCtx.Provider>;
}

export function useSkills() {
  return useContext(SkillsCtx);
}

/**
 * Hover handlers that set hoverTags on the SkillsContext.
 * Returns no-op handlers if there's no provider in the tree.
 */
export function useTagHover(tags: string[] | undefined) {
  const ctx = useContext(SkillsCtx);
  return useMemo(() => {
    if (!ctx || !tags || tags.length === 0) {
      return { onMouseEnter: undefined, onMouseLeave: undefined };
    }
    return {
      onMouseEnter: () => ctx.setHoverTags(tags),
      onMouseLeave: () => ctx.clearHoverTags(),
    };
  }, [ctx, tags]);
}

/**
 * Auto-highlight when an item is in view. Returns a ref to attach to the element.
 * `id` should be stable per item (e.g. company name or project name).
 * Hover always overrides observed.
 */
export function useObservedTags(
  tags: string[] | undefined,
  id: string,
  threshold = 0.55
) {
  const ctx = useContext(SkillsCtx);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ctx || !tags || tags.length === 0) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            ctx.setObservedTags(id, tags);
          } else {
            ctx.clearObservedTags(id);
          }
        }
      },
      { threshold: [0, threshold, 1] }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      ctx.clearObservedTags(id);
    };
  }, [ctx, tags, id, threshold]);

  return ref;
}
