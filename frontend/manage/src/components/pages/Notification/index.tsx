import ScreenContainer from "@/components/@style/ScreenContainer";
import AlarmContent from "@/components/molecules/AlarmContent";
import { useDocumentTitle, useEditUser, useGetAlarmContents } from "@/hooks";
import { AlertError } from "@/utils/alertError";
import { useEffect } from "react";
import { AlarmContainer, Container, Title } from "./styles";

const Notification = () => {
  const { data: alarmContents, setHasNewAlarmOnRealTime } = useGetAlarmContents();
  const { editUser } = useEditUser();
  useDocumentTitle("알림");

  const readAlarm = async () => {
    try {
      const formData = new FormData();
      formData.append("hasRecentAlarm", "false");

      await editUser(formData);

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

  return (
    <ScreenContainer>
      <Container>
        <Title>알림</Title>
        <AlarmContainer>{alarmContents && <AlarmContent alarmContents={alarmContents || []} />}</AlarmContainer>
      </Container>
    </ScreenContainer>
  );
};

export default Notification;
