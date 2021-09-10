import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { User } from "@/types/user";
import Avatar from "@/components/atoms/Avatar";
import arrowDown from "@/assets/svg/arrow-down.svg";
import { Container, UserNickName, UserOption, DownArrow } from "./styles";

export interface Props {
  user: User | undefined;
  children: ReactNode;
}

const UserAvatarOption = ({ user, children }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const ref = useRef(false);
  ref.current = isShowOptionBox;

  const onShowOptionBox = (event: MouseEvent) => {
    event.stopPropagation();
    setShowOptionBox(state => !state);
  };

  const onHideOptionBox = () => {
    if (ref.current) setShowOptionBox(false);
  };

  useEffect(() => {
    setShowOptionBox(false);
  }, [user]);

  useEffect(() => {
    window.addEventListener("click", onHideOptionBox);
    return () => {
      window.removeEventListener("click", onHideOptionBox);
    };
  }, []);

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
      {isShowOptionBox && <UserOption>{children}</UserOption>}
    </Container>
  );
};

export default UserAvatarOption;
