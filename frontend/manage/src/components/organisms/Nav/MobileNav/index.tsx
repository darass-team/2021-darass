import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "@/constants";
import { useUser } from "@/hooks";
import { PALETTE } from "@/styles/palette";
import { MenuType } from "@/types/menu";
import HamburgerButton from "@/components/atoms/Buttons/HamburgerButton";
import Modal from "@/components/atoms/Modal";
import { AuthLink, Container, Menu, MenuAvatar, MenuWrapper, Name } from "./styles";
import { userContext } from "@/contexts/UserProvider";

export interface Props {
  menuList: MenuType[];
}

const MobileNav = ({ menuList }: Props) => {
  const { user, logout } = useContext(userContext);

  const [isOpen, setOpen] = useState(false);

  const onToggleNav = () => {
    setOpen(state => !state);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "revert";
  }, [isOpen]);

  return (
    <Container>
      <HamburgerButton isOpen={isOpen} onClick={onToggleNav} />
      <Modal isOpen={isOpen} closeModal={() => setOpen(false)}>
        <MenuWrapper isOpen={isOpen}>
          <Link to={ROUTE.AUTHORIZED.USER_PROFILE} onClick={onToggleNav}>
            <MenuAvatar imageURL={user?.profileImageUrl} size="LG" />
          </Link>
          {user ? (
            <>
              <Name>{user.nickName}</Name>
              <AuthLink
                to={ROUTE.COMMON.HOME}
                onClick={() => {
                  logout();
                  onToggleNav();
                }}
              >
                로그아웃
              </AuthLink>
            </>
          ) : (
            <>
              <Name>{"로그인이 필요합니다."}</Name>
              <AuthLink to={ROUTE.NON_AUTHORIZED.LOGIN} onClick={onToggleNav}>
                로그인
              </AuthLink>
            </>
          )}
          {menuList.map(({ name, route }) => (
            <Menu
              key={name}
              to={route || ROUTE.COMMON.HOME}
              activeStyle={{ backgroundColor: `${PALETTE.SECONDARY}` }}
              onClick={onToggleNav}
            >
              {name}
            </Menu>
          ))}
        </MenuWrapper>
      </Modal>
    </Container>
  );
};

export default MobileNav;
