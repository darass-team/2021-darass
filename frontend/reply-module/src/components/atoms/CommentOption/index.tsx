import { useState } from "react";
import threeDots from "../../../assets/svg/three-dots.svg";
import { Container, DeleteButton, EditButton, OptionContainer, OptionIcon } from "./styles";

export interface Props {
  className?: string;
  startEditing?: () => void;
  startDeleting?: () => void;
}

const CommentOption = ({ className, startEditing, startDeleting }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const onShowOptionBox = () => {
    setShowOptionBox(state => !state);
  };

  const onEdit = () => {
    if (!startEditing) return;
    startEditing();

    setShowOptionBox(false);
  };

  const onDelete = () => {
    if (!startDeleting) return;

    startDeleting();

    setShowOptionBox(false);
  };

  return (
    <Container className={className} data-testid="comment-option">
      <OptionIcon src={threeDots} alt="댓글 옵션" onClick={onShowOptionBox} />
      {isShowOptionBox && (
        <OptionContainer>
          {startEditing && (
            <EditButton type="button" onClick={onEdit} data-testid="comment-option-edit-button">
              수정
            </EditButton>
          )}
          {startDeleting && (
            <DeleteButton type="button" onClick={onDelete} data-testid="comment-option-delete-button">
              삭제
            </DeleteButton>
          )}
        </OptionContainer>
      )}
    </Container>
  );
};

export default CommentOption;
