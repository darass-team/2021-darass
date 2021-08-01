import { Comment as CommentType } from "../../../types";
import Comment from "../../molecules/Comment";
import { CommentContainer, Container, OrderButton, OrderButtonContainer, OrderButtonWrapper, Notice } from "./styles";
import { User } from "../../../types/user";
import { Project } from "../../../types/project";
import { MouseEvent, useState } from "react";

export interface Props {
  className?: string;
  comments: CommentType[];
  user?: User;
  project: Project | undefined;
}

const orderButtons = ["과거순", "최신순", "좋아요순"];

const CommentList = ({ className, comments, user, project }: Props) => {
  const [selectedOrder, setSelectedOrder] = useState("과거순");

  const onSelectOrderButton = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    setSelectedOrder(target.innerText);
  };

  return (
    <Container className={className}>
      <OrderButtonContainer>
        <OrderButtonWrapper>
          {orderButtons.map(orderButton => (
            <OrderButton
              type="button"
              key={orderButton}
              isSelected={selectedOrder === orderButton}
              onClick={onSelectOrderButton}
            >
              {orderButton}
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
