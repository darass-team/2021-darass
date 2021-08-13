import { Button, Description, Title } from "./styles";

export interface Props {
  title: string;
  description?: string;
  onClick: () => void;
}

const ProjectButton = ({ title, description, onClick }: Props) => {
  return (
    <Button type="button" onClick={onClick} data-testid="project-button">
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Button>
  );
};

export default ProjectButton;
