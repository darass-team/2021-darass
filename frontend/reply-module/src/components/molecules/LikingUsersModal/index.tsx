import Avatar from "@/components/atoms/Avatar";
import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import FullScreenModal from "../FullScreenModal";
import { Container, Title, UserGrid, UserNickName, UserWrapper } from "./styles";
import { useLikingUserModal } from "./useLikingUserModal";

const LikingUsersModal = () => {
  const { isOpen, data, setData, openModal, onCloseModal } = useLikingUserModal();

  return (
    <FullScreenModal
      isOpen={isOpen}
      openModal={openModal}
      setValue={setData}
      postCloseModal={onCloseModal}
      postType={POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS}
    >
      <Container>
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
