import styled from "styled-components";
import { inputCSS, labelCSS, titleCSS } from "../../../styles/css";
import SubmitButtonComponent from "../../atoms/Buttons/SubmitButton";
import { PALETTE } from "./../../../styles/palette";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.h2`
  ${titleCSS};
`;

export const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 2rem;
  border-bottom: 1px solid ${PALETTE.BAR};
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

export const SubmitButton = styled(SubmitButtonComponent)`
  align-items: flex-end;
  margin-top: 4rem;
  margin-bottom: 5rem;
`;
