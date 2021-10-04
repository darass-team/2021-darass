import Modal, { FadeInDirection } from "@/components/molecules/Modal";
import { ReactNode } from "react";
import { useFullScreenModal } from "./useFullScreenModal";

export interface Props {
  isOpen: boolean;
  openModal: () => void;
  setValue: (data: any) => void;
  children: ReactNode;
  postCloseModal: () => void;
  postType: string;
  fadeInFrom?: FadeInDirection;
}

const FullScreenModal = ({
  isOpen,
  openModal,
  setValue,
  children,
  postCloseModal,
  postType,
  fadeInFrom = "center"
}: Props) => {
  const { onCloseModal } = useFullScreenModal({
    isOpen,
    openModal,
    setValue,
    children,
    postCloseModal,
    postType,
    fadeInFrom
  });

  return (
    <Modal isOpen={isOpen} closeModal={onCloseModal} fadeInFrom={fadeInFrom}>
      {children}
    </Modal>
  );
};

export default FullScreenModal;
