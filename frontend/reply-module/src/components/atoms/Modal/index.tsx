import { MouseEvent, ReactNode, useEffect, useRef } from "react";
import { Dimmed, Container } from "./styles";

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
  const DimmedRef = useRef(null);
  const onCloseModal = (event: MouseEvent) => {
    if (event.target !== DimmedRef.current) return;

    closeModal();
  };

  useEffect(() => {
    if (blockScroll) document.body.style.setProperty("overflow", isOpen ? "hidden" : "revert");
  }, [isOpen]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {};

    window.addEventListener("message", onMessage);

    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <>
      <Dimmed ref={DimmedRef} onClick={onCloseModal} isOpen={isOpen} opacity={dimmedOpacity} fadeInFrom={fadeInFrom} />
      <Container isOpen={isOpen} fadeInFrom={fadeInFrom}>
        {children}
      </Container>
    </>
  );
};

export default Modal;
