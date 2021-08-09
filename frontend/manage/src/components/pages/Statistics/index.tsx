import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { PROJECT_MENU } from "../../../constants";
import { PERIODICITY } from "../../../constants/statistics";

import { useCalendar, useCommentStatisticsData, useGetProject } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import Modal from "../../atoms/Modal";
import Calendar from "../../molecules/Calendar";
import CommentStatisticsChart from "../../organisms/CommentStatisticsChart";
import ContainerWithSideBar from "../../organisms/ContainerWithSideBar";
import {
  Container,
  Title,
  ChartArea,
  SortButtonsWrapper,
  SortButton,
  DataTable,
  Meta,
  Wrapper,
  DataInputWrapper,
  DateInputText,
  DateRange
} from "./styles";

const Statistics = () => {
  const match = useRouteMatch<{ id: string }>();
  const projectId = Number(match.params.id);

  const [selectedPeriodicity, setSelectedPeriodicity] = useState<ObjectValueType<typeof PERIODICITY>>(
    PERIODICITY.DAILY
  );

  const { project } = useGetProject(projectId);
  const projectSecretKey = project?.secretKey;

  const { showCalendar, setShowCalendar, currentDate, setCurrentDate, startDate, setStartDate, endDate, setEndDate } =
    useCalendar();

  const startDateAsString = startDate?.format("YYYY-MM-DD") || moment().format("YYYY-MM-DD");
  const endDateAsString = endDate?.format("YYYY-MM-DD") || moment().format("YYYY-MM-DD");

  const {
    stats,
    error: errorCommentStatistics,
    refetch: getCommentStatisticsData
  } = useCommentStatisticsData({
    periodicity: selectedPeriodicity,
    projectKey: projectSecretKey,
    startDate: startDateAsString,
    endDate: endDateAsString
  });

  const onClickViewOption = (option: ObjectValueType<typeof PERIODICITY>) => {
    setSelectedPeriodicity(option);
  };

  useEffect(() => {
    getCommentStatisticsData();
  }, [projectSecretKey, startDate, endDate, selectedPeriodicity]);

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.get(projectId)}>
        <Container>
          <Title>통계</Title>

          <ChartArea>
            <Wrapper>
              <DataInputWrapper>
                <Meta>기간 선택</Meta>
                <DateRange>
                  <DateInputText onClick={() => setShowCalendar(true)}>{startDate?.format("YY-MM-DD")}</DateInputText>
                  <span>{" ~ "}</span>
                  <DateInputText onClick={() => setShowCalendar(true)}>{endDate?.format("YY-MM-DD")}</DateInputText>
                </DateRange>
              </DataInputWrapper>

              <SortButtonsWrapper>
                {Object.values(PERIODICITY).map(option => (
                  <SortButton
                    key={option.key}
                    onClick={() => onClickViewOption(option)}
                    isSelected={selectedPeriodicity === option}
                  >
                    {option.display}
                  </SortButton>
                ))}
              </SortButtonsWrapper>
            </Wrapper>

            <CommentStatisticsChart data={stats} />
          </ChartArea>

          <DataTable>
            <thead>
              <tr>
                <th>{selectedPeriodicity.display}</th>
                <th>댓글 개수</th>
              </tr>
            </thead>
            <tbody>
              {[...stats].reverse().map(_data => (
                <tr key={_data.date}>
                  <th>{_data.date}</th>
                  <th>{_data.count}</th>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Container>

        <Modal isOpen={showCalendar} closeModal={() => setShowCalendar(false)} dimmedOpacity={0}>
          <Calendar
            date={currentDate}
            setDate={setCurrentDate}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Modal>
      </ContainerWithSideBar>
    </ScreenContainer>
  );
};

export default Statistics;
