import styled from "styled-components";
import { pageMaxWidth } from "../../../styles/constants";
import { PALETTE } from "../../../styles/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: ${pageMaxWidth};
  margin: 0 auto;
`;

const Introduction = styled.h2`
  font-size: 3rem;
  color: ${PALETTE.WHITE};
  font-weight: 800;
  text-align: center;
  margin-top: 2rem;
  z-index: 1;
`;

const Button = styled.button`
  width: fit-content;
  padding: 1rem 2rem;
  height: 75px;
  background: ${PALETTE.TERTIARY};
  border: none;
  border-radius: 40px;
  font-weight: 800;
  font-size: 2.5rem;
  color: ${PALETTE.BLACK_700};
  margin-top: 8.8rem;
`;

export { Container, Introduction, Button };
