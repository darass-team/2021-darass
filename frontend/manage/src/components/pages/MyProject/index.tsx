import ScreenContainer from "@/components/@style/ScreenContainer";
import ProjectButton from "@/components/atoms/Buttons/ProjectButton";
import { ROUTE } from "@/constants";
import { useDocumentTitle, useGetAllProjects } from "@/hooks";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  LoadableManage,
  LoadableNewProject,
  LoadableNotification,
  LoadableProjectDetail,
  LoadableScriptPublishing,
  LoadableStatistics
} from "../Loadable";
import { AddProjectButton, ButtonWrapper, Container, HeaderWrapper, Message, Title } from "./styles";

const MyProject = () => {
  const history = useHistory();
  const { projects } = useGetAllProjects();

  useDocumentTitle("내 프로젝트");

  const moveScriptPublishingPage = (id: number) => {
    history.push(`/projects/${id}/guide`);
  };

  const moveNewProjectPage = () => {
    history.push(ROUTE.AUTHORIZED.NEW_PROJECT);
  };

  useEffect(() => {
    LoadableNewProject.preload();
    LoadableScriptPublishing.preload();
    LoadableStatistics.preload();
    LoadableManage.preload();
    LoadableProjectDetail.preload();
    LoadableNotification.preload();
  }, []);

  return (
    <ScreenContainer>
      <Container>
        <HeaderWrapper>
          <Title>내 프로젝트</Title>
          <AddProjectButton onClick={moveNewProjectPage}>Add new</AddProjectButton>
        </HeaderWrapper>
        <ButtonWrapper>
          {projects?.map(({ id, name, description }) => (
            <ProjectButton
              key={id}
              title={name}
              description={description}
              onClick={() => moveScriptPublishingPage(id)}
            />
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
