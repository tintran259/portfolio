"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import RubiksCube from "@/components/RubiksCube";
import {
  Section, Container, LeftCol, RightCol,
  Tag, Dot, Headline, HeadlineRed,
  SubHeadline, Description, Buttons, PrimaryBtn, SecondaryBtn,
  Stats, Stat, StatValue, StatLabel, ScrollIndicator, ScrollText,
  ScrollIcon, BgAccent,
} from "./styles";

const STATS = [
  { value: "3+", label: "Years Exp." },
  { value: "2", label: "Companies" },
  { value: "20+", label: "Technologies" },
  { value: "7+", label: "Projects" },
];

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="hero">
      <BgAccent />
      <Container>
        {/* ── Left column ── */}
        <LeftCol>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem}>
              <Tag>
                <Dot /> Available for opportunities
              </Tag>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Headline>
                Tin<HeadlineRed>Tran</HeadlineRed>
              </Headline>
            </motion.div>

            <motion.div variants={staggerItem}>
              <SubHeadline>Software Engineer</SubHeadline>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Description>
                Frontend engineer specializing in large-scale e-commerce platforms and
                cross-platform mobile apps. 3+ years shipping production React &amp; Next.js
                applications with CMS-driven architecture and pixel-perfect UIs.
              </Description>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Buttons>
                <PrimaryBtn
                  onClick={() =>
                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Projects →
                </PrimaryBtn>
                <SecondaryBtn href="mailto:tintran2591999@gmail.com">
                  Contact Me
                </SecondaryBtn>
              </Buttons>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Stats>
                {STATS.map((s) => (
                  <Stat key={s.label}>
                    <StatValue>
                      {s.value.replace(/\D/g, "")}
                      <span>{s.value.replace(/\d/g, "")}</span>
                    </StatValue>
                    <StatLabel>{s.label}</StatLabel>
                  </Stat>
                ))}
              </Stats>
            </motion.div>
          </motion.div>
        </LeftCol>

        {/* ── Right column: Rubik's cube ── */}
        <RightCol>
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <RubiksCube />
          </motion.div>
        </RightCol>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <ScrollIndicator onClick={scrollToAbout}>
          <ScrollText>Scroll</ScrollText>
          <ScrollIcon />
        </ScrollIndicator>
      </motion.div>
    </Section>
  );
}
