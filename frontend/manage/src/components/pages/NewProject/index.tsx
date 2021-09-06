import { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { ROUTE } from "@/constants";
import { MAX_PROJECT_DESCRIPTION_LENGTH, MAX_PROJECT_NAME_LENGTH } from "@/constants/validation";
import { useCreateProject, useInput } from "@/hooks";
import ScreenContainer from "@/styles/ScreenContainer";
import { AlertError } from "@/utils/error";
import { isEmptyString } from "@/utils/validation";
import { Container, Form, Input, InputWrapper, Label, ProjectInputCounter, SubmitButton, Title } from "./styles";

const NewProject = () => {
  const history = useHistory();
  const { createProject } = useCreateProject();

  const { value: projectName, onChangeWithMaxLength: onChangeProjectName } = useInput("", MAX_PROJECT_NAME_LENGTH);
  const { value: projectDescription, onChangeWithMaxLength: onChangeProjectDescription } = useInput(
    "",
    MAX_PROJECT_DESCRIPTION_LENGTH
  );

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

            <ProjectInputCounter>
              {projectName.length} / {MAX_PROJECT_NAME_LENGTH}
            </ProjectInputCounter>
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="project-desciption">프로젝트 설명</Label>

            <Input
              id="project-desciption"
              value={projectDescription}
              onChange={onChangeProjectDescription}
              placeholder="프로젝트 설명을 입력해주세요."
            />

            <ProjectInputCounter>
              {projectDescription.length} / {MAX_PROJECT_DESCRIPTION_LENGTH}
            </ProjectInputCounter>
          </InputWrapper>
          <SubmitButton>등록</SubmitButton>
        </Form>
      </Container>
    </ScreenContainer>
  );
};

export default NewProject;
