import AlarmContent from "@/components/molecules/AlarmContent";
import ContainerWithSideBar from "@/components/organisms/ContainerWithSideBar";
import { PROJECT_MENU } from "@/constants";
import ScreenContainer from "@/components/@style/ScreenContainer";
import { alarmContents } from "@/__test__/fixture/alarmContent";
import { useRouteMatch } from "react-router";
import { AlarmContainer, Container, Title } from "./styles";

const Notification = () => {
  const match = useRouteMatch<{ id?: string }>();
  const projectId = Number(match.params.id);

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.getByProjectId(projectId)}>
        <Container>
          <Title>알림</Title>
          <AlarmContainer>
            <AlarmContent alarmContents={alarmContents} />
          </AlarmContainer>
        </Container>
      </ContainerWithSideBar>
    </ScreenContainer>
  );
};

export default Notification;
