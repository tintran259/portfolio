"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const Btn = styled(motion.button)`
  position: fixed;
  bottom: 1.75rem;
  right: 1.25rem;
  z-index: 999;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  transition: background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: #FF3B3B;
    box-shadow: 0 6px 24px rgba(255, 59, 59, 0.35);
  }

  /* only show on mobile */
  @media (min-width: 768px) {
    display: none;
  }
`;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <Btn
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 12V4M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Btn>
      )}
    </AnimatePresence>
  );
}
