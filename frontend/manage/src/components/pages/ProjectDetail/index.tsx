import { FormEvent } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useEditProject, useGetProject, useInput } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import { isEmptyString } from "../../../utils/validation";
import ProjectSideBar from "../../organisms/ProjectSideBar";
import SideBarTemplate from "../SideBarTemplate";
import { Container, InfoWrapper, Form, Title, Label, Input, SubmitButton } from "./styles";

const ProjectDetail = () => {
  const match = useRouteMatch<{ id?: string }>();
  const projectId = Number(match.params.id);

  const { project, error } = useGetProject(projectId);
  const { editProject } = useEditProject();
  const { value: projectName, setValue: setProjectName, onChange: onChangeProjectName } = useInput(project?.name ?? "");
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
        </Container>
      </SideBarTemplate>
    </ScreenContainer>
  );
};

export default ProjectDetail;
