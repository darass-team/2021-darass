import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "../../../../styles/constants";
import { PALETTE } from "../../../../styles/palette";

export const Button = styled.button`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.img<{ isSelected: boolean }>`
  position: relative;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: contain;
  border: 1px solid ${PALETTE.BLACK_700};
  opacity: ${props => props.isSelected && "0.6"};
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.6;
  }
`;

export const Name = styled.span`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
`;
