import { MouseEventHandler, ReactNode, useEffect } from "react";
import { Container, Dimmed } from "./styles";

export type FadeInDirection = "back" | "center" | "top" | "bottom" | "left" | "right" | "none";

export interface Props {
  isOpen: boolean;
  children: ReactNode;
  dimmedOpacity?: number;
  blockScroll?: boolean;
  closeModal: () => void;
  fadeInFrom?: FadeInDirection;
}

const Modal = ({
  isOpen,
  closeModal,
  children,
  dimmedOpacity = 0.6,
  blockScroll = true,
  fadeInFrom = "back"
}: Props) => {
  const onCloseModal: MouseEventHandler<HTMLDivElement> = event => {
    event.preventDefault();

    closeModal();
  };

  useEffect(() => {
    if (blockScroll) document.body.style.setProperty("overflow", isOpen ? "hidden" : "revert");
  }, [isOpen]);

  return (
    <>
      <Dimmed
        onClick={onCloseModal}
        isOpen={isOpen}
        opacity={dimmedOpacity}
        fadeInFrom={fadeInFrom}
        data-testid="modal-dimmed"
      />
      <Container isOpen={isOpen} fadeInFrom={fadeInFrom} data-testid="modal-container">
        {children}
      </Container>
    </>
  );
};

export default Modal;
