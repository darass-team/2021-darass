import styled from "styled-components";
import { inputCSS } from "../../../styles/css";
import { PALETTE } from "../../../styles/palette";
import SubmitButton from "../../atoms/Buttons/SubmitButton";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid ${PALETTE.GRAY_400};
  margin-bottom: 1rem;

  & > * {
    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
`;

export const SearchTermInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > label {
    display: flex;
    align-items: center;
  }
`;

export const SearchTermInput = styled.input.attrs({ type: "text" })`
  ${inputCSS};
  max-width: 20rem;
  margin-left: 1rem;
`;

export const SearchButton = styled(SubmitButton)`
  align-self: flex-end;
`;

export const DateInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

export const DateInputText = styled.span`
  border-radius: 10px;
  border: 1px solid ${PALETTE.GRAY_400};
  padding: 0.5rem;
  user-select: none;
  cursor: pointer;
`;
