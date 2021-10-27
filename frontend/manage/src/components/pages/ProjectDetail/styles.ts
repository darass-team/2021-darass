import styled from "styled-components";
import { contentBoxCSS, inputCSS, labelCSS, titleCSS } from "../../../constants/styles/css";
import SubmitButtonComponent from "@/components/atoms/Buttons/SubmitButton";

export const Container = styled.div`
  ${contentBoxCSS}
`;

export const Title = styled.h2`
  ${titleCSS};
`;

export const Form = styled.form<{
  isDataLoaded: boolean;
}>`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 2rem;
  padding-bottom: 5rem;

  opacity: ${({ isDataLoaded }) => (isDataLoaded ? 1 : 0)};
  transition: all 0.1s;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
  width: 100%;
`;

export const Label = styled.label`
  ${labelCSS};
`;

export const Input = styled.input`
  ${inputCSS};
`;

export const InputLengthCounter = styled.span`
  align-self: flex-end;
`;

export const SubmitButton = styled(SubmitButtonComponent)`
  align-items: flex-end;
  margin-top: 4rem;
`;
