import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { User } from "@/types/user";
import Avatar from "@/components/atoms/Avatar";
import arrowDown from "@/assets/svg/arrow-down.svg";
import { Container, UserNickName, UserOption, DownArrow } from "./styles";
import Modal from "@/components/atoms/Modal";

export interface Props {
  user: User | undefined;
  children: ReactNode;
}

const UserAvatarOption = ({ user, children }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);

  const onShowOptionBox = (event: MouseEvent) => {
    event.stopPropagation();
    setShowOptionBox(state => !state);
  };

  useEffect(() => {
    setShowOptionBox(false);
  }, [user]);

  return (
    <Container>
      <Avatar imageURL={user?.profileImageUrl} onClick={onShowOptionBox} alt="유저 프로필 이미지" />
      <UserNickName onClick={onShowOptionBox}>{user?.nickName ?? "로그인"}</UserNickName>
      <DownArrow
        src={arrowDown}
        alt={`유저 옵션 드롭다운 버튼`}
        onClick={onShowOptionBox}
        isShowOptionBox={isShowOptionBox}
      />
      <Modal isOpen={isShowOptionBox} closeModal={() => setShowOptionBox(false)} dimmedOpacity={0} blockScroll={false}>
        <UserOption>{children}</UserOption>
      </Modal>
    </Container>
  );
};

export default UserAvatarOption;
