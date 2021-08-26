import { PALETTE } from "./../../../styles/palette";
import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "../../../styles/constants";

export const Label = styled.label`
  font-size: 1.2rem;
  line-height: 0;
  display: flex;
  align-items: center;
`;

export const Input = styled.input<{ hasLabelText: boolean }>`
  appearance: none;
  height: 2rem;
  width: 2rem;
  background: ${PALETTE.GRAY_500};
  border: none;
  color: ${PALETTE.WHITE};
  cursor: pointer;
  outline: none;
  position: relative;
  margin-right: ${({ hasLabelText }) => (hasLabelText ? 1 : 0)}rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${PALETTE.GRAY_500};
  }

  &:checked {
    background-color: ${PALETTE.PRIMARY};
  }

  &:checked::before {
    height: 2rem;
    width: 2rem;
    font-size: 1.3rem;
    color: ${PALETTE.WHITE};
    position: absolute;

    content: "✔";
    text-align: center;
    line-height: ${1.3 * LINE_HEIGHT_SCALE}rem;
  }
`;
