import CancelButton from "@/components/@atoms/CancelButton";
import CheckBox from "@/components/@atoms/CheckBox";
import SubmitButton from "@/components/@atoms/SubmitButton";
import {
  GUEST_NICKNAME_MAX_LENGTH,
  GUEST_NICKNAME_MIN_LENGTH,
  GUEST_PASSWORD_MAX_LENGTH,
  GUEST_PASSWORD_MIN_LENGTH,
  MAX_COMMENT_INPUT_LENGTH
} from "@/constants/comment";
import { useTextArea, useCreateComment, useInput, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { Comment } from "@/types";
import { User } from "@/types/user";
import { resizeTextArea } from "@/utils/dom";
import { getErrorMessage } from "@/utils/errorMessage";
import { isEmptyString } from "@/utils/isEmptyString";
import { FormEvent, useEffect, useState } from "react";
import { ButtonWrapper, Form, GuestInfo, TextBox, TextBoxWrapper, TextCount, TextInfoWrapper, Wrapper } from "./styles";

export interface Props {
  user?: User;
  parentCommentId?: Comment["id"];
  isSubComment: boolean;
  onClose?: () => void;
}

const CommentInput = ({ user, parentCommentId, isSubComment, onClose, ...props }: Props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const url = urlParams.get("url");
  const projectSecretKey = urlParams.get("projectKey");

  const { openAlert } = useMessageChannelFromReplyModuleContext();
  const { createComment } = useCreateComment();

  const isSubCommentInput = parentCommentId ? true : false;

  const { content, setContent, onChangeTextArea, textAreaRef } = useTextArea("");
  const { value: guestNickName, onChange: onChangeGuestNickName, setValue: setGuestNickName } = useInput("");
  const { value: guestPassword, onChange: onChangeGuestPassword, setValue: setGuestPassword } = useInput("");
  const [isSecretComment, setIsSecretComment] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const isValidCommentInput = !isEmptyString(content) && content.length <= MAX_COMMENT_INPUT_LENGTH;
  const isValidGuestNickName = !user
    ? GUEST_NICKNAME_MIN_LENGTH <= guestNickName.length && guestNickName.length <= GUEST_NICKNAME_MAX_LENGTH
    : true;
  const isValidGuestPassword = !user
    ? GUEST_PASSWORD_MIN_LENGTH <= guestPassword.length && guestPassword.length <= GUEST_PASSWORD_MAX_LENGTH
    : true;

  const onClickSecretCommentCheckBox = () => {
    setIsSecretComment(state => !state);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormSubmitted(true);

    if (!isValidCommentInput) {
      openAlert(getErrorMessage.commentInput(content));

      return;
    }

    if (!isValidGuestNickName) {
      openAlert(getErrorMessage.guestNickName(guestNickName));

      return;
    }

    if (!isValidGuestPassword) {
      openAlert(getErrorMessage.guestPassword(guestPassword));

      return;
    }

    const guestInfo = {
      guestNickName: guestNickName || undefined,
      guestPassword: guestPassword || undefined
    };

    await createComment({
      content,
      url,
      projectSecretKey,
      ...guestInfo,
      parentId: parentCommentId,
      secret: isSecretComment
    });

    setContent("");
    setGuestNickName("");
    setGuestPassword("");
    setIsSecretComment(false);
    onClose?.();
    setFormSubmitted(false);
    if (textAreaRef.current) resizeTextArea(textAreaRef.current);
  };

  useEffect(() => {
    if (isSubComment) textAreaRef.current?.focus();
  }, []);

  return (
    <Form onSubmit={onSubmit} isSubCommentInput={isSubCommentInput} {...props}>
      <TextBoxWrapper>
        <TextBox
          value={content}
          ref={textAreaRef}
          onChange={onChangeTextArea}
          isValidInput={!isFormSubmitted || isValidCommentInput}
          data-testid="comment-input-text-box"
        />
        <TextInfoWrapper>
          <CheckBox isChecked={isSecretComment} onChange={onClickSecretCommentCheckBox} labelText="비밀글" />
          <TextCount>
            {content.length} / {MAX_COMMENT_INPUT_LENGTH}
          </TextCount>
        </TextInfoWrapper>
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
