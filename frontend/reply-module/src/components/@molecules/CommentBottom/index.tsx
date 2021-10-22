import { getTimeDifference } from "@/utils/time";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Container, LikeButton, AddSubCommentButton, Time } from "./styles";

export interface Props {
  alreadyLiked: boolean;
  isSubComment: boolean;
  isReadable: boolean;
  onClickLikeButton: () => void;
  onClickAddSubCommentButton: () => void;
  commentCreatedDate: string;
}

const CommentBottom = ({
  alreadyLiked,
  isSubComment,
  isReadable,
  onClickLikeButton,
  onClickAddSubCommentButton,
  commentCreatedDate
}: Props) => {
  const {
    uiInfo: { isAllowSocialLogin }
  } = useContext(ThemeContext);

  return (
    <Container>
      {isReadable && isAllowSocialLogin && (
        <LikeButton
          isLiked={alreadyLiked}
          onClick={onClickLikeButton}
          type="button"
          data-testid="comment-bottom-like-button"
        >
          좋아요
        </LikeButton>
      )}
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
