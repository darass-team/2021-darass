import Alarm from "@/components/atoms/Alarm";
import Modal from "@/components/atoms/Modal";
import { MouseEvent, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { User } from "../../../types/user";
import Avatar from "../../atoms/Avatar";
import { Container, UserNickName, UserOption } from "./styles";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { messageFromReplyModule } from "@/utils/postMessage";
import { useCommentAlarm } from "@/hooks";

export interface Props {
  user: User | undefined;
  className?: string;
  children: ReactNode;
}

const UserAvatarOption = ({ user, children, className }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const { port } = useContext(MessageChannelContext);
  const { data: alarmContents } = useCommentAlarm();

  const onShowOptionBox = (event: MouseEvent) => {
    event.stopPropagation();

    setShowOptionBox(state => !state);
  };

  const onClickAlarmIcon = () => {
    messageFromReplyModule(port).openAlarmModal(alarmContents || []);
  };

  useEffect(() => {
    setShowOptionBox(false);
  }, [user]);

  return (
    <Container className={className}>
      {user && <Alarm size="SM" hasUnReadNotification={user.hasRecentAlarm} onClick={onClickAlarmIcon} />}

      <UserNickName onClick={onShowOptionBox}>{user?.nickName ?? "로그인"}</UserNickName>
      <Avatar
        imageURL={user?.profileImageUrl}
        onClick={onShowOptionBox}
        alt="유저 프로필 이미지"
        data-testid="avartar-option-img"
      />

      <Modal isOpen={isShowOptionBox} closeModal={() => setShowOptionBox(false)} dimmedOpacity={0}>
        <UserOption userName={user?.nickName}>{children}</UserOption>
      </Modal>
    </Container>
  );
};

export default UserAvatarOption;
