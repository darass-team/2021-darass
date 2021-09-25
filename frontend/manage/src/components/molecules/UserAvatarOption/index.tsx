import arrowDown from "@/assets/svg/arrow-down.svg";
import Avatar from "@/components/atoms/Avatar";
import Modal from "@/components/atoms/Modal";
import { User } from "@/types/user";
import { MouseEvent, ReactNode, useEffect, useState } from "react";
import { Container, DownArrow, UserNickName, UserOption } from "./styles";

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
    <Modal isOpen={isShowOptionBox} closeModal={() => setShowOptionBox(false)} dimmedOpacity={0} blockScroll={false}>
      <Container>
        <Avatar imageURL={user?.profileImageUrl} onClick={onShowOptionBox} alt="유저 프로필 이미지" />
        <UserNickName onClick={onShowOptionBox}>{user?.nickName ?? "로그인"}</UserNickName>
        <DownArrow
          src={arrowDown}
          alt={`유저 옵션 드롭다운 버튼`}
          onClick={onShowOptionBox}
          isShowOptionBox={isShowOptionBox}
        />
        {isShowOptionBox && <UserOption>{children}</UserOption>}
      </Container>
    </Modal>
  );
};

export default UserAvatarOption;
