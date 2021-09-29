import ScreenContainer from "@/components/@style/ScreenContainer";
import AlarmContent from "@/components/molecules/AlarmContent";
import { useEditUser, useGetAlarmContents, useUser } from "@/hooks";
import { AlertError } from "@/utils/alertError";
import { useEffect } from "react";
import LoadingPage from "../LoadingPage";
import { AlarmContainer, Container, Title } from "./styles";

const Notification = () => {
  const { refetch: refetchUser } = useUser();
  const { data: alarmContents, setHasNewAlarmOnRealTime, isSuccess: isSuccessAlarmContents } = useGetAlarmContents();
  const { editUser } = useEditUser();

  const readAlarm = async () => {
    try {
      const formData = new FormData();
      formData.append("hasRecentAlarm", "false");

      await editUser(formData);
      await refetchUser();
      setHasNewAlarmOnRealTime?.(false);
    } catch (error) {
      if (error instanceof AlertError) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    if (alarmContents) {
      readAlarm();
    }
  }, [alarmContents]);

  if (!isSuccessAlarmContents) {
    return <LoadingPage />;
  }

  return (
    <ScreenContainer>
      <Container>
        <Title>알림</Title>
        <AlarmContainer>
          <AlarmContent alarmContents={alarmContents || []} />
        </AlarmContainer>
      </Container>
    </ScreenContainer>
  );
};

export default Notification;
