import kakaoTalkIcon from "@/assets/png/kakaotalk.png";
import naverIcon from "@/assets/png/naver.png";
import Avatar from "@/components/atoms/Avatar";
import Logo from "@/components/atoms/Logo";
import AlarmDropDown from "@/components/molecules/AlarmDropDown";
import UserAvatarOption from "@/components/molecules/UserAvatarOption";
import { ROUTE } from "@/constants";
import { OAUTH_URL } from "@/constants/oauth";
import { useEditUser, useGetAlarmContents, useUser } from "@/hooks";
import { PALETTE } from "@/constants/styles/palette";
import { MenuType } from "@/types/menu";
import { alarmContents } from "@/__test__/fixture/alarmContent";
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
  Wrapper,
  UserInfoWrapper
} from "./styles";
import { GetAlarmResponse } from "@/types/comment";
import { AlertError } from "@/utils/alertError";

export interface Props {
  menuList: MenuType[];
}

const DesktopNav = ({ menuList }: Props) => {
  const { user, logout, refetch: refetchUser } = useUser();
  const { data: alarmContents, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime } = useGetAlarmContents();
  const { editUser } = useEditUser();

  const onLogin = (provider: keyof typeof OAUTH_URL) => {
    window.location.replace(OAUTH_URL[provider]);
  };

  const onClickAlarmDropDown = async () => {
    try {
      const formData = new FormData();
      formData.append("hasRecentAlarm", "false");

      await editUser(formData);
      await refetchUser();
      setHasNewAlarmOnRealTime(false);
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
        </UserInfoWrapper>
      </Wrapper>
    </Container>
  );
};

export default DesktopNav;
