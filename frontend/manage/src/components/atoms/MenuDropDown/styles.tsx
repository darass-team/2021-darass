import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MainTitle = styled.button<{ isDropDown: Boolean; depth: number }>`
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${props => 1.2 - 1.2 * 0.1 * props.depth}rem;
  font-weight: 700;
  padding: 0.3rem 0 0.3rem ${props => 1 + 1 * 0.5 * props.depth}rem;

  transition: background-color 0.1s;

  &:hover {
    background-color: ${PALETTE.WHITE_HOVER};
  }

  & > img {
    transform: ${props => props.isDropDown && "rotate(180deg);"};
  }
`;
