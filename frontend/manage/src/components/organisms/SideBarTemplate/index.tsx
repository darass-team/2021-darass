import { ReactNode } from "react";
import { Container, MainContent, SideBar } from "./styles";

interface Props {
  projectId: number;
  children: ReactNode;
}

const SideBarTemplate = ({ projectId, children }: Props) => {
  return (
    <Container>
      <SideBar projectId={projectId} />
      <MainContent>{children}</MainContent>
    </Container>
  );
};

export default SideBarTemplate;
