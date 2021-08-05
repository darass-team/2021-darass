import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { Container, Dimmed } from "./styles";

export interface Props {
  isOpen: boolean;
  children: ReactNode;
  closeModal: () => void;
}

const ModalPortal = ({ children }: Pick<Props, "children">) => {
  const $modal = document.getElementById("modal");

  if (!$modal) return <>{children}</>;

  return createPortal(children, $modal);
};

const Modal = ({ isOpen, closeModal, children }: Props) => {
  useEffect(() => {
    document.body.style.setProperty("overflow", isOpen ? "hidden" : "revert");
  }, [isOpen]);

  if (!isOpen) return <ModalPortal>{""}</ModalPortal>;

  return (
    <ModalPortal>
      <Dimmed onClick={closeModal}></Dimmed>
      <Container>{children}</Container>
    </ModalPortal>
  );
};

export default Modal;
