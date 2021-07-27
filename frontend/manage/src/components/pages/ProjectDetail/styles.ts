import { PALETTE } from "./../../../styles/palette";
import styled from "styled-components";
import { inputCSS, labelCSS, subTitleCSS, titleCSS } from "../../../styles/css";
import DeleteButtonComponent from "../../atoms/Buttons/DeleteButton";
import SubmitButtonComponent from "../../atoms/Buttons/SubmitButton";

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

export const DeleteSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;

  & > h3 {
    ${subTitleCSS};
    margin-top: 5rem;
  }
`;

export const DeleteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DeleteAlertMessage = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

export const DeleteButton = styled(DeleteButtonComponent)`
  font-size: 1rem;
  font-weight: 700;
`;
