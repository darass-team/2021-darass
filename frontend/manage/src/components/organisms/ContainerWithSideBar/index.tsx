import { ReactNode, useEffect, useState } from "react";
import { MenuType } from "../../../types/menu";
import { debounce } from "../../../utils/debounce";
import { Container, MainContent, SideBar } from "./styles";

interface Props {
  menus: MenuType[];
  children: ReactNode;
}

const ContainerWithSideBar = ({ menus, children }: Props) => {
  const [sideBarOffsetY, setSideBarOffsetY] = useState(0);

  useEffect(() => {
    const cb = debounce(() => {
      setSideBarOffsetY(window.pageYOffset);
    }, 500);

    window.addEventListener("scroll", cb);

    return () => {
      window.removeEventListener("scroll", cb);
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
