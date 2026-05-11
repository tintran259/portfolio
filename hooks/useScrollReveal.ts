"use client";

import { useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "framer-motion";

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, amount: threshold });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return { ref, controls };
}
