import { postCloseLikingUsersModal } from "@/utils/postMessage";
import { MouseEvent, ReactNode, useEffect, useRef } from "react";
import { Dimmed } from "./styles";

export interface Props {
  isOpen: boolean;
  children: ReactNode;
  dimmedOpacity?: number;
  blockScroll?: boolean;
  closeModal: () => void;
}

const Modal = ({ isOpen, closeModal, children, dimmedOpacity = 0.6, blockScroll = true }: Props) => {
  const dimmedRef = useRef(null);
  const onCloseModal = (event: MouseEvent) => {
    if (event.target !== dimmedRef.current) return;

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
      <Dimmed ref={dimmedRef} onClick={onCloseModal} isOpen={isOpen} opacity={dimmedOpacity} />
      {children}
    </>
  );
};

export default Modal;
