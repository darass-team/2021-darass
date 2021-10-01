import styled from "styled-components";
import { PALETTE } from "@/constants/styles/palette";

export const Button = styled.button`
  width: fit-content;
  background-color: ${PALETTE.GRAY_200};
  border: 1px solid ${PALETTE.GRAY_500};
  color: ${PALETTE.RED_800};
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-weight: 700;
  border-radius: 10px;
  padding: 0.3rem 1.4rem;
  transition: all 0.3s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${PALETTE.WHITE};
      background-color: ${PALETTE.RED_800};
    }
  }
`;
