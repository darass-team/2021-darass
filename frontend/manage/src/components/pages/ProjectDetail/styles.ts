import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";
import SubmitButton from "../../atoms/SubmitButton";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.section`
  margin-bottom: 6rem;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  align-self: flex-start;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

export const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  align-self: flex-start;
  margin-bottom: 0.8rem;
`;

export const Text = styled.p`
  font-size: 1.2rem;
`;

export const Input = styled.input`
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

export const TextArea = styled(Input.withComponent("textarea"))`
  padding: 1.6rem;
  height: 9rem;
  margin-bottom: 1.6rem;
  width: 100%;
  resize: none;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  right: 0;
  min-width: max-content;
  & > button {
    :nth-child(2n + 1) {
      margin-right: 2rem;
    }
  }
`;

export const CancelButton = styled(SubmitButton).attrs({ type: "button" })`
  background-color: ${PALETTE.RED_600};
`;

export const EditModeButton = styled(SubmitButton).attrs({ type: "button" })`
  background-color: ${PALETTE.GRAY_300};
  color: ${PALETTE.BLACK_700};
`;
