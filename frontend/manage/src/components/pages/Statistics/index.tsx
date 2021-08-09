import moment from "moment";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { PROJECT_MENU } from "../../../constants";
import { VIEW_OPTION } from "../../../constants/statistics";
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

  const [selectedViewOption, setSelectedViewOption] = useState<ObjectValueType<typeof VIEW_OPTION>>(VIEW_OPTION.DAY);

  const { project } = useGetProject(projectId);
  const projectSecretKey = project?.secretKey;

  const { showCalendar, setShowCalendar, currentDate, setCurrentDate, startDate, setStartDate, endDate, setEndDate } =
    useCalendar();

  const startDateAsString = startDate?.format("YYYY-MM-DD") || moment().format("YYYY-MM-DD");
  const endDateAsString = endDate?.format("YYYY-MM-DD") || moment().format("YYYY-MM-DD");

  const { data, refetch: getCommentStatisticsData } = useCommentStatisticsData({
    type: selectedViewOption,
    projectKey: projectSecretKey,
    startDate: startDateAsString,
    endDate: endDateAsString
  });

  const onClickViewOption = (option: ObjectValueType<typeof VIEW_OPTION>) => {
    setSelectedViewOption(option);
  };

  useEffect(() => {
    getCommentStatisticsData();
  }, [projectSecretKey, startDate, endDate]);

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
                {Object.values(VIEW_OPTION).map(option => (
                  <SortButton
                    key={option}
                    onClick={() => onClickViewOption(option)}
                    isSelected={selectedViewOption === option}
                  >
                    {option}
                  </SortButton>
                ))}
              </SortButtonsWrapper>
            </Wrapper>

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
              {[...data].reverse().map(_data => (
                <tr key={_data.time}>
                  <th>{_data.time}</th>
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
