import { Link } from "react-router-dom";
import kakaoTalkIcon from "@/assets/png/kakaotalk.png";
import naverIcon from "@/assets/png/naver.png";
import { ROUTE } from "@/constants";
import { MANAGE_PAGE_DOMAIN } from "@/constants/domain";
import { OAUTH_ENDPOINT } from "@/constants/oauth";
import { useUser } from "@/hooks";
import { PALETTE } from "@/styles/palette";
import { MenuType } from "@/types/menu";
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
import { useContext } from "react";
import { accessTokenContext } from "@/contexts/AccessTokenProvider";

export interface Props {
  menuList: MenuType[];
}

const DesktopNav = ({ menuList }: Props) => {
  const { user, logout } = useContext(accessTokenContext);

  const moveKakaoOAuthURL = () => {
    window.location.replace(
      `${OAUTH_ENDPOINT.KAKAO}?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${MANAGE_PAGE_DOMAIN}/oauth/kakao`
    );
  };

  const moveNaverOAuthURL = () => {
    window.location.replace(
      `${OAUTH_ENDPOINT.NAVER}?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${MANAGE_PAGE_DOMAIN}/oauth/naver`
    );
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
                <LoginMethodWrapper onClick={moveKakaoOAuthURL}>
                  <Avatar size="SM" imageURL={kakaoTalkIcon} alt="카카오톡 로그인 이미지" />
                  <LoginMethod>카카오</LoginMethod>
                </LoginMethodWrapper>
                <LoginMethodWrapper onClick={moveNaverOAuthURL}>
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
