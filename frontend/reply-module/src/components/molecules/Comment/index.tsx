import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { messageFromReplyModule } from "@/utils/postMessage";
import { useContext, useEffect, useState } from "react";
import { GUEST_IMAGE_URL, MAX_COMMENT_INPUT_LENGTH } from "@/constants/comment";
import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { useDeleteComment, useEditComment, useLikeComment, useInput, useConfirmGuestPassword } from "@/hooks";
import { Comment as CommentType } from "@/types";
import { User } from "@/types/user";
import { AlertError } from "@/utils/alertError";
import CommentTextBox from "../CommentTextBox";
import CommentBottom from "./CommentBottom";
import PasswordForm from "./PasswordForm";
import {
  CommentInput,
  CommentOption,
  CommentWrapper,
  Container,
  LikingUsersButton,
  Avatar,
  ContentWrapper,
  SubCommentWrapper
} from "./styles";
import SubComment from "./SubComment";
import { isEmptyString } from "@/utils/isEmptyString";
import { getErrorMessage } from "@/utils/errorMessage";

export interface Props {
  user?: User;
  projectOwnerId?: User["id"];
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

  const { port } = useContext(MessageChannelContext);

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

  const getConfirmResultFromParentWindow = (message: string) =>
    new Promise(resolve => {
      messageFromReplyModule(port).openConfirmModal(message);

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

  const confirmDelete = async () => {
    try {
      const confirmResult = await getConfirmResultFromParentWindow("정말 지우시겠습니까?");

      if (confirmResult === "no") {
        return;
      }

      await deleteComment({
        id: comment.id,
        guestUserId: comment.user.id,
        guestUserPassword: password
      });
    } catch (error) {
      if (error instanceof AlertError) {
        messageFromReplyModule(port).openAlert(error.message);
      }
    } finally {
      resetState();
    }
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

      setEditMode(false);
    } catch (error) {
      if (error instanceof AlertError) {
        messageFromReplyModule(port).openAlert(error.message);
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

  useEffect(() => {
    messageFromReplyModule(port).setScrollHeight();
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
        <SubCommentWrapper>
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
                onCloseSubCommentInput={onCloseSubCommentInput}
              />
            );
          })}
        </SubCommentWrapper>
      )}

      {isSubCommentInputOpen && (
        <CommentInput user={user} parentCommentId={comment.id} onClose={onCloseSubCommentInput} />
      )}
    </>
  );
};

export default Comment;
