import { getTimeDifference } from "@/utils/time";
import { Container, LikeButton, AddSubCommentButton, Time } from "./styles";

export interface Props {
  alreadyLiked: boolean;
  isSubComment: boolean;
  onClickLikeButton: () => void;
  onClickAddSubCommentButton: () => void;
  commentCreatedDate: string;
}

const CommentBottom = ({
  alreadyLiked,
  isSubComment,
  onClickLikeButton,
  onClickAddSubCommentButton,
  commentCreatedDate
}: Props) => {
  return (
    <Container>
      <LikeButton
        isLiked={alreadyLiked}
        onClick={onClickLikeButton}
        type="button"
        data-testid="comment-bottom-like-button"
      >
        좋아요
      </LikeButton>
      {!isSubComment && (
        <AddSubCommentButton
          onClick={onClickAddSubCommentButton}
          type="button"
          data-testid="comment-bottom-add-subcomment-button"
        >
          답글 달기
        </AddSubCommentButton>
      )}

      <Time>{getTimeDifference(commentCreatedDate)}</Time>
    </Container>
  );
};

export default CommentBottom;
