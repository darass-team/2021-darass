import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { PALETTE } from "../../../styles/palette";
import { User } from "../../../types/user";
import HamburgerButton from "../../atoms/Buttons/HamburgerButton";
import { MenuType } from "../Nav";
import { Container, Menu, MenuAvatar, MenuWrapper, Name, AuthLink, Dimmed } from "./styles";

export interface Props {
  user?: User;
  logout: () => void;
  menuList: MenuType[];
}

const MobileNav = ({ user, logout, menuList }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const onToggleNav = () => {
    setOpen(state => !state);
  };

  return (
    <Container>
      <Dimmed isOpen={isOpen} onClick={onToggleNav} />
      <HamburgerButton isOpen={isOpen} onClick={onToggleNav} />
      <MenuWrapper isOpen={isOpen}>
        <Link to={ROUTE.USER_PROFILE}>
          <MenuAvatar imageURL={user?.profileImageUrl} size="LG" />
        </Link>
        {user ? (
          <>
            <Name>{user.nickName}</Name>
            <AuthLink to={ROUTE.HOME} onClick={logout}>
              로그아웃
            </AuthLink>
          </>
        ) : (
          <>
            <Name>{"로그인이 필요합니다."}</Name>
            <AuthLink to={ROUTE.LOGIN}>로그인</AuthLink>
          </>
        )}
        {menuList.map(({ name, route }) => (
          <Menu key={name} to={route} activeStyle={{ backgroundColor: `${PALETTE.SECONDARY}` }}>
            {name}
          </Menu>
        ))}
      </MenuWrapper>
    </Container>
  );
};

export default MobileNav;
