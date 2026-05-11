import styled, { keyframes } from "styled-components";

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  background: ${({ $scrolled }) =>
    $scrolled ? "rgba(255,255,255,0.88)" : "transparent"};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(20px)" : "none")};
  border-bottom: ${({ $scrolled }) =>
    $scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent"};

  @media (min-width: 768px) {
    padding: 0 4rem;
  }
`;

export const Logo = styled.a`
  font-size: 1.25rem;
  font-weight: 800;
  color: #000;
  text-decoration: none;
  letter-spacing: -0.03em;
  cursor: pointer;

  span {
    color: #FF3B3B;
  }
`;

export const Links = styled.div`
  display: none;
  align-items: center;
  gap: 0.25rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const NavLink = styled.a`
  padding: 0.4rem 0.85rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.55);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #000;
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: #000;
  border-radius: 9999px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #FF3B3B;
    box-shadow: 0 4px 20px rgba(255, 59, 59, 0.35);
    transform: translateY(-1px);
  }
`;

export const MobileMenuBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: none;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  cursor: pointer;
  color: #000;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(0,0,0,0.25);
    background: rgba(0,0,0,0.04);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileMenu = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  z-index: 99;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 1rem 2rem 1.5rem;
  animation: ${fadeInDown} 0.25s cubic-bezier(0.22, 1, 0.36, 1);

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileNavLink = styled.a`
  display: block;
  padding: 0.85rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.65);
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: color 0.2s ease;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    color: #000;
  }
`;

export const MobileCTA = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.25rem;
  padding: 0.85rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  background: #000;
  border-radius: 9999px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #FF3B3B;
    box-shadow: 0 4px 20px rgba(255, 59, 59, 0.35);
  }
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  width: ${({ $progress }) => $progress}%;
  background: #FF3B3B;
  z-index: 200;
  transition: width 0.1s linear;
`;
