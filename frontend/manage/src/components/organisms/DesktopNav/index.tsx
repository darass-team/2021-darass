import {
  Container,
  Wrapper,
  MenuLink,
  Title,
  Menu,
  LogoLink,
  UserAvatarOptionWrapper,
  LoginMethodWrapper,
  LoginMethod
} from "./styles";
import { User } from "../../../types/user";
import { ROUTE } from "../../../constants";
import Logo from "../../atoms/Logo";
import UserAvatarOption from "../../molecules/UserAvatarOption";
import { Link } from "react-router-dom";
import { PALETTE } from "../../../styles/palette";
import { MenuType } from "../../../types/menu";
import Avatar from "../../atoms/Avatar";
import kakaoTalkIcon from "../../../assets/png/kakaotalk.png";
import { useUser } from "../../../hooks";
import { AlertError } from "../../../utils/error";

export interface Props {
  menuList: MenuType[];
}

const DesktopNav = ({ menuList }: Props) => {
  const { user, login, logout } = useUser();

  const onLogin = async () => {
    try {
      await login();
    } catch (error) {
      if (error instanceof AlertError) {
        alert(error.message);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <LogoLink to={ROUTE.HOME}>
          <Logo size="SM" />
          <Title>Darass</Title>
        </LogoLink>
        <Menu>
          {menuList.map(menu => (
            <MenuLink
              key={menu.name}
              to={menu.route || ROUTE.HOME}
              activeStyle={{ borderBottom: `5px solid ${PALETTE.PRIMARY}` }}
            >
              {menu.name}
            </MenuLink>
          ))}
        </Menu>
        <UserAvatarOptionWrapper>
          <UserAvatarOption user={user}>
            {user ? (
              <>
                <Link to={ROUTE.USER_PROFILE}>내 정보</Link>
                <Link to={ROUTE.HOME} onClick={logout}>
                  로그아웃
                </Link>
              </>
            ) : (
              <LoginMethodWrapper onClick={onLogin}>
                <Avatar size="SM" imageURL={kakaoTalkIcon} alt="카카오톡 로그인 이미지" />
                <LoginMethod>카카오</LoginMethod>
              </LoginMethodWrapper>
            )}
          </UserAvatarOption>
        </UserAvatarOptionWrapper>
      </Wrapper>
    </Container>
  );
};

export default DesktopNav;
