import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

const Container = styled.div`
  width: 100%;
  background-color: ${PALETTE.GRAY_200};
  border-radius: 10px;
  padding: 0.8rem 1rem;
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 0.7rem;
`;

const Text = styled.div`
  outline-color: ${PALETTE.BLACK_700};
  background-color: ${props => (props.contentEditable ? PALETTE.WHITE : PALETTE.GRAY_200)};
  border-radius: 10px;
  min-width: 10rem;
  max-width: 20rem;
`;

export { Container, Name, Text };
