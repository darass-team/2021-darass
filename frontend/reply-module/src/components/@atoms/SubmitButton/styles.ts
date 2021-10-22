import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";

export const Button = styled.button`
  width: fit-content;
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${PALETTE.WHITE};
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-weight: 700;
  border-radius: 10px;
  padding: 0.3rem 1.4rem;
  transition: background-color 0.3s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      filter: brightness(90%);
    }
  }

  &:disabled {
    background-color: ${PALETTE.GRAY_400};
  }
`;
