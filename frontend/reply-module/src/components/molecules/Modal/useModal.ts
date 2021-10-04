import { MouseEventHandler, useEffect } from "react";
import { Props } from ".";

export const useModal = ({ isOpen, closeModal, children, dimmedOpacity, blockScroll, fadeInFrom }: Props) => {
  const onCloseModal: MouseEventHandler<HTMLDivElement> = event => {
    event.preventDefault();

    closeModal();
  };

  useEffect(() => {
    if (blockScroll) document.body.style.setProperty("overflow", isOpen ? "hidden" : "revert");
  }, [isOpen]);

  return { onCloseModal };
};
