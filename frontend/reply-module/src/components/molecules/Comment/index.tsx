import { FormEvent, useEffect, useState } from "react";
import { useConfirmGuestPassword, useDeleteComment, useEditComment, useLikeComment, useInput } from "../../../hooks";
import { Comment as CommentType } from "../../../types";
import { DeleteCommentRequestParameter } from "../../../types/comment";
import { User } from "../../../types/user";
import { postScrollHeightToParentWindow } from "../../../utils/iframePostMessage";
import { getTimeDifference } from "../../../utils/time";
import Avatar from "../../atoms/Avatar";
import CommentTextBox from "../../atoms/CommentTextBox";
import LikingUsersModal from "../LikingUsersModal";
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
  Time
} from "./styles";

export interface Props {
  user: User | undefined;
  comment: CommentType;
  align?: "left" | "right";
  shouldShowOption?: boolean;
  iAmAdmin: boolean;
  thisCommentIsMine: boolean;
}

type SubmitType = "Edit" | "Delete";

const Comment = ({ user, comment, align = "left", shouldShowOption, iAmAdmin, thisCommentIsMine }: Props) => {
  const [isEditing, setEditing] = useState(false);
  const [isLikingUsersModalOpen, setLikingUsersModalOpen] = useState(false);
  const [isPasswordSubmitted, setPasswordSubmitted] = useState(false);
  const [shouldShowPasswordInput, setShouldShowPasswordInput] = useState(false);
  const [submitType, setSubmitType] = useState<SubmitType | null>();
  const { value: password, setValue: setPassword, onChange: onChangePassword } = useInput("");
  const { editComment } = useEditComment();
  const { deleteComment } = useDeleteComment();
  const { likeComment } = useLikeComment();
  const { getPasswordConfirmResult } = useConfirmGuestPassword({
    guestUserId: comment.user.id,
    guestUserPassword: password
  });
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
      const { data } = await getPasswordConfirmResult();

      return !!data?.isCorrectPassword;
    } catch (error) {
      console.error(error.message);
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
    if (!confirm("정말 지우시겠습니까?")) {
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
      console.error(error.message);
      alert("댓글 제거에 실패하셨습니다.");
    } finally {
      clear();
      setSubmitType(null);
    }
  };

  const onSubmitPassword = async (event: FormEvent<HTMLFormElement>, submitPasswordCallback: () => void) => {
    event.preventDefault();

    const isValidPassword = await confirmGuestPassword();

    if (!isValidPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    submitPasswordCallback();
    setShouldShowPasswordInput(false);
  };

  const onSubmitEditedComment = async (content: CommentType["content"]) => {
    try {
      await editComment({
        id: comment.id,
        content,
        guestUserId: comment.user.id,
        guestUserPassword: password
      });

      clear();
    } catch (error) {
      console.error(error.message);
    } finally {
      setPassword("");
      setSubmitType(null);
    }
  };

  const onClickLikeButton = async () => {
    try {
      await likeComment({ user, commentId: comment.id });
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const onLikingUsersModalOpen = () => {
    setLikingUsersModalOpen(true);
  };

  const onLikingUsersModalClose = () => {
    setLikingUsersModalOpen(false);
  };

  useEffect(() => {
    postScrollHeightToParentWindow();
  }, [shouldShowPasswordInput]);

  useEffect(() => {
    clear();
  }, [user]);

  return (
    <Container data-testid="comment">
      <CommentWrapper align={align}>
        <Avatar imageURL={comment.user.profileImageUrl} />
        <CommentTextBoxWrapper align={align}>
          <CommentTextBox
            name={comment.user.nickName}
            contentEditable={isEditing}
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
          {console.log(shouldShowOption, submitType)}
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
          <CancelButton type="button" onClick={() => clear()} data-testid="comment-guest-password-cancel-button">
            취소
          </CancelButton>
          <Button data-testid="comment-guest-password-submit-button">입력</Button>
        </PasswordForm>
      )}
      {isLikingUsersModalOpen && (
        <LikingUsersModal users={comment.likingUsers} onCloseModal={onLikingUsersModalClose} />
      )}
    </Container>
  );
};

export default Comment;
