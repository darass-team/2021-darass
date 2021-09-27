import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { messageFromReplyModal } from "@/utils/postMessage";
import { useContext, useEffect, useState } from "react";
import { User } from "../../../../types/user";
import Avatar from "../../../atoms/Avatar";
import Modal from "../../../atoms/Modal";
import { Container, Title, UserNickName, UserGrid, UserWrapper } from "./styles";

const LikingUsersModal = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { port } = useContext(MessageChannelContext);

  const onCloseModal = () => {
    setIsOpen(false);
    messageFromReplyModal(port).closeLikingUserModal();
  };

  const onMessageLikingUserModal = ({ data }: MessageEvent) => {
    if (data.type !== POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS_MODAL) {
      return;
    }

    setUsers(data.data);
    setIsOpen(true);
  };

  useEffect(() => {
    if (port) {
      port.removeEventListener("message", onMessageLikingUserModal);
      port.addEventListener("message", onMessageLikingUserModal);
      port.start();
    }
  }, [port]);

  return (
    <Modal isOpen={isOpen} closeModal={onCloseModal} fadeInFrom="center">
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
    </Modal>
  );
};

export default LikingUsersModal;
