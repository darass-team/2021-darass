import { ReactNode, useEffect, MouseEvent, useRef } from "react";
import { createPortal } from "react-dom";
import { Dimmed } from "./styles";

export interface Props {
  isOpen: boolean;
  children: ReactNode;
  dimmedOpacity?: number;
  closeModal: () => void;
}

const ModalPortal = ({ children }: Pick<Props, "children">) => {
  const $modal = document.getElementById("modal");

  if (!$modal) return <>{children}</>;

  return createPortal(children, $modal);
};

const Modal = ({ isOpen, closeModal, children, dimmedOpacity = 0.6 }: Props) => {
  const dimmedRef = useRef(null);
  const onCloseModal = (event: MouseEvent) => {
    if (event.target !== dimmedRef.current) return;

    closeModal();
  };

  useEffect(() => {
    document.body.style.setProperty("overflow", isOpen ? "hidden" : "revert");
  }, [isOpen]);

  return (
    <>
      <Dimmed ref={dimmedRef} onClick={onCloseModal} isOpen={isOpen} opacity={dimmedOpacity} />
      {isOpen && children}
    </>
  );
};

export default Modal;
