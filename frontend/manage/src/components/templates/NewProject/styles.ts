import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

import SubmitButtonComponent from "../../atoms/SubmitButton";

const Container = styled.div`
  width: 45rem;
  padding: 6rem 5.5rem;
  background-color: ${PALETTE.WHITE};
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 3rem;
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
  width: 100%;
  height: 3rem;
  border: 1px solid ${PALETTE.BLACK_700};
  border-radius: 10px;
  font-size: 1.2rem;
  padding: 0.7rem 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${PALETTE.BLACK_700};
  }
`;

const SubmitButton = styled(SubmitButtonComponent)`
  margin-top: 4.8rem;
  align-self: flex-end;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${PALETTE.SECONDARY_HOVER};
  }
`;

export { Container, Title, Form, Label, Input, SubmitButton };
