import { Comment as CommentType } from "../../../types";
import Comment from "../../molecules/Comment";
import { CommentContainer, Container, OrderButton, OrderButtonContainer, OrderButtonWrapper } from "./styles";
import { User } from "../../../types/user";

export interface Props {
  className?: string;
  comments: CommentType[];
  user?: User;
}

const CommentList = ({ className, comments, user }: Props) => {
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
        {comments.map(comment => {
          // TODO: 위치 조정

          return <Comment comment={comment} key={comment.id} shouldShowOption align="right" />;
        })}
      </CommentContainer>
    </Container>
  );
};

export default CommentList;
