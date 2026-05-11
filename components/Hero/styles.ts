import styled, { keyframes } from "styled-components";

const scrollBounce = keyframes`
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(8px); opacity: 0.4; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

export const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  padding-top: 64px;
  background: transparent;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 64px 4rem 0;
  }
`;

export const Container = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    padding: 6rem 0 5rem;
    gap: 5rem;
  }
`;

export const LeftCol = styled.div`
  width: 100%;
  min-width: 0;

  @media (min-width: 1024px) {
    flex: 1;
    width: auto;
  }
`;

export const RightCol = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  /* cube above text on mobile */
  order: -1;

  /* scale down on small screens so it fits comfortably */
  @media (max-width: 480px) {
    transform: scale(0.72);
    margin: -2.2rem 0;
  }

  @media (min-width: 481px) and (max-width: 1023px) {
    transform: scale(0.85);
    margin: -1rem 0;
  }

  @media (min-width: 1024px) {
    order: 0;
    transform: none;
    margin: 0;
  }
`;

export const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  background: rgba(255, 59, 59, 0.07);
  border: 1px solid rgba(255, 59, 59, 0.18);
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 500;
  color: #FF3B3B;
  letter-spacing: 0.04em;
  margin-bottom: 2rem;
`;

export const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #FF3B3B;
  display: inline-block;
  animation: ${blink} 2s ease-in-out infinite;
`;

export const Headline = styled.h1`
  font-size: clamp(2.8rem, 7vw, 6rem);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.03em;
  color: #000;
  margin-bottom: 0.5rem;
`;

export const HeadlineRed = styled.span`
  color: #FF3B3B;
  position: relative;
  display: inline-block;
`;

export const SubHeadline = styled.h2`
  font-size: clamp(1.1rem, 2.5vw, 1.6rem);
  font-weight: 400;
  color: rgba(0,0,0,0.45);
  letter-spacing: -0.01em;
  margin-bottom: 1.75rem;
`;

export const Description = styled.p`
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  color: rgba(0, 0, 0, 0.5);
  line-height: 1.75;
  max-width: 520px;
  margin-bottom: 2.75rem;
`;

export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-bottom: 4rem;
`;

export const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  background: #000;
  border-radius: 9999px;
  text-decoration: none;
  cursor: pointer;
  border: 1.5px solid #000;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    background: #FF3B3B;
    border-color: #FF3B3B;
    box-shadow: 0 8px 28px rgba(255, 59, 59, 0.3);
    transform: translateY(-2px);
  }
`;

export const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #000;
  background: transparent;
  border-radius: 9999px;
  text-decoration: none;
  cursor: pointer;
  border: 1.5px solid rgba(0, 0, 0, 0.15);
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    border-color: #000;
    background: rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
  }
`;

export const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatValue = styled.span`
  font-size: 2rem;
  font-weight: 800;
  color: #000;
  letter-spacing: -0.03em;
  line-height: 1;

  span {
    color: #FF3B3B;
  }
`;

export const StatLabel = styled.span`
  font-size: 0.78rem;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 0.3rem;
`;

export const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  z-index: 2;
`;

export const ScrollText = styled.span`
  font-size: 0.7rem;
  color: rgba(0,0,0,0.3);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 500;
`;

export const ScrollIcon = styled.div`
  width: 1.5rem;
  height: 2.5rem;
  border: 1.5px solid rgba(0, 0, 0, 0.18);
  border-radius: 9999px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0.35rem;

  &::after {
    content: "";
    width: 3px;
    height: 7px;
    background: #000;
    border-radius: 9999px;
    animation: ${scrollBounce} 1.8s ease-in-out infinite;
  }
`;

export const BgAccent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100%;
  background: linear-gradient(135deg, transparent 40%, rgba(255, 59, 59, 0.025) 100%);
  pointer-events: none;
  z-index: 1;
`;
