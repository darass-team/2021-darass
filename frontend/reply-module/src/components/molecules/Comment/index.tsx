import { QUERY } from "@/constants/api";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { messageFromReplyModule } from "@/utils/postMessage";
import { request } from "@/utils/request";
import axios from "axios";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import downRightArrowSVG from "../../../assets/svg/down-right-arrow.svg";
import { GUEST_IMAGE_URL, MAX_COMMENT_INPUT_LENGTH } from "../../../constants/comment";
import { POST_MESSAGE_TYPE } from "../../../constants/postMessageType";
import { useDeleteComment, useEditComment, useInput, useLikeComment } from "../../../hooks";
import { Comment as CommentType } from "../../../types";
import { DeleteCommentRequestParameter, GuestUserConfirmInfo } from "../../../types/comment";
import { Project } from "../../../types/project";
import { User } from "../../../types/user";
import { AlertError } from "../../../utils/alertError";
import { getErrorMessage } from "../../../utils/errorMessage";
import { isEmptyString } from "../../../utils/isEmptyString";
import { getTimeDifference } from "../../../utils/time";
import Avatar from "../../atoms/Avatar";
import CommentTextBox from "../../atoms/CommentTextBox";
import {
  AddSubCommentButton,
  CancelButton,
  CommentBottomWrapper,
  CommentInput,
  CommentOption,
  CommentTextBoxWrapper,
  CommentWrapper,
  Container,
  DownRightArrow,
  LikeButton,
  LikingUsersButton,
  PasswordButtonWrapper,
  PasswordForm,
  PasswordInput,
  SubmitButton,
  Time
} from "./styles";

export const getPasswordConfirmResult = async ({ guestUserId, guestUserPassword }: GuestUserConfirmInfo) => {
  try {
    const response = await request.get(QUERY.CHECK_GUEST_PASSWORD({ guestUserId, guestUserPassword }));

    return response.data.isCorrectPassword;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    throw new Error(error.response?.data.message);
  }
};

export interface Props {
  user?: User;
  projectOwnerId?: User["id"];
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
  projectOwnerId,
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
  const { port } = useContext(MessageChannelContext);

  const canIEdit = (iAmAdmin && thisCommentIsMine) || !iAmAdmin;
  const avatarImageURL = comment.user.profileImageUrl !== GUEST_IMAGE_URL ? comment.user.profileImageUrl : undefined;
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
      messageFromReplyModule(port).openConfirmModal("정말 지우시겠습니까?");

      const onMessageDeleteComment = ({ data }: MessageEvent) => {
        if (data.type === POST_MESSAGE_TYPE.CONFIRM_NO || data.type === POST_MESSAGE_TYPE.MODAL.CLOSE.CONFIRM) {
          resolve("no");
          port?.removeEventListener("message", onMessageDeleteComment);
        }

        if (data.type === POST_MESSAGE_TYPE.CONFIRM_OK) {
          resolve("yes");
          port?.removeEventListener("message", onMessageDeleteComment);
        }
      };

      port?.addEventListener("message", onMessageDeleteComment);
      port?.start();
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
        messageFromReplyModule(port).openAlert(error.message);
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
      messageFromReplyModule(port).openAlert("비밀번호가 일치하지 않습니다.");

      return;
    }

    submitPasswordCallback();
    setShouldShowPasswordInput(false);
  };

  const onSubmitEditedComment = async (content: CommentType["content"]) => {
    try {
      const isValidContent = !isEmptyString(content) && content.length <= MAX_COMMENT_INPUT_LENGTH;

      if (!isValidContent) {
        messageFromReplyModule(port).openAlert(getErrorMessage.commentInput(content));

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
        messageFromReplyModule(port).openAlert(error.message);
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
        messageFromReplyModule(port).openAlert(error.message);
      }
    }
  };

  const onLikingUsersModalOpen = () => {
    messageFromReplyModule(port).openLikingUserModal(comment.likingUsers);
  };

  const onOpenSubCommentInput = () => {
    setSubCommentInputOpen(true);
  };

  const onCloseSubCommentInput = () => {
    setSubCommentInputOpen(false);
  };

  const hasSubComments = comment?.subComments ? comment.subComments.length > 0 : false;

  useEffect(() => {
    messageFromReplyModule(port).setScrollHeight();
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
          <Avatar imageURL={avatarImageURL} />
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
          const iAmAdmin = user !== undefined && projectOwnerId === user.id;

          const thisCommentIsMine = authorId !== undefined && authorId === user?.id;
          const thisCommentIsWrittenByAdmin = subComment.user.id === projectOwnerId;
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
