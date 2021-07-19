import { useState } from "react";
import threeDots from "../../../assets/svg/three-dots.svg";
import { Container, DeleteButton, EditButton, OptionContainer, OptionIcon } from "./styles";

export interface Props {
  className?: string;
  startEditing: () => void;
  startDeleting: () => void;
}

const CommentOption = ({ className, startEditing, startDeleting }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const onShowOptionBox = () => {
    setShowOptionBox(state => !state);
  };

  const onDelete = () => {
    startDeleting();

    setShowOptionBox(false);
  };

  const onStartEditing = () => {
    startEditing();

    setShowOptionBox(false);
  };

  return (
    <Container className={className}>
      <OptionIcon src={threeDots} alt="댓글 옵션" onClick={onShowOptionBox} />
      {isShowOptionBox && (
        <OptionContainer>
          <EditButton type="button" onClick={onStartEditing}>
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
