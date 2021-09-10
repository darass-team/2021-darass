import { ReactNode, useEffect, useState } from "react";
import { MenuType } from "@/types/menu";
import { debounce } from "@/utils/debounce";
import { Container, MainContent, SideBar } from "./styles";

export interface Props {
  menus: MenuType[];
  children: ReactNode;
}

const ContainerWithSideBar = ({ menus, children }: Props) => {
  const [sideBarOffsetY, setSideBarOffsetY] = useState(0);

  useEffect(() => {
    const callback = debounce(() => {
      setSideBarOffsetY(window.pageYOffset);
    }, 500);

    window.addEventListener("scroll", callback);

    return () => {
      window.removeEventListener("scroll", callback);
    };
  }, []);

  return (
    <Container>
      <SideBar menus={menus} offsetY={sideBarOffsetY} />
      <MainContent>{children}</MainContent>
    </Container>
  );
};

export default ContainerWithSideBar;
