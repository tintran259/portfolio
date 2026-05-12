import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const CanvasWrapper = styled.div`
  width: 300px;
  height: 300px;

  @media (min-width: 640px) {
    width: 360px;
    height: 360px;
    
  }

  @media (min-width: 1024px) {
    width: 400px;
    height: 400px;
  }

  
`;

export const DragHint = styled.p`
  margin: 0;
  font-size: 0.66rem;
  color: rgba(0, 0, 0, 0.3);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  user-select: none;
  animation: ${fadeIn} 0.7s ease 1.8s both;
`;
