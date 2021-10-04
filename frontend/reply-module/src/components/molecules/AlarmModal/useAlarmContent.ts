import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { GetAlarmResponse } from "@/types/comment";
import { useState } from "react";

export const useAlarmModal = () => {
  const [data, _setData] = useState<GetAlarmResponse[]>();
  const [isOpen, setIsOpen] = useState(false);
  const { closeAlarmModal } = useMessageChannelFromReplyModalContext();

  const openModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    closeAlarmModal();
  };

  const setData = (_data: GetAlarmResponse[]) => {
    _setData(_data);
  };

  return { isOpen, data, setData, openModal, onCloseModal };
};
