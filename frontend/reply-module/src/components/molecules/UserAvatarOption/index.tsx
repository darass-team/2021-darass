import { ReactNode, useEffect, useState } from "react";
import { User } from "../../../types/user";
import Avatar from "../../atoms/Avatar";
import { Container, UserOption } from "./styles";

export interface Props {
  user: User | null;
  children: ReactNode;
}

const UserAvatarOption = ({ user, children }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(true);

  const onShowOptionBox = () => {
    setShowOptionBox(state => !state);
  };

  useEffect(() => {
    setShowOptionBox(state => !state);
  }, [user]);

  return (
    <Container>
      <Avatar
        imageURL={user?.imageURL || "https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"}
        onClick={onShowOptionBox}
      />
      {isShowOptionBox && <UserOption userName={user?.nickName || "Login With"}>{children}</UserOption>}
    </Container>
  );
};

export default UserAvatarOption;
