import AlarmContent from "@/components/molecules/AlarmContent";
import ContainerWithSideBar from "@/components/organisms/ContainerWithSideBar";
import { PROJECT_MENU } from "@/constants";
import ScreenContainer from "@/components/@style/ScreenContainer";
import { useRouteMatch } from "react-router";
import { AlarmContainer, Container, Title } from "./styles";
import { useEditUser, useGetAlarmContents, useUser } from "@/hooks";
import { useEffect } from "react";
import { AlertError } from "@/utils/alertError";
import LoadingPage from "../LoadingPage";

const Notification = () => {
  const match = useRouteMatch<{ id?: string }>();
  const projectId = Number(match.params.id);
  const { refetch: refetchUser } = useUser();
  const { data: alarmContents, setHasNewAlarmOnRealTime, isSuccess: isSuccessAlarmContents } = useGetAlarmContents();
  const { editUser } = useEditUser();

  const readAlarm = async () => {
    try {
      const formData = new FormData();
      formData.append("hasRecentAlarm", "false");

      await editUser(formData);
      await refetchUser();
      setHasNewAlarmOnRealTime(false);
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
      <ContainerWithSideBar menus={PROJECT_MENU.getByProjectId(projectId)}>
        <Container>
          <Title>알림</Title>
          <AlarmContainer>
            <AlarmContent alarmContents={alarmContents || []} />
          </AlarmContainer>
        </Container>
      </ContainerWithSideBar>
    </ScreenContainer>
  );
};

export default Notification;
