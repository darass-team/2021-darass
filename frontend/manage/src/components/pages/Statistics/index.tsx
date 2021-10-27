import ScreenContainer from "@/components/@style/ScreenContainer";
import Modal from "@/components/atoms/Modal";
import CommentStatisticsChart from "@/components/organisms/CommentStatisticsChart";
import ContainerWithSideBar from "@/components/organisms/ContainerWithSideBar";
import { PROJECT_MENU, ROUTE } from "@/constants";
import { PERIODICITY } from "@/constants/statistics";
import { useCalendar, useCommentStatisticsData, useDocumentTitle, useGetProject } from "@/hooks";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import {
  Calendar,
  ChartArea,
  Container,
  DataInputWrapper,
  DataTable,
  DateInputText,
  DateRange,
  Meta,
  SortButton,
  SortButtonsWrapper,
  Title,
  Tooltip,
  Wrapper
} from "./styles";

const Statistics = () => {
  const match = useRouteMatch<{ id: string }>();
  const projectId = Number(match.params.id);

  const [selectedPeriodicity, setSelectedPeriodicity] = useState<ObjectValueType<typeof PERIODICITY>>(
    PERIODICITY.DAILY
  );

  const { project } = useGetProject({
    id: projectId
  });
  useDocumentTitle("댓글 통계");

  const projectSecretKey = project?.secretKey;

  const { showCalendar, setShowCalendar, currentDate, setCurrentDate, startDate, setStartDate, endDate, setEndDate } =
    useCalendar({
      initialStartDate: dayjs().subtract(1, "week"),
      initialEndDate: dayjs()
    });

  const [isDateEdited, setIsDateEdited] = useState(false);

  const startDateAsString = startDate?.format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD");
  const endDateAsString = endDate?.format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD");

  const {
    stats,
    refetch: getCommentStatisticsData,
    isFetched: isStatDataFetched,
    isExistData
  } = useCommentStatisticsData({
    periodicity: selectedPeriodicity,
    projectKey: projectSecretKey,
    startDate: startDateAsString,
    endDate: endDateAsString
  });

  const onClickViewOption = (option: ObjectValueType<typeof PERIODICITY>) => {
    setSelectedPeriodicity(option);
  };

  const onClickDateInput = () => {
    setShowCalendar(true);
    setIsDateEdited(true);
  };

  useEffect(() => {
    getCommentStatisticsData();
  }, [projectSecretKey]);

  useEffect(() => {
    getCommentStatisticsData();
  }, [startDate, endDate]);

  useEffect(() => {
    if (!isDateEdited) {
      if (selectedPeriodicity.key === "hourly") setStartDate(dayjs());
      if (selectedPeriodicity.key === "daily") setStartDate(dayjs().subtract(1, "week"));
      if (selectedPeriodicity.key === "monthly") setStartDate(dayjs().subtract(6, "month"));

      setEndDate(dayjs());
    } else {
      getCommentStatisticsData();
    }
  }, [selectedPeriodicity]);

  if (Number.isNaN(projectId)) {
    return <Redirect to={ROUTE.COMMON.HOME} />;
  }

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.getByProjectId(projectId)}>
        <Container>
          <Title>통계</Title>

          <ChartArea>
            <Wrapper>
              <DataInputWrapper>
                <Meta>기간 선택</Meta>
                <DateRange>
                  <DateInputText onClick={onClickDateInput}>{startDate?.format("YY-MM-DD")}</DateInputText>
                  <span>{" ~ "}</span>
                  <DateInputText onClick={onClickDateInput}>{endDate?.format("YY-MM-DD")}</DateInputText>
                </DateRange>

                <Modal
                  isOpen={showCalendar}
                  blockScroll={false}
                  closeModal={() => setShowCalendar(false)}
                  dimmedOpacity={0}
                >
                  <Calendar
                    date={currentDate}
                    setDate={setCurrentDate}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                  />
                </Modal>
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
                <Tooltip
                  text={`'시간별': 설정된 기간 내 시간별 댓글 개수\n'일별': 설정된 기간 내 일별 댓글 개수\n'월별': 설정된 기간 내 월별 댓글 개수`}
                />
              </SortButtonsWrapper>
            </Wrapper>

            <CommentStatisticsChart data={stats || []} isDataLoaded={isExistData} />
          </ChartArea>

          <DataTable isDataLoaded={isExistData}>
            <thead>
              <tr>
                <th>{selectedPeriodicity.display}</th>
                <th>댓글 개수</th>
              </tr>
            </thead>
            <tbody>
              {stats?.map(_data => (
                <tr key={_data.date}>
                  <th>{_data.date}</th>
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
