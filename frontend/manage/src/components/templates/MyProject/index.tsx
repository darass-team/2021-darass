import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import ScreenContainer from "../../../styles/ScreenContainer";
import { Project } from "../../../types/project";
import ProjectButton from "../../atoms/Buttons/ProjectButton";
import { AddProjectButton, ButtonWrapper, Container } from "./styles";

export interface Props {
  projects: Project[] | undefined;
}

const MyProject = ({ projects }: Props) => {
  const history = useHistory();

  const moveProjectDetailPage = (id: number) => {
    history.push(ROUTE.GET_SCRIPT_PUBLISHING(id));
  };

  const moveNewProjectPage = () => {
    history.push(ROUTE.NEW_PROJECT);
  };

  return (
    <ScreenContainer>
      <Container>
        <AddProjectButton onClick={moveNewProjectPage}>Add new</AddProjectButton>
        <ButtonWrapper>
          {projects?.map(({ id, name }) => (
            <ProjectButton key={id} title={name} onClick={() => moveProjectDetailPage(id)} />
          ))}
        </ButtonWrapper>
      </Container>
    </ScreenContainer>
  );
};

export default MyProject;
