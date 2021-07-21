import { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useCreateProject, useInput } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import { Project } from "../../../types/project";
import { isEmptyString } from "../../../utils/validation";
import { Container, Form, Input, Label, SubmitButton, Title, BackIcon } from "./styles";

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
        <BackIcon
          onClick={() => {
            if (!confirm("정말로 이 페이지를 벗어나시겠습니까?\n작성중이던 내용은 유지되지 않습니다.")) return;

            history.replace(ROUTE.MY_PROJECT);
          }}
        />
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
