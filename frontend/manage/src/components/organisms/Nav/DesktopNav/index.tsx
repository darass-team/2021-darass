import { Link } from "react-router-dom";
import { ROUTE } from "@/constants";
import { useUser } from "@/hooks";
import { PALETTE } from "@/styles/palette";
import { MenuType } from "@/types/menu";
import { AlertError } from "@/utils/error";
import kakaoTalkIcon from "@/assets/png/kakaotalk.png";
import Avatar from "@/components/atoms/Avatar";
import Logo from "@/components/atoms/Logo";
import UserAvatarOption from "@/components/molecules/UserAvatarOption";
import {
  Container,
  LoginMethod,
  LoginMethodWrapper,
  LogoLink,
  Menu,
  MenuLink,
  Title,
  UserAvatarOptionWrapper,
  Wrapper
} from "./styles";

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
