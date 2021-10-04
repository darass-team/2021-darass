import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { useState } from "react";

export const useAlertModal = () => {
  const [data, _setData] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const { closeAlertModal } = useMessageChannelFromReplyModalContext();

  const openModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    closeAlertModal();
  };

  const setData = (_data: string) => {
    _setData(_data);
  };

  return { isOpen, data, setData, openModal, onCloseModal };
};
