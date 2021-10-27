import Avatar from "@/components/atoms/Avatar";
import Logo from "@/components/atoms/Logo";
import AlarmDropDown from "@/components/molecules/AlarmDropDown";
import UserAvatarOption from "@/components/molecules/UserAvatarOption";
import { ROUTE } from "@/constants";
import { PNG } from "@/constants/clientAssets";
import { OAUTH_URL } from "@/constants/oauth";
import { PALETTE } from "@/constants/styles/palette";
import { useEditUser, useGetAlarmContents } from "@/hooks";
import { useUserContext } from "@/hooks/context/useUserContext";
import { MenuType } from "@/types/menu";
import { AlertError } from "@/utils/alertError";
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
  UserInfoWrapper,
  Wrapper
} from "./styles";

export interface Props {
  menuList: MenuType[];
}

const DesktopNav = ({ menuList }: Props) => {
  const { user, logout, refetchUser } = useUserContext();
  const { data: alarmContents, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime } = useGetAlarmContents();
  const { editUser } = useEditUser();

  if (!refetchUser) {
    return null;
  }

  const onLogin = (provider: keyof typeof OAUTH_URL) => {
    window.location.replace(OAUTH_URL[provider]);
  };

  const onClickAlarmDropDown = async () => {
    try {
      const formData = new FormData();
      formData.append("hasRecentAlarm", "false");

      await editUser(formData);

      setHasNewAlarmOnRealTime?.(false);
      refetchUser();
    } catch (error) {
      if (error instanceof AlertError) {
        alert(error.message);
      }
    }
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

        <UserInfoWrapper>
          {user && (
            <AlarmDropDown
              alarmContents={alarmContents || []}
              hasUnReadNotification={user.hasRecentAlarm || hasNewAlarmOnRealTime}
              onClick={onClickAlarmDropDown}
            />
          )}

          <UserAvatarOptionWrapper>
            <UserAvatarOption>
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
                    <Avatar size="SM" imageURL={PNG.KAKAO_LOGO} alt="카카오톡 로그인 이미지" />
                    <LoginMethod>카카오</LoginMethod>
                  </LoginMethodWrapper>
                  <LoginMethodWrapper onClick={() => onLogin("NAVER")}>
                    <Avatar size="SM" imageURL={PNG.NAVER_LOGO} alt="네이버 로그인 이미지" />
                    <LoginMethod>네이버</LoginMethod>
                  </LoginMethodWrapper>
                </>
              )}
            </UserAvatarOption>
          </UserAvatarOptionWrapper>
        </UserInfoWrapper>
      </Wrapper>
    </Container>
  );
};

export default DesktopNav;
