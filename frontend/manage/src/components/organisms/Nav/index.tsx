import { ROUTE } from "../../../constants";
import { MenuType } from "../../../types/menu";
import { User } from "../../../types/user";
import DesktopNav from "../DesktopNav";
import MobileNav from "../MobileNav";

export interface Props {
  user?: User;
  logout: () => void;
}

const menuList: MenuType[] = [
  { route: ROUTE.MY_PROJECT, name: "내 프로젝트" },
  { route: "/notice", name: "공지사항" },
  { route: "/about", name: "ABOUT" }
];

const Nav = ({ user, logout }: Props) => {
  return (
    <>
      <MobileNav user={user} logout={logout} menuList={menuList} />
      <DesktopNav user={user} logout={logout} menuList={menuList} />
    </>
  );
};

export default Nav;
