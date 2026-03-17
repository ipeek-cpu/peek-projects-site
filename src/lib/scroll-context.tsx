"use client";

import { createContext, useContext, useRef, useCallback } from "react";

interface ScrollState {
  progress: number;
  velocity: number;
}

const ScrollContext = createContext<React.RefObject<ScrollState> | null>(null);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const scrollState = useRef<ScrollState>({ progress: 0, velocity: 0 });
  return (
    <ScrollContext.Provider value={scrollState}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollRef() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScrollRef must be used within ScrollProvider");
  return ctx;
}

export function useUpdateScroll() {
  const ref = useScrollRef();
  return useCallback(
    (progress: number, velocity: number) => {
      if (ref.current) {
        ref.current.progress = progress;
        ref.current.velocity = velocity;
      }
    },
    [ref]
  );
}
