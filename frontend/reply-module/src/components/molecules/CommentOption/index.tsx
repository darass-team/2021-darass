import threeDots from "@/assets/svg/three-dots.svg";
import Modal from "@/components/atoms/Modal";
import { useState } from "react";
import { Container, DeleteButton, EditButton, OptionContainer, OptionIcon } from "./styles";

export interface Props {
  isVisibleEditButton: boolean;
  isVisibleDeleteButton: boolean;
  onClickEditButton: () => void;
  onClickDeleteButton: () => void;
}

const CommentOption = ({
  isVisibleEditButton,
  isVisibleDeleteButton,
  onClickEditButton,
  onClickDeleteButton,
  ...props
}: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);

  const onToggleOptionBox = () => {
    setShowOptionBox(state => !state);
  };

  const onEdit = () => {
    if (!isVisibleEditButton) return;
    onClickEditButton();
    setShowOptionBox(false);
  };

  const onDelete = () => {
    if (!isVisibleDeleteButton) return;
    onClickDeleteButton();
    setShowOptionBox(false);
  };

  return (
    <Container {...props}>
      <OptionIcon src={threeDots} alt="댓글 옵션" onClick={onToggleOptionBox} />
      <Modal isOpen={isShowOptionBox} closeModal={() => setShowOptionBox(false)} dimmedOpacity={0}>
        <OptionContainer>
          {isVisibleEditButton && (
            <EditButton type="button" onClick={onEdit} data-testid="comment-option-edit-button">
              수정
            </EditButton>
          )}
          {isVisibleDeleteButton && (
            <DeleteButton type="button" onClick={onDelete} data-testid="comment-option-delete-button">
              삭제
            </DeleteButton>
          )}
        </OptionContainer>
      </Modal>
    </Container>
  );
};

export default CommentOption;
