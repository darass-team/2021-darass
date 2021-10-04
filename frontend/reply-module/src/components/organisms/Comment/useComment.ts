import { GUEST_IMAGE_URL, MAX_COMMENT_INPUT_LENGTH } from "@/constants/comment";
import {
  useDeleteComment,
  useEditComment,
  useInput,
  useLikeComment,
  useMessageChannelFromReplyModuleContext
} from "@/hooks";
import { AlertError } from "@/utils/alertError";
import { useEffect, useState } from "react";
import { Props } from ".";
import { Comment } from "@/types";
import { isEmptyString } from "@/utils/isEmptyString";
import { getErrorMessage } from "@/utils/errorMessage";

export const useComment = ({
  user,
  projectOwnerId,
  comment,
  isVisibleCommentOption,
  iAmAdmin,
  iAmGuestUser,
  thisCommentIsWrittenByAdmin,
  thisCommentIsWrittenByGuest,
  thisCommentIsMine,
  isSubComment,
  alreadyLiked,
  hasSubComments,
  hasLikingUser,
  canIEdit,
  canIDelete
}: Props) => {
  const [isSubCommentInputOpen, setSubCommentInputOpen] = useState(false);
  const [isOpenPassWordForm, setIsOpenPassWordForm] = useState(false);

  const [clickedOptionType, setClickedOptionType] = useState<"Edit" | "Delete">();
  const [isEditMode, setEditMode] = useState(false);
  const { value: password, setValue: _setPassword, onChange: onChangePassword } = useInput("");

  const setPassword = (_password: string) => {
    _setPassword(_password);
  };

  const { openConfirmModal, openAlert, openLikingUserModal, setScrollHeight } =
    useMessageChannelFromReplyModuleContext();

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

  const onClickEditOptionButton = () => {
    resetState();
    setClickedOptionType("Edit");
    if (user) {
      setEditMode(true);
    } else {
      setIsOpenPassWordForm(true);
    }
  };

  const onClickDeleteOptionButton = () => {
    resetState();
    setClickedOptionType("Delete");
    if (user) {
      confirmDelete();
    } else {
      setIsOpenPassWordForm(true);
    }
  };

  const confirmDelete = async () => {
    try {
      const confirmResult = await openConfirmModal("정말 지우시겠습니까?");

      if (confirmResult === "no") return;

      await deleteComment({
        id: comment.id,
        guestUserId: comment.user.id,
        guestUserPassword: password
      });
    } catch (error) {
      if (error instanceof AlertError) {
        openAlert(error.message);
      }
    } finally {
      resetState();
    }
  };

  const onSubmitEditedComment = async (content: Comment["content"]) => {
    try {
      const isValidContent = !isEmptyString(content) && content.length <= MAX_COMMENT_INPUT_LENGTH;

      if (!isValidContent) {
        openAlert(getErrorMessage.commentInput(content));

        return;
      }

      await editComment({
        id: comment.id,
        content,
        guestUserId: comment.user.id,
        guestUserPassword: password
      });

      setEditMode(false);
    } catch (error) {
      if (error instanceof AlertError) {
        openAlert(error.message);
      }
    } finally {
      resetState();
    }
  };

  const onSuccessPasswordForm = () => {
    if (clickedOptionType === "Edit") {
      setEditMode(true);
    } else if (clickedOptionType === "Delete") {
      confirmDelete();
    }

    setIsOpenPassWordForm(false);
    setClickedOptionType(undefined);
  };

  const onClickLikeButton = async () => {
    try {
      await likeComment({ commentId: comment.id });
    } catch (error) {
      if (error instanceof AlertError) {
        openAlert(error.message);
      }
    }
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

  return {
    avatarImageURL,
    isEditMode,
    resetState,
    onSubmitEditedComment,
    onClickDeleteOptionButton,
    onClickEditOptionButton,
    onClickLikeButton,
    onOpenSubCommentInput,
    onLikingUsersModalOpen,
    isOpenPassWordForm,
    password,
    setPassword,
    onChangePassword,
    onClosePasswordForm,
    onSuccessPasswordForm,
    isSubCommentInputOpen,
    onCloseSubCommentInput
  };
};
