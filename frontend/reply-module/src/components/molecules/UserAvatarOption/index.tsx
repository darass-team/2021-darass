import Alarm from "@/components/atoms/Alarm";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { User } from "../../../types/user";
import Avatar from "../../atoms/Avatar";
import { Container, UserNickName, UserOption } from "./styles";

export interface Props {
  user: User | undefined;
  className?: string;
  children: ReactNode;
}

const UserAvatarOption = ({ user, children, className }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);

  const onShowOptionBox = (event: MouseEvent) => {
    event.stopPropagation();
    setShowOptionBox(state => !state);
  };

  const onClickAlarmIcon = () => {};

  useEffect(() => {
    setShowOptionBox(false);
  }, [user]);

  return (
    <Container className={className}>
      <Alarm size="MD" hasUnReadNotification={false} onClick={onClickAlarmIcon} />
      <UserNickName onClick={onShowOptionBox}>{user?.nickName ?? "로그인"}</UserNickName>
      <Avatar
        imageURL={user?.profileImageUrl}
        onClick={onShowOptionBox}
        alt="유저 프로필 이미지"
        data-testid="avartar-option-img"
      />
      {isShowOptionBox && <UserOption userName={user?.nickName}>{children}</UserOption>}
    </Container>
  );
};

export default UserAvatarOption;
