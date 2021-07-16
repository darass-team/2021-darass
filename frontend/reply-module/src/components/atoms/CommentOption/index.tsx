import { useState } from "react";
import threeDots from "../../../assets/svg/three-dots.svg";
import { Container, DeleteButton, EditButton, OptionContainer, OptionIcon } from "./styles";

export interface Props {
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const CommentOption = ({ className, onEdit, onDelete }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const onShowOptionBox = () => {
    setShowOptionBox(state => !state);
  };

  return (
    <Container className={className}>
      <OptionIcon src={threeDots} alt="댓글 옵션" onClick={onShowOptionBox} />
      {isShowOptionBox && (
        <OptionContainer>
          <EditButton type="button">수정</EditButton>
          <DeleteButton type="button">삭제</DeleteButton>
        </OptionContainer>
      )}
    </Container>
  );
};

export default CommentOption;