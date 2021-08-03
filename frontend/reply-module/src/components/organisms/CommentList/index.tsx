import { MouseEvent, useState } from "react";
import { Comment as CommentType } from "../../../types/comment";
import { Project } from "../../../types/project";
import { User } from "../../../types/user";
import Comment from "../../molecules/Comment";
import { CommentContainer, Container, Notice, OrderButton, OrderButtonContainer, OrderButtonWrapper } from "./styles";

export interface Props {
  className?: string;
  user?: User;
  comments: CommentType[];
  project: Project;
  setSortOption: (value: string) => void;
}

const orderInfos = {
  과거순: "oldest",
  최신순: "latest",
  좋아요순: "like"
};

const CommentList = ({ className, user, project, comments, setSortOption }: Props) => {
  const [selectedOrder, setSelectedOrder] = useState("과거순");

  return (
    <Container className={className}>
      <OrderButtonContainer>
        <OrderButtonWrapper>
          {Object.entries(orderInfos).map(([key, value]) => (
            <OrderButton
              type="button"
              key={key}
              isSelected={selectedOrder === key}
              onClick={() => {
                setSelectedOrder(key);
                setSortOption(value);
              }}
            >
              {key}
            </OrderButton>
          ))}
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
