import styled, { keyframes } from "styled-components";

const pulseRed = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.12); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Glow = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 59, 59, 0.18) 0%, transparent 70%);
  animation: ${pulseRed} 3s ease-in-out infinite;
  pointer-events: none;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
`;

export const Name = styled.div`
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
  letter-spacing: -0.02em;
`;

export const RedAccent = styled.span`
  color: #FF3B3B;
`;

export const Role = styled.div`
  font-size: clamp(0.85rem, 2vw, 1.1rem);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.28em;
  text-transform: uppercase;
`;

export const Welcome = styled.div`
  margin-top: 1.5rem;
  font-size: clamp(0.7rem, 1.5vw, 0.85rem);
  font-weight: 500;
  color: #FF3B3B;
  letter-spacing: 0.45em;
  text-transform: uppercase;
`;

export const Line = styled.div`
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, transparent, rgba(255,59,59,0.6), transparent);
  margin-top: 0.5rem;
`;

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  border-radius: 1px;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: #FF3B3B;
  transition: width 0.05s linear;
  border-radius: 1px;
`;
