import { FormEvent, useEffect, useState } from "react";
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
import { DeleteCommentRequestParameter } from "../../../types/comment";
import { postScrollHeightToParentWindow } from "../../../utils/iframePostMessage";

export interface Props {
  user: User | undefined;
  comment: CommentType;
  align?: "left" | "right";
  shouldShowOption?: boolean;
}

type SubmitType = "Edit" | "Delete";

const Comment = ({ user, comment, align = "left", shouldShowOption }: Props) => {
  const [isEditing, setEditing] = useState(false);
  const [shouldShowPasswordInput, setShouldShowPasswordInput] = useState(false);
  const [submitType, setSubmitType] = useState<SubmitType | null>();
  const { value: password, setValue: setPassword, onChange: onChangePassword } = useInput("");
  const [isPasswordSubmitted, setPasswordSubmitted] = useState(false);
  const { editComment } = useEditComment();
  const { deleteComment } = useDeleteComment();

  useEffect(() => {
    postScrollHeightToParentWindow();
  }, [shouldShowPasswordInput]);

  const confirmGuestPassword = async () => {
    try {
      await editComment({
        id: comment.id,
        content: comment.content,
        guestUserId: comment.user.id,
        guestUserPassword: password
      });

      setPasswordSubmitted(false);

      return true;
    } catch (error) {
      console.error(error.message);
      setPasswordSubmitted(true);
      return false;
    }
  };

  const startEditing = () => {
    user ? setEditing(true) : setShouldShowPasswordInput(true);

    setSubmitType("Edit");
  };

  const startDeleting = () => {
    user ? confirmDelete() : setShouldShowPasswordInput(true);

    setSubmitType("Delete");
  };

  const confirmDelete = async () => {
    if (!confirm("정말 지우시겠습니까?")) return;

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
      setSubmitType(null);
    }
  };

  const submitPassword = async (event: FormEvent<HTMLFormElement>, submitPasswordCallback: () => void) => {
    event.preventDefault();

    const isValidPassword = await confirmGuestPassword();
    if (!isValidPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    submitPasswordCallback();

    setShouldShowPasswordInput(false);
  };

  const submitEditedComment = async (content: CommentType["content"]) => {
    try {
      await editComment({
        id: comment.id,
        content,
        guestUserId: comment.user.id,
        guestUserPassword: password
      });

      setEditing(false);
    } catch (error) {
      console.error(error.message);
    } finally {
      setPassword("");
      setSubmitType(null);
    }
  };

  return (
    <Container align={align}>
      <div>
        <CommentWrapper align={align}>
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
            {console.log(submitType)}
            {shouldShowOption && !submitType && (
              <CommentOption startEditing={startEditing} startDeleting={startDeleting} />
            )}
          </CommentTextBoxWrapper>
        </CommentWrapper>
        {shouldShowPasswordInput && (
          <PasswordForm
            onSubmit={event => {
              const submitPasswordCallback = submitType === "Edit" ? () => setEditing(true) : confirmDelete;

              submitPassword(event, submitPasswordCallback);
            }}
          >
            <PasswordInput
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="댓글 작성 시 입력한 비밀번호 입력"
              isValidInput={!isPasswordSubmitted}
            />
            <Button>입력</Button>
          </PasswordForm>
        )}
      </div>
    </Container>
  );
};

export default Comment;
