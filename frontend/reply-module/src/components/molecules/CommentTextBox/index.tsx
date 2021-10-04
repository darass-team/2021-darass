import SubmitButton from "@/components/atoms/SubmitButton";
import { Comment } from "@/types";
import { User } from "@/types/user";
import { ButtonWrapper, CancelButton, Container, Name, Text } from "./styles";
import { useCommentTextBox } from "./useCommentTextBox";

export interface Props {
  name: User["nickName"];
  children: Comment["content"];
  contentEditable?: boolean;
  thisCommentIsWrittenByAdmin: boolean;
  isSubComment: boolean;
  resetState: () => void;
  onSubmitEditedComment: (content: Comment["content"]) => void;
}

const CommentTextBox = ({
  name,
  children,
  contentEditable = false,
  thisCommentIsWrittenByAdmin,
  isSubComment,
  resetState,
  onSubmitEditedComment
}: Props) => {
  const { $contentEditable, onInput, onClickCancelButton, content } = useCommentTextBox({
    name,
    children,
    contentEditable,
    thisCommentIsWrittenByAdmin,
    isSubComment,
    resetState,
    onSubmitEditedComment
  });

  return (
    <Container isSubComment={isSubComment}>
      <Name thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}>{name}</Name>
      <Text
        ref={$contentEditable}
        contentEditable={contentEditable}
        isSubComment={isSubComment}
        suppressContentEditableWarning={true}
        onInput={onInput}
        data-testid="comment-text-box-contenteditable-input"
      />
      {contentEditable && (
        <ButtonWrapper>
          <CancelButton onClick={onClickCancelButton} data-testid="comment-text-box-cancel-button">
            취소
          </CancelButton>
          <SubmitButton
            type="button"
            onClick={() => onSubmitEditedComment(content)}
            data-testid="comment-text-box-submit-button"
          >
            등록
          </SubmitButton>
        </ButtonWrapper>
      )}
    </Container>
  );
};

export default CommentTextBox;
