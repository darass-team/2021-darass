import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { PALETTE } from "../../../styles/palette";
import { User } from "../../../types/user";
import HamburgerButton from "../../atoms/Buttons/HamburgerButton";
import { Menu, MenuAvatar, MenuWrapper, Name, AuthLink } from "./styles";

export interface Props {
  user?: User;
  logout: () => void;
}

const MobileNav = ({ user, logout }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const onClickHamburgerButton = () => {
    setOpen(state => !state);
  };

  return (
    <div>
      <HamburgerButton isOpen={isOpen} onClick={onClickHamburgerButton} />
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
            <AuthLink to={ROUTE.LOGIN}>로그인</AuthLink>
          </>
        )}

        <Menu to={ROUTE.HOME} activeStyle={{ backgroundColor: `${PALETTE.SECONDARY}` }}>
          내 정보
        </Menu>
        <Menu to={ROUTE.MY_PROJECT} activeStyle={{ backgroundColor: `${PALETTE.SECONDARY}` }}>
          내 프로젝트
        </Menu>
        <Menu to="/notice" activeStyle={{ backgroundColor: `${PALETTE.SECONDARY}` }}>
          공지사항
        </Menu>
        <Menu to="/about" activeStyle={{ backgroundColor: `${PALETTE.SECONDARY}` }}>
          About
        </Menu>
      </MenuWrapper>
    </div>
  );
};

export default MobileNav;
