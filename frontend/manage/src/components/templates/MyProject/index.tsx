import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import { Project } from "../../../types/project";
import ProjectButton from "../../atoms/Buttons/ProjectButton";
import { AddProjectButton, ButtonWrapper, Container, Title } from "./styles";

export interface Props {
  projects: Project[] | undefined;
  moveNewProjectPage: () => void;
  moveProjectDetailPage: (id: number) => void;
}

const MyProject = ({ projects, moveNewProjectPage, moveProjectDetailPage }: Props) => {
  return (
    <ScreenContainer>
      <Container>
        <Title>내 프로젝트</Title>
        <ButtonWrapper>
          <AddProjectButton onClick={moveNewProjectPage}>새로운 프로젝트 만들기</AddProjectButton>
          {projects?.map(({ id, name }) => (
            <ProjectButton key={id} onClick={() => moveProjectDetailPage(id)}>
              {name}
            </ProjectButton>
          ))}
        </ButtonWrapper>
      </Container>
    </ScreenContainer>
  );
};

export default MyProject;
