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
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
  }
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
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #000;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 1.75rem;
`;

export const Body = styled.p`
  font-size: 1.05rem;
  color: rgba(0, 0, 0, 0.55);
  line-height: 1.8;
  margin-bottom: 1.25rem;
`;

export const Highlight = styled.span`
  color: #000;
  font-weight: 600;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2.5rem;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const InfoLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(0,0,0,0.35);
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const InfoValue = styled.span`
  font-size: 0.92rem;
  font-weight: 500;
  color: #000;
`;

export const RightPanel = styled.div`
  position: relative;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const Card = styled.div<{ $accent?: boolean }>`
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid ${({ $accent }) => ($accent ? "rgba(255,59,59,0.2)" : "rgba(0,0,0,0.07)")};
  background: ${({ $accent }) => ($accent ? "rgba(255,59,59,0.03)" : "#FAFAFA")};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${({ $accent }) => ($accent ? "rgba(255,59,59,0.4)" : "rgba(0,0,0,0.14)")};
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  }
`;

export const CardIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.6rem;
`;

export const CardTitle = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 0.3rem;
`;

export const CardText = styled.div`
  font-size: 0.78rem;
  color: rgba(0,0,0,0.45);
  line-height: 1.5;
`;

export const BigCard = styled.div`
  grid-column: span 2;
  padding: 1.75rem;
  border-radius: 16px;
  background: #000;
  color: #fff;
`;

export const BigCardTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

export const BigCardCompany = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.25rem;
`;

export const BigCardRole = styled.div`
  font-size: 0.85rem;
  color: #FF3B3B;
  font-weight: 500;
`;

export const ActiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.7rem;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #22c55e;
  float: right;

  &::before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #22c55e;
  }
`;
