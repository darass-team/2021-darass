import threeDots from "@/assets/svg/three-dots.svg";
import Modal from "@/components/molecules/Modal";
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

  const onCloseModal = () => {
    setShowOptionBox(false);
  };

  const onEdit = () => {
    onClickEditButton();
    setShowOptionBox(false);
  };

  const onDelete = () => {
    onClickDeleteButton();
    setShowOptionBox(false);
  };

  return (
    <Container {...props}>
      <OptionIcon src={threeDots} alt="댓글 옵션" onClick={onToggleOptionBox} />
      <Modal isOpen={isShowOptionBox} closeModal={onCloseModal} dimmedOpacity={0} data-testid="comment-option-modal">
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
