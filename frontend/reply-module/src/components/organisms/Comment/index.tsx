import { Comment as CommentType } from "@/types";
import { User } from "@/types/user";
import CommentBottom from "../../molecules/CommentBottom";
import CommentTextBox from "../../molecules/CommentTextBox";
import PasswordForm from "../../molecules/PasswordForm";
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
import { useComment } from "./useComment";

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
  const {
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
  } = useComment({
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
  });

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
          data-testid="comment-input"
        />
      )}
    </>
  );
};

export default Comment;
