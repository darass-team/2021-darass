import { Container, Wrapper, MenuLink, Title, Menu, LogoLink, UserAvatarOptionWrapper, LoginLink } from "./styles";
import { User } from "../../../types/user";
import { ROUTE } from "../../../constants";
import Logo from "../../atoms/Logo";
import UserAvatarOption from "../../molecules/UserAvatarOption";
import { Link } from "react-router-dom";
import { PALETTE } from "../../../styles/palette";

export interface Props {
  user: User | undefined;
  logout: () => void;
}

interface MenuType {
  route: string;
  name: string;
}

const menuList: MenuType[] = [
  { route: ROUTE.MY_PROJECT, name: "내 프로젝트" },
  { route: "/공지사항", name: "공지사항" },
  { route: "/About", name: "ABOUT" }
];

const DesktopNav = ({ user, logout }: Props) => {
  return (
    <Container>
      <Wrapper>
        <LogoLink to={ROUTE.HOME}>
          <Logo size="SM" />
          <Title>Darass</Title>
        </LogoLink>
        <Menu>
          {menuList.map(menu => (
            <MenuLink key={menu.name} to={menu.route} activeStyle={{ borderBottom: `5px solid ${PALETTE.PRIMARY}` }}>
              {menu.name}
            </MenuLink>
          ))}
        </Menu>
        <UserAvatarOptionWrapper>
          {user ? (
            <UserAvatarOption user={user}>
              <Link to={ROUTE.USER_PROFILE}>내 정보</Link>
              <Link to={ROUTE.HOME} onClick={logout}>
                로그아웃
              </Link>
            </UserAvatarOption>
          ) : (
            <LoginLink to={ROUTE.LOGIN}>로그인</LoginLink>
          )}
        </UserAvatarOptionWrapper>
      </Wrapper>
    </Container>
  );
};

export default DesktopNav;
