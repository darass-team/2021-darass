import { FormEvent } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useCreateProject, useGetAllProjects, useInput } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import { AlertError } from "../../../utils/error";
import { isEmptyString } from "../../../utils/validation";
import { Container, Form, Input, Label, SubmitButton, Title, InputWrapper } from "./styles";

const NewProject = () => {
  const history = useHistory();
  const { createProject } = useCreateProject();

  const { value: projectName, onChange: onChangeProjectName } = useInput("");
  const { value: projectDescription, onChange: onChangeProjectDescription } = useInput("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isEmptyString(projectName)) throw new AlertError("프로젝트 이름을 입력해주세요.");

      const project = await createProject({
        name: projectName.trim(),
        description: projectDescription.trim()
      });

      history.push(ROUTE.GET_SCRIPT_PUBLISHING(project.id));
    } catch (error) {
      if (error instanceof AlertError) {
        window.alert(error.message);
      }
    }
  };

  return (
    <ScreenContainer>
      <Container>
        <Title>새 프로젝트 만들기</Title>
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <Label htmlFor="project-name">프로젝트 이름</Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={onChangeProjectName}
              placeholder="프로젝트 이름을 입력해주세요."
              autoFocus
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="project-desciption">프로젝트 설명</Label>
            <Input
              id="project-desciption"
              value={projectDescription}
              onChange={onChangeProjectDescription}
              placeholder="프로젝트 설명을 입력해주세요."
            />
          </InputWrapper>
          <SubmitButton>등록</SubmitButton>
        </Form>
      </Container>
    </ScreenContainer>
  );
};

export default NewProject;
