import { PALETTE } from "./../../../../styles/palette";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.2rem 1.5rem;
  width: 30rem;
  border-radius: 20px;
  background-color: ${PALETTE.WHITE};
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${PALETTE.WHITE_HOVER};
  }
`;

const Title = styled.span`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 8px;
`;

const Description = styled.span`
  font-size: 1.2rem;
`;

export { Button, Title, Description };
