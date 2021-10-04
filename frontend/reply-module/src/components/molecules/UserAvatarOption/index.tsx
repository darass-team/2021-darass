import Alarm from "@/components/atoms/Alarm";
import Modal from "@/components/molecules/Modal";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { User } from "@/types/user";
import Avatar from "@/components/atoms/Avatar";
import { Container, UserNickName, UserOption } from "./styles";
import { useGetAlarmContents, useEditUser, useUser, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { AlertError } from "@/utils/alertError";
import { useUserAvatarOption } from "./useUserAvatarOption";

export interface Props {
  user?: User;
  children: ReactNode;
}

const UserAvatarOption = ({ user, children, ...props }: Props) => {
  const {
    onClickAlarmIcon,
    avatarImageURL,
    onClickUserNickName,
    isShowOptionBox,
    onCloseShowOptionBox,
    hasNewAlarmOnRealTime,
    onClickAvatar
  } = useUserAvatarOption({ user, children });

  return (
    <Container {...props}>
      {user && (
        <Alarm
          size="SM"
          hasUnReadNotification={user.hasRecentAlarm || hasNewAlarmOnRealTime}
          onClick={onClickAlarmIcon}
          data-testid="user-avatar-option-alarm"
        />
      )}

      <UserNickName onClick={onClickUserNickName} data-testid="user-avatar-option-user-name">
        {user?.nickName ?? "로그인"}
      </UserNickName>
      <Avatar imageURL={avatarImageURL} onClick={onClickAvatar} alt="유저 프로필 이미지" />

      <Modal isOpen={isShowOptionBox} closeModal={onCloseShowOptionBox} dimmedOpacity={0}>
        <UserOption>{children}</UserOption>
      </Modal>
    </Container>
  );
};

export default UserAvatarOption;
