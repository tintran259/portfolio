"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import {
  Nav, Logo, Links, NavLink, CTAButton, ProgressBar,
  MobileMenuBtn, MobileMenu, MobileNavLink, MobileCTA,
} from "./styles";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 32);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ProgressBar $progress={progress} />
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Nav $scrolled={scrolled}>
          <Logo onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Tin<span>.</span>
          </Logo>

          <Links>
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} onClick={() => scrollTo(link.href)}>
                {link.label}
              </NavLink>
            ))}
          </Links>

          <CTAButton href="mailto:tintran2591999@gmail.com">
            Hire Me
          </CTAButton>

          <MobileMenuBtn
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            )}
          </MobileMenuBtn>
        </Nav>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu>
            {NAV_LINKS.map((link) => (
              <MobileNavLink key={link.href} onClick={() => scrollTo(link.href)}>
                {link.label}
              </MobileNavLink>
            ))}
            <MobileCTA href="mailto:tintran2591999@gmail.com">
              Hire Me
            </MobileCTA>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}
