import { FormEvent, useState } from "react";
import { useDeleteComment, useEditComment, useInput } from "../../../hooks";
import { Comment as CommentType } from "../../../types";
import { getTimeDifference } from "../../../utils/time";
import Avatar from "../../atoms/Avatar";
import CommentTextBox from "../../atoms/CommentTextBox";
import {
  Container,
  CommentWrapper,
  CommentTextBoxWrapper,
  Time,
  CommentOption,
  PasswordForm,
  PasswordInput,
  Button
} from "./styles";
import { User } from "../../../types/user";

export interface Props {
  user: User | undefined;
  comment: CommentType;
  align?: "left" | "right";
  shouldShowOption?: boolean;
}

const Comment = ({ user, comment, align = "left", shouldShowOption }: Props) => {
  const [isEditing, setEditing] = useState(false);
  const [shouldShowPasswordInput, shouldShowPasswordInputState] = useState(false);
  const { value: password, onChange: onChangePassword } = useInput("");
  const { editComment } = useEditComment();
  const { deleteComment } = useDeleteComment();

  const startEditing = () => {
    user ? setEditing(true) : shouldShowPasswordInputState(true);
  };

  const submitPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await editComment({
        id: comment.id,
        content: comment.content,
        guestUserId: comment.user.id,
        guestUserPassword: password
      });

      shouldShowPasswordInputState(false);
      setEditing(true);
    } catch (error) {
      console.error(error);
    }
  };

  const submitEditedComment = (content: CommentType["content"]) => {
    setEditing(false);
    editComment({
      id: comment.id,
      content,
      guestUserId: comment.user.id,
      guestUserPassword: password
    });
  };

  return (
    <Container align={align}>
      <div>
        <CommentWrapper>
          <Avatar imageURL={comment.user.profileImageUrl} />
          <CommentTextBoxWrapper align={align}>
            <CommentTextBox
              name={comment.user.nickName}
              contentEditable={isEditing}
              submitEditedComment={submitEditedComment}
            >
              {comment.content}
            </CommentTextBox>
            <Time>{getTimeDifference(comment.createdDate)}</Time>
            {shouldShowOption && (
              <CommentOption startEditing={() => startEditing()} deleteComment={() => deleteComment(comment.id)} />
            )}
          </CommentTextBoxWrapper>
        </CommentWrapper>

        {shouldShowPasswordInput && (
          <PasswordForm onSubmit={submitPassword}>
            <PasswordInput
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="댓글 작성 시 입력한 비밀번호 입력"
            />
            <Button>입력</Button>
          </PasswordForm>
        )}
      </div>
    </Container>
  );
};

export default Comment;
