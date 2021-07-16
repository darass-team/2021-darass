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
          const authorId = comment.user.id;
          const thisCommentIsMine = authorId === user?.id;
          const iAmGuestUser = !user;
          const thisCommentIsWrittenByGuest = comment.user.type === "GuestUser";

          const align = thisCommentIsMine ? "right" : "left";
          const shouldShowOption = thisCommentIsMine || (iAmGuestUser && thisCommentIsWrittenByGuest);

          return (
            <Comment user={user} comment={comment} key={comment.id} shouldShowOption={shouldShowOption} align={align} />
          );
        })}
      </CommentContainer>
    </Container>
  );
};

export default CommentList;
