import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.2rem 1.5rem;
  width: 30rem;
  border-radius: 20px;
  background-color: ${PALETTE.WHITE};
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  transition: background-color 0.3s;
  word-break: break-all;
  text-align: left;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${PALETTE.WHITE_HOVER};
    }
  }
`;

export const Title = styled.span`
  font-size: 1.6rem;
  line-height: ${1.6 * LINE_HEIGHT_SCALE}rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const Description = styled.span`
  font-size: 1.2rem;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
`;
