import { User } from "../../../types/user";
import Avatar from "../../atoms/Avatar";
import Modal from "../../atoms/Modal";
import { Container, Title, UserNickName, UserGrid, UserWrapper } from "./styles";

export interface Props {
  users: User[];
  onCloseModal: () => void;
}

const LikingUsersModal = ({ users, onCloseModal }: Props) => {
  return (
    <Modal onCloseModal={onCloseModal}>
      <Container>
        <Title>👍 좋아요 누른 사람들</Title>
        <UserGrid>
          {users.map(user => (
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
