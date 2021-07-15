import { Container, Title, Form, Label, Input, SubmitButton } from "./styles";

export interface Props {
  addProject: () => void;
  moveProjectDetailPage: (id: number) => void;
}

const NewProject = ({ addProject }: Props) => {
  return (
    <Container>
      <Title>새 프로젝트 만들기</Title>
      <Form onSubmit={addProject}>
        <Label htmlFor="project-name">프로젝트 이름</Label>
        <Input id="project-name" />
        <SubmitButton>등록</SubmitButton>
      </Form>
    </Container>
  );
};

export default NewProject;
