import { Link } from "react-router-dom";
import kakaoTalkIcon from "../../../assets/png/kakaotalk.png";
import { ROUTE } from "../../../constants";
import { MANAGE_PAGE_BASE_URL } from "../../../constants/domain";
import { OAUTH_ENDPOINT } from "../../../constants/oauth";
import { useUser } from "../../../hooks";
import { PALETTE } from "../../../styles/palette";
import { MenuType } from "../../../types/menu";
import Avatar from "../../atoms/Avatar";
import Logo from "../../atoms/Logo";
import UserAvatarOption from "../../molecules/UserAvatarOption";
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
  const { user, logout } = useUser();

  const moveKakaoOAuthURL = () => {
    window.location.replace(
      `${OAUTH_ENDPOINT.KAKAO}?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${MANAGE_PAGE_BASE_URL}/oauth/kakao`
    );
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
              <>
                <LoginMethodWrapper onClick={moveKakaoOAuthURL}>
                  <Avatar size="SM" imageURL={kakaoTalkIcon} alt="카카오톡 로그인 이미지" />
                  <LoginMethod>카카오</LoginMethod>
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
