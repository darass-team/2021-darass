import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Introduction = styled.h2`
  font-size: 3rem;
  color: ${PALETTE.WHITE};
  font-weight: 800;
  text-align: center;
`;

export const Button = styled.button`
  width: 18rem;
  height: 6rem;
  background: ${PALETTE.TERTIARY};
  border: none;
  border-radius: 4rem;
  font-weight: 800;
  font-size: 2.5rem;
  color: ${PALETTE.BLACK_700};
  margin-top: 8.8rem;
`;
