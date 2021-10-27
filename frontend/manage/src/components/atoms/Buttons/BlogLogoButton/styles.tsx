import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";

export const Button = styled.button`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.img<{ isSelected: boolean; isImageLoaded: boolean }>`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: contain;
  border: 1px solid ${PALETTE.BLACK_700};
  ${props => props.isSelected && `box-shadow: 0px 0px 20px 2px ${PALETTE.SECONDARY};`};

  opacity: ${({ isImageLoaded }) => (isImageLoaded ? 1 : 0)};
  transition: all 0.3s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.6;
    }
  }
`;

export const Name = styled.span`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
`;
