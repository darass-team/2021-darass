import { inputCSS, labelCSS } from "@/constants/styles/css";
import styled from "styled-components";
import { titleCSS } from "@/constants/styles/css";
import { PALETTE } from "@/constants/styles/palette";
import SubmitButtonComponent from "@/components/atoms/Buttons/SubmitButton";

export const Container = styled.div`
  width: 100%;
  max-width: 45rem;
  padding: 6rem 5.5rem;
  background-color: ${PALETTE.WHITE};
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
`;

export const Title = styled.h2`
  ${titleCSS};
  margin-bottom: 4rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 100%;
`;

export const Label = styled.label`
  ${labelCSS};
`;

export const Input = styled.input`
  margin-top: 1rem;
  ${inputCSS};
`;

export const SubmitButton = styled(SubmitButtonComponent)`
  margin-top: 4.8rem;
  align-self: flex-end;
`;

export const ProjectInputCounter = styled.span`
  align-self: flex-end;
`;
