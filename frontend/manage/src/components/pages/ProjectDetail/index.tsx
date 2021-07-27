import { FormEvent, useEffect } from "react";
import { Redirect, useHistory, useRouteMatch } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useEditProject, useGetProject, useInput } from "../../../hooks";
import { useDeleteProject } from "../../../hooks/useDeleteProject";
import ScreenContainer from "../../../styles/ScreenContainer";
import { isEmptyString } from "../../../utils/validation";
import ProjectSideBar from "../../organisms/ProjectSideBar";
import SideBarTemplate from "../SideBarTemplate";
import {
  Container,
  InfoWrapper,
  Form,
  Title,
  Label,
  Input,
  SubmitButton,
  DeleteAlertMessage,
  DeleteSection,
  DeleteButton,
  DeleteWrapper
} from "./styles";

const ProjectDetail = () => {
  const match = useRouteMatch<{ id?: string }>();
  const projectId = Number(match.params.id);

  const history = useHistory();
  const { project, error } = useGetProject(projectId);
  const { editProject } = useEditProject();
  const { deleteProject } = useDeleteProject();
  const { value: projectName, setValue: setProjectName, onChange: onChangeProjectName } = useInput("");
  const { value: projectDesc, setValue: setProjectDesc, onChange: onChangeProjectDesc } = useInput("");

  if (!projectId || error) {
    return <Redirect to={ROUTE.MY_PROJECT} />;
  }

  const onEditProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEmptyString(projectName)) {
      alert("프로젝트 이름을 입력해주세요.");

      return;
    }

    // editProject;
  };

  const confirmDeleteProject = async () => {
    if (!project) return;
    if (!confirm(`${project.name} 프로젝트를 삭제하시겠습니까?`)) return;

    try {
      await deleteProject(project.id);

      history.replace(ROUTE.MY_PROJECT);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (project) {
      setProjectName(project.name);
    }
  }, [project]);

  return (
    <ScreenContainer>
      <SideBarTemplate SideBar={() => <ProjectSideBar projectId={projectId} />}>
        <Container>
          <Title>프로젝트 정보</Title>
          <Form onSubmit={onEditProject}>
            <InfoWrapper>
              <Label htmlFor="project-name">이름</Label>

              <Input id="project-name" placeholder="프로젝트 이름" value={projectName} onChange={onChangeProjectName} />
            </InfoWrapper>
            <InfoWrapper>
              <Label htmlFor="project-description">설명</Label>
              <Input
                id="project-description"
                placeholder="프로젝트 설명"
                value={projectDesc}
                onChange={onChangeProjectDesc}
              />
            </InfoWrapper>
            <SubmitButton
              onClick={() => {
                setProjectName(project?.name || "");
                setProjectDesc("project.description");
              }}
            >
              수정
            </SubmitButton>
          </Form>
          <DeleteSection>
            <h3>프로젝트 삭제</h3>
            <DeleteWrapper>
              <DeleteAlertMessage>프로젝트를 삭제하면 복구할 수 없습니다.</DeleteAlertMessage>
              <DeleteButton onClick={confirmDeleteProject}>프로젝트 삭제하기</DeleteButton>
            </DeleteWrapper>
          </DeleteSection>
        </Container>
      </SideBarTemplate>
    </ScreenContainer>
  );
};

export default ProjectDetail;
