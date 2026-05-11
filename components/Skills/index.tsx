"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { SKILLS, SKILL_CATEGORIES } from "@/lib/constants";
import {
  Section, Container, Header, Label, Title,
  GroupList, CategoryRow, CategoryLabel, PillGroup, Pill, PillDot,
} from "./styles";

const grouped = SKILL_CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat] = SKILLS.filter((s) => s.category === cat);
    return acc;
  },
  {} as Record<string, typeof SKILLS>,
);

export default function Skills() {
  const { ref, controls } = useScrollReveal();

  return (
    <Section id="skills">
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={staggerItem}>
            <Header>
              <Label>What I Know</Label>
              <Title>Skills &amp; Technologies</Title>
            </Header>
          </motion.div>

          <motion.div variants={staggerItem}>
            <GroupList>
              {SKILL_CATEGORIES.filter((cat) => grouped[cat]?.length > 0).map((cat) => (
                <CategoryRow key={cat}>
                  <CategoryLabel>{cat}</CategoryLabel>
                  <PillGroup>
                    {grouped[cat].map((skill) => (
                      <Pill key={skill.name} $color={skill.color}>
                        <PillDot $color={skill.color} />
                        {skill.name}
                      </Pill>
                    ))}
                  </PillGroup>
                </CategoryRow>
              ))}
            </GroupList>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
