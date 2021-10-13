import { ROUTE } from "@/constants";
import { MenuType } from "@/types/menu";
import { useEffect } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const menuList: MenuType[] = [
  { route: ROUTE.AUTHORIZED.MY_PROJECT, name: "내 프로젝트" },
  { route: ROUTE.COMMON.ABOUT, name: "ABOUT" }
];

const Nav = () => {
  return (
    <>
      <MobileNav menuList={menuList} />
      <DesktopNav menuList={menuList} />
    </>
  );
};

export default Nav;
