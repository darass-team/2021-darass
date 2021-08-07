import { ORDER_BUTTON } from "../../../constants/orderButton";
import { Comment as CommentType } from "../../../types/comment";
import { Project } from "../../../types/project";
import { User } from "../../../types/user";
import Comment from "../../molecules/Comment";
import {
  CommentContainer,
  CommentCount,
  CommentCountWrapper,
  Container,
  Header,
  Notice,
  OrderButton,
  OrderButtonContainer,
  OrderButtonWrapper
} from "./styles";

export interface Props {
  className?: string;
  user?: User;
  project?: Project;
  totalCommentsCount: number;
  comments: CommentType[];
  sortOption: keyof typeof ORDER_BUTTON;
  notice: string;
  onSelectSortOption: (value: keyof typeof ORDER_BUTTON) => void;
  onShowMoreComment: () => void;
}

const CommentList = ({
  className,
  user,
  project,
  totalCommentsCount,
  comments,
  sortOption,
  notice,
  onSelectSortOption
}: Props) => {
  return (
    <Container className={className}>
      <Header>
        <CommentCountWrapper>
          <span>댓글</span>
          <CommentCount>{totalCommentsCount || 0}</CommentCount>
        </CommentCountWrapper>
        <OrderButtonContainer>
          <OrderButtonWrapper>
            {Object.entries(ORDER_BUTTON).map(([key, value]) => (
              <OrderButton
                type="button"
                key={key}
                isSelected={sortOption === key}
                onClick={() => {
                  onSelectSortOption(key as keyof typeof ORDER_BUTTON);
                }}
              >
                {value}
              </OrderButton>
            ))}
          </OrderButtonWrapper>
        </OrderButtonContainer>
      </Header>
      <CommentContainer>
        {notice && <Notice>{notice}</Notice>}
        {comments.map((comment, index) => {
          const authorId = comment.user.id;

          const iAmGuestUser = !user;
          const iAmAdmin = user !== undefined && project?.userId === user.id;

          const thisCommentIsMine = authorId !== undefined && authorId === user?.id;
          const thisCommentIsWrittenByAdmin = comment.user.id === project?.userId;
          const thisCommentIsWrittenByGuest = comment.user.type === "GuestUser";
          const shouldShowOption = iAmAdmin || thisCommentIsMine || (iAmGuestUser && thisCommentIsWrittenByGuest);

          return (
            <Comment
              user={user}
              comment={comment}
              key={comment.id}
              thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}
              shouldShowOption={shouldShowOption}
              iAmAdmin={iAmAdmin}
              thisCommentIsMine={thisCommentIsMine}
              hasNestedComment={false}
              isNestedComment={index === 1 || index === 2 || index === 3}
            />
          );
        })}
      </CommentContainer>
    </Container>
  );
};

export default CommentList;
