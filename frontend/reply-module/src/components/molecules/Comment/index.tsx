import { useState } from "react";
import { useDeleteComment, useEditComment } from "../../../hooks";
import { Comment as CommentType } from "../../../types";
import Avatar from "../../atoms/Avatar";
import CommentTextBox from "../../atoms/CommentTextBox";
import { Container, CommentTextBoxWrapper, Time, CommentOption } from "./styles";

export interface Props {
  comment: CommentType;
  align?: "left" | "right";

  shouldShowOption?: boolean;
}

const Comment = ({ comment, align = "left", shouldShowOption }: Props) => {
  const [isEditing, setEditing] = useState(false);
  const { editComment } = useEditComment();
  const { deleteComment } = useDeleteComment();

  const submitEditedComment = (content: CommentType["content"]) => {
    setEditing(false);
    editComment({ id: comment.id, content });
  };

  return (
    <Container align={align}>
      <Avatar imageURL={comment.user.profileImageUrl} />
      <CommentTextBoxWrapper align={align}>
        <CommentTextBox
          name={comment.user.nickName}
          contentEditable={isEditing}
          submitEditedComment={submitEditedComment}
        >
          {comment.content}
        </CommentTextBox>
        <Time>{comment.createdDate}</Time>
        {shouldShowOption && (
          <CommentOption startEditing={() => setEditing(true)} deleteComment={() => deleteComment(comment.id)} />
        )}
      </CommentTextBoxWrapper>
    </Container>
  );
};

export default Comment;
