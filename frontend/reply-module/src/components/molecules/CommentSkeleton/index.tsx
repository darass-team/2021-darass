import { Container, CommentWrapper, CommentBottomWrapper } from "../Comment/styles";
import { Container as CommentTextBoxContainer } from "../CommentTextBox/styles";
import { Avatar, Name, Text, Buttons, CommentTextBoxWrapper } from "./styles";

const CommentSkeleton = () => {
  return (
    <Container isSubComment={false}>
      <CommentWrapper>
        <Avatar />
        <CommentTextBoxWrapper isSubComment={false}>
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
