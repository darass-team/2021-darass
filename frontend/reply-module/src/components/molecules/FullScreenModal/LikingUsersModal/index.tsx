import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { postCloseLikingUsersModal } from "@/utils/postMessage";
import { useEffect, useState } from "react";
import { User } from "../../../../types/user";
import Avatar from "../../../atoms/Avatar";
import Modal from "../../../atoms/Modal";
import { Container, Title, UserNickName, UserGrid, UserWrapper } from "./styles";

const LikingUsersModal = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const onCloseModal = () => {
    setIsOpen(false);
    postCloseLikingUsersModal();
  };

  useEffect(() => {
    const onMessageLikingUserModal = ({ data }: MessageEvent) => {
      if (data.type !== POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS_MODAL) {
        return;
      }

      setUsers(data.data);
      setIsOpen(true);
    };

    window.addEventListener("message", onMessageLikingUserModal);

    return () => window.removeEventListener("message", onMessageLikingUserModal);
  }, []);

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
