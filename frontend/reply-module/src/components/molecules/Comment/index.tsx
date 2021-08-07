import { FormEvent, useEffect, useState } from "react";
import { useDeleteComment, useEditComment, useLikeComment, useInput } from "../../../hooks";
import { Comment as CommentType } from "../../../types";
import { DeleteCommentRequestParameter } from "../../../types/comment";
import { User } from "../../../types/user";
import {
  postAlertMessage,
  postOpenConfirm,
  postOpenLikingUsersModal,
  postScrollHeightToParentWindow
} from "../../../utils/postMessage";
import { isEmptyString } from "../../../utils/isEmptyString";
import { getTimeDifference } from "../../../utils/time";
import Avatar from "../../atoms/Avatar";
import CommentTextBox from "../../atoms/CommentTextBox";
import {
  Button,
  LikeButton,
  CancelButton,
  CommentBottomWrapper,
  CommentOption,
  CommentTextBoxWrapper,
  CommentWrapper,
  Container,
  PasswordForm,
  PasswordInput,
  LikingUsersButton,
  Time,
  DownRightArrow
} from "./styles";
import { POST_MESSAGE_TYPE } from "../../../constants/postMessageType";
import { getPasswordConfirmResult } from "../../../api/getPasswordConfirmResult";
import { AlertError } from "../../../utils/Error";
import { MAX_COMMENT_INPUT_LENGTH } from "../../../constants/comment";
import { getErrorMessage } from "../../../utils/errorMessage";
import downRightArrowSVG from "../../../assets/svg/down-right-arrow.svg";

export interface Props {
  user: User | undefined;
  comment: CommentType;
  shouldShowOption?: boolean;
  iAmAdmin: boolean;
  thisCommentIsWrittenByAdmin: boolean;
  thisCommentIsMine: boolean;
  hasNestedComment: boolean;
  isNestedComment: boolean;
}

type SubmitType = "Edit" | "Delete";

const Comment = ({
  user,
  comment,
  shouldShowOption,
  iAmAdmin,
  thisCommentIsWrittenByAdmin,
  thisCommentIsMine,
  hasNestedComment,
  isNestedComment
}: Props) => {
  const [isEditing, setEditing] = useState(false);
  const [isPasswordSubmitted, setPasswordSubmitted] = useState(false);
  const [shouldShowPasswordInput, setShouldShowPasswordInput] = useState(false);
  const [submitType, setSubmitType] = useState<SubmitType | null>();
  const { value: password, setValue: setPassword, onChange: onChangePassword } = useInput("");
  const { editComment } = useEditComment();
  const { deleteComment } = useDeleteComment();
  const { likeComment } = useLikeComment();
  const isLiked = comment.likingUsers.some(likingUser => likingUser.id === user?.id);
  const clear = () => {
    setEditing(false);
    setPasswordSubmitted(false);
    setShouldShowPasswordInput(false);
    setSubmitType(null);
    setPassword("");
  };

  const canIEdit = (iAmAdmin && thisCommentIsMine) || !iAmAdmin;

  const confirmGuestPassword = async () => {
    try {
      const isCorrectPassword = await getPasswordConfirmResult({
        guestUserId: comment.user.id,
        guestUserPassword: password
      });

      return isCorrectPassword;
    } catch (error) {
      setPasswordSubmitted(true);
      return false;
    }
  };

  const startEditing = () => {
    setSubmitType("Edit");
    user ? setEditing(true) : setShouldShowPasswordInput(true);
  };

  const startDeleting = () => {
    setSubmitType("Delete");
    user ? confirmDelete() : setShouldShowPasswordInput(true);
  };

  const confirmDelete = async () => {
    const confirmResult = await new Promise(resolve => {
      postOpenConfirm("정말 지우시겠습니까?");

      window.addEventListener("message", ({ data }: MessageEvent) => {
        if (data.type === POST_MESSAGE_TYPE.CLOSE_CONFIRM || data.type === POST_MESSAGE_TYPE.CLOSE_MODAL) {
          resolve("no");

          return;
        }

        if (data.type === POST_MESSAGE_TYPE.CONFIRM_OK) {
          resolve("yes");
        }
      });
    });

    if (confirmResult === "no") {
      setSubmitType(null);

      return;
    }

    const deleteCommentRequestParameter: DeleteCommentRequestParameter = {
      id: comment.id,
      guestUserId: comment.user.id,
      guestUserPassword: password
    };

    try {
      await deleteComment(deleteCommentRequestParameter);
    } catch (error) {
      if (error instanceof AlertError) {
        postAlertMessage(error.message);
      }
    } finally {
      clear();
      setSubmitType(null);
    }
  };

  const onSubmitPassword = async (event: FormEvent<HTMLFormElement>, submitPasswordCallback: () => void) => {
    event.preventDefault();

    const isValidPassword = await confirmGuestPassword();

    if (!isValidPassword) {
      postAlertMessage("비밀번호가 일치하지 않습니다.");

      return;
    }

    submitPasswordCallback();
    setShouldShowPasswordInput(false);
  };

  const onSubmitEditedComment = async (content: CommentType["content"]) => {
    try {
      const isValidContent = !isEmptyString(content) && content.length <= MAX_COMMENT_INPUT_LENGTH;

      if (!isValidContent) {
        postAlertMessage(getErrorMessage.commentInput(content));

        return;
      }

      await editComment({
        id: comment.id,
        content,
        guestUserId: comment.user.id,
        guestUserPassword: password
      });

      clear();
    } catch (error) {
      if (error instanceof AlertError) {
        postAlertMessage(error.message);
      }
    } finally {
      setPassword("");
      setSubmitType(null);
    }
  };

  const onClickLikeButton = async () => {
    try {
      await likeComment({ user, commentId: comment.id });
    } catch (error) {
      if (error instanceof AlertError) {
        postAlertMessage(error.message);
      }
    }
  };

  const onLikingUsersModalOpen = () => {
    postOpenLikingUsersModal(comment.likingUsers);
  };

  useEffect(() => {
    postScrollHeightToParentWindow();
  }, [shouldShowPasswordInput, submitType]);

  useEffect(() => {
    clear();
  }, [user]);

  return (
    <Container data-testid="comment" isNestedComment={isNestedComment}>
      <CommentWrapper>
        {isNestedComment && <DownRightArrow src={downRightArrowSVG} />}
        <Avatar imageURL={comment.user.profileImageUrl} />
        <CommentTextBoxWrapper>
          <CommentTextBox
            name={comment.user.nickName}
            thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}
            isNestedComment={isNestedComment}
            contentEditable={isEditing}
            clear={clear}
            onSubmitEditedComment={onSubmitEditedComment}
          >
            {comment.content}
          </CommentTextBox>
          <CommentBottomWrapper>
            <LikeButton isLiked={isLiked} onClick={onClickLikeButton} data-testid="comment-like-button">
              좋아요
            </LikeButton>
            <Time>{getTimeDifference(comment.createdDate)}</Time>
          </CommentBottomWrapper>
          {shouldShowOption && !submitType && (
            <CommentOption startEditing={canIEdit ? startEditing : undefined} startDeleting={startDeleting} />
          )}
          {comment.likingUsers.length > 0 && (
            <LikingUsersButton
              numOfLikes={comment.likingUsers.length}
              isLiked={isLiked}
              onClick={onLikingUsersModalOpen}
            />
          )}
        </CommentTextBoxWrapper>
      </CommentWrapper>
      {shouldShowPasswordInput && shouldShowOption && (
        <PasswordForm
          isNestedComment={isNestedComment}
          onSubmit={event => {
            const submitPasswordCallback = submitType === "Edit" ? () => setEditing(true) : confirmDelete;

            onSubmitPassword(event, submitPasswordCallback);
          }}
        >
          <PasswordInput
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="댓글 작성 시 입력한 비밀번호 입력"
            isValidInput={!isPasswordSubmitted}
            data-testid="comment-guest-password-input"
          />
          <CancelButton onClick={() => clear()} data-testid="comment-guest-password-cancel-button">
            취소
          </CancelButton>
          <Button data-testid="comment-guest-password-submit-button">입력</Button>
        </PasswordForm>
      )}
    </Container>
  );
};

export default Comment;
