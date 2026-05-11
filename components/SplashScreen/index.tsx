"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Overlay, Glow, Content, Name, RedAccent,
  Role, Welcome, Line, ProgressBar, ProgressFill,
} from "./styles";

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 2800;
    const interval = 30;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setProgress(Math.min((current / steps) * 100, 100));
      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 500);
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "fixed", inset: 0, zIndex: 9999 }}
        >
          <Overlay>
            <Glow />

            <Content>
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.5em", y: 20 }}
                animate={{ opacity: 1, letterSpacing: "-0.02em", y: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                <Name>
                  Tin<RedAccent>.</RedAccent>
                </Name>
              </motion.div>

              {/* Role */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              >
                <Role>Software Engineer</Role>
              </motion.div>

              {/* Line */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
                style={{ originY: 0 }}
              >
                <Line />
              </motion.div>

              {/* Welcome */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.1 }}
              >
                <Welcome>Welcome</Welcome>
              </motion.div>
            </Content>

            <ProgressBar>
              <ProgressFill $progress={progress} />
            </ProgressBar>
          </Overlay>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
