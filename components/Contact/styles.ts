import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

export const Section = styled.section`
  position: relative;
  z-index: 2;
  padding: 7rem 2rem 5rem;
  background: #FAFAFA;

  @media (min-width: 768px) {
    padding: 8rem 4rem 6rem;
  }
`;

export const Container = styled.div`
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
`;

export const Label = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #FF3B3B;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
`;

export const Title = styled.h2`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  color: #000;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin-bottom: 1.25rem;
`;

export const RedSpan = styled.span`
  color: #FF3B3B;
`;

export const SubText = styled.p`
  font-size: 1.05rem;
  color: rgba(0, 0, 0, 0.45);
  line-height: 1.75;
  max-width: 480px;
  margin: 0 auto 3rem;
`;

export const EmailButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background: #000;
  border-radius: 9999px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  margin-bottom: 3.5rem;

  &:hover {
    background: #FF3B3B;
    box-shadow: 0 8px 32px rgba(255, 59, 59, 0.35);
    transform: translateY(-2px);
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin-bottom: 3rem;
`;

export const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 4rem;
`;

export const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.55);
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #000;
    border-color: rgba(0, 0, 0, 0.25);
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }
`;

export const Footer = styled.footer`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(0,0,0,0.06);
`;

export const FooterText = styled.p`
  font-size: 0.8rem;
  color: rgba(0,0,0,0.3);

  span {
    color: #FF3B3B;
  }
`;
