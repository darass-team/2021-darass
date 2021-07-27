import { ReactNode, useEffect, useState } from "react";
import { User } from "../../../types/user";
import Avatar from "../../atoms/Avatar";
import arrowDown from "../../../assets/svg/arrow-down.svg";
import { Container, UserNickName, UserOption, DownArrow } from "./styles";

export interface Props {
  user: User | undefined;
  children: ReactNode;
}

const UserAvatarOption = ({ user, children }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);

  const onShowOptionBox = () => {
    setShowOptionBox(state => !state);
  };

  useEffect(() => {
    setShowOptionBox(false);
  }, [user]);

  return (
    <Container>
      <Avatar imageURL={user?.profileImageUrl} onClick={onShowOptionBox} />
      <UserNickName onClick={onShowOptionBox}>{user?.nickName ?? "로그인"}</UserNickName>
      <DownArrow
        src={arrowDown}
        alt={`유저 옵션 드롭다운 버튼`}
        onClick={onShowOptionBox}
        isShowOptionBox={isShowOptionBox}
      />
      {isShowOptionBox && <UserOption>{children}</UserOption>}
    </Container>
  );
};

export default UserAvatarOption;
