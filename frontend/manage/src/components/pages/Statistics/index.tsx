import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { PROJECT_MENU } from "../../../constants";
import { VIEW_OPTION } from "../../../constants/statistics";
import ScreenContainer from "../../../styles/ScreenContainer";
import CommentStatisticsChart from "../../organisms/CommentStatisticsChart";
import ContainerWithSideBar from "../../organisms/ContainerWithSideBar";
import { Container, Title, ChartArea, SortButtonsWrapper, SortButton, DataTable } from "./styles";

const dummyDataByMonth = [
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

const dummyDataByDay = [
  {
    time: "01",
    count: 1200
  },
  {
    time: "02",
    count: 211
  },
  {
    time: "02",
    count: 1110
  },
  {
    time: "02",
    count: 1110
  },
  {
    time: "02",
    count: 811
  },
  {
    time: "02",
    count: 2112
  },
  {
    time: "02",
    count: 9119
  },
  {
    time: "02",
    count: 99922
  }
];

const dummyDataByTime = [
  {
    time: "01",
    count: 11
  },
  {
    time: "2020-2",
    count: 2
  },
  {
    time: "2020-3",
    count: 12
  },
  {
    time: "2020-4",
    count: 12
  },
  {
    time: "2020-5",
    count: 22222
  },
  {
    time: "2020-6",
    count: 22
  },
  {
    time: "2020-7",
    count: 92
  },
  {
    time: "2020-7",
    count: 92
  }
];

const Statistics = () => {
  const match = useRouteMatch<{ id: string }>();
  const projectId = Number(match.params.id);

  const [selectedViewOption, setSelectedViewOption] = useState<ObjectValueType<typeof VIEW_OPTION>>(VIEW_OPTION.DAY);

  const onClickViewOption = (option: ObjectValueType<typeof VIEW_OPTION>) => {
    setSelectedViewOption(option);
  };

  const data =
    selectedViewOption === VIEW_OPTION.DAY
      ? dummyDataByDay
      : selectedViewOption === VIEW_OPTION.MONTH
      ? dummyDataByMonth
      : dummyDataByTime;

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.get(projectId)}>
        <Container>
          <Title>통계</Title>

          <ChartArea>
            <SortButtonsWrapper>
              {Object.values(VIEW_OPTION).map(option => (
                <SortButton onClick={() => onClickViewOption(option)} isSelected={selectedViewOption === option}>
                  {option}
                </SortButton>
              ))}
            </SortButtonsWrapper>

            <CommentStatisticsChart data={data} />
          </ChartArea>

          <DataTable>
            <thead>
              <tr>
                <th>{selectedViewOption}</th>
                <th>댓글 개수</th>
              </tr>
            </thead>
            <tbody>
              {data.map(_data => (
                <tr>
                  <th>{_data.time}</th>
                  <th>{_data.count}</th>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Container>
      </ContainerWithSideBar>
    </ScreenContainer>
  );
};

export default Statistics;
