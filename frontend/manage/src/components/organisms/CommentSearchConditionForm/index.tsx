import moment from "moment";
import Modal from "../../atoms/Modal";
import Calendar from "../../molecules/Calendar";
import {
  Container,
  SearchTermInputWrapper,
  SearchTermInput,
  SearchButton,
  DateInputWrapper,
  DateInputText
} from "./styles";

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
    <Container>
      <DateInputWrapper>
        <span>기간 선택</span>
        <DateInputText onClick={() => setShowCalendar(!showCalendar)}>{startDate?.format("YY-MM-DD")}</DateInputText>
        <span>~</span>
        <DateInputText onClick={() => setShowCalendar(!showCalendar)}>{endDate?.format("YY-MM-DD")}</DateInputText>
      </DateInputWrapper>

      <SearchTermInputWrapper>
        <label>
          <span>내용 검색</span>
          <SearchTermInput placeholder="검색어를 입력해주세요." />
        </label>
      </SearchTermInputWrapper>

      <SearchButton>조회</SearchButton>

      <Modal isOpen={showCalendar} closeModal={() => setShowCalendar(false)}>
        <Calendar
          date={currentDate}
          setDate={setCurrentDate}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </Modal>
    </Container>
  );
};

export default CommentSearchConditionForm;
