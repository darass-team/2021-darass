import { FormEvent, useEffect, useRef, useState } from "react";
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
  SubmitButton,
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
  DownRightArrow,
  AddSubCommentButton,
  CommentInput,
  PasswordButtonWrapper
} from "./styles";
import { POST_MESSAGE_TYPE } from "../../../constants/postMessageType";
import { getPasswordConfirmResult } from "../../../api/getPasswordConfirmResult";
import { AlertError } from "../../../utils/Error";
import { MAX_COMMENT_INPUT_LENGTH } from "../../../constants/comment";
import { getErrorMessage } from "../../../utils/errorMessage";
import downRightArrowSVG from "../../../assets/svg/down-right-arrow.svg";
import { Project } from "../../../types/project";

export interface Props {
  user?: User;
  project?: Project;
  comment: CommentType;
  shouldShowOption?: boolean;
  iAmAdmin: boolean;
  thisCommentIsWrittenByAdmin: boolean;
  thisCommentIsMine: boolean;
  isSubComment: boolean;
}

type SubmitType = "Edit" | "Delete";

const Comment = ({
  user,
  project,
  comment,
  shouldShowOption,
  iAmAdmin,
  thisCommentIsWrittenByAdmin,
  thisCommentIsMine,
  isSubComment
}: Props) => {
  const [isEditing, setEditing] = useState(false);
  const [isPasswordSubmitted, setPasswordSubmitted] = useState(false);
  const [isSubCommentInputOpen, setSubCommentInputOpen] = useState(false);
  const [shouldShowPasswordInput, setShouldShowPasswordInput] = useState(false);
  const [submitType, setSubmitType] = useState<SubmitType | null>();
  const $passwordInput = useRef<HTMLInputElement | null>(null);
  const $subCommentInput = useRef<HTMLDivElement | null>(null);
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

      const onMessageDeleteComment = ({ data }: MessageEvent) => {
        if (data.type === POST_MESSAGE_TYPE.CONFIRM_NO || data.type === POST_MESSAGE_TYPE.MODAL.CLOSE.CONFIRM) {
          resolve("no");
          window.removeEventListener("message", onMessageDeleteComment);
        }

        if (data.type === POST_MESSAGE_TYPE.CONFIRM_OK) {
          resolve("yes");
          window.removeEventListener("message", onMessageDeleteComment);
        }
      };

      window.addEventListener("message", onMessageDeleteComment);
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
      await likeComment({ commentId: comment.id });
    } catch (error) {
      if (error instanceof AlertError) {
        postAlertMessage(error.message);
      }
    }
  };

  const onLikingUsersModalOpen = () => {
    postOpenLikingUsersModal(comment.likingUsers);
  };

  const onOpenSubCommentInput = () => {
    setSubCommentInputOpen(true);
  };

  const onCloseSubCommentInput = () => {
    setSubCommentInputOpen(false);
  };

  const hasSubComments = comment?.subComments ? comment.subComments.length > 0 : false;

  useEffect(() => {
    postScrollHeightToParentWindow();
  }, [shouldShowPasswordInput, submitType, isSubCommentInputOpen]);

  useEffect(() => {
    clear();
  }, [user]);

  useEffect(() => {
    if (!$passwordInput.current) return;

    $passwordInput.current.focus();
  }, [shouldShowPasswordInput]);

  useEffect(() => {
    if (!$subCommentInput.current) return;

    $subCommentInput.current.focus();
  }, [isSubCommentInputOpen]);

  return (
    <>
      <Container data-testid={isSubComment ? "subComment" : "comment"} isSubComment={isSubComment}>
        <CommentWrapper>
          {isSubComment && <DownRightArrow src={downRightArrowSVG} data-testid="downRightArrowImage" />}
          <Avatar imageURL={comment.user.profileImageUrl} />
          <CommentTextBoxWrapper>
            <CommentTextBox
              name={comment.user.nickName}
              thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}
              isSubComment={isSubComment}
              contentEditable={isEditing}
              clear={clear}
              onSubmitEditedComment={onSubmitEditedComment}
            >
              {comment.content}
            </CommentTextBox>
            {shouldShowOption && (
              <CommentOption startEditing={canIEdit ? startEditing : undefined} startDeleting={startDeleting} />
            )}
            <CommentBottomWrapper>
              <LikeButton isLiked={isLiked} onClick={onClickLikeButton} type="button" data-testid="comment-like-button">
                좋아요
              </LikeButton>
              {!isSubComment && (
                <AddSubCommentButton onClick={onOpenSubCommentInput} type="button">
                  답글 달기
                </AddSubCommentButton>
              )}
              <Time>{getTimeDifference(comment.createdDate)}</Time>
            </CommentBottomWrapper>
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
            isSubComment={isSubComment}
            onSubmit={event => {
              const submitPasswordCallback = submitType === "Edit" ? () => setEditing(true) : confirmDelete;

              onSubmitPassword(event, submitPasswordCallback);
            }}
          >
            <PasswordInput
              ref={$passwordInput}
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="댓글 작성 시 입력한 비밀번호 입력"
              isValidInput={!isPasswordSubmitted}
              data-testid="comment-guest-password-input"
            />
            <PasswordButtonWrapper>
              <CancelButton onClick={clear} data-testid="comment-guest-password-cancel-button">
                취소
              </CancelButton>
              <SubmitButton data-testid="comment-guest-password-submit-button">입력</SubmitButton>
            </PasswordButtonWrapper>
          </PasswordForm>
        )}
      </Container>
      {!hasSubComments && isSubCommentInputOpen && (
        <CommentInput
          innerRef={$subCommentInput}
          user={user}
          parentCommentId={comment.id}
          onClose={onCloseSubCommentInput}
        />
      )}
      {hasSubComments &&
        comment.subComments.map((subComment, index) => {
          const authorId = subComment.user.id;

          const iAmGuestUser = !user;
          const iAmAdmin = user !== undefined && project?.userId === user.id;

          const thisCommentIsMine = authorId !== undefined && authorId === user?.id;
          const thisCommentIsWrittenByAdmin = subComment.user.id === project?.userId;
          const thisCommentIsWrittenByGuest = subComment.user.type === "GuestUser";
          const shouldShowOption = iAmAdmin || thisCommentIsMine || (iAmGuestUser && thisCommentIsWrittenByGuest);
          const shouldShowSubCommentInput = isSubCommentInputOpen && index === comment.subComments.length - 1;

          return (
            <div key={subComment.id}>
              <Comment
                user={user}
                comment={subComment}
                thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}
                shouldShowOption={shouldShowOption}
                iAmAdmin={iAmAdmin}
                thisCommentIsMine={thisCommentIsMine}
                isSubComment={true}
              />

              {shouldShowSubCommentInput && (
                <CommentInput
                  innerRef={$subCommentInput}
                  user={user}
                  parentCommentId={comment.id}
                  onClose={onCloseSubCommentInput}
                />
              )}
            </div>
          );
        })}
    </>
  );
};

export default Comment;
