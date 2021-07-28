import { ReactNode } from "react";
import { Container, MainContent } from "./styles";

interface Props {
  SideBar: React.FunctionComponent;
  children: ReactNode;
}

const SideBarTemplate = ({ SideBar, children }: Props) => {
  return (
    <Container>
      <SideBar />
      <MainContent>{children}</MainContent>
    </Container>
  );
};

export default SideBarTemplate;
