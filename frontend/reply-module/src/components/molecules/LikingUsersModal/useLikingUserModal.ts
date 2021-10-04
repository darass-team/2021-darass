import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { User } from "@/types/user";
import { useState } from "react";

export const useLikingUserModal = () => {
  const [data, _setData] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { closeLikingUserModal } = useMessageChannelFromReplyModalContext();

  const openModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    closeLikingUserModal();
  };

  const setData = (_data: User[]) => {
    _setData(_data);
  };

  return { isOpen, data, setData, openModal, onCloseModal };
};
