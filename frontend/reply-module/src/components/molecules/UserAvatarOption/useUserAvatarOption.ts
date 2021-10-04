import { useEditUser, useGetAlarmContents, useMessageChannelFromReplyModuleContext, useUser } from "@/hooks";
import { AlertError } from "@/utils/alertError";
import { MouseEventHandler, useEffect, useState } from "react";
import { Props } from ".";

export const useUserAvatarOption = ({ user, children }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const { openAlarmModal, openAlert } = useMessageChannelFromReplyModuleContext();
  const { data: alarmContents, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime } = useGetAlarmContents();
  const { refetch: refetchUser } = useUser();
  const { editUser } = useEditUser();
  const avatarImageURL = user ? user.profileImageUrl : undefined;

  const onCloseShowOptionBox = () => {
    setShowOptionBox(false);
  };

  const onClickUserNickName: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();

    setShowOptionBox(state => !state);
  };

  const onClickAvatar: MouseEventHandler<HTMLImageElement> = event => {
    event.stopPropagation();

    setShowOptionBox(state => !state);
  };

  const onClickAlarmIcon = async () => {
    try {
      const formData = new FormData();
      formData.append("hasRecentAlarm", "false");

      await editUser(formData);
      await refetchUser();
      setHasNewAlarmOnRealTime?.(false);
    } catch (error) {
      if (error instanceof AlertError) {
        openAlert(error.message);

        return;
      }
    }

    openAlarmModal(alarmContents || []);
  };

  useEffect(() => {
    setShowOptionBox(false);
  }, [user]);

  return {
    onClickAlarmIcon,
    avatarImageURL,
    onClickUserNickName,
    isShowOptionBox,
    onCloseShowOptionBox,
    hasNewAlarmOnRealTime,
    onClickAvatar
  };
};
