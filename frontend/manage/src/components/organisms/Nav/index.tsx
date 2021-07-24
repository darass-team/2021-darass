import { Container, Wrapper, MenuLink, Title, Menu, LogoLink, UserAvatarOptionWrapper, LoginLink } from "./styles";
import { User } from "../../../types/user";
import { ROUTE } from "../../../constants";
import Logo from "../../atoms/Logo";
import UserAvatarOption from "../../molecules/UserAvatarOption";
import { Link } from "react-router-dom";

export interface Props {
  user: User | undefined;
}

const Nav = ({ user }: Props) => {
  return (
    <Container>
      <Wrapper>
        <LogoLink to="/">
          <Logo size="SM" />
          <Title>Darass</Title>
        </LogoLink>
        <Menu>
          <MenuLink to={ROUTE.MY_PROJECT}>내 프로젝트</MenuLink>
          <MenuLink to="/">공지사항</MenuLink>
          <MenuLink to="/">ABOUT</MenuLink>
        </Menu>
        <UserAvatarOptionWrapper>
          {user ? (
            <UserAvatarOption user={user}>
              <Link to="/">내 정보</Link>
              <Link to="/">로그아웃</Link>
            </UserAvatarOption>
          ) : (
            <LoginLink to={ROUTE.LOGIN}>로그인</LoginLink>
          )}
        </UserAvatarOptionWrapper>
      </Wrapper>
    </Container>
  );
};

export default Nav;
