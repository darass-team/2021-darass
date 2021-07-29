import { ReactNode } from "react";
import { MenuType } from "../../../types/menu";
import { Container, MainContent, SideBar } from "./styles";

interface Props {
  menus: MenuType[];
  children: ReactNode;
}

const ContainerWithSideBar = ({ menus, children }: Props) => {
  return (
    <Container>
      <SideBar menus={menus} />
      <MainContent>{children}</MainContent>
    </Container>
  );
};

export default ContainerWithSideBar;
