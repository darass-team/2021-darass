import Avatar from "@/components/@atoms/Avatar";
import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { User } from "@/types/user";
import { useState } from "react";
import FullScreenModal from "@/components/@molecules/FullScreenModal";
import { Container, Title, UserGrid, UserNickName, UserWrapper } from "./styles";

const LikingUsersModal = () => {
  const [data, _setData] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { closeLikingUserModal } = useMessageChannelFromReplyModalContext();

  const openModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    closeLikingUserModal();
  };

  const setData = (_data: User[]) => {
    _setData(_data);
  };

  return (
    <FullScreenModal
      isOpen={isOpen}
      openModal={openModal}
      setValue={setData}
      postCloseModal={onCloseModal}
      postType={POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS}
    >
      <Container data-testid="liking-users-modal-container">
        <Title>👍 좋아요 누른 사람들</Title>
        <UserGrid>
          {data.length > 0 &&
            data.map(user => (
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
