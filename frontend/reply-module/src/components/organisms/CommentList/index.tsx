import { ORDER_BUTTON } from "@/constants/orderButton";
import { Comment as CommentType } from "@/types/comment";
import { User } from "@/types/user";
import Comment from "@/components/molecules/Comment";
import CommentSkeleton from "@/components/molecules/CommentSkeleton";
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
  user?: User;
  projectOwnerId?: User["id"];
  isLoading: boolean;
  totalCommentsCount: number;
  comments: CommentType[];
  sortOption: keyof typeof ORDER_BUTTON;
  notice: string;
  onSelectSortOption: (value: keyof typeof ORDER_BUTTON) => void;
}

const CommentList = ({
  user,
  projectOwnerId,
  isLoading,
  totalCommentsCount,
  comments,
  sortOption,
  notice,
  onSelectSortOption,
  ...props
}: Props) => {
  return (
    <Container {...props}>
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
            const iAmAdmin = projectOwnerId === user?.id;

            const thisCommentIsMine = authorId !== undefined && authorId === user?.id;
            const thisCommentIsWrittenByAdmin = comment.user.id === projectOwnerId;
            const thisCommentIsWrittenByGuest = comment.user.type === "GuestUser";
            const isVisibleCommentOption =
              iAmAdmin || thisCommentIsMine || (iAmGuestUser && thisCommentIsWrittenByGuest);

            return (
              <Comment
                user={user}
                projectOwnerId={projectOwnerId}
                comment={comment}
                key={comment.id}
                thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}
                isVisibleCommentOption={isVisibleCommentOption}
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
