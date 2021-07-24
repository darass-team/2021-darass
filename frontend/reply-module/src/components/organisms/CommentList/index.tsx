import { Comment as CommentType } from "../../../types";
import Comment from "../../molecules/Comment";
import { CommentContainer, Container, OrderButton, OrderButtonContainer, OrderButtonWrapper, Notice } from "./styles";
import { User } from "../../../types/user";
import { Project } from "../../../types/project";

export interface Props {
  className?: string;
  comments: CommentType[];
  user?: User;
  project: Project | undefined;
}

const CommentList = ({ className, comments, user, project }: Props) => {
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
        {comments.length === 0 ? (
          <Notice>아직 작성된 댓글이 없습니다.</Notice>
        ) : (
          comments.map(comment => {
            const authorId = comment.user.id;

            const iAmGuestUser = !user;
            const iAmAdmin = user !== undefined && project?.userId === user.id;

            const thisCommentIsMine = authorId !== undefined && authorId === user?.id;
            const thisCommentIsWrittenByGuest = comment.user.type === "GuestUser";

            const align = thisCommentIsMine ? "right" : "left";
            const shouldShowOption = iAmAdmin || thisCommentIsMine || (iAmGuestUser && thisCommentIsWrittenByGuest);

            return (
              <Comment
                user={user}
                comment={comment}
                key={comment.id}
                shouldShowOption={shouldShowOption}
                iAmAdmin={iAmAdmin}
                thisCommentIsMine={thisCommentIsMine}
                align={align}
              />
            );
          })
        )}
      </CommentContainer>
    </Container>
  );
};

export default CommentList;
