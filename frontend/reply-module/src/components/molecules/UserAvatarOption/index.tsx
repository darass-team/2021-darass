import { ReactNode, useEffect, useState } from "react";
import { User } from "../../../types/user";
import Avatar from "../../atoms/Avatar";
import { Container, UserNickName, UserOption } from "./styles";

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
      <UserNickName onClick={onShowOptionBox}>{user?.nickName ?? "로그인"}</UserNickName>
      <Avatar imageURL={user?.profileImageUrl} onClick={onShowOptionBox} />
      {isShowOptionBox && <UserOption userName={user?.nickName || "Login With"}>{children}</UserOption>}
    </Container>
  );
};

export default UserAvatarOption;
