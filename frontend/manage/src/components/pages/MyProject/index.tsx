import { Redirect, useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useGetAllProjects } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import ProjectButton from "../../atoms/Buttons/ProjectButton";
import ErrorNotice from "../../organisms/ErrorNotice";
import { AddProjectButton, ButtonWrapper, Container, Message } from "./styles";

const MyProject = () => {
  const history = useHistory();
  const { projects, error } = useGetAllProjects();

  const moveProjectDetailPage = (id: number) => {
    history.push(ROUTE.GET_SCRIPT_PUBLISHING(id));
  };

  const moveNewProjectPage = () => {
    history.push(ROUTE.NEW_PROJECT);
  };

  if (error) {
    return <ErrorNotice>{"프로젝트를 불러오는데 실패하였습니다.\n잠시 후 다시 시도해주세요"}</ErrorNotice>;
  }

  return (
    <ScreenContainer>
      <Container>
        <AddProjectButton onClick={moveNewProjectPage}>Add new</AddProjectButton>
        <ButtonWrapper>
          {projects?.map(({ id, name }) => (
            <ProjectButton key={id} title={name} onClick={() => moveProjectDetailPage(id)} />
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
