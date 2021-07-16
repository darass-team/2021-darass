import { Comment as CommentType } from "../../../types";
import { getTimeDifference } from "../../../utils/time";
import Avatar from "../../atoms/Avatar";
import CommentTextBox from "../../atoms/CommentTextBox";
import { Container, CommentTextBoxWrapper, Time, CommentOption } from "./styles";

export interface Props {
  comment: CommentType;
  align?: "left" | "right";

  shouldShowOption?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Comment = ({ comment, align = "left", shouldShowOption, onEdit, onDelete }: Props) => {
  return (
    <Container align={align}>
      <Avatar imageURL={comment.user.profileImageUrl} />
      <CommentTextBoxWrapper align={align}>
        <CommentTextBox name={comment.user.nickName}>{comment.content}</CommentTextBox>
        <Time>{comment.createdDate}</Time>
        {shouldShowOption && <CommentOption onEdit={onEdit} onDelete={onDelete} />}
      </CommentTextBoxWrapper>
    </Container>
  );
};

export default Comment;
