import styled from "styled-components";
import { PALETTE } from "@/constants/styles/palette";

export const Button = styled.button<{ isLiked: boolean }>`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  background-color: ${PALETTE.WHITE};
  transition: background-color 0.1s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${PALETTE.GRAY_500};
    }
  }

  & > span {
    padding-left: 0.5rem;
    font-weight: 700;
  }

  & > svg {
    width: 1rem;
    height: 1rem;
  }

  & > svg > path {
    fill: ${({ isLiked, theme: { isDarkModePage } }) =>
      isLiked && isDarkModePage ? PALETTE.BLUE_500 : PALETTE.BLUE_700};
  }
`;
