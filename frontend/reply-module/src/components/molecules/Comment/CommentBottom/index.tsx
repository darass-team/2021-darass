import { getTimeDifference } from "@/utils/time";
import { Container, LikeButton, AddSubCommentButton, Time } from "./styles";

export interface Props {
  isLiked: boolean;
  isSubComment: boolean;
  onClickLikeButton: () => void;
  onClickAddSubCommentButton: () => void;
  commentCreatedDate: string;
}

const CommentBottom = ({
  isLiked,
  isSubComment,
  onClickLikeButton,
  onClickAddSubCommentButton,
  commentCreatedDate
}: Props) => {
  return (
    <Container>
      <LikeButton isLiked={isLiked} onClick={onClickLikeButton} type="button" data-testid="comment-bottom-like-button">
        좋아요
      </LikeButton>
      {!isSubComment && (
        <AddSubCommentButton onClick={onClickAddSubCommentButton} type="button">
          답글 달기
        </AddSubCommentButton>
      )}

      <Time>{getTimeDifference(commentCreatedDate)}</Time>
    </Container>
  );
};

export default CommentBottom;
