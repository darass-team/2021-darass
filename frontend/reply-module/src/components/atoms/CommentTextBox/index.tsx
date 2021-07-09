import { Container, Name, Text } from "./styles";

export interface Props {
  name: string;
  children: string;
  contentEditable?: boolean;
}

const CommentTextBox = ({ name, children, contentEditable = false }: Props) => {
  return (
    <Container>
      <Name>{name}</Name>
      <Text contentEditable={contentEditable}>{children}</Text>
    </Container>
  );
};

export default CommentTextBox;
