import { GUEST_IMAGE_URL, MAX_COMMENT_INPUT_LENGTH } from "@/constants/comment";
import {
  useDeleteComment,
  useEditComment,
  useInput,
  useLikeComment,
  useMessageChannelFromReplyModuleContext
} from "@/hooks";
import { Comment as CommentType } from "@/types";
import { User } from "@/types/user";
import { AlertError } from "@/utils/alertError";
import { getErrorMessage } from "@/utils/errorMessage";
import { isEmptyString } from "@/utils/isEmptyString";
import { messageFromReplyModule } from "@/utils/postMessage";
import { useEffect, useState } from "react";
import CommentTextBox from "../CommentTextBox";
import CommentBottom from "./CommentBottom";
import PasswordForm from "./PasswordForm";
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
import SubComment from "./SubComment";

export interface Props {
  user?: User;
  projectOwnerId: User["id"];
  comment: CommentType;
  isVisibleCommentOption: boolean;
  iAmAdmin: boolean;
  iAmGuestUser: boolean;
  hasLikingUser: boolean;
  hasSubComments: boolean;
  thisCommentIsWrittenByAdmin: boolean;
  thisCommentIsWrittenByGuest: boolean;
  thisCommentIsMine: boolean;
  isSubComment: boolean;
  alreadyLiked: boolean;
  canIEdit: boolean;
  canIDelete: boolean;
}

// TODO: organism 으로 옮기기
const Comment = ({
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
  const { value: password, setValue: setPassword, onChange: onChangePassword } = useInput("");

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

  const onSubmitEditedComment = async (content: CommentType["content"]) => {
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
          <Avatar imageURL={avatarImageURL} />

          <ContentWrapper>
            <CommentTextBox
              name={comment.user.nickName}
              thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}
              isSubComment={isSubComment}
              contentEditable={isEditMode}
              resetState={resetState}
              onSubmitEditedComment={onSubmitEditedComment}
            >
              {comment.content}
            </CommentTextBox>

            {isVisibleCommentOption && (
              <CommentOption
                isVisibleEditButton={canIEdit}
                isVisibleDeleteButton={!!onClickDeleteOptionButton}
                onClickEditButton={onClickEditOptionButton}
                onClickDeleteButton={onClickDeleteOptionButton}
                data-testid="comment-option"
              />
            )}

            <CommentBottom
              alreadyLiked={alreadyLiked}
              isSubComment={isSubComment}
              onClickLikeButton={onClickLikeButton}
              onClickAddSubCommentButton={onOpenSubCommentInput}
              commentCreatedDate={comment.createdDate}
            />

            {hasLikingUser && (
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
            onClose={() => setIsOpenPassWordForm(false)}
            onSubmitSuccess={() => {
              if (clickedOptionType === "Edit") {
                setEditMode(true);
              } else if (clickedOptionType === "Delete") {
                confirmDelete();
              }

              setIsOpenPassWordForm(false);
              setClickedOptionType(undefined);
            }}
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
            const isVisibleCommentOption =
              iAmAdmin || thisCommentIsMine || (iAmGuestUser && thisCommentIsWrittenByGuest);
            const hasLikingUser = subComment.likingUsers.length > 0;
            const hasSubComments = subComment?.subComments ? subComment.subComments.length > 0 : false;
            const alreadyLiked = subComment.likingUsers.some(likingUser => likingUser.id === user?.id);
            const canIEdit = thisCommentIsMine || (iAmGuestUser && thisCommentIsWrittenByGuest);
            const canIDelete = canIEdit || iAmAdmin;

            return (
              <SubComment
                key={subComment.id}
                user={user}
                projectOwnerId={projectOwnerId}
                comment={subComment}
                isVisibleCommentOption={isVisibleCommentOption}
                iAmAdmin={iAmAdmin}
                iAmGuestUser={iAmGuestUser}
                thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}
                thisCommentIsWrittenByGuest={thisCommentIsWrittenByGuest}
                thisCommentIsMine={thisCommentIsMine}
                isSubComment={true}
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
        />
      )}
    </>
  );
};

export default Comment;
