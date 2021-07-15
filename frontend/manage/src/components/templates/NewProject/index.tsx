import { ChangeEvent, FormEvent } from "react";
import { Project } from "../../../types/project";
import { Container, Form, Input, Label, SubmitButton, Title } from "./styles";

export interface Props {
  projectName: string;
  onChangeProjectName: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const NewProject = ({ onSubmit, projectName, onChangeProjectName }: Props) => {
  return (
    <Container>
      <Title>새 프로젝트 만들기</Title>
      <Form onSubmit={onSubmit}>
        <Label htmlFor="project-name">프로젝트 이름</Label>
        <Input id="project-name" value={projectName} onChange={onChangeProjectName} />
        <SubmitButton>등록</SubmitButton>
      </Form>
    </Container>
  );
};

export default NewProject;
