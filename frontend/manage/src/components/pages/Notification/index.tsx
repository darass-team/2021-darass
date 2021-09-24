import ContainerWithSideBar from "@/components/organisms/ContainerWithSideBar";
import { PROJECT_MENU } from "@/constants";
import ScreenContainer from "@/styles/ScreenContainer";
import { useRouteMatch } from "react-router";
import { Container, Title } from "./styles";

const Notification = () => {
  const match = useRouteMatch<{ id?: string }>();
  const projectId = Number(match.params.id);

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.getByProjectId(projectId)}>
        <Container>
          <Title>알림</Title>
        </Container>
      </ContainerWithSideBar>
    </ScreenContainer>
  );
};

export default Notification;
