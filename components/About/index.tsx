"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, slideInLeft, slideInRight, staggerContainer, staggerItem } from "@/lib/animations";
import {
  Section, Container, Label, Title, Body, Highlight,
  InfoGrid, InfoItem, InfoLabel, InfoValue,
  RightPanel, CardGrid, Card, CardIcon, CardTitle, CardText,
  BigCard, BigCardTitle, BigCardCompany, BigCardRole, ActiveBadge,
} from "./styles";

const CARDS = [
  { icon: "⚡", title: "Performance", text: "Obsessed with fast, smooth user experiences.", accent: false },
  { icon: "🎨", title: "UI / UX", text: "Clean design with intuitive interactions.", accent: false },
  { icon: "🛒", title: "E-Commerce", text: "CMS-driven storefronts built to scale.", accent: true },
  { icon: "🏗️", title: "Architecture", text: "Scalable, maintainable frontend systems.", accent: false },
];

export default function About() {
  const left = useScrollReveal();
  const right = useScrollReveal();

  return (
    <Section id="about">
      <Container>
        {/* Left */}
        <motion.div
          ref={left.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={left.controls}
        >
          <motion.div variants={staggerItem}><Label>About Me</Label></motion.div>

          <motion.div variants={staggerItem}>
            <Title>Building the web,<br />one pixel at a time.</Title>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Body>
              A <Highlight>Software Engineer</Highlight> with 3+ years of experience building
              large-scale e-commerce platforms and cross-platform mobile applications.
              Passionate about CMS-driven architecture, performance optimization, and
              delivering clean, scalable frontend systems.
            </Body>
            <Body>
              Currently at <Highlight>Digicommerce</Highlight> as a Front-end Developer,
              working on <Highlight>BMG World</Highlight> — a CMS-driven e-commerce platform
              where merchants define their full storefront layout without touching code.
              Previously at <Highlight>Citynow</Highlight>, building web and mobile apps
              for HR management and smart locker systems.
            </Body>
          </motion.div>

          <motion.div variants={staggerItem}>
            <InfoGrid>
              {[
                { label: "Location", value: "Ho Chi Minh City, VN" },
                { label: "Experience", value: "3+ Years" },
                { label: "Current Role", value: "Frontend Developer" },
                { label: "Availability", value: "Open to Offers" },
              ].map((item) => (
                <InfoItem key={item.label}>
                  <InfoLabel>{item.label}</InfoLabel>
                  <InfoValue>{item.value}</InfoValue>
                </InfoItem>
              ))}
            </InfoGrid>
          </motion.div>
        </motion.div>

        {/* Right */}
        <motion.div
          ref={right.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={right.controls}
        >
          <RightPanel>
            <CardGrid>
              {/* Current job card */}
              <motion.div variants={staggerItem} style={{ gridColumn: "span 2" }}>
                <BigCard>
                  <ActiveBadge>Active</ActiveBadge>
                  <BigCardTitle>Currently at</BigCardTitle>
                  <BigCardCompany>Digicommerce</BigCardCompany>
                  <BigCardRole>Front-end Developer · BMG World</BigCardRole>
                </BigCard>
              </motion.div>

              {/* Feature cards */}
              {CARDS.map((card) => (
                <motion.div key={card.title} variants={staggerItem}>
                  <Card $accent={card.accent}>
                    <CardIcon>{card.icon}</CardIcon>
                    <CardTitle>{card.title}</CardTitle>
                    <CardText>{card.text}</CardText>
                  </Card>
                </motion.div>
              ))}
            </CardGrid>
          </RightPanel>
        </motion.div>
      </Container>
    </Section>
  );
}
