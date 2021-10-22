import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";

export const Label = styled.label`
  line-height: 0;
  display: flex;
  align-items: center;
  color: ${({ theme: { isDarkModePage } }) => (isDarkModePage ? PALETTE.GRAY_500 : PALETTE.BLACK_700)};
`;

export const Input = styled.input<{ hasLabelText: boolean }>`
  appearance: none;
  height: 1.5rem;
  width: 1.5rem;
  background: ${PALETTE.GRAY_500};
  border: none;
  color: ${PALETTE.WHITE};
  cursor: pointer;
  outline: none;
  margin-right: ${({ hasLabelText }) => (hasLabelText ? 0.5 : 0)}rem;
  border-radius: 0.5rem;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${PALETTE.GRAY_500};
    }
  }

  &:checked {
    background-color: ${({ theme }) => theme.primaryColor};
  }

  &:checked::before {
    display: flex;
    justify-content: center;
    font-size: 1.1rem;
    color: ${PALETTE.WHITE};
    content: "✔";
    text-align: center;
  }
`;
