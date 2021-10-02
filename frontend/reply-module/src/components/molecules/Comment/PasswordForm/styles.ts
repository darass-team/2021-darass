import { InputCSS } from "@/constants/styles/css";
import styled from "styled-components";
import CancelButtonComponent from "@/components/atoms/Buttons/CancelButton";
import SubmitButtonComponent from "@/components/atoms/Buttons/SubmitButton";
import { PALETTE } from "@/constants/styles/palette";

export const Container = styled.form<{ isSubComment: boolean }>`
  display: flex;
  align-items: center;
  margin-left: ${props => (props.isSubComment ? "calc(2.5rem + 0.6rem + 2.1rem)" : "3rem")};

  @media all and (max-width: 780px) {
    width: 17rem;
    flex-direction: column;
  }
`;

export const PasswordInput = styled.input<{ isValidInput: Boolean }>`
  ${InputCSS};
  border: ${props => !props.isValidInput && `3px solid ${PALETTE.RED_600}`};
  margin-top: 1rem;
  height: 2.4rem;
  padding: 0.6rem;
  font-size: 1rem;
  line-height: 1.5rem;

  @media all and (min-width: 780px) {
    width: 17rem;
    margin-right: 1.6rem;
  }
  @media all and (max-width: 780px) {
    width: 100%;
  }
`;

export const PasswordButtonWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 0.5rem;

  @media all and (max-width: 780px) {
    margin-left: auto;
  }
`;

export const SubmitButton = styled(SubmitButtonComponent)`
  width: 4rem;
  height: 2.4rem;
  padding: 0.2rem 0.3rem;
  background-color: ${PALETTE.SECONDARY};
  font-size: 1rem;
  line-height: 1.5rem;
`;

export const CancelButton = styled(CancelButtonComponent)`
  width: 4rem;
  height: 2.4rem;
  padding: 0.2rem 0.3rem;
  font-size: 1rem;
  line-height: 1.5rem;
`;
