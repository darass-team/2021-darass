import ScreenContainer from "@/components/@style/ScreenContainer";
import DeleteSection from "@/components/molecules/DeleteSection";
import ContainerWithSideBar from "@/components/organisms/ContainerWithSideBar";
import { PROJECT_MENU, ROUTE } from "@/constants";
import { MAX_PROJECT_DESCRIPTION_LENGTH, MAX_PROJECT_NAME_LENGTH } from "@/constants/validation";
import { useDeleteProject, useDocumentTitle, useEditProject, useGetProject, useInput } from "@/hooks";
import { AlertError } from "@/utils/alertError";
import { isEmptyString } from "@/utils/validation";
import { FormEvent, useEffect } from "react";
import { Redirect, useHistory, useRouteMatch } from "react-router-dom";
import { Container, Form, InfoWrapper, Input, InputLengthCounter, Label, SubmitButton, Title } from "./styles";

const ProjectDetail = () => {
  const match = useRouteMatch<{ id: string }>();
  const projectId = Number(match.params.id);
  const history = useHistory();
  const { project } = useGetProject({
    id: projectId
  });
  const { editProject } = useEditProject();
  const { deleteProject } = useDeleteProject();
  const { value: projectName, setValue: setProjectName, onChange: onChangeProjectName } = useInput("");
  const { value: projectDesc, setValue: setProjectDesc, onChange: onChangeProjectDesc } = useInput("");
  useDocumentTitle("프로젝트 상세");

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

    if (projectDesc.length > MAX_PROJECT_DESCRIPTION_LENGTH) {
      alert(`프로젝트 설명은 ${MAX_PROJECT_DESCRIPTION_LENGTH}자를 넘을 수 없습니다.`);

      return;
    }

    try {
      await editProject({
        id: project.id,
        name: projectName,
        description: projectDesc
      });

      alert("프로젝트 수정에 성공하셨습니다.");
      history.push(ROUTE.AUTHORIZED.MY_PROJECT);
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

      alert(`${project.name} 프로젝트가 삭제되었습니다.`);
      history.replace(ROUTE.AUTHORIZED.MY_PROJECT);
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

  if (Number.isNaN(projectId)) {
    return <Redirect to={ROUTE.COMMON.HOME} />;
  }

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.getByProjectId(projectId)}>
        <Container>
          <Title>프로젝트 정보</Title>

          <Form onSubmit={onEditProject} isDataLoaded={!!project}>
            <InfoWrapper>
              <Label htmlFor="project-name">이름</Label>

              <Input
                id="project-name"
                placeholder="프로젝트 이름"
                value={projectName}
                onChange={onChangeProjectName}
                maxLength={MAX_PROJECT_NAME_LENGTH}
              />

              <InputLengthCounter>
                {projectName.length} / {MAX_PROJECT_NAME_LENGTH}
              </InputLengthCounter>
            </InfoWrapper>
            <InfoWrapper>
              <Label htmlFor="project-description">설명</Label>
              <Input
                id="project-description"
                placeholder="프로젝트 설명"
                value={projectDesc}
                onChange={onChangeProjectDesc}
                maxLength={MAX_PROJECT_DESCRIPTION_LENGTH}
              />
              <InputLengthCounter>
                {projectDesc.length} / {MAX_PROJECT_DESCRIPTION_LENGTH}
              </InputLengthCounter>
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
