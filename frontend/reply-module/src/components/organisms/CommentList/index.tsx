import { Comment as CommentType } from "../../../types";
import Comment from "../../molecules/Comment";
import { CommentContainer, Container, OrderButton, OrderButtonContainer, OrderButtonWrapper } from "./styles";

export interface Props {
  className?: string;
  comments: CommentType[];
}

const CommentList = ({ className, comments }: Props) => {
  return (
    <Container className={className}>
      <OrderButtonContainer>
        <OrderButtonWrapper>
          <OrderButton type="button">최신순</OrderButton>
          <OrderButton type="button">공감순</OrderButton>
          <OrderButton type="button">과거순</OrderButton>
        </OrderButtonWrapper>
      </OrderButtonContainer>
      <CommentContainer>
        {comments.map(comment => (
          <Comment comment={comment} key={comment.id} shouldShowOption align="right" />
        ))}
      </CommentContainer>
    </Container>
  );
};

export default CommentList;