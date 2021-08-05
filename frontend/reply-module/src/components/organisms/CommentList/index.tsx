import { ORDER_BUTTON } from "../../../constants/orderButton";
import { Comment as CommentType } from "../../../types/comment";
import { Project } from "../../../types/project";
import { User } from "../../../types/user";
import Comment from "../../molecules/Comment";
import { ReactComponent as DownArrow } from "../../../assets/svg/down-arrow.svg";
import {
  CommentContainer,
  Container,
  Notice,
  OrderButton,
  OrderButtonContainer,
  OrderButtonWrapper,
  ShowMoreButton
} from "./styles";

export interface Props {
  className?: string;
  user?: User;
  project?: Project;
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
  comments,
  sortOption,
  notice,
  onSelectSortOption,
  onShowMoreComment
}: Props) => {
  return (
    <Container className={className}>
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
      <CommentContainer>
        {notice && <Notice>{notice}</Notice>}
        {!notice && comments.length === 0 ? (
          <Notice>아직 작성된 댓글이 없습니다.</Notice>
        ) : (
          comments.map(comment => {
            const authorId = comment.user.id;

            const iAmGuestUser = !user;
            const iAmAdmin = user !== undefined && project?.userId === user.id;

            const thisCommentIsMine = authorId !== undefined && authorId === user?.id;
            const thisCommentIsWrittenByAdmin = comment.user.id === project?.userId;
            const thisCommentIsWrittenByGuest = comment.user.type === "GuestUser";

            const align = thisCommentIsWrittenByAdmin ? "right" : "left";
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
      <ShowMoreButton onClick={onShowMoreComment}>
        <span>더 보기</span>
        <DownArrow />
      </ShowMoreButton>
    </Container>
  );
};

export default CommentList;
