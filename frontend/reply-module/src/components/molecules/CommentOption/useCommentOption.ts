import { useState } from "react";
import { Props } from ".";

export const useCommentOption = ({
  isVisibleEditButton,
  isVisibleDeleteButton,
  onClickEditButton,
  onClickDeleteButton
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

  return { isShowOptionBox, onToggleOptionBox, onCloseModal, onEdit, onDelete };
};
