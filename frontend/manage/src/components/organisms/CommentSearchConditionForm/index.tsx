import moment from "moment";
import Modal from "../../atoms/Modal";
import Calendar from "../../molecules/Calendar";
import { Container, SearchTermInput, SearchButton, DateRange, Wrapper, Meta, DateInputText } from "./styles";

export interface Props {
  showCalendar: boolean;
  setShowCalendar: (state: boolean) => void;
  currentDate: moment.Moment;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  setCurrentDate: (state: moment.Moment) => void;
  setStartDate: (state: moment.Moment | null) => void;
  setEndDate: (state: moment.Moment | null) => void;
}

const CommentSearchConditionForm = ({
  showCalendar,
  setShowCalendar,
  currentDate,
  setCurrentDate,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}: Props) => {
  return (
    <>
      <Container>
        <Wrapper>
          <Meta>기간 선택</Meta>
          <DateRange>
            <DateInputText onClick={() => setShowCalendar(true)}>{startDate?.format("YY-MM-DD")}</DateInputText>
            <span>{" ~ "}</span>
            <DateInputText onClick={() => setShowCalendar(true)}>{endDate?.format("YY-MM-DD")}</DateInputText>
          </DateRange>
        </Wrapper>

        <Wrapper>
          <Meta>내용 검색</Meta>
          <SearchTermInput placeholder="검색어를 입력해주세요." />
        </Wrapper>

        <SearchButton>조회</SearchButton>
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
    </>
  );
};

export default CommentSearchConditionForm;
