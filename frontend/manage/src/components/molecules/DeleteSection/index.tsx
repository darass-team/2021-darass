import { Container, DeleteWrapper, DeleteAlertMessage, DeleteButton } from "./styles";

export interface Props {
  name: string;
  onDelete: () => void;
}

const DeleteSection = ({ name, onDelete }: Props) => {
  return (
    <Container>
      <h3>{`${name} 삭제`}</h3>
      <DeleteWrapper>
        <DeleteAlertMessage>{`${name}을(를) 삭제하면 복구할 수 없습니다.`}</DeleteAlertMessage>
        <DeleteButton onClick={onDelete}>{`${name} 삭제하기`}</DeleteButton>
      </DeleteWrapper>
    </Container>
  );
};

export default DeleteSection;
