import { PALETTE } from "./../../../styles/palette";
import styled from "styled-components";
import { InputCSS } from "../../../styles/css";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea<{ isValidInput: Boolean }>`
  ${InputCSS};
  border: ${props => !props.isValidInput && `3px solid ${PALETTE.RED_600}`};
  padding: 1.6rem;
  height: 9rem;
  margin-bottom: 1.6rem;
  resize: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > button {
    margin-left: auto;
  }
`;

const GuestInfo = styled.input<{ isValidInput: Boolean }>`
  ${InputCSS};
  border: ${props => !props.isValidInput && `3px solid ${PALETTE.RED_600}`};
  padding: 1.1rem 1.6rem;
  width: 10rem;
  height: 3.6rem;
  line-height: 1.4rem;

  :first-child {
    margin-right: 1.6rem;
  }
`;

export { Form, TextArea, Wrapper, GuestInfo };
