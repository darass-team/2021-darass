import { Container, CommentWrapper, CommentTextBoxWrapper, CommentBottomWrapper } from "../Comment/styles";
import { Container as CommentTextBoxContainer } from "../../atoms/CommentTextBox/styles";
import { Avatar, Name, Text, Buttons } from "./styles";

const CommentSkeleton = () => {
  return (
    <Container>
      <CommentWrapper>
        <Avatar />
        <CommentTextBoxWrapper>
          <CommentTextBoxContainer isSubComment={false}>
            <Name thisCommentIsWrittenByAdmin={false} />
            <Text isSubComment={false} contentEditable={false} />
            <Text isSubComment={false} contentEditable={false} />
          </CommentTextBoxContainer>
          <CommentBottomWrapper>
            <Buttons />
          </CommentBottomWrapper>
        </CommentTextBoxWrapper>
      </CommentWrapper>
    </Container>
  );
};

export default CommentSkeleton;
