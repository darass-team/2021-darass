import styled from "styled-components";
import { PALETTE } from "../../../../styles/palette";

const Button = styled.button`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img<{ isSelected: boolean }>`
  position: relative;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: contain;
  border: 1px solid ${PALETTE.BLACK_700};
  opacity: ${props => props.isSelected && "0.6"};
  &:hover {
    opacity: 0.6;
  }
`;

const Name = styled.span`
  margin-top: 1.5rem;
  font-size: 1.2rem;
`;

export { Logo, Button, Name };
