import CancelButton from "@/components/atoms/CancelButton";
import SubmitButton from "@/components/atoms/SubmitButton";
import { MAX_COMMENT_INPUT_LENGTH } from "@/constants/comment";
import { Comment } from "@/types";
import { User } from "@/types/user";
import { ButtonWrapper, Form, GuestInfo, TextBox, TextBoxWrapper, TextCount, Wrapper } from "./styles";
import { useCommentInput } from "./useCommentInput";

export interface Props {
  user?: User;
  parentCommentId?: Comment["id"];
  isSubComment: boolean;
  onClose?: () => void;
}

const CommentInput = ({ user, parentCommentId, isSubComment, onClose, ...props }: Props) => {
  const {
    onSubmit,
    $contentEditable,
    onInput,
    isFormSubmitted,
    isValidCommentInput,
    isValidGuestNickName,
    isValidGuestPassword,
    content,
    guestNickName,
    onChangeGuestNickName,
    isSubCommentInput,
    guestPassword,
    onChangeGuestPassword
  } = useCommentInput({ user, parentCommentId, isSubComment, onClose });

  return (
    <Form onSubmit={onSubmit} isSubCommentInput={isSubCommentInput} {...props}>
      <TextBoxWrapper>
        <TextBox
          ref={$contentEditable}
          contentEditable={true}
          onInput={onInput}
          isValidInput={!isFormSubmitted || isValidCommentInput}
          data-testid="comment-input-text-box"
        />
        <TextCount data-testid="comment-input-text-length">{`${content.length} / ${MAX_COMMENT_INPUT_LENGTH}`}</TextCount>
      </TextBoxWrapper>

      <Wrapper>
        {!user && (
          <div>
            <GuestInfo
              type="text"
              placeholder="이름"
              value={guestNickName}
              onChange={onChangeGuestNickName}
              isValidInput={!isFormSubmitted || isValidGuestNickName}
              isSubCommentInput={isSubCommentInput}
              data-testid="comment-input-guest-name"
            />
            <GuestInfo
              type="password"
              placeholder="비밀번호"
              value={guestPassword}
              onChange={onChangeGuestPassword}
              isValidInput={!isFormSubmitted || isValidGuestPassword}
              isSubCommentInput={isSubCommentInput}
              data-testid="comment-input-guest-password"
            />
          </div>
        )}
        <ButtonWrapper isSubCommentInput={isSubCommentInput}>
          {isSubCommentInput && onClose && (
            <CancelButton onClick={onClose} data-testid="comment-input-cancel-button">
              취소
            </CancelButton>
          )}
          <SubmitButton data-testid="comment-input-submit-button">등록</SubmitButton>
        </ButtonWrapper>
      </Wrapper>
    </Form>
  );
};

export default CommentInput;
