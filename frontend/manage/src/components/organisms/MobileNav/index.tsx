import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { PALETTE } from "../../../styles/palette";
import { MenuType } from "../../../types/menu";
import { User } from "../../../types/user";
import HamburgerButton from "../../atoms/Buttons/HamburgerButton";
import Modal from "../../atoms/Modal";
import { Container, Menu, MenuAvatar, MenuWrapper, Name, AuthLink } from "./styles";

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "revert";

    return () => {
      document.body.style.overflow = "revert";
    };
  }, [isOpen]);

  return (
    <Container>
      <HamburgerButton isOpen={isOpen} onClick={onToggleNav} />
      <Modal isOpen={isOpen} closeModal={() => setOpen(false)}>
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
            <Menu key={name} to={route || ROUTE.HOME} activeStyle={{ backgroundColor: `${PALETTE.SECONDARY}` }}>
              {name}
            </Menu>
          ))}
        </MenuWrapper>
      </Modal>
    </Container>
  );
};

export default MobileNav;
