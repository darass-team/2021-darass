import { PALETTE } from "./../../../styles/palette";
import styled from "styled-components";
import ProjectButton from "../../atoms/Buttons/ProjectButton";

const Container = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 2.8rem;
  align-self: flex-start;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > button {
    margin-bottom: 2rem;
  }
`;

const AddProjectButton = styled(ProjectButton)`
  background-color: ${PALETTE.SECONDARY};
  color: ${PALETTE.WHITE};
  border: none;
`;

export { Container, ButtonWrapper, AddProjectButton, Title };
