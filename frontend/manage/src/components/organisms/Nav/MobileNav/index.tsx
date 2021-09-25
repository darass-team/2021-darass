import Alarm from "@/components/atoms/Alarm";
import HamburgerButton from "@/components/atoms/Buttons/HamburgerButton";
import Modal from "@/components/atoms/Modal";
import { ROUTE } from "@/constants";
import { PALETTE } from "@/constants/styles/palette";
import { useUser } from "@/hooks";
import { MenuType } from "@/types/menu";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthLink, Container, Menu, MenuAvatar, MenuHeader, MenuWrapper, Name } from "./styles";

export interface Props {
  menuList: MenuType[];
}

const MobileNav = ({ menuList }: Props) => {
  const history = useHistory();
  const { user, logout } = useUser();
  const [isOpen, setOpen] = useState(false);

  const onToggleNav = () => {
    setOpen(state => !state);
  };

  const onClickAlarmIcon = () => {
    onToggleNav();
    history.push(ROUTE.AUTHORIZED.NOTIFICATION);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "revert";
  }, [isOpen]);

  return (
    <Container>
      <HamburgerButton isOpen={isOpen} onClick={onToggleNav} />
      <Modal isOpen={isOpen} closeModal={() => setOpen(false)} dimmedOpacity={0.6} fadeInFrom="left">
        <MenuWrapper>
          <MenuHeader>
            {user ? (
              <>
                <Alarm onClick={onClickAlarmIcon} />
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
              <AuthLink to={ROUTE.NON_AUTHORIZED.LOGIN} onClick={onToggleNav}>
                로그인
              </AuthLink>
            )}
          </MenuHeader>

          <Link to={ROUTE.AUTHORIZED.USER_PROFILE} onClick={onToggleNav}>
            <MenuAvatar imageURL={user?.profileImageUrl} size="LG" />
          </Link>

          <Name>{user ? user.nickName : "로그인이 필요합니다."}</Name>

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
