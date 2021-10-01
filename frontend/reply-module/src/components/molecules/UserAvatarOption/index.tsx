import Alarm from "@/components/atoms/Alarm";
import Modal from "@/components/atoms/Modal";
import { MouseEvent, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { User } from "../../../types/user";
import Avatar from "../../atoms/Avatar";
import { Container, UserNickName, UserOption } from "./styles";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { messageFromReplyModule } from "@/utils/postMessage";
import { useGetAlarmContents, useEditUser, useUser } from "@/hooks";
import { AlertError } from "@/utils/alertError";

export interface Props {
  user: User | undefined;
  className?: string;
  children: ReactNode;
}

const UserAvatarOption = ({ user, children, className }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const { port } = useContext(MessageChannelContext);
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
        alert(error.message);
      }
    }

    messageFromReplyModule(port).openAlarmModal(alarmContents || []);
  };

  useEffect(() => {
    setShowOptionBox(false);
  }, [user]);

  return (
    <Container className={className}>
      {user && (
        <Alarm
          size="SM"
          hasUnReadNotification={user.hasRecentAlarm || hasNewAlarmOnRealTime}
          onClick={onClickAlarmIcon}
        />
      )}

      <UserNickName onClick={onShowOptionBox}>{user?.nickName ?? "로그인"}</UserNickName>
      <Avatar imageURL={avatarImageURL} onClick={onShowOptionBox} alt="유저 프로필 이미지" />

      <Modal isOpen={isShowOptionBox} closeModal={() => setShowOptionBox(false)} dimmedOpacity={0}>
        <UserOption>{children}</UserOption>
      </Modal>
    </Container>
  );
};

export default UserAvatarOption;
