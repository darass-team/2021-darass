import kakaoTalkIcon from "@/assets/png/kakaotalk.png";
import naverIcon from "@/assets/png/naver.png";
import Avatar from "@/components/atoms/Avatar";
import Logo from "@/components/atoms/Logo";
import UserAvatarOption from "@/components/molecules/UserAvatarOption";
import { ROUTE } from "@/constants";
import { OAUTH_URL } from "@/constants/oauth";
import { userContext } from "@/contexts/UserProvider";
import { PALETTE } from "@/styles/palette";
import { MenuType } from "@/types/menu";
import { useContext } from "react";
import { Link } from "react-router-dom";
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
  const { user, logout } = useContext(userContext);

  const onLogin = (provider: keyof typeof OAUTH_URL) => {
    window.location.replace(OAUTH_URL[provider]);
  };

  return (
    <Container>
      <Wrapper>
        <LogoLink to={ROUTE.COMMON.HOME}>
          <Logo size="SM" />
          <Title>Darass</Title>
        </LogoLink>
        <Menu>
          {menuList.map(menu => (
            <MenuLink
              key={menu.name}
              to={menu.route || ROUTE.COMMON.HOME}
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
                <Link to={ROUTE.AUTHORIZED.USER_PROFILE}>내 정보</Link>
                <Link to={ROUTE.COMMON.HOME} onClick={logout}>
                  로그아웃
                </Link>
              </>
            ) : (
              <>
                <LoginMethodWrapper onClick={() => onLogin("KAKAO")}>
                  <Avatar size="SM" imageURL={kakaoTalkIcon} alt="카카오톡 로그인 이미지" />
                  <LoginMethod>카카오</LoginMethod>
                </LoginMethodWrapper>
                <LoginMethodWrapper onClick={() => onLogin("NAVER")}>
                  <Avatar size="SM" imageURL={naverIcon} alt="네이버 로그인 이미지" />
                  <LoginMethod>네이버</LoginMethod>
                </LoginMethodWrapper>
              </>
            )}
          </UserAvatarOption>
        </UserAvatarOptionWrapper>
      </Wrapper>
    </Container>
  );
};

export default DesktopNav;
