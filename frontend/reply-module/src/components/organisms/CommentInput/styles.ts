import { PALETTE } from "./../../../styles/palette";
import styled from "styled-components";
import { InputCSS } from "../../../styles/css";

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TextBox = styled.div<{ isValidInput: Boolean }>`
  ${InputCSS};
  border: ${props => !props.isValidInput && `3px solid ${PALETTE.RED_600}`};
  padding: 1rem 0.8rem;
  min-height: 6rem;
  max-height: 12rem;
  margin-bottom: 1.6rem;
  overflow: auto;

  &:empty:before {
    content: "댓글을 입력해주세요.";
  }

  &:empty:focus:before {
    content: "";
  }

  &:focus {
    box-shadow: 0 0 0 1 ${props => (props.isValidInput ? PALETTE.BLACK_700 : PALETTE.RED_600)};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > button {
    margin-left: auto;
  }
`;

export const GuestInfo = styled.input<{ isValidInput: Boolean }>`
  ${InputCSS};
  border: ${props => !props.isValidInput && `3px solid ${PALETTE.RED_600}`};
  padding: 1rem 0.8rem;
  width: 8rem;

  :first-child {
    margin-right: 1.2rem;
  }

  &:focus {
    box-shadow: 0 0 0 1 ${props => (props.isValidInput ? PALETTE.BLACK_700 : PALETTE.RED_600)};
  }
`;
