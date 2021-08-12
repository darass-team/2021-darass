import { ORDER_BUTTON } from "../../../constants/orderButton";
import { Comment as CommentType } from "../../../types/comment";
import { Project } from "../../../types/project";
import { User } from "../../../types/user";
import Comment from "../../molecules/Comment";
import CommentSkeleton from "../../molecules/CommentSkeleton";
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
  isLoading: boolean;
  totalCommentsCount: number;
  comments: CommentType[];
  sortOption: keyof typeof ORDER_BUTTON;
  notice: string;
  onSelectSortOption: (value: keyof typeof ORDER_BUTTON) => void;
}

const CommentList = ({
  className,
  user,
  project,
  isLoading,
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
        {isLoading ? (
          <CommentSkeleton />
        ) : (
          comments.map(comment => {
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
                project={project}
                comment={comment}
                key={comment.id}
                thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}
                shouldShowOption={shouldShowOption}
                iAmAdmin={iAmAdmin}
                thisCommentIsMine={thisCommentIsMine}
                isSubComment={false}
              />
            );
          })
        )}
      </CommentContainer>
    </Container>
  );
};

export default CommentList;
