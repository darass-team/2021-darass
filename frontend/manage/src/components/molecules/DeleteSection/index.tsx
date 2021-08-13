import { Container, DeleteWrapper, DeleteAlertMessage, DeleteButton } from "./styles";

export interface Props {
  title: string;
  message: string;
  buttonText: string;
  onDelete: () => void;
}

const DeleteSection = ({ onDelete, title, message, buttonText }: Props) => {
  return (
    <Container>
      <h3>{title}</h3>
      <DeleteWrapper>
        <DeleteAlertMessage>{message}</DeleteAlertMessage>
        <DeleteButton onClick={onDelete}>{buttonText}</DeleteButton>
      </DeleteWrapper>
    </Container>
  );
};

export default DeleteSection;
