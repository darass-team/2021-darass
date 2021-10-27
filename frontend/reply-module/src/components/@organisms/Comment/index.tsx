import CommentBottom from "@/components/@molecules/CommentBottom";
import CommentTextBox from "@/components/@molecules/CommentTextBox";
import PasswordForm from "@/components/@molecules/PasswordForm";
import { GUEST_IMAGE_URL, MAX_COMMENT_INPUT_LENGTH } from "@/constants/comment";
import {
  useDeleteComment,
  useEditComment,
  useInput,
  useLikeComment,
  useMessageChannelFromReplyModuleContext
} from "@/hooks";
import { useGetSecretComment } from "@/hooks/api/comment/useGetSecretComment";
import { Comment as CommentType } from "@/types";
import { User } from "@/types/user";
import { getErrorMessage } from "@/utils/errorMessage";
import { isEmptyString } from "@/utils/isEmptyString";
import { useEffect, useState } from "react";
import SubComment from "../SubComment";
import {
  Avatar,
  CommentInput,
  CommentOption,
  CommentWrapper,
  Container,
  ContentWrapper,
  LikingUsersButton,
  SubCommentWrapper
} from "./styles";

export interface Props {
  user?: User;
  projectOwnerId?: User["id"];
  comment: CommentType;
  isVisibleCommentOption: boolean;
  isAllowToControl: boolean;
  iAmAdmin: boolean;
  iAmGuestUser: boolean;
  hasLikingUser: boolean;
  hasSubComments: boolean;
  thisCommentIsWrittenByAdmin: boolean;
  thisCommentIsWrittenByGuest: boolean;
  thisCommentIsMine: boolean;
  isSubComment: boolean;
  isReadable: boolean;
  alreadyLiked: boolean;
  canIEdit: boolean;
  canIDelete: boolean;
}

const Comment = ({
  user,
  projectOwnerId,
  comment,
  isVisibleCommentOption,
  isAllowToControl,
  iAmAdmin,
  iAmGuestUser,
  thisCommentIsWrittenByAdmin,
  thisCommentIsWrittenByGuest,
  thisCommentIsMine,
  isSubComment,
  isReadable,
  alreadyLiked,
  hasSubComments,
  hasLikingUser,
  canIEdit,
  canIDelete
}: Props) => {
  const [isSubCommentInputOpen, setSubCommentInputOpen] = useState(false);
  const [isOpenPassWordForm, setIsOpenPassWordForm] = useState(false);

  const [clickedOptionType, setClickedOptionType] = useState<"View" | "Edit" | "Delete">();
  const [isEditMode, setEditMode] = useState(false);
  const { value: password, setValue: _setPassword, onChange: onChangePassword } = useInput("");

  const setPassword = (_password: string) => {
    _setPassword(_password);
  };

  const { openConfirmModal, openAlert, openLikingUserModal, setScrollHeight } =
    useMessageChannelFromReplyModuleContext();

  const { refetch: getSecretComment } = useGetSecretComment({
    commentId: comment.id,
    guestUserId: comment.user.id,
    guestUserPassword: password
  });
  const { editComment } = useEditComment();
  const { deleteComment } = useDeleteComment();
  const { likeComment } = useLikeComment();

  const avatarImageURL = comment.user.profileImageUrl !== GUEST_IMAGE_URL ? comment.user.profileImageUrl : undefined;

  const resetState = () => {
    setEditMode(false);
    setClickedOptionType(undefined);
    setSubCommentInputOpen(false);
    setPassword("");
  };

  const onCliCkViewOptionButton = () => {
    if (!isAllowToControl) {
      openAlert("권한이 없습니다.");

      return;
    }
    resetState();
    setClickedOptionType("View");
    if (!user) {
      setIsOpenPassWordForm(true);
    }
  };

  const onClickEditOptionButton = () => {
    if (!isAllowToControl) {
      openAlert("권한이 없습니다.");

      return;
    }
    resetState();
    setClickedOptionType("Edit");
    if (user) {
      setEditMode(true);
    } else {
      setIsOpenPassWordForm(true);
    }
  };

  const onClickDeleteOptionButton = () => {
    if (!isAllowToControl) {
      openAlert("권한이 없습니다.");

      return;
    }
    resetState();
    setClickedOptionType("Delete");
    if (user) {
      confirmDelete();
    } else {
      setIsOpenPassWordForm(true);
    }
  };

  const confirmDelete = async () => {
    const confirmResult = await openConfirmModal("정말 지우시겠습니까?");

    if (confirmResult === "no") return;

    await deleteComment({
      id: comment.id,
      guestUserId: comment.user.id,
      guestUserPassword: password
    });

    resetState();
  };

  const onSubmitEditedComment = async ({ content, secret }: { content: CommentType["content"]; secret: boolean }) => {
    const isValidContent = !isEmptyString(content) && content.length <= MAX_COMMENT_INPUT_LENGTH;

    if (!isValidContent) {
      openAlert(getErrorMessage.commentInput(content));

      resetState();
      return;
    }

    await editComment({
      id: comment.id,
      content,
      guestUserId: comment.user.id,
      guestUserPassword: password,
      secret
    });

    setEditMode(false);

    resetState();
  };

  const onSuccessPasswordForm = () => {
    if (clickedOptionType === "Edit") {
      setEditMode(true);
    } else if (clickedOptionType === "Delete") {
      confirmDelete();
    } else if (clickedOptionType === "View") {
      getSecretComment();
    }

    setIsOpenPassWordForm(false);
    setClickedOptionType(undefined);
  };

  const onClickLikeButton = async () => {
    await likeComment({ commentId: comment.id });
  };

  const onLikingUsersModalOpen = () => {
    openLikingUserModal(comment.likingUsers);
  };

  const onClosePasswordForm = () => {
    setIsOpenPassWordForm(false);
  };

  const onOpenSubCommentInput = () => {
    setSubCommentInputOpen(true);
  };

  const onCloseSubCommentInput = () => {
    setSubCommentInputOpen(false);
  };

  useEffect(() => {
    setScrollHeight();
  }, [isSubCommentInputOpen]);

  useEffect(() => {
    setEditMode(false);
    setClickedOptionType(undefined);
    setSubCommentInputOpen(false);
  }, [user]);

  return (
    <>
      <Container>
        <CommentWrapper>
          <Avatar imageURL={isReadable ? avatarImageURL : undefined} />

          <ContentWrapper>
            <CommentTextBox
              name={comment.user.nickName}
              thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}
              isSubComment={isSubComment}
              thisCommentIsWrittenByGuest={thisCommentIsWrittenByGuest}
              isSecretComment={comment.secret}
              isReadable={isReadable}
              contentEditable={isEditMode}
              resetState={resetState}
              onSubmitEditedComment={onSubmitEditedComment}
            >
              {isReadable ? comment.content : "비밀글입니다."}
            </CommentTextBox>

            {isVisibleCommentOption && (
              <CommentOption
                isVisibleViewButton={!isReadable}
                isVisibleEditButton={canIEdit}
                isVisibleDeleteButton={!!onClickDeleteOptionButton}
                onClickViewButton={onCliCkViewOptionButton}
                onClickEditButton={onClickEditOptionButton}
                onClickDeleteButton={onClickDeleteOptionButton}
                data-testid="comment-option"
              />
            )}

            <CommentBottom
              alreadyLiked={alreadyLiked}
              isSubComment={isSubComment}
              isReadable={isReadable}
              onClickLikeButton={onClickLikeButton}
              onClickAddSubCommentButton={onOpenSubCommentInput}
              commentCreatedDate={comment.createdDate}
            />

            {hasLikingUser && isReadable && (
              <LikingUsersButton
                numOfLikes={comment.likingUsers.length}
                alreadyLiked={alreadyLiked}
                onClick={onLikingUsersModalOpen}
                data-testid="comment-liking-user-button"
              />
            )}
          </ContentWrapper>
        </CommentWrapper>

        {isOpenPassWordForm && (
          <PasswordForm
            authorId={comment.user.id}
            password={password}
            setPassword={setPassword}
            onChangePassword={onChangePassword}
            isSubComment={isSubComment}
            onClose={onClosePasswordForm}
            onSubmitSuccess={onSuccessPasswordForm}
            data-testid="comment-password-form"
          />
        )}
      </Container>

      {hasSubComments && (
        <SubCommentWrapper data-testid="comment-subcomment-wrapper">
          {comment.subComments.map(subComment => {
            const authorId = subComment.user.id;

            const iAmGuestUser = !user;
            const iAmAdmin = projectOwnerId !== undefined && projectOwnerId === user?.id;

            const thisCommentIsMine = authorId !== undefined && authorId === user?.id;
            const thisCommentIsWrittenByAdmin = subComment.user.id === projectOwnerId;
            const thisCommentIsWrittenByGuest = subComment.user.type === "GuestUser";
            const isVisibleCommentOption = true;
            const isAllowToControl = iAmAdmin || thisCommentIsMine || (iAmGuestUser && thisCommentIsWrittenByGuest);

            const hasLikingUser = subComment.likingUsers.length > 0;
            const hasSubComments = subComment?.subComments ? subComment.subComments.length > 0 : false;
            const alreadyLiked = subComment.likingUsers.some(likingUser => likingUser.id === user?.id);
            const thisParentCommentIsMine = comment.user.id === user?.id;

            const isReadable =
              thisParentCommentIsMine || thisCommentIsMine || iAmAdmin || !subComment.secret || subComment.readable;

            const canIEdit = thisCommentIsMine || (iAmGuestUser && thisCommentIsWrittenByGuest && isReadable);
            const canIDelete = canIEdit || iAmAdmin;

            return (
              <SubComment
                key={subComment.id + `${isReadable}` + subComment.content}
                user={user}
                projectOwnerId={projectOwnerId}
                comment={subComment}
                isVisibleCommentOption={isVisibleCommentOption}
                isAllowToControl={isAllowToControl}
                iAmAdmin={iAmAdmin}
                iAmGuestUser={iAmGuestUser}
                thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}
                thisCommentIsWrittenByGuest={thisCommentIsWrittenByGuest}
                thisCommentIsMine={thisCommentIsMine}
                isSubComment={true}
                isReadable={isReadable}
                alreadyLiked={alreadyLiked}
                hasSubComments={hasSubComments}
                hasLikingUser={hasLikingUser}
                canIEdit={canIEdit}
                canIDelete={canIDelete}
              />
            );
          })}
        </SubCommentWrapper>
      )}

      {isSubCommentInputOpen && (
        <CommentInput
          isSubComment={isSubComment}
          user={user}
          parentCommentId={comment.id}
          onClose={onCloseSubCommentInput}
          data-testid="comment-input"
        />
      )}
    </>
  );
};

export default Comment;
