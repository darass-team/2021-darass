import { PALETTE } from "./../../../styles/palette";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  position: relative;
`;

const AddProjectButton = styled.button`
  background-color: ${PALETTE.SECONDARY};
  color: ${PALETTE.WHITE};
  border-radius: 10px;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  padding: 0.3rem 0.8rem;
  align-self: flex-end;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${PALETTE.SECONDARY_HOVER};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > button {
    margin-bottom: 2rem;
  }
`;

export { Container, ButtonWrapper, AddProjectButton };
