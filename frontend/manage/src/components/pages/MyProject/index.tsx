import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useGetAllProjects, useUser } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import ProjectButton from "../../atoms/Buttons/ProjectButton";
import { AddProjectButton, ButtonWrapper, Container, Message } from "./styles";

const MyProject = () => {
  const history = useHistory();
  const { logout } = useUser();
  const { projects, error, isLoading } = useGetAllProjects();

  const moveProjectDetailPage = (id: number) => {
    history.push(ROUTE.GET_SCRIPT_PUBLISHING(id));
  };

  const moveNewProjectPage = () => {
    history.push(ROUTE.NEW_PROJECT);
  };

  if (error && !isLoading) {
    logout();
  }

  return (
    <ScreenContainer>
      <Container>
        <AddProjectButton onClick={moveNewProjectPage}>Add new</AddProjectButton>
        <ButtonWrapper>
          {projects?.map(({ id, name, description }) => (
            <ProjectButton key={id} title={name} description={description} onClick={() => moveProjectDetailPage(id)} />
          ))}
          {projects?.length === 0 && (
            <Message data-testid="myproject-no-project-message">
              “Add new” 버튼을 눌러 프로젝트를 추가해주세요.
              <br />
              다라쓰 댓글 모듈을 설치 또는 관리할 수 있습니다.
            </Message>
          )}
        </ButtonWrapper>
      </Container>
    </ScreenContainer>
  );
};

export default MyProject;
