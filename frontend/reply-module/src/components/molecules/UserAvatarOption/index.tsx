import Alarm from "@/components/atoms/Alarm";
import Modal from "@/components/atoms/Modal";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { User } from "@/types/user";
import Avatar from "@/components/atoms/Avatar";
import { Container, UserNickName, UserOption } from "./styles";
import { useGetAlarmContents, useEditUser, useUser, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { AlertError } from "@/utils/alertError";

export interface Props {
  user?: User;
  children: ReactNode;
}

const UserAvatarOption = ({ user, children, ...props }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const { openAlarmModal, openAlert } = useMessageChannelFromReplyModuleContext();

  const { data: alarmContents, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime } = useGetAlarmContents();
  const { refetch: refetchUser } = useUser();
  const { editUser } = useEditUser();
  const avatarImageURL = user ? user.profileImageUrl : undefined;

  const onShowOptionBox = (event: MouseEvent) => {
    event.stopPropagation();

    setShowOptionBox(state => !state);
  };

  const onClickAlarmIcon = async () => {
    try {
      const formData = new FormData();
      formData.append("hasRecentAlarm", "false");

      await editUser(formData);
      await refetchUser();
      setHasNewAlarmOnRealTime?.(false);
    } catch (error) {
      if (error instanceof AlertError) {
        openAlert(error.message);
      }
    }

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

      <UserNickName onClick={onShowOptionBox} data-testid="user-avatar-option-user-name">
        {user?.nickName ?? "로그인"}
      </UserNickName>
      <Avatar imageURL={avatarImageURL} onClick={onShowOptionBox} alt="유저 프로필 이미지" />

      <Modal isOpen={isShowOptionBox} closeModal={() => setShowOptionBox(false)} dimmedOpacity={0}>
        <UserOption>{children}</UserOption>
      </Modal>
    </Container>
  );
};

export default UserAvatarOption;
