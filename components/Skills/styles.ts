import styled from "styled-components";

export const Section = styled.section`
  position: relative;
  z-index: 2;
  padding: 7rem 2rem;
  background: #FAFAFA;

  @media (min-width: 768px) {
    padding: 8rem 4rem;
  }
`;

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

export const Label = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #FF3B3B;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #000;
  letter-spacing: -0.03em;
`;

export const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
`;

export const CategoryRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.015);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem 1.25rem;
  }
`;

export const CategoryLabel = styled.div`
  min-width: 100px;
  padding-top: 0.3rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.28);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  flex-shrink: 0;

  @media (min-width: 768px) {
    min-width: 120px;
  }
`;

export const PillGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

export const Pill = styled.div<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.85rem;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 500;
  color: #111;
  cursor: default;
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    background: ${({ $color }) => $color}14;
    border-color: ${({ $color }) => $color}55;
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ $color }) => $color}18;
  }
`;

export const PillDot = styled.span<{ $color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;
