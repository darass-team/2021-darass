import styled from "styled-components";
import { inputCSS } from "../../../styles/css";
import { PALETTE } from "../../../styles/palette";
import SubmitButton from "../../atoms/Buttons/SubmitButton";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
  border: 1px solid ${PALETTE.GRAY_400};
  margin-bottom: 1rem;

  & > * {
    &:not(:first-child) {
      margin-top: 2rem;
    }
  }
`;

export const SearchTermInput = styled.input.attrs({ type: "text" })`
  ${inputCSS};
  padding: 0.3rem 1rem;
  border: 1px solid ${PALETTE.GRAY_400};
  margin-left: 1rem;
`;

export const SearchButton = styled(SubmitButton)`
  align-self: flex-end;
  width: fit-content;
  height: fit-content;
  font-size: 1.2rem;
`;

export const Meta = styled.span`
  min-width: 4.5rem;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const DateInputText = styled.span`
  border-radius: 10px;
  height: fit-content;
  border: 1px solid ${PALETTE.GRAY_400};
  padding: 0.5rem;
  user-select: none;
  cursor: pointer;
`;

export const DateRange = styled.span`
  margin-left: 1rem;
`;
