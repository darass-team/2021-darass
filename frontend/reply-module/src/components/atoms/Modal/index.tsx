import { ReactNode } from "react";
import { Container, Dimmed } from "./styles";

export interface Props {
  children: ReactNode;
}

const Modal = ({ children }: Props) => {
  const onCloseModal = () => {
    window.parent.postMessage({ type: "closeModal" }, "*");
  };

  return (
    <>
      <Dimmed onClick={onCloseModal}></Dimmed>
      <Container>{children}</Container>
    </>
  );
};

export default Modal;
