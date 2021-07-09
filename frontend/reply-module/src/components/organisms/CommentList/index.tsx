import { Comment as CommentType } from "../../../types";
import Comment from "../../molecules/Comment";
import { CommentContainer, Container, OrderButton, OrderButtonCotainer, OrderButtonWrapper } from "./styles";

export interface Props {
  comments: CommentType[];
}

const CommentList = ({ comments }: Props) => {
  return (
    <Container>
      <OrderButtonCotainer>
        <OrderButtonWrapper>
          <OrderButton type="button">최신순</OrderButton>
          <OrderButton type="button">공감순</OrderButton>
          <OrderButton type="button">과거순</OrderButton>
        </OrderButtonWrapper>
      </OrderButtonCotainer>
      <CommentContainer>
        {comments.map(comment => (
          <Comment comment={comment} key={comment.id} shouldShowOption align="right" />
        ))}
      </CommentContainer>
    </Container>
  );
};

export default CommentList;
