import CancelButton from "@/components/atoms/Buttons/CancelButton";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { messageFromReplyModule } from "@/utils/postMessage";
import { ChangeEvent, FormEvent, MutableRefObject, RefObject, useContext, useEffect, useRef, useState } from "react";
import {
  GUEST_NICKNAME_MAX_LENGTH,
  GUEST_NICKNAME_MIN_LENGTH,
  GUEST_PASSWORD_MAX_LENGTH,
  GUEST_PASSWORD_MIN_LENGTH,
  MAX_COMMENT_INPUT_LENGTH
} from "@/constants/comment";
import { useContentEditable, useCreateComment, useInput } from "@/hooks";
import { Comment } from "@/types";
import { User } from "@/types/user";
import { AlertError } from "@/utils/alertError";
import { getErrorMessage } from "@/utils/errorMessage";
import { focusContentEditableTextToEnd } from "@/utils/focusContentEditableTextToEnd";
import { isEmptyString } from "@/utils/isEmptyString";
import SubmitButton from "@/components/atoms/Buttons/SubmitButton";
import { ButtonWrapper, Form, GuestInfo, TextBox, TextBoxWrapper, TextCount, Wrapper } from "./styles";

export interface Props {
  user: User | undefined;
  parentCommentId?: Comment["id"];
  onClose?: () => void;
}

// TODO: 얘는왜 Organism이지?
const CommentInput = ({ user, parentCommentId, onClose, ...props }: Props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const url = urlParams.get("url");
  const projectSecretKey = urlParams.get("projectKey");
  const isSubCommentInput = parentCommentId ? true : false;

  const { content, setContent, onInput: onInputContentEditable, $contentEditable } = useContentEditable("");
  const { value: guestNickName, onChange: onChangeGuestNickName, setValue: setGuestNickName } = useInput("");
  const { value: guestPassword, onChange: onChangeGuestPassword, setValue: setGuestPassword } = useInput("");
  const { createComment } = useCreateComment();
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const isValidCommentInput = !isEmptyString(content) && content.length <= MAX_COMMENT_INPUT_LENGTH;
  const isValidGuestNickName = !user
    ? GUEST_NICKNAME_MIN_LENGTH <= guestNickName.length && guestNickName.length <= GUEST_NICKNAME_MAX_LENGTH
    : true;
  const isValidGuestPassword = !user
    ? GUEST_PASSWORD_MIN_LENGTH <= guestPassword.length && guestPassword.length <= GUEST_PASSWORD_MAX_LENGTH
    : true;

  const { port } = useContext(MessageChannelContext);
  const commentInputRef = useRef<HTMLDivElement | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isValidCommentInput) {
      messageFromReplyModule(port).openAlert(getErrorMessage.commentInput(content));

      return;
    }

    if (!isValidGuestNickName) {
      messageFromReplyModule(port).openAlert(getErrorMessage.guestNickName(guestNickName));

      return;
    }

    if (!isValidGuestPassword) {
      messageFromReplyModule(port).openAlert(getErrorMessage.guestPassword(guestPassword));

      return;
    }

    try {
      const guestInfo = {
        guestNickName: guestNickName || undefined,
        guestPassword: guestPassword || undefined
      };

      await createComment({ content, url, projectSecretKey, ...guestInfo, parentId: parentCommentId });
      setContent("");
      setGuestNickName("");
      setGuestPassword("");
      if (onClose) onClose();
    } catch (error) {
      if (error instanceof AlertError) {
        messageFromReplyModule(port).openAlert(error.message);
      }
    } finally {
      setFormSubmitted(false);
    }
  };

  const onInput = (event: ChangeEvent<HTMLDivElement>) => {
    const currentText = event.target.textContent || "";

    if (currentText.length > MAX_COMMENT_INPUT_LENGTH) {
      messageFromReplyModule(port).openAlert(getErrorMessage.commentInput(currentText));
      setContent(currentText.substr(0, MAX_COMMENT_INPUT_LENGTH));

      if (!$contentEditable.current) return;
      focusContentEditableTextToEnd($contentEditable.current);

      return;
    }

    onInputContentEditable(event);
  };

  useEffect(() => {
    // TODO: 대댓글일떄 focus되는것이 현명하다.
    commentInputRef.current?.focus();
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      isSubCommentInput={isSubCommentInput}
      data-testid={isSubCommentInput ? "subCommentInput" : "commentInput"}
      {...props}
    >
      <TextBoxWrapper>
        <TextBox
          // ref={(element: HTMLDivElement) => {
          //   $contentEditable.current = element;
          //   if (!innerRef) return;
          //   innerRef.current = element;
          // }}
          ref={commentInputRef}
          contentEditable={true}
          onInput={onInput}
          isValidInput={!isFormSubmitted || isValidCommentInput}
          data-testid="comment-input-text-box"
        />
        <TextCount>{`${content.length} / ${MAX_COMMENT_INPUT_LENGTH}`}</TextCount>
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
          {isSubCommentInput && onClose && <CancelButton onClick={onClose}>취소</CancelButton>}
          <SubmitButton data-testid="comment-input-submit-button">등록</SubmitButton>
        </ButtonWrapper>
      </Wrapper>
    </Form>
  );
};

export default CommentInput;
