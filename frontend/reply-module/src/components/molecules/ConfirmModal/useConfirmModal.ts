import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { GetAlarmResponse } from "@/types/comment";
import { useState } from "react";

export const useConfirmModal = () => {
  const [data, _setData] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const { closeConfirmModal, clickedConfirmOk } = useMessageChannelFromReplyModalContext();

  const openModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    closeConfirmModal();
  };

  const setData = (_data: string) => {
    _setData(_data);
  };

  const onClickConfirmOk = () => {
    setIsOpen(false);
    clickedConfirmOk();
  };

  return { isOpen, data, setData, openModal, onCloseModal, onClickConfirmOk };
};
