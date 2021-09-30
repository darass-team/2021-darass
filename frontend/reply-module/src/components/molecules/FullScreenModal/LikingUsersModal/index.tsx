import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { messageFromReplyModal } from "@/utils/postMessage";
import { useContext, useState } from "react";
import FullScreenModal from "..";
import { User } from "../../../../types/user";
import Avatar from "../../../atoms/Avatar";
import { Container, Title, UserGrid, UserNickName, UserWrapper } from "./styles";

const LikingUsersModal = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { port } = useContext(MessageChannelContext);

  const onCloseModal = () => {
    messageFromReplyModal(port).closeLikingUserModal();
  };

  return (
    <FullScreenModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setValue={setUsers}
      postCloseModal={onCloseModal}
      postType={POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS}
    >
      <Container>
        <Title>👍 좋아요 누른 사람들</Title>
        <UserGrid>
          {users.length > 0 &&
            users.map(user => (
              <UserWrapper key={user.id}>
                <Avatar size="SM" imageURL={user.profileImageUrl} alt={user.nickName} key={user.id}></Avatar>
                <UserNickName>{user.nickName}</UserNickName>
              </UserWrapper>
            ))}
        </UserGrid>
      </Container>
    </FullScreenModal>
  );
};

export default LikingUsersModal;
