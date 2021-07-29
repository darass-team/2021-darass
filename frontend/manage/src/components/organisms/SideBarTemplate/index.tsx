import { ReactNode } from "react";
import ProjectSideBar from "../ProjectSideBar";
import { Container, MainContent } from "./styles";

interface Props {
  projectId: number;
  children: ReactNode;
}

const SideBarTemplate = ({ projectId, children }: Props) => {
  return (
    <Container>
      <ProjectSideBar projectId={projectId} />
      <MainContent>{children}</MainContent>
    </Container>
  );
};

export default SideBarTemplate;
