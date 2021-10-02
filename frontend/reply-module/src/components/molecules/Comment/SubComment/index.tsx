import Comment from "@/components/molecules/Comment";
import CommentInput from "@/components/organisms/CommentInput";
import { Comment as CommentType } from "@/types";
import { User } from "@/types/user";
import { useRef } from "react";
import { Container } from "./styles";

export interface Props {
  iAmAdmin: boolean;
  isMyComment: boolean;
  isAdminComment: boolean;
  isVisibleCommentOption: boolean;
  isVIsibleSubCommentInput: boolean;
  user?: User;
  parentCommentInfo: CommentType;
  subCommentInfo: CommentType;
  onCloseSubCommentInput: () => void;
}

const SubComment = ({
  iAmAdmin,
  isMyComment,
  isAdminComment,
  isVisibleCommentOption,
  isVIsibleSubCommentInput,
  user,
  parentCommentInfo,
  subCommentInfo,
  onCloseSubCommentInput
}: Props) => {
  const commentAuthor = subCommentInfo.user;

  return (
    <Container>
      <Comment
        user={commentAuthor}
        comment={subCommentInfo}
        thisCommentIsWrittenByAdmin={isAdminComment}
        isVisibleCommentOption={isVisibleCommentOption}
        iAmAdmin={iAmAdmin}
        thisCommentIsMine={isMyComment}
        isSubComment={true}
      />

      {isVIsibleSubCommentInput && (
        <CommentInput user={user} parentCommentId={parentCommentInfo.id} onClose={onCloseSubCommentInput} />
      )}
    </Container>
  );
};

export default SubComment;
