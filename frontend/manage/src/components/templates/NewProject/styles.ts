import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";
import SubmitButtonComponent from "../../atoms/SubmitButton";

const Container = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 4.8rem;
  align-self: flex-start;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  align-self: flex-start;
  margin-bottom: 0.8rem;
`;

const Input = styled.input`
  width: 28rem;
  height: 4rem;
  border: 1px solid ${PALETTE.BLACK_700};
  border-radius: 20px;
  background-color: ${PALETTE.WHITE};
  font-size: 1.6rem;
  font-weight: 800;
  padding: 0.7rem 1.6rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${PALETTE.BLACK_700};
  }
`;

const SubmitButton = styled(SubmitButtonComponent)`
  margin-top: 4.8rem;
  align-self: flex-end;
`;

export { Container, Title, Form, Label, Input, SubmitButton };
