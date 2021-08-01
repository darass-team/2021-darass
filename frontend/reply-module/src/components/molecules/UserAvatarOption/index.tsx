import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { User } from "../../../types/user";
import Avatar from "../../atoms/Avatar";
import { Container, UserNickName, UserOption } from "./styles";

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
