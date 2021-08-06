import { useRouteMatch } from "react-router-dom";
import { PROJECT_MENU } from "../../../constants";
import ScreenContainer from "../../../styles/ScreenContainer";
import ContainerWithSideBar from "../../organisms/ContainerWithSideBar";
import { Container, Title, ChartArea } from "./styles";

const Statistics = () => {
  const match = useRouteMatch<{ id: string }>();

  const projectId = Number(match.params.id);

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.get(projectId)}>
        <Container>
          <Title>통계</Title>
          <ChartArea>차트가 들어감</ChartArea>
        </Container>
      </ContainerWithSideBar>
    </ScreenContainer>
  );
};

export default Statistics;
