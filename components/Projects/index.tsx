"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { PROJECTS } from "@/lib/constants";
import {
  Section, Container, Header, HeaderLeft, Label, Title,
  FeaturedGrid, OtherGrid, SectionDivider,
  ProjectCard, CardTop, YearBadge, FeaturedBadge, CompanyBadge,
  ProjectTitle, ProjectDesc, TechTags, Tag, CardLinks, CardLink,
} from "./styles";

const featured = PROJECTS.filter((p) => p.featured);
const others   = PROJECTS.filter((p) => !p.featured);

function ProjectCardContent({
  project,
  small = false,
}: {
  project: (typeof PROJECTS)[number];
  small?: boolean;
}) {
  return (
    <ProjectCard $featured={project.featured} $small={small}>
      <CardTop>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
          <YearBadge $featured={project.featured}>{project.year}</YearBadge>
          <CompanyBadge $featured={project.featured}>@ {project.company}</CompanyBadge>
        </div>
        {project.featured && <FeaturedBadge>★ Featured</FeaturedBadge>}
      </CardTop>

      <ProjectTitle $featured={project.featured} $small={small}>
        {project.title}
      </ProjectTitle>

      <ProjectDesc $featured={project.featured} $small={small}>
        {project.description}
      </ProjectDesc>

      <TechTags>
        {project.tech.map((t) => (
          <Tag key={t} $featured={project.featured} $small={small}>{t}</Tag>
        ))}
      </TechTags>

      <CardLinks>
        {project.demo !== "#" ? (
          <CardLink
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            $primary
            $featured={project.featured}
          >
            Live Demo ↗
          </CardLink>
        ) : (
          <CardLink
            as="span"
            $featured={project.featured}
            style={{ opacity: 0.35, cursor: "default" }}
          >
            Private
          </CardLink>
        )}
        {project.github !== "#" && (
          <CardLink
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            $featured={project.featured}
          >
            GitHub
          </CardLink>
        )}
      </CardLinks>
    </ProjectCard>
  );
}

export default function Projects() {
  const { ref, controls } = useScrollReveal();

  return (
    <Section id="projects">
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={staggerItem}>
            <Header>
              <HeaderLeft>
                <Label>My Work</Label>
                <Title>Selected Projects</Title>
              </HeaderLeft>
            </Header>
          </motion.div>

          {/* ── Featured: 2-col on desktop ── */}
          <FeaturedGrid>
            {featured.map((project) => (
              <motion.div key={project.id} variants={staggerItem}>
                <ProjectCardContent project={project} />
              </motion.div>
            ))}
          </FeaturedGrid>

          {/* ── Others: 3-col on desktop ── */}
          <SectionDivider><span>More Projects</span></SectionDivider>

          <OtherGrid>
            {others.map((project) => (
              <motion.div key={project.id} variants={staggerItem}>
                <ProjectCardContent project={project} small />
              </motion.div>
            ))}
          </OtherGrid>
        </motion.div>
      </Container>
    </Section>
  );
}
