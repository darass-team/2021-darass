import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";
import DeleteButton from "../Buttons/DeleteButton";
import SubmitButtonComponent from "../Buttons/SubmitButton";

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
  padding: 0.2rem 0.3rem;
  min-width: 10rem;
  max-width: 20rem;
  border-radius: 0.3rem;
  word-break: break-word;
  white-space: break-spaces;
  font-size: 1.2rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;

  & > button {
    padding: 0;
    width: 4rem;
    height: 2.4rem;
    font-size: 1rem;
    border-radius: 10px;
    margin-top: 1rem;
  }
`;

export const CancelButton = styled(DeleteButton)`
  margin-right: 0.3rem;
`;

export const SubmitButton = styled(SubmitButtonComponent)``;
