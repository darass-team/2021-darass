import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { DeleteCommentRequestParameter } from "@/types/comment";
import { messageFromReplyModule } from "@/utils/postMessage";
import { useContext, useEffect, useState } from "react";
import downRightArrowSVG from "@/assets/svg/down-right-arrow.svg";
import { GUEST_IMAGE_URL, MAX_COMMENT_INPUT_LENGTH } from "@/constants/comment";
import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { useDeleteComment, useEditComment, useLikeComment, useInput } from "@/hooks";
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
  IndentTab,
  LikingUsersButton,
  Avatar,
  ContentWrapper
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
  thisCommentIsWrittenByAdmin: boolean;
  thisCommentIsMine: boolean;
  isSubComment: boolean;
}

export type SubmitType = "Edit" | "Delete";

const Comment = ({
  user,
  projectOwnerId,
  comment,
  isVisibleCommentOption,
  iAmAdmin,
  thisCommentIsWrittenByAdmin,
  thisCommentIsMine,
  isSubComment
}: Props) => {
  const [isEditing, setEditing] = useState(false);
  const [isSubCommentInputOpen, setSubCommentInputOpen] = useState(false);
  const [isOpenPassWordForm, setIsOpenPassWordForm] = useState(false);
  const [submitType, setSubmitType] = useState<SubmitType | null>();
  const { value: password, setValue: setPassword, onChange: onChangePassword } = useInput("");

  const { editComment } = useEditComment();
  const { deleteComment } = useDeleteComment();
  const { likeComment } = useLikeComment();

  const { port } = useContext(MessageChannelContext);

  const canIEdit = (iAmAdmin && thisCommentIsMine) || !iAmAdmin;
  const avatarImageURL = comment.user.profileImageUrl !== GUEST_IMAGE_URL ? comment.user.profileImageUrl : undefined;
  const hasLikingUser = comment.likingUsers.length > 0;
  const hasSubComments = comment?.subComments ? comment.subComments.length > 0 : false;
  const isLiked = comment.likingUsers.some(likingUser => likingUser.id === user?.id);

  const resetState = () => {
    setEditing(false);
    setSubmitType(null);
    setIsOpenPassWordForm(false);
  };

  const startEditing = () => {
    setSubmitType("Edit");
    if (user) {
      setEditing(true);
    } else {
      setIsOpenPassWordForm(true);
    }
  };

  const onClickDeleteButton = () => {
    setSubmitType("Delete");
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
    const confirmResult = await getConfirmResultFromParentWindow("정말 지우시겠습니까?");

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
      resetState();
      setSubmitType(null);
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

      resetState();
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
      console.log("????");

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
  }, [submitType, isSubCommentInputOpen]);

  useEffect(() => {
    resetState();
  }, [user]);

  return (
    <>
      <Container isSubComment={isSubComment}>
        <CommentWrapper>
          {isSubComment && <IndentTab src={downRightArrowSVG} />}

          <Avatar imageURL={avatarImageURL} />

          <ContentWrapper>
            <CommentTextBox
              name={comment.user.nickName}
              thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}
              isSubComment={isSubComment}
              contentEditable={isEditing}
              resetState={resetState}
              onSubmitEditedComment={onSubmitEditedComment}
            >
              {comment.content}
            </CommentTextBox>

            {isVisibleCommentOption && (
              <CommentOption
                isVisibleEditButton={canIEdit}
                isVisibleDeleteButton={!!onClickDeleteButton}
                onClickEditButton={startEditing}
                onClickDeleteButton={onClickDeleteButton}
              />
            )}

            <CommentBottom
              isLiked={isLiked}
              isSubComment={isSubComment}
              onClickLikeButton={onClickLikeButton}
              onClickAddSubCommentButton={onOpenSubCommentInput}
              commentCreatedDate={comment.createdDate}
            />

            {hasLikingUser && (
              <LikingUsersButton
                numOfLikes={comment.likingUsers.length}
                isLiked={isLiked}
                onClick={onLikingUsersModalOpen}
              />
            )}
          </ContentWrapper>
        </CommentWrapper>

        {isOpenPassWordForm && (
          <PasswordForm
            password={password}
            setPassword={setPassword}
            onChangePassword={onChangePassword}
            isSubComment={isSubComment}
            currentComment={comment}
            resetState={resetState}
          />
        )}
      </Container>

      {isSubCommentInputOpen && (
        <CommentInput user={user} parentCommentId={comment.id} onClose={onCloseSubCommentInput} />
      )}

      {hasSubComments &&
        comment.subComments.map((subComment, index) => {
          const authorId = subComment.user.id;
          const iAmGuestUser = !user;
          const iAmAdmin = projectOwnerId === user?.id;
          const thisCommentIsMine = authorId !== undefined && authorId === user?.id;
          const thisCommentIsWrittenByAdmin = subComment.user.id === projectOwnerId;
          const thisCommentIsWrittenByGuest = subComment.user.type === "GuestUser";
          const isVisibleCommentOption = iAmAdmin || thisCommentIsMine || (iAmGuestUser && thisCommentIsWrittenByGuest);
          const shouldShowSubCommentInput = isSubCommentInputOpen && index === comment.subComments.length - 1;

          return (
            <SubComment
              key={subComment.id}
              iAmAdmin={iAmAdmin}
              isMyComment={thisCommentIsMine}
              isAdminComment={thisCommentIsWrittenByAdmin}
              isVisibleCommentOption={isVisibleCommentOption}
              isVIsibleSubCommentInput={shouldShowSubCommentInput}
              user={user}
              parentCommentInfo={comment}
              subCommentInfo={subComment}
              onCloseSubCommentInput={onCloseSubCommentInput}
            />
          );
        })}
    </>
  );
};

export default Comment;
