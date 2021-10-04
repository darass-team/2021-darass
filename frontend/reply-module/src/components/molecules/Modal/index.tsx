import { ReactNode } from "react";
import { Container, Dimmed } from "./styles";
import { useModal } from "./useModal";

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
  const { onCloseModal } = useModal({
    isOpen,
    closeModal,
    children,
    dimmedOpacity,
    blockScroll,
    fadeInFrom
  });

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
