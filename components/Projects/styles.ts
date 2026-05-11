import styled from "styled-components";

export const Section = styled.section`
  position: relative;
  z-index: 2;
  padding: 7rem 2rem;
  background: #fff;

  @media (min-width: 768px) {
    padding: 8rem 4rem;
  }
`;

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 3.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const HeaderLeft = styled.div``;

export const Label = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #FF3B3B;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
`;

export const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #000;
  letter-spacing: -0.03em;
`;

/* ── Featured: 1-col mobile → 2-col desktop ── */
export const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-bottom: 1.25rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

/* ── Others: 1-col → 2-col → 3-col ── */
export const OtherGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SectionDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0 1.5rem;

  span {
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.28);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(0, 0, 0, 0.07);
  }
`;

export const ProjectCard = styled.div<{ $featured?: boolean; $small?: boolean }>`
  position: relative;
  padding: ${({ $small }) => ($small ? "1.5rem" : "2rem")};
  background: ${({ $featured }) => ($featured ? "#000" : "#FAFAFA")};
  border: 1px solid ${({ $featured }) => ($featured ? "transparent" : "rgba(0,0,0,0.07)")};
  border-radius: 20px;
  height: 100%;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ $featured }) =>
      $featured
        ? "radial-gradient(ellipse at top right, rgba(255,59,59,0.12) 0%, transparent 60%)"
        : "none"};
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ $featured }) =>
      $featured
        ? "0 20px 50px rgba(0,0,0,0.35)"
        : "0 12px 40px rgba(0,0,0,0.1)"};
    border-color: ${({ $featured }) =>
      $featured ? "rgba(255,59,59,0.2)" : "rgba(0,0,0,0.14)"};
  }
`;

export const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  gap: 0.5rem;
`;

export const YearBadge = styled.span<{ $featured?: boolean }>`
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ $featured }) => ($featured ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)")};
  letter-spacing: 0.1em;
`;

export const CompanyBadge = styled.span<{ $featured?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.18rem 0.55rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: 9999px;
  background: ${({ $featured }) =>
    $featured ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"};
  color: ${({ $featured }) =>
    $featured ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.38)"};
  border: 1px solid ${({ $featured }) =>
    $featured ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)"};
`;

export const FeaturedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.6rem;
  background: rgba(255, 59, 59, 0.15);
  border: 1px solid rgba(255, 59, 59, 0.3);
  border-radius: 9999px;
  font-size: 0.68rem;
  font-weight: 600;
  color: #FF3B3B;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const ProjectTitle = styled.h3<{ $featured?: boolean; $small?: boolean }>`
  font-size: ${({ $featured, $small }) =>
    $featured ? "1.4rem" : $small ? "1rem" : "1.15rem"};
  font-weight: 800;
  color: ${({ $featured }) => ($featured ? "#fff" : "#000")};
  letter-spacing: -0.02em;
  margin-bottom: 0.65rem;
`;

export const ProjectDesc = styled.p<{ $featured?: boolean; $small?: boolean }>`
  font-size: ${({ $small }) => ($small ? "0.82rem" : "0.9rem")};
  color: ${({ $featured }) => ($featured ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)")};
  line-height: 1.65;
  margin-bottom: 1.25rem;
  flex: 1;
`;

export const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1.5rem;
`;

export const Tag = styled.span<{ $featured?: boolean; $small?: boolean }>`
  padding: ${({ $small }) => ($small ? "0.2rem 0.5rem" : "0.25rem 0.65rem")};
  font-size: ${({ $small }) => ($small ? "0.68rem" : "0.72rem")};
  font-weight: 500;
  color: ${({ $featured }) => ($featured ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)")};
  background: ${({ $featured }) => ($featured ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)")};
  border: 1px solid ${({ $featured }) =>
    $featured ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"};
  border-radius: 9999px;
`;

export const CardLinks = styled.div`
  display: flex;
  gap: 0.65rem;
  margin-top: auto;
`;

export const CardLink = styled.a<{ $featured?: boolean; $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;

  ${({ $primary, $featured }) =>
    $primary
      ? `
    background: #FF3B3B;
    color: #fff;
    border: 1px solid #FF3B3B;
    &:hover { background: #e02e2e; box-shadow: 0 4px 16px rgba(255,59,59,0.35); transform: translateY(-1px); }
  `
      : `
    background: transparent;
    color: ${$featured ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)"};
    border: 1px solid ${$featured ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"};
    &:hover { color: ${$featured ? "#fff" : "#000"}; border-color: ${$featured ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)"}; transform: translateY(-1px); }
  `}
`;
