import styled from "styled-components";
import { pageMaxWidth } from "../../../styles/constants";
import { PALETTE } from "../../../styles/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: ${pageMaxWidth};
`;

const Introduction = styled.h2`
  font-size: 3rem;
  color: ${PALETTE.WHITE};
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 50px;
  background: ${PALETTE.TERTIARY};
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1.8rem;
  color: ${PALETTE.BLACK_700};
  margin-top: 8.8rem;

  & > img {
    margin-right: 6px;
  }

  & > span {
    line-height: 50px;
  }
`;

export { Container, Introduction, Button };
