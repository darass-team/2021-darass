import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Introduction = styled.h2`
    font-size: 3rem;
    color: ${PALETTE.WHITE};
    font-weight: 800;
    text-align: center;
`;

const Button = styled.button`
  width: 225px;
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
