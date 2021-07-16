import { useState } from "react";
import threeDots from "../../../assets/svg/three-dots.svg";
import { Container, DeleteButton, EditButton, OptionContainer, OptionIcon } from "./styles";

export interface Props {
  className?: string;
  startEditing: () => void;
  deleteComment: () => void;
}

const CommentOption = ({ className, startEditing, deleteComment }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const onShowOptionBox = () => {
    setShowOptionBox(state => !state);
  };

  const onDelete = () => {
    if (confirm("정말 지우시겠습니까?")) {
      deleteComment();
    }
  };

  return (
    <Container className={className}>
      <OptionIcon src={threeDots} alt="댓글 옵션" onClick={onShowOptionBox} />
      {isShowOptionBox && (
        <OptionContainer>
          <EditButton type="button" onClick={startEditing}>
            수정
          </EditButton>
          <DeleteButton type="button" onClick={onDelete}>
            삭제
          </DeleteButton>
        </OptionContainer>
      )}
    </Container>
  );
};

export default CommentOption;
