import { ROUTE } from "@/constants";
import { MenuType } from "@/types/menu";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const menuList: MenuType[] = [
  { route: ROUTE.AUTHORIZED.MY_PROJECT, name: "내 프로젝트" },
  { route: ROUTE.COMMON.NOTICE, name: "공지사항" },
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
