import { ChangeEvent, FormEvent } from "react";
import { useCreateProject, useInput } from "../../../hooks";
import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import { Container, Form, Input, Label, SubmitButton, Title } from "./styles";
import { useHistory } from "react-router-dom";
import { isEmptyString } from "../../../utils/validation";
import { ROUTE } from "../../../constants";
import { Project } from "../../../types/project";

export interface Props {
  projects: Project[] | undefined;
}

const NewProject = ({ projects }: Props) => {
  const history = useHistory();
  const { createProject } = useCreateProject();
  const { value: projectName, onChange: onChangeProjectName } = useInput("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const isValidProjectName = isEmptyString(projectName).length > 0;
      if (!isValidProjectName) throw new Error("프로젝트 이름을 입력해주세요.");

      const project = await createProject(projectName);

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
