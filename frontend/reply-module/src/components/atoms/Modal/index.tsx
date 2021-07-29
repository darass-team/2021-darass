import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { Container, Dimmed } from "./styles";

export interface Props {
  children: ReactNode;
  onCloseModal: () => void;
}

const $modalRoot = document.getElementById("modal-root");

const Modal = ({ children, onCloseModal }: Props) => {
  if (!$modalRoot) return null;

  return ReactDOM.createPortal(
    <>
      <Dimmed onClick={onCloseModal}></Dimmed>
      <Container>{children}</Container>
    </>,
    $modalRoot
  );
};

export default Modal;
