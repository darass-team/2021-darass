import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div`
  width: 100%;
  background-color: ${PALETTE.GRAY_200};
  border-radius: 10px;
  padding: 0.8rem 1rem 1.2rem 1rem;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 0.7rem;
`;

export const Text = styled.div`
  outline-color: ${PALETTE.BLACK_700};
  background-color: ${props => (props.contentEditable ? PALETTE.WHITE : PALETTE.GRAY_200)};
  border-radius: 10px;
  min-width: 10rem;
  max-width: 20rem;
  word-break: break-word;
  white-space: break-spaces;
`;

export const Button = styled.button`
  width: 4rem;
  height: 2.4rem;
  background-color: ${PALETTE.SECONDARY};
  color: ${PALETTE.WHITE};
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 10px;
  margin-top: 1rem;
  margin-left: auto;

  &:disabled {
    background-color: ${PALETTE.SECONDARY};
  }
`;
