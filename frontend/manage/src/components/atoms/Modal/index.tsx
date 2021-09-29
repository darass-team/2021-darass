import { MouseEvent, ReactNode, useEffect, useRef } from "react";
import { Dimmed, Container } from "./styles";

export type FadeInDirection = "back" | "center" | "top" | "bottom" | "left" | "right";

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
  const DimmedRef = useRef(null);
  const onCloseModal = (event: MouseEvent) => {
    if (event.target !== DimmedRef.current) return;

    closeModal();
  };

  useEffect(() => {
    if (blockScroll) document.body.style.setProperty("overflow", isOpen ? "hidden" : "revert");
  }, [isOpen]);

  return (
    <>
      <Dimmed ref={DimmedRef} onClick={onCloseModal} isOpen={isOpen} opacity={dimmedOpacity} />
      <Container isOpen={isOpen} fadeInFrom={fadeInFrom}>
        {children}
      </Container>
    </>
  );
};

export default Modal;
