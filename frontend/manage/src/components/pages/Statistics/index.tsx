import { useRouteMatch } from "react-router-dom";
import { PROJECT_MENU } from "../../../constants";
import ScreenContainer from "../../../styles/ScreenContainer";
import CommentStatistics from "../../organisms/CommentStatistics";
import ContainerWithSideBar from "../../organisms/ContainerWithSideBar";
import { Container, Title, ChartArea } from "./styles";

const dummyData = [
  {
    time: "2020-1",
    count: 11200
  },
  {
    time: "2020-2",
    count: 20
  },
  {
    time: "2020-3",
    count: 100
  },
  {
    time: "2020-4",
    count: 140
  },
  {
    time: "2020-5",
    count: 80
  },
  {
    time: "2020-6",
    count: 222
  },
  {
    time: "2020-7",
    count: 999
  },
  {
    time: "2020-7",
    count: 999
  }
];

const Statistics = () => {
  const match = useRouteMatch<{ id: string }>();
  const projectId = Number(match.params.id);

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.get(projectId)}>
        <Container>
          <Title>통계</Title>

          <ChartArea>
            <CommentStatistics data={dummyData} />
          </ChartArea>
        </Container>
      </ContainerWithSideBar>
    </ScreenContainer>
  );
};

export default Statistics;
