"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { PERSONAL } from "@/lib/constants";
import {
  Section, Container, Label, Title, RedSpan, SubText,
  EmailButton, Divider, SocialLinks, SocialLink, Footer, FooterText,
} from "./styles";

export default function Contact() {
  const { ref, controls } = useScrollReveal();

  return (
    <Section id="contact">
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={staggerItem}><Label>Get in Touch</Label></motion.div>

          <motion.div variants={staggerItem}>
            <Title>
              Let&apos;s build something<br />
              <RedSpan>great together.</RedSpan>
            </Title>
          </motion.div>

          <motion.div variants={staggerItem}>
            <SubText>
              I&apos;m open to new opportunities, collaborations, and interesting
              conversations. Feel free to reach out anytime.
            </SubText>
          </motion.div>

          <motion.div variants={staggerItem}>
            <EmailButton href={`mailto:${PERSONAL.email}`}>
              ✉ Send an Email
            </EmailButton>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Divider />
          </motion.div>

          <motion.div variants={staggerItem}>
            <SocialLinks>
              <SocialLink href={`mailto:${PERSONAL.email}`}>
                ✉ Email
              </SocialLink>
              <SocialLink href={PERSONAL.github} target="_blank" rel="noopener noreferrer">
                ⌥ GitHub
              </SocialLink>
              <SocialLink href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer">
                ↗ LinkedIn
              </SocialLink>
              <SocialLink href={`tel:${PERSONAL.phone.replace(/\s/g, "")}`}>
                ✆ {PERSONAL.phone}
              </SocialLink>
            </SocialLinks>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Footer>
              <FooterText>
                Designed &amp; built by <span>Tin Tran</span> · {new Date().getFullYear()}
              </FooterText>
            </Footer>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
