import { ROUTE } from "@/constants";
import { MenuType } from "@/types/menu";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const menuList: MenuType[] = [
  { route: ROUTE.MY_PROJECT, name: "내 프로젝트" },
  { route: ROUTE.NOTICE, name: "공지사항" },
  { route: ROUTE.ABOUT, name: "ABOUT" }
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
