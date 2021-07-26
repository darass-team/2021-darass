import { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useCreateProject, useGetAllProjects, useInput } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import { isEmptyString } from "../../../utils/validation";
import { Container, Form, Input, Label, SubmitButton, Title } from "./styles";

const NewProject = () => {
  const history = useHistory();
  const { createProject } = useCreateProject();
  const { projects } = useGetAllProjects();
  const { value: projectName, onChange: onChangeProjectName } = useInput("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const isDuplicatedProjectName = projects?.some(project => project.name === projectName.trim());

      if (isEmptyString(projectName)) throw new Error("프로젝트 이름을 입력해주세요.");
      if (isDuplicatedProjectName) throw new Error("중복된 프로젝트 이름입니다. 다시 입력해주세요.");

      const project = await createProject(projectName.trim());

      history.push(ROUTE.GET_SCRIPT_PUBLISHING(project.id));
    } catch (error) {
      alert(error.message);
      console.error(error.message);
    }
  };

  return (
    <ScreenContainer>
      <Container>
        <Title>새 프로젝트 만들기</Title>
        <Form onSubmit={onSubmit}>
          <Label htmlFor="project-name">프로젝트 이름</Label>
          <Input id="project-name" value={projectName} onChange={onChangeProjectName} autoFocus />
          <SubmitButton>등록</SubmitButton>
        </Form>
      </Container>
    </ScreenContainer>
  );
};

export default NewProject;
