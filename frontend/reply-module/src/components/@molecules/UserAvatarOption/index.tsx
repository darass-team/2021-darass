import Alarm from "@/components/@atoms/Alarm";
import Avatar from "@/components/@atoms/Avatar";
import Modal from "@/components/@molecules/Modal";
import { useEditUser, useGetAlarmContents, useMessageChannelFromReplyModuleContext, useUser } from "@/hooks";
import { useUserContext } from "@/hooks/contexts/useUserContext";
import { User } from "@/types/user";
import { AlertError } from "@/utils/alertError";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { Container, UserNickName, UserOption } from "./styles";

export interface Props {
  user?: User;
  children: ReactNode;
}

const UserAvatarOption = ({ user, children, ...props }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const { openAlarmModal, openAlert } = useMessageChannelFromReplyModuleContext();
  const { data: alarmContents, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime } = useGetAlarmContents();
  const { refetchUser } = useUserContext();
  const { editUser } = useEditUser();
  const avatarImageURL = user ? user.profileImageUrl : undefined;

  const onCloseShowOptionBox = () => {
    setShowOptionBox(false);
  };

  const onClickUserNickName: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();

    setShowOptionBox(state => !state);
  };

  const onClickAvatar: MouseEventHandler<HTMLImageElement> = event => {
    event.stopPropagation();

    setShowOptionBox(state => !state);
  };

  const onClickAlarmIcon = async () => {
    const formData = new FormData();
    formData.append("hasRecentAlarm", "false");

    await editUser(formData);
    await refetchUser();
    setHasNewAlarmOnRealTime?.(false);

    openAlarmModal(alarmContents || []);
  };

  useEffect(() => {
    setShowOptionBox(false);
  }, [user]);

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
