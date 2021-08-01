import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Dimmed } from "./styles";

export interface Props {
  children: ReactNode;
  onCloseModal: () => void;
}

const $modalRoot = document.getElementById("modal-root");

const Modal = ({ children, onCloseModal }: Props) => {
  useEffect(() => {
    window.addEventListener("click", onCloseModal);

    return () => {
      window.removeEventListener("click", onCloseModal);
    };
  }, []);

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
