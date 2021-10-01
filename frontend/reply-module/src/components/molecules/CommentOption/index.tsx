import threeDots from "@/assets/svg/three-dots.svg";
import Modal from "@/components/atoms/Modal";
import { useRef, useState } from "react";
import { Container, DeleteButton, EditButton, OptionContainer, OptionIcon } from "./styles";

export interface Props {
  className?: string;
  startEditing?: () => void;
  startDeleting?: () => void;
}

const CommentOption = ({ className, startEditing, startDeleting }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const $optionIcon = useRef(null);

  const onToggleOptionBox = () => {
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
    <Container className={className}>
      <OptionIcon
        ref={$optionIcon}
        src={threeDots}
        alt="댓글 옵션"
        onClick={onToggleOptionBox}
        data-testid="comment-option"
      />
      <Modal isOpen={isShowOptionBox} closeModal={() => setShowOptionBox(false)} dimmedOpacity={0}>
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
      </Modal>
    </Container>
  );
};

export default CommentOption;
