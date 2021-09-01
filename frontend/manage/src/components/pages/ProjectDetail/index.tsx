import { FormEvent, useEffect } from "react";
import { Redirect, useHistory, useRouteMatch } from "react-router-dom";
import { PROJECT_MENU, ROUTE } from "../../../constants";
import { useEditProject, useGetProject, useInput, useDeleteProject } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import { isEmptyString } from "../../../utils/validation";
import ContainerWithSideBar from "../../organisms/ContainerWithSideBar";
import DeleteSection from "../../molecules/DeleteSection";
import { Container, Form, InfoWrapper, Input, Label, SubmitButton, Title } from "./styles";
import { AlertError } from "../../../utils/error";
import { MAX_PROJECT_NAME_LENGTH } from "../../../constants/validation";

const ProjectDetail = () => {
  const match = useRouteMatch<{ id?: string }>();
  const projectId = Number(match.params.id);

  const history = useHistory();
  const { project, error } = useGetProject(projectId);
  const { editProject } = useEditProject();
  const { deleteProject } = useDeleteProject();
  const { value: projectName, setValue: setProjectName, onChange: onChangeProjectName } = useInput("");
  const { value: projectDesc, setValue: setProjectDesc, onChange: onChangeProjectDesc } = useInput("");

  const onEditProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!project) return;

    if (isEmptyString(projectName)) {
      alert("프로젝트 이름을 입력해주세요.");

      return;
    }

    if (projectName.length > MAX_PROJECT_NAME_LENGTH) {
      alert(`프로젝트 이름은 ${MAX_PROJECT_NAME_LENGTH}자를 넘을 수 없습니다.`);

      return;
    }

    try {
      await editProject({
        id: project.id,
        name: projectName,
        description: projectDesc
      });

      history.push(ROUTE.MY_PROJECT);
    } catch (error) {
      if (error instanceof AlertError) {
        alert(error.message);
      }
    }
  };

  const confirmDeleteProject = async () => {
    if (!project) return;
    if (!confirm(`${project.name} 프로젝트를 삭제하시겠습니까?`)) return;

    try {
      await deleteProject(project.id);

      history.replace(ROUTE.MY_PROJECT);
    } catch (error) {
      if (error instanceof AlertError) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    if (project) {
      setProjectName(project.name);
      setProjectDesc(project.description);
    }
  }, [project]);

  if (error) {
    return <Redirect to={ROUTE.MY_PROJECT} />;
  }

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.get(projectId)}>
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
            <SubmitButton>수정</SubmitButton>
          </Form>

          <DeleteSection
            onDelete={confirmDeleteProject}
            title="프로젝트 제거"
            message="프로젝트를 삭제하게 되면 이전 정보를 복구할 수 없습니다."
            buttonText="프로젝트 삭제"
          />
        </Container>
      </ContainerWithSideBar>
    </ScreenContainer>
  );
};

export default ProjectDetail;
