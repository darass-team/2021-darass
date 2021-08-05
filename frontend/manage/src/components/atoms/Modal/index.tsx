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

  return (
    <ModalPortal>
      <Dimmed onClick={closeModal} isOpen={isOpen}></Dimmed>
      <Container isOpen={isOpen}>{children}</Container>
    </ModalPortal>
  );
};

export default Modal;
